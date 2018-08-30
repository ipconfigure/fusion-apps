var userRequest = new XMLHttpRequest(),
    orchidsRequest = new XMLHttpRequest();

function fetchUser(callback) {
    userRequest.open("GET", "/service/users/me", true);
    userRequest.onreadystatechange = function() {
        if (userRequest.readyState === 4 && userRequest.status === 200) {
            var response = JSON.parse(userRequest.responseText);

            callback(response);
        }
    };
    userRequest.send();
}

function fetchOrchids(callback) {
    orchidsRequest.open("GET", "/service/orchids", true);
    orchidsRequest.onreadystatechange = function() {
        if (orchidsRequest.readyState === 4 && orchidsRequest.status === 200) {
            var response = JSON.parse(orchidsRequest.responseText);

            callback(response);
        }
    };
    orchidsRequest.send();
}

function populateUser(user) {
    var html = 'Hello <b>' + user.username + '</b><br/><br/>';

    if (user.admin) {
        html += 'Did you know that you were an admin?<br/>';
    }
    var div = document.getElementById('user');
    div.innerHTML = html;
}

function populateOrchids(orchids) {
    var html = '<div class="container">\
                    <div class="row">\
                    Orchids configured on this Fusion\
                    </div>';
    
    
    for (var i = 0; i < orchids.length; i++) {
        var orchid = orchids[i];

        html += '<div class="row">\
                    <div><a href="' + orchid.uri + '" target="_blank">' + orchid.name + '</a></div>\
                    <div>' + orchid.version.version + '</div>\
                </div>';
      }

    html += '</div>';

    var div = document.getElementById('orchids');
    div.innerHTML = html;
}


fetchUser(populateUser);

fetchOrchids(populateOrchids);