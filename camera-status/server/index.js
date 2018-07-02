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

//app.use(express.static('static'))

app.use((request, response, next) => {
    
    var cookies = request.headers.cookie.split('; ');

    if (request.method !== 'HEAD' && request.headers.fsid === undefined) {
        console.warn('no fsid', request.url);
    }
    
    next()
})

app.use((request, response, next) => {
    
    request.fusionHost = request.headers.referer;

    next()
})

app.get('/time', (request, response) => {
    response.send(new Date());
});

app.get('/camera-status.html', (request, response) => {
    if (request.method === 'HEAD') {
        response.sendStatus(200)
        response.end();
        return;
    } 
    if (request.headers.fsid !== undefined) {
        getOrchids(request)
            .then(resp => {
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

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})

function getOrchids(request) {
    return axios.get(request.fusionHost + 'service/orchids', {
        headers: {
            Cookie: 'fsid=' + request.headers.fsid
        }
    });
}