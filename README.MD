# Get Started with Fusion App

## Prerequisites
1. Obtain provider signature from IPConfigure, Inc.
2. Configure Orchid Fusion's plugin directory
    * Open fusion.properties file
    * Add `fusion.plugins.path` line pointing to plugins folder

        
```
fusion.plugins.path=G:\\source\\fusion-apps
```
3. Restart Orchid Fusion Server


## Create the Hello World App
1.  Create a folder structure for your HelloWorld App inside the plugin directory
    * Create a folder called `HelloWorld`
    * Inside the `HelloWorld` folder create folders called `conf` and `web`
2.  Inside the *conf* folder, create a plugin.json file
    * Paste these contents into the *plugin.json* file
    ```
    {
        "id": "helloworld", //this can contain only lowercase letters, numbers and periods
        "version": "0.1.0",
        "rootpath": "hello-world",
        "name": "HelloWorld",
        "description": "Hello World Orchid Fusion App",
        "provider": <provider signature>,
        "extensions": [
            {
                "point": "nav-menu",
                "extension": {
                    "name": "Hello World", //this will appear in the Menu
                    "route": "hello-world",
                    "source": "hello-world.html",
                    "type": "frame"
                }
            }
        ]
    }
    ```
    * Be sure to replace the `<provider signature>` with the one you received from IPConfigure, Inc.

3.  Inside the *web* folder, create a file named `hello-world.html` 
    * Copy the following contents into *hello-world.html*
    ```
    <html>
        <body>
            Hello world!
        </body>
    </html>
    ```
4.  Restart Orchid Fusion server.

5.  Browse to Orchid Fusion and you should see Hello World under the Apps menu.

6.  Click on the menu item to see Hello World.


## Communicating with Orchid Fusion

An App that can't communicate isn't very useful. So let's modify Hello World to retrieve the current logged in user and display information. Because this App is hosted on the same server we can rely on the authentication headers to verify that we are a valid user with the same permissions in Orchid Fusion.

1.  Inside the *web* folder create a file called `hello-world.js`

    * Copy the following contents into *hello-world.js*
    ```
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
    ```
2. Modify the *hello-world.html* file.

    * Copy the following contents into *hello-world.html*
    ```
    <html>
        <head>
            <style>
            .container {
                display: flex;
                flex-direction: column;
            }

            .row {
                display: flex;
                flex-direction: row;
                justify-content:space-around;
            }
            </style>
        </head>
        <body>
            <div id="user"></div>
            <br/>
            <br/>
            <br/>
            <div id="orchids"></div>


            <script type="text/javascript" src="hello-world.js"></script>
        </body>
    </html>
    ```
3.  Restart Orchid Fusion server.

4.  Browse to Orchid Fusion and you should see Hello World under the Apps menu.

5.  Click on the menu item to see Hello World.