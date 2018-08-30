const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const axios = require('axios')

const app = express()
const port = 3000

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use((request, response, next) => {
    //verify that we have an fsid in the headers
    if (request.method !== 'HEAD' && request.headers.fsid === undefined) {
        console.warn('no fsid', request.url);
    }

    //use the referer to determine the Orchid Fusion server
    request.fusionHost = request.headers.referer;

    next()
})

//expose a service to allow the client to dynamically retrieve the time from the server
app.get('/time', (request, response) => {
    response.send(new Date());
});

//expose a web page that will be displayed inside Orchid Fusion
app.get('/camera-status.html', (request, response) => {
    if (request.method === 'HEAD') {
        response.sendStatus(200)
        response.end();
        return;
    } 

    // if the request came from Orchid Fusion, there will be an FSID in the headers.
    if (request.headers.fsid !== undefined) {
        getOrchids(request)
            .then(resp => {
                //manipulate the orchid/camera information into the format
                //used by the template
                var reportData = [];

                for (var i = 0; i < resp.data.length; i++) {
                    var orchid = resp.data[i];

                    var cameras = orchid.cameras.map(x => {
                        return [x.name, x.ipAddress, x.lastStreamState]
                    });
                    var columns = ['Name', 'IP Address', 'Last Known State'];

                    var report = {
                        'name': orchid.name,
                        'status': orchid.isAvailable ? 'Available' : 'Offline',
                        'cameras': cameras,
                        'columns': columns
                    };

                    reportData.push(report);
                }

                //render the reports template
                response.render('reports', {
                    header: 'Camera Status',
                    data: reportData,
                    footer: new Date()
                })
            })
            .catch(error => {
                console.error(error.message)
                response.sendStatus(error.response.status)
            });
    }
});

//start listening for requests
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})

//retrieve Orchids from the Orchid Fusion service api using the FSID that was supplied
//via the request headers
function getOrchids(request) {
    return axios.get(request.fusionHost + 'service/orchids', {
        headers: {
            Cookie: 'fsid=' + request.headers.fsid
        }
    });
}