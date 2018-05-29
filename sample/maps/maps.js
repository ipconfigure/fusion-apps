var map,
    orchids = [],
    request = new XMLHttpRequest(),
    cameraIcon = 'video-camera.png',
    ipconfigure = {lat: 36.882960, lng: -76.300367};
    cameraPositions = [
        {lat: 36.8833, lng: -76.300367},
        {lat: 36.88275, lng: -76.3005}
    ];

function fetchOrchids(callback) {
    request.open("GET", "/fusion/orchids", true);
    request.withCredentials = true;                
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
                // Success-- retrieve our JWT from the response
                orchids = JSON.parse(request.responseText);

                callback();
        }
    };
    request.send();
}

    // This example displays a marker at the center of Australia.
    // When the user clicks the marker, an info window opens.

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: ipconfigure
    });
    fetchOrchids(initMarkers);
}

function initMarkers() {
    var cameras = orchids[0].cameras,
        infowindow = new google.maps.InfoWindow({
            content: "holding..."
        });

    for (var i = 0; i < 2; ++i) {
        var marker = new google.maps.Marker({
            position: cameraPositions[i],
            map: map,
            title: cameras[i].name,
            icon: cameraIcon,
            content: '<iframe style="width: 80vw; height: 60vh; max-width: 700px; max-width: 600px" src="/?single-player=' + cameras[i].primaryStream.id + '&single-player-orchid=' + orchids[0].id + '#!/player"></iframe>'
        });

        google.maps.event.addListener(marker, 'click', function () {
            // where I have added .html to the marker object.
            infowindow.setContent(this.content);
            infowindow.open(map, this);
        });
    }
}