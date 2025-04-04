# Installing CADViewer Conversion Server - Windows and Linux

The ***NodeJS CADViewer Conversion Server*** (nodejs/cadviewer-conversion-server/) is used in a multitude of CADViewer different implementations: *[Angular](https://github.com/CADViewer/cadviewer-testapp-angular-v02)*,*[ReactJS](https://github.com/CADViewer/cadviewer-testapp-react-01)*, *[Laravel](https://github.com/CADViewer/cadviewer-script-library-laragon-laravel-sample-01)*, *[Rails7](https://github.com/CADViewer/cadviewer-testapp-rails7-01)* , *[VueJS](https://github.com/CADViewer/cadviewer-testapp-vue-01)* and as an alternative server in the *[Apache / PHP installation](https://github.com/CADViewer/cadviewer-script-library)*. 

The ***CADViewer Conversion Server*** can also be used as a ***RESTFUL API*** server for CAD conversions and data extraction, see: *[CADViewer RESTFUL API](https://github.com/CADViewer/CADViewer-REST-API-Conversion-Server)*

The repository contains a full setup including converters and NodeJS controlling script.

It contains all components to run on either a Windows server or a Linux Server.

***NOTE:*** The CAD converters are of such as size that ***[Git LFS](https://git-lfs.com/)*** is used, therefore prior to making a **git pull**, you must first install Git LFS: **sudo apt-get install git-lfs** and **git lfs install** .


## This package contains

1: NodeJS script library for controlling CAD Conversions and communication with CADViewer  - in its preferred folder structure

2: AutoXchange AX2025 Converter, LinkList2025 Converterand DWGMerge2025 Converter - in their preferred folder structure

3: All structures for file-conversion, rest-API calls, sample drawings, redlines, etc. 


## This package does not contain

4: The converter folder structure contains a larger set of fonts, installed in /cadviewer/converters/ax2024/fonts/, but a fuller set of fonts can be installed. 

Read the sections on installing and handling [Fonts](https://tailormade.com/ax2020techdocs/installation/fonts/) in [AutoXchange 2024TechDocs](https://tailormade.com/ax2020techdocs/) and [TroubleShooting](https://tailormade.com/ax2020techdocs/troubleshooting/).



## How to Use

1. The ***CADViewer_config.json*** contains all settings for running under Windows and Linux.

2. In the ***CADViewer_config.json*** the default settings of the variable ***autodetect_platform*** is ***true*** and the variable ***autodetect_location*** is  ***true***. With these settings running **cadviewer_server** will automatically set up all folder paths for conversions when running on either Windows or Linux. 

3. If a user sets ***autodetect_platform*** to ***false*** and the variable ***autodetect_location*** to  ***false***, all paths in **CADViewer_config.json** MUST correspond to the actual server setting. 

4. The variable ***ServerUrl*** sets the URL of the server with its port, the default setup is ***http://localhost:3000***.

5. When running on Linux, ensure the following:

    5A: Ensure the converter ***ax2023_L64_12_xx_yy*** has full chmod 777 permissions (or 755).
   
    5B: Ensure the folder with temporary files ***/converters/files*** has full read and write permissions. 

6. Run by using the *npm start* script or *node cadviewer_server* from the command line.
 

7: The CAD converter [AutoXchange 2025](https://cadviewer.com/alldownloads/autoxchange), - and other converters -, needs to be installed and referenced through the configuration file. The converters typically are in the /cadviewer-conversion-server/converters/ folder structure and comes pre-installed with this package. If using ***autodetect_*** under **2.** above, then paths will be set up automatically 

9: The [CADViewer](https://cadviewer.com/cadviewertechdocs) front-end can be found from our [download](https://cadviewer.com/download) resources, or installed directly from npm with: **npm i cadviewer**. Use the following online sample encapsulations from our [repository](https://github.com/CADViewer?tab=repositories) to run ***[CADViewer](https://github.com/CADViewer?tab=repositories)***: for example [React CADViewer sample - cadviewer-testapp-react-01](https://github.com/CADViewer/cadviewer-testapp-react-01), [Apache CADViewer - cadviewer-script-library](https://github.com/CADViewer/cadviewer-script-library), and many other platform implementations. 

9: See [Business Extensions to Handlers](https://cadviewer.com/cadviewertechdocs/handlers_business/) and [CADViewer RESTFUL API](https://cadviewer.com/cadviewertechdocs/rest_api/) to extend the back-end with a customExtension for reading of Blobs/internal datastructure, etc. 


**NOTE:** Make sure the converter version number in CADViwer_config.json match the converters you install, and change any paths settings to correspond to your install folders.  

**NOTE:** If having issues with packages during installation, remove the ***nodes_modules*** folder and reinstall using: ***npm install --legacy-peer-deps***

**Run:** Run by using the *npm start* script or *node cadviewer_server* from the command line.





## Docker installation

The installation provides a template ***Dockerfile*** and ***docker-compose-yml***, which can be updated according to platform. When running under Docker the internal url is ***0.0.0.0***, and therefore the following fields in the ***CADViewer_config.json*** needs to be configured, note that ***callbackMethod_gatewayUrl*** is the external url when calling the container, which also needs to be updated appropriately:

```json
"ServerUrl" : "http://0.0.0.0:3000"
"fileLocationUrl" : "http://0.0.0.0:3000/converters/files/"
"callbackMethod_gatewayUrl_flag" : true
"callbackMethod_gatewayUrl" : "http://localhost:3000"
```
All these modifications are already in the file ***CADViewer_config-docker.json***, so therefore simply copy the Docker template file ***CADViewer_config-docker.json*** to ***CADViewer_config.json*** , and then execute:  ***docker compose up***.

The config file file ***CADViewer_config-windows-linux.json*** is a copy of the standard config file ***CADViewer_config.json***.




## CADViewer_config.json

The user controlled parameters in the configuration file ***[CADViewer_config.json](https://github.com/CADViewer/cadviewer-conversion-server/blob/master/CADViewer_config.json)*** has the following default settings:

```json
{
    "ServerPort" : 3000,
    "ServerUrl" : "http://localhost:3000",
    "https" : false,
    "ServerFrontEndUrl" : "",
    "ServerFrontEndUrlAsAllowedOriginOnly" : false,
    "cvjs_svgz_compress" : false,
    "cached_conversion" : false,
    "remainOnServer" : true,
    "cvjs_debug" : true,
    "autodetect_platform" : true,
    "platform" :"windows or linux",
    "autodetect_location" : true,
    "ServerLocation" : "/nodejs/cadviewer-conversion-server/",
    "ServerLocation_windows" : "/nodejs/cadviewer-conversion-server/",
    "ServerLocation_linux" : "/opt/cadviewer-conversion-server/",
    "fileLocation" : "/converters/files/",
    "fileLocationUrl" : "http://localhost:3000/converters/files/", 
    "converterLocation" : "/converters/ax2024/",
    "converterpathWin": "windows/",
    "converterpathLin": "linux/",
    "fontLocation" : "fonts/",
    "ax2024_executable" : "AX2025_W64_25_04_135a.exe",
    "ax2024_executable_windows" : "AX2025_W64_25_04_135a.exe",
    "ax2024_executable_linux" : "ax2023_L64_23_12_134",
    "licenseLocation" : "/converters/ax2024/",
    "xpathLocation" : "/converters/xpath/",
    "temp_print_folder" : "/temp_print",
    "callbackMethod_gatewayUrl_flag" : false,
    "callbackMethod_gatewayUrl" : "http://localhost:3000",
    "callbackMethod" : "getcadviewercontent",
	"dwgmergeLocation" : "/converters/dwgmerge2024",
	"dwgmerge2023_executable" : "DwgMerge2023_W32_23_01_01.exe",
	"dwgmerge2023_executable_windows" : "DwgMerge2023_W32_23_01_01.exe",
	"dwgmerge2023_executable_linux" : "DwgMerge_2023_L64_23_12_03",
	"linklistLocation" : "/converters/linklist2024/",
	"linklist2023_executable" : "LinkList_2024_W64_24_01_03.exe",
	"linklist2023_executable_windows" : "LinkList_2024_W64_24_01_03.exe",
	"linklist2023_executable_linux" : "LinkList_2024_L64_24_01_03",
    "custom_bearerAutentication" : "d5d483e8-2f8d-463e-cc01-f41a78b1d94c",
    "setup_mysqlHost" : true,
    "mysqlHost" : "localhost",
    "mysqlUsername" : "root",
    "mysqlPassword" : "",
    "mysqlDatabase" : "vizquery",
    "ContentSecurityPolicyReportOnly" : true,
    "ContentSecurityPolicy" : "default-src 'self'; font-src 'self'; img-src 'self' https://cadviewer.com data:; script-src 'self' 'nonce-INSERTNONCE'; style-src 'self' 'unsafe-inline'; frame-src 'self'",
    "fileLoad_PasswordAuthentication" : false,
    "fileLoad_UserName" : "myusername",
    "fileLoad_Password" : "mypassword",
    "contentLocationCheck" : true,
    "version" : "v9.64.3",
    "folderLocation" : "/nodejs/cadviewer-conversion-server/content/",
    "folderLocation_windows" : "/nodejs/cadviewer-conversion-server/content/",
    "folderLocation_linux" : "/opt/cadviewer-conversion-server/content/",
    "jwtSecretKey" : "a45f6g7h8j9k0l193skdlmdj",
    "bcryptSaltRounds" : 10,
    "userFolderMaximumFiles" : 10,
    "userFolderMaximumSizeInMB" : 100,
    "globalApplicationSasToken" : "?si=testread1&spr=https&sv=2022-11-02&sr=c&sig=xx",
    "globalBearerAutentication" : false,
    "globalBearerAutenticationToken" : "t-7614f875-8423-4f20-a674-d7cf3096290e"
}
```


## General Documentation 

-   [CADViewer Techdocs and Installation Guide](https://cadviewer.com/cadviewertechdocs)



## Updating CAD Converters

This repository should contain the latest converters, but in case you need to update any of the back-end converters please follow: 

* [Download **AutoXchange**](/download/) (and other converters), install (unzip) AX2025 in **/converters/ax2024/windows** or **/converters/ax2024/linux** or in the designated folder structure.

* Read the sections on installing and handling [Fonts](https://tailormade.com/ax2020techdocs/installation/fonts/) in [AutoXchange 2024 TechDocs](https://tailormade.com/ax2020techdocs/) and [TroubleShooting](https://tailormade.com/ax2020techdocs/troubleshooting/).

* Try out the samples and build your own application!
 
 

