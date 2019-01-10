var orchids = [],
    request = new XMLHttpRequest(),
    templateRequest = new XMLHttpRequest(),
    cameraSelect,
    typeSelect,
    usernameInput,
    passwordInput,
    playerContainer,
    sourceContainer,
    sourceText,
    playerSource;

function getOrchid() {
    var orchidId = cameraSelect.value.split('|')[0],
        orchid;

    for (var i = 0; i < orchids.length; ++i) {
        if (orchids[i].id === orchidId) {
            orchid = orchids[i];
            break;
        }
    }

    return orchid;
}

function buildApiPlayer() {
    var orchidId = cameraSelect.value.split('|')[0],
        streamId = cameraSelect.value.split('|')[1],
        checkboxes = document.getElementsByClassName('option-checkbox'),
        optionsString = '',
        orchidUri,
        templateUrl;

    sourceContainer.innerHTML = '';
    playerContainer.src = 'about:blank';

    if (usernameInput.value.length < 1 ||  passwordInput.value.length < 1) {
        playerContainer.style.display = "none";
        sourceContainer.style.display = "none";
        alert("Please specify a username and a password");
        resizeFrame();
        return;
    }

    playerContainer.style.display = "block";
    sourceContainer.style.display = "block";

    orchidUri = getOrchid().uri;

    for (var i = 0; i < checkboxes.length; ++i) {
        if (checkboxes[i].checked) {
            optionsString += '&' + checkboxes[i].id + '=1';
        }
    }

    templateUrl = typeSelect.value;
    if (typeSelect.value === 'orchid' && compatibilityToggle.checked) {
        templateUrl += '-2.2.1';
    }
    templateUrl += "-api-player-template.html";

    // Grab the appropriate template for our player type
    templateRequest.open("GET", templateUrl);
    templateRequest.withCredentials = true;                
    templateRequest.onreadystatechange = function() {
        if (templateRequest.readyState === 4 && templateRequest.status === 200) {
                // We have our template.  Fill it in with user supplied values.
                playerSource = templateRequest.responseText;

                playerSource = playerSource.replace("%STREAM_ID%", streamId);
                playerSource = playerSource.replace("%ORCHID_URI%", orchidUri);
                playerSource = playerSource.replace("%ORCHID_ID%", orchidId);
                playerSource = playerSource.replace("%OPTIONS%", optionsString);
                playerSource = playerSource.replace("%FUSION_URI%", window.location.origin);
                playerSource = playerSource.replace("%USERNAME%", usernameInput.value);
                playerSource = playerSource.replace("%PASSWORD%", passwordInput.value);

                sourceText = document.createTextNode(playerSource);
                sourceContainer.appendChild(sourceText);
                playerContainer.contentWindow.document.write(playerSource);
                playerContainer.contentWindow.document.close();
                resizeFrame();
        }
    };
    templateRequest.send();
}

function fetchOrchids(callback) {
    // This request is performed using the signed-in user's cookie
    request.open("GET", "/fusion/orchids", true);
    request.withCredentials = true;                
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
                // Success-- retrieve our Orchid Core list from the response
                orchids = JSON.parse(request.responseText);

                if (orchids.length > 0) {
                    callback();
                } else {
                    var container = document.getElementById('api-player-generator');
                    container.innerHTML = 'Please register an Orchid before using this app.';
                    container.style = 'text-align: center; background-color: orange';
                }
        }
    };
    request.send();
}

function findElements() {
    cameraSelect = document.getElementById('cameras-list');
    typeSelect = document.getElementById('type-list');
    usernameInput = document.getElementById('username');
    passwordInput = document.getElementById('password');
    playerContainer = document.getElementById('player-container');
    sourceContainer = document.getElementById('source-container');
    compatibilityToggle = document.getElementById('compatibility');
    compatibilityContainer = document.getElementById('compatibility-container');
}

function populateList() {
    var orchid,
        camera,
        option;

    findElements();
    for (var i = 0; i < orchids.length; ++i) {
        orchid = orchids[i];
        for (var j = 0; j < orchid.cameras.length; ++j) {
            camera = orchid.cameras[j];
            
            option = document.createElement("option");
            option.text = orchid.name + ': ' + camera.name;
            option.value = orchid.id + '|' + camera.primaryStream.id;
            cameraSelect.appendChild(option);
        }
    }
    M.FormSelect.init(cameraSelect, {});
    M.FormSelect.init(typeSelect, {});
    M.updateTextFields();
    setCompatibility();
    updateFields('fusion');
}

function resizeFrame() {
    parent.postMessage({ type: 'resize' }, window.location.origin);
}

function updateFields(playerType) {
    if (playerType === 'fusion') {
        compatibilityContainer.style.display = 'none';
    } else {
        compatibilityContainer.style.display = 'block';
    }
}

function setCompatibility() {
    var orchid = getOrchid(),
        versionParts = orchid.version.version.split('.');

    if (!(i === 0 && versionParts[i] === '0')) {
        for (var i = 0; i < versionParts.length; ++i) {
            if (parseInt(versionParts[i]) < 2) {
                compatibilityToggle.checked = true;
                break;
            }
        }
    }
}

window.onload = function() {
    fetchOrchids(populateList);
}