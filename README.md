# Installing CADViewer Server

## CADViewer Node JS Conversion Server


The CADViewer NodeJS server (nodejs/cadviewer-conversion-server/) is used in five different implementations: **NodeJS**, **Angular**,**ReactJS**, **Laravel** and **VueJS**. 

Depending on the implementation, copy: CADViewer_config_XXXXXX.json -> **CADViewer_config.json** (where XXXXXX is either NodeJS, Angular, Laravel, ReactJS or VueJS), to set up a template server and path configuration prior to running the server. 

The CAD converter [AutoXchange 2020](https://cadviewer.com/alldownloads/autoxchange), - and other converters -, needs to be installed and referenced through the configuration file. The converters typically is in the /nodejs/cadviewer-conversion-server/ folder structure, and the NodeJS download contains template folders in which to place the executables. 

This install includes the AutoXchange 2020 converter, but if needed, it can be updated from our [download](https://cadviewer.com/download) resources.

The [CADViewer](https://cadviewer.com/cadviewertechdocs) front-end can be found from our [download](https://cadviewer.com/download) resources, or installed directly from npm with: **npm i cadviewer**.


**NOTE:** Make sure the converter version number in CADViwer_config.json match the converters you install, and change any paths settings to correspond to your install folders.  

**Run:** the NodeJS server with:  *node CV_6.x.yy*


