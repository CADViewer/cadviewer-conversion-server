# Installing CADViewer Conversion Server - Windows and Linux

The **_NodeJS CADViewer Conversion Server_** (nodejs/cadviewer-conversion-server/) is used in a multitude of CADViewer different implementations: _[Angular](https://github.com/CADViewer/cadviewer-testapp-angular-v02)_,_[ReactJS](https://github.com/CADViewer/cadviewer-testapp-react-01)_, _[Laravel](https://github.com/CADViewer/cadviewer-script-library-laragon-laravel-sample-01)_, _[Rails7](https://github.com/CADViewer/cadviewer-testapp-rails7-01)_ , _[VueJS](https://github.com/CADViewer/cadviewer-testapp-vue-01)_ and as an alternative server in the _[Apache / PHP installation](https://github.com/CADViewer/cadviewer-script-library)_.

The **_CADViewer Conversion Server_** can also be used as a **_RESTFUL API_** server for CAD conversions and data extraction, see: _[CADViewer RESTFUL API](https://github.com/CADViewer/CADViewer-REST-API-Conversion-Server)_

The repository contains a full setup including converters and NodeJS controlling script.

It contains all components to run on either a Windows server or a Linux Server.

**_NOTE:_** The CAD converters are of such as size that **_[Git LFS](https://git-lfs.com/)_** is used, therefore prior to making a **git pull**, you must first install Git LFS: **sudo apt-get install git-lfs** and **git lfs install** .

## This package contains

1: NodeJS script library for controlling CAD Conversions and communication with CADViewer - in its preferred folder structure

2: AutoXchange AX2025 Converter, LinkList2025 Converterand DWGMerge2025 Converter - in their preferred folder structure

3: All structures for file-conversion, rest-API calls, sample drawings, redlines, etc.

## This package does not contain

4: The converter folder structure contains a larger set of fonts, installed in /cadviewer/converters/autoxchange/fonts/, but a fuller set of fonts can be installed.

Read the sections on installing and handling [Fonts](https://tailormade.com/ax2020techdocs/installation/fonts/) in [AutoXchange 2024TechDocs](https://tailormade.com/ax2020techdocs/) and [TroubleShooting](https://tailormade.com/ax2020techdocs/troubleshooting/).

## How to Use

1. The **_CADViewer_config.json_** contains all settings for running under Windows and Linux.

2. In the **_CADViewer_config.json_** the default settings of the variable **_autodetect_platform_** is **_true_** and the variable **_autodetect_location_** is **_true_**. With these settings running **app** will automatically set up all folder paths for conversions when running on either Windows or Linux.

3. If a user sets **_autodetect_platform_** to **_false_** and the variable **_autodetect_location_** to **_false_**, all paths in **CADViewer_config.json** MUST correspond to the actual server setting.

4. The variable **_ServerUrl_** sets the URL of the server with its port, the default setup is **_http://localhost:3000_**.

5. When running on Linux, ensure the following:

   5A: Ensure the converter **_ax2023_L64_12_xx_yy_** has full chmod 777 permissions (or 755).

   5B: Ensure the folder with temporary files **_/converters/files_** has full read and write permissions.

6. Run by using the _npm start_ script or _node app_ from the command line.

7: The CAD converter [AutoXchange 2025](https://cadviewer.com/alldownloads/autoxchange), - and other converters -, needs to be installed and referenced through the configuration file. The converters typically are in the /cadviewer-conversion-server/converters/ folder structure and comes pre-installed with this package. If using **_autodetect\__** under **2.** above, then paths will be set up automatically

9: The [CADViewer](https://cadviewer.com/cadviewertechdocs) front-end can be found from our [download](https://cadviewer.com/download) resources, or installed directly from npm with: **npm i cadviewer**. Use the following online sample encapsulations from our [repository](https://github.com/CADViewer?tab=repositories) to run **_[CADViewer](https://github.com/CADViewer?tab=repositories)_**: for example [React CADViewer sample - cadviewer-testapp-react-01](https://github.com/CADViewer/cadviewer-testapp-react-01), [Apache CADViewer - cadviewer-script-library](https://github.com/CADViewer/cadviewer-script-library), and many other platform implementations.

9: See [Business Extensions to Handlers](https://cadviewer.com/cadviewertechdocs/handlers_business/) and [CADViewer RESTFUL API](https://cadviewer.com/cadviewertechdocs/rest_api/) to extend the back-end with a customExtension for reading of Blobs/internal datastructure, etc.

**NOTE:** Make sure the converter version number in CADViwer_config.json match the converters you install, and change any paths settings to correspond to your install folders.

**NOTE:** If having issues with packages during installation, remove the ***nodes_modules*** folder and reinstall using: ***npm install --legacy-peer-deps***

**Run:** Run by using the _npm start_ script or _node app_ from the command line.


## Interface Access

To access the CADViewer Conversion Server Interface, in the browser load:  ***http://localhost:3000/settings/***  with **Username/Password** as **admin/admin**. This gives access to the entire interface, where you can monitor conversions, cache, change the configuration dynamically, clear conversion cache, run the RestAPI directly, and load CADViewer up directly for file display.



## Docker installation

The installation provides a template **_Dockerfile_** and **_docker-compose-yml_**, which can be updated according to platform. When running under Docker the internal url is **_0.0.0.0_**, and therefore the following fields in the **_CADViewer_config.json_** needs to be configured, note that **_callbackMethod_gatewayUrl_** is the external url when calling the container, which also needs to be updated appropriately:

```json
"ServerUrl" : "http://0.0.0.0:3000"
"fileLocationUrl" : "http://0.0.0.0:3000/converters/files/"
"callbackMethod_gatewayUrl_flag" : true
"callbackMethod_gatewayUrl" : "http://localhost:3000"
```

All these modifications are already in the file **_CADViewer_config-docker.json_**, so therefore simply copy the Docker template file **_CADViewer_config-docker.json_** to **_CADViewer_config.json_** , and then execute: **_docker compose up_**.

The config file file **_CADViewer_config-windows-linux.json_** is a copy of the standard config file **_CADViewer_config.json_**.

## CADViewer_config.json

The user controlled parameters in the configuration file **_[CADViewer_config.json](https://github.com/CADViewer/cadviewer-conversion-server/blob/master/CADViewer_config.json)_** has the following default settings:

```json
{
  "ServerPort": 3000,
  "ServerUrl": "http://localhost:3000",
  "https": false,
  "ServerFrontEndUrl": "",
  "ServerFrontEndUrlAsAllowedOriginOnly": false,
  "cvjs_svgz_compress": false,
  "cached_conversion": false,
  "remainOnServer": true,
  "cvjs_debug": true,
  "autodetect_platform": true,
  "platform": "windows or linux",
  "autodetect_location": true,
  "ServerLocation": "/nodejs/cadviewer-conversion-server/",
  "fileLocation": "/converters/files/",
  "fileLocationUrl": "http://localhost:3000/converters/files/",
  "converterLocation": "/converters/autoxchange/",
  "converterpathWin": "windows/",
  "converterpathLin": "linux/",
  "fontLocation": "fonts/",
  "autoxchange_executable": "AX2025_W64_25_04_135a.exe",
  "autoxchange_executable_windows": "AX2025_W64_25_04_135a.exe",
  "autoxchange_executable_linux": "ax2023_L64_23_12_134",
  "licenseLocation": "/converters/autoxchange/",
  "xpathLocation": "/converters/xpath/",
  "temp_print_folder": "/temp_print",
  "callbackMethod_gatewayUrl_flag": false,
  "callbackMethod_gatewayUrl": "http://localhost:3000",
  "callbackMethod": "getcadviewercontent",
  "dwgmergeLocation": "/converters/dwgmerge",
  "dwgmerge_executable": "DwgMerge2023_W32_23_01_01.exe",
  "dwgmerge_executable_windows": "DwgMerge2023_W32_23_01_01.exe",
  "dwgmerge_executable_linux": "DwgMerge_2023_L64_23_12_03",
  "linklistLocation": "/converters/linklist/",
  "linklist_executable": "LinkList_2024_W64_24_01_03.exe",
  "linklist_executable_windows": "LinkList_2024_W64_24_01_03.exe",
  "linklist_executable_linux": "LinkList_2024_L64_24_01_03",
  "custom_bearerAutentication": "d5d483e8-2f8d-463e-cc01-f41a78b1d94c",
  "setup_mysqlHost": true,
  "mysqlHost": "localhost",
  "mysqlUsername": "root",
  "mysqlPassword": "",
  "mysqlDatabase": "vizquery",
  "ContentSecurityPolicyReportOnly": true,
  "ContentSecurityPolicy": "default-src 'self'; font-src 'self'; img-src 'self' https://cadviewer.com data:; script-src 'self' 'nonce-INSERTNONCE'; style-src 'self' 'unsafe-inline'; frame-src 'self'",
  "fileLoad_PasswordAuthentication": false,
  "fileLoad_UserName": "myusername",
  "fileLoad_Password": "mypassword",
  "contentLocationCheck": true,
  "version": "v9.64.3",
  "folderLocation": "/nodejs/cadviewer-conversion-server/content/",
  "jwtSecretKey": "a45f6g7h8j9k0l193skdlmdj",
  "bcryptSaltRounds": 10,
  "userFolderMaximumFiles": 10,
  "userFolderMaximumSizeInMB": 100,
  "globalApplicationSasToken": "?si=testread1&spr=https&sv=2022-11-02&sr=c&sig=xx",
  "globalBearerAutentication": false,
  "globalBearerAutenticationToken": "t-7614f875-8423-4f20-a674-d7cf3096290e"
}
```

## General Documentation

- [CADViewer Techdocs and Installation Guide](https://cadviewer.com/cadviewertechdocs)

## Updating CAD Converters

This repository should contain the latest converters, but in case you need to update any of the back-end converters please follow:

- [Download **AutoXchange**](/download/) (and other converters), install (unzip) AX2025 in **/converters/autoxchange/windows** or **/converters/autoxchange/linux** or in the designated folder structure.

- Read the sections on installing and handling [Fonts](https://tailormade.com/ax2020techdocs/installation/fonts/) in [AutoXchange 2024 TechDocs](https://tailormade.com/ax2020techdocs/) and [TroubleShooting](https://tailormade.com/ax2020techdocs/troubleshooting/).

- Try out the samples and build your own application!
