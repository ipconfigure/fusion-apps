# Frame Grabber Orchid Fusion App

## Objective
Create an Orchid Fusion Hosted App which demonstrates the use of the Orchid Core proxy to display a frame from each camera. 

### Orchid Fusion Hosting
All Orchid Fusion Apps need to be installed in their own folder underneath the `apps` directory which is configured in `fusion.properties`. The `app.json` configuration file resides in `apps/[rootpath]/conf`. For applications that are hosted by Orchid Fusion, the artifact files need to be located in the `apps/[rootpath]/web` folder. This folder is considered the base url for the application.

### Authentication
Since the page is loaded from the Orchid Fusion server in an iframe, authentication is already taken care of by the browser, any calls made to the Orchid Fusion service API will already have the current user's FSID authorization cookie. This means any resources (orchids, cameras, etc.) that user has access to can also be accessed by the app via the service API.

## Prerequisites
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


2. Copy this folder into the apps directory configured in your fusion.properties file
3. Restart Orchid Fusion
4. Click on Grab Frames menu item in Orchid Fusion
