# Simple Camera Status Orchid Fusion App

## Objective
This sample Orchid Fusion App, shows how to implement a server based 


 a simple camera status report by using a [Node.js](https://nodejs.org/en/) server application to provide more complex functionality. It uses the FSID, provided as a request header, to access the Orchid Fusion service API to retrieve status information. The results are then displayed using [Handlebars](https://handlebarsjs.com/) for templating and [Materialize](https://materializecss.com) to give it a common look and feel. 

*Note: Orchid Fusion Apps are not limited to using these development tools. Any http server based technology is suitable for use.*

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
5. To start the application, in the server folder,  run `node index.js`
