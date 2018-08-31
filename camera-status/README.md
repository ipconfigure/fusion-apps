# Simple Camera Status Orchid Fusion App

## Objective
Create an Externally Hosted Orchid Fusion App which demonstrates using an external server application and accessing the server application through the Orchid Fusion app-proxy to generate a simple camera status report.

### External Hosting
All Orchid Fusion Apps need to be installed in their own folder underneath the `apps` directory which is configured in `fusion.properties`. The `app.json` configuration file resides in `apps/[rootpath]/conf`. For applications that are hosted by Orchid Fusion. No other folders/files need to be located in the directory. For Orchid Fusion to be able to load the application, the `server` section needs to be defined in the `app.json` file. Instructions how to do this are listed in [Prerequisites](#prerequisites) section. 

Externally hosted apps can be implemented utilizing any technology that can serve a web page, ex. IIS/C#, Apache/Java.

### Authentication
Since the page is loaded from the Orchid Fusion server in an iframe but does not reside on the same server, authentication will have to be handled by code on the external server. Each request made through the app-proxy will have an `fsid` request header that can be used to access the Orchid Fusion API. This fsid has the same authorization as the current user and will have access to the same resources in Orchid Fusion.

## Application

### app.js
This [Node.js](https://nodejs.org/en/) application serves the /camera-status.html page that will be rendered by loading [Handlebars](https://handlebarsjs.com/) template files and styled using [Materialize](https://materializecss.com) to give it a common look and feel with Orchid Fusion. The information displayed is retrieved by using the `fsid` request header which gives access to the Orchid Fusion API. The fsid is for the currently logged in user and will only return resources authorized for that user. See the API documentation for more information.

Also hosted by this application is a /time endpoint to demonstrate calling back to the server using the app-proxy from the client browser.

### views/layouts/main.hbs
To avoid Cross Site Scripting (CORS) errors, Orchid Fusion provides an app-proxy that can be used to make requests from the client back to our /time service. The format of the app-proxy url is:

`http(s)://[orchid-fusion-server]/service/app-proxy/[rootpath]/[path/to/resource]`

When retrieving resources from the application server it is recommended to use the app-proxy.

### views/reports.hbs
Handlebars template file 

## Prerequisites
1. Install Node.js (which includes npm) from <https://nodejs.org/en/download/>

2. Replace the contents of the `provider` section in the conf/app.json file with the provider signature you received from IPConfigure, Inc.

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

3. For Orchid Fusion to load this as an Externally Hosted app the `server` section must be included in the app.json file.

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
