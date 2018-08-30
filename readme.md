# Orchid Fusion Apps

## Locally vs Remotely hosted apps
There are two ways to develop an Orchid Fusion App. Locally hosted apps are js/html based and hosted on locally within the Orchid Fusion web server while remotely hosted apps are hosted on external servers.


### Local
* written in javascript
* easier to deploy

### Remote
* 


The location of fusion apps is specified by setting the apps path property in the fusion.properties file. The default location for apps is the apps directory relative to the location of this file but it can be modified to point to another directory if desired. 

`fusion.apps.path=/etc/opt/fusion/apps`

After making modifications to this file, be sure restart Orchid Fusion.

## Application structure 

```
application_folder/
    conf/
    web/ 
```

The web folder is only required when the app is locally hosted. This folder serves as the relative root of the application.

## Application Configuration file
The configuration file for Orchid Fusion Apps is located in a /conf folder underneath the application folder

```
{
    "id": "com.acme.sample",
    "version": "1.0.0",
    "rootpath": "sample",
    "name": "Sample Orchid Fusion App",
    "description": "Description of application",
    "provider": {
        "name": "ACME Applications Dept.",
        "logo": "data:image/svg+xml;base64,base64svg",
        "support": {
            "url": "https://www.acme.com/",
            "email": "support@acme.com",
            "phone": "800-555-1212"
        },
        "signature": "base64signature"
    },
    "server": {
        "baseuri": "http://localhost"
    },
    "extensions": [
        {
            "point": "nav-menu",
            "extension": {
                "name": "Camera Status",
                "route": "camera-status",
                "source": "camera-status.html",
                "iconSource": "data:image/svg+xml;base64,base64svg",
                "type": "frame"
            }
        }
    ]
}

```

| Field  | Description | Required |
| ------------- | ------------- | --- |
| id  | Application id  | yes |
| version  | Application version | yes |
| rootpath  | Root application folder | yes |
| name  | Application name  | yes |
| description  | Description of the application  | yes |
| provider  | The values in this section will be displayed in the application footer and support dialog | yes |
| server.baseuri  | Uri to server where the application is hosted, can be omitted if hosting locally | no |
| extensions.point  | Indicates how the application will be integrated, currently 'nav-menu' is supported and a menu item will be added | yes |
| extensions.extension.name | Name that will be displayed in menu item | yes |
| extensions.extension.route  | Name that will be displayed in url | yes |
| extensions.extension.source  | Endpoint that will render content for the application | yes |
| extensions.extension.iconSource  | base 64 encoded svg of icon to display in menu | no |
| extensions.extension.type  | Indicates how the application content will be displayed, currently 'frame' is supported and content will be displayed in an iframe | yes |


 `id` and `version`, when combined, should be unique across all applications configured in Orchid Fusion

 `rootpath` and `extensions.extension.route` are combined to make the url to the application

 `rootpath` and `extensions.extension.source` are combined to make up physical path to the application content