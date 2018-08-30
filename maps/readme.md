# Maps Orchid Fusion App

## Objective
This is an example of a client side Orchid Fusion App. It shows how to retrieve cameras from Orchid Fusion and render pins on a Google Map where they are located by using just client side javascript. It is written using vanilla javascript and accesses

### Authentication
Since the page is loaded from the Orchid Fusion server in an iframe, authentication is already taken care of by the browser so any calls made to the Orchid Fusion service API will already have the current user's FSID authorization header. This means any resources (orchids, cameras, etc.) that user has access to can also be accessed by the app via the service API.

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


2. Obtain a Google Maps API key by going to [Google Maps Platform](https://cloud.google.com/maps-platform/) and follow the Get Started steps.
3. Copy your API key into [maps.js](./web/maps.js)
4. Copy this folder into the apps directory configured in your fusion.properties file.

