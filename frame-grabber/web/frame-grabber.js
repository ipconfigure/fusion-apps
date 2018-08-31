var images = document.getElementById('images'),
    orchids = [],
    request = new XMLHttpRequest();

function fetchOrchids(callback) {
    request.open("GET", "/service/orchids", true);
    request.withCredentials = true;                
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            // Success-- retrieve our Orchid Core list from the response
            orchids = JSON.parse(request.responseText);

            if (orchids.length > 0) {
                callback();
            }
        }
    };
    request.send();
}

function grabFrames() {
    //iterate through the orchids
    for (var i = 0; i < orchids.length; i++) {
        var orchid = orchids[i];

        //iterate through the cameras and for any cameras that are 'running' use the 
        //orchid-proxy to display a frame in an img
        for (var j = 0; j < orchid.cameras.length; j++) {
            if (orchid.cameras[j].lastStreamState === 'running') {
                images.innerHTML += '<img style="width: 50%" src="/fusion/orchid-proxy/' + orchid.id + '/service/streams/' + orchid.cameras[j].primaryStream.id + '/frame" />';
            }
        }
    }
}
  
fetchOrchids(grabFrames);

