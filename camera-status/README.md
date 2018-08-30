# Simple Camera Status Orchid Fusion App

## Objective
Demonstrate a simple camera status report implemented in a remote server based Orchid Fusion App.


## something
This sample uses a [Node.js](https://nodejs.org/en/) server to provide more complex functionality. Node.js was chosen for this sample but is not a requirement, any http server and related technologies are suitable. It hosts a /camera-status.html page and a /time endpoint showing how to server up an html page via Orchid Fusion as well as using the app-proxy to make calls back to the endpoint. 

### app.js
This Node.js application serves the /camera-status.html page that will be rendered by loading [Handlebars](https://handlebarsjs.com/) template files and styled using [Materialize](https://materializecss.com) to give it a common look and feel with Orchid Fusion. The information displayed is retrieved by using the `fsid` request header which gives access to the Orchid Fusion API. The fsid is for the currently logged in user and will only return resources authorized for that user. See the API documentation for more information.

Also hosted by this application is a /time endpoint to demonstrate calling back to the server using the app-proxy from the client browser.

### views/layouts/main.hbs
To avoid Cross Site Scripting (CORS) errors, Orchid Fusion provides an app-proxy that can be used to make requests from the client back to our /time service. The format of the app-proxy url is:

`http(s)://[orchid-fusion-server]/service/app-proxy/[rootpath]/[path/to/resource]`

When retrieving resources from the application server it is recommended to use the app-proxy.

### views/reports.hbs
Handlebars template file 

## Prerequisites
Install Node.js (which includes npm) from <https://nodejs.org/en/download/>

1. Replace the contents of the `provider` section in the conf/app.json file with the provider signature you received from IPConfigure, Inc.

```
"provider": {
  "name": "ACME Plugin Dept.",
  "logo": "data:image/svg+xml;base64,base64svg",
  "support": {
    "url": "https://www.acme.com/",
    "email": "support@acme.com",
    "phone": "800-555-1212"
  },
  "signature": "base64signature"
},
```

2. For Orchid Fusion to render this as a server based app you must include the `server` section in the app.json file.

```
"server": {
    "baseuri": "http://[your server goes here]/"
},
```

## Deploying
1. Create a camera-status directory underneath the Orchid Fusion Apps folder which is specified by `fusion.apps.path` in the fusion.properties configuration file.
2. Copy the conf folder into the camera-status directory.
3. Copy the server folder to the desired server location. Note: if deploying to a different server, don't forget to update the `server.baseuri` setting in your `conf/app.json` file.
4. In the server folder run `npm install`
5. To start the application, in the server folder,  run `node app.js`
