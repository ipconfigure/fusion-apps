var map,
    orchids = [],
    request = new XMLHttpRequest(),
    cameraIcon = 'video-camera.png',
    ipconfigurePosition = {lat: 36.882960, lng: -76.300367}, // Coordinates for IPConfigure headquarters
    cameraPositions;

    /* Some hard coded camera positions.

       For a real deplayment you would want to fetch this from a webservice and 
       the position object would be augmented with information to identify the camera.

        Example:

        {
            lat: 36.88,
            lng: -76.30,
            cameraId: 10,
            orchidId: 17be1495-c9a7-48fc-be5d-18d1a35d89b3
        }

    */

    cameraPositions = [
        { lat: 36.8833, lng: -76.300367 },
        { lat: 36.88275, lng: -76.3005 }
    ];

function fetchOrchids(callback) {
    request.open("GET", "/fusion/orchids", true);
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

    // This example displays a marker at the center of Australia.
    // When the user clicks the marker, an info window opens.

function initMap() {
    // Center the map on IPConfigure headquarters
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: ipconfigurePosition
    });
    fetchOrchids(initMarkers);

    // make sure the map gets drawn
    google.maps.event.addListenerOnce(map, 'idle', function() {
        google.maps.event.trigger(map, 'resize');
    });
}

function initMarkers() {
    var cameras = orchids[0].cameras,
        infowindow = new google.maps.InfoWindow({
            content: "holding..."
        });

    // Throw the first two cameras from the first Orchid Core onto the map.
    for (var i = 0; i < 2; ++i) {
        // Define a marker with an Orchid Fusion API player as content
        var marker = new google.maps.Marker({
            position: cameraPositions[i],
            map: map,
            title: cameras[i].name,
            icon: cameraIcon,
            content: '<iframe style="width: 80vw; height: 60vh; max-width: 700px; max-width: 600px" src="/?single-player=' + cameras[cameras.length - 1 - i].primaryStream.id + '&single-player-orchid=' + orchids[0].id + '#!/player"></iframe>'
        });

        // Show a video player when a marker is clicked
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(this.content);
            infowindow.open(map, this);
        });
    }
}
