# Installing CADViewer NodeJS Conversion Server - Windows and Linux

The CADViewer NodeJS Conversion server (nodejs/cadviewer-conversion-server/) is used in six different implementations: **NodeJS**, **Angular**,**ReactJS**, **Laravel**, **Rails7** and **VueJS**. 

The repository contains a full setup including converters and NodeJS controlling script.

It contains all components to run on either a Windows server or a Linux Server.

*NOTE:* The CAD converters are of such as size that Git LFS is used, therefore prior to making a **git pull**, you must install Git LFS: **sudo apt-get install git-lfs** and **git lfs install** .


## This package contains

1: NodeJS script library for controlling CAD Conversions and communication with CADViewer  - in its preferred folder structure

2: AutoXchange AX2024 Converter, LinkList2024 Converterand DWGMerge2024 Converter - in their preferred folder structure

3: All structures for file-conversion, sample drawings, redlines, etc. 


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
 

7: The CAD converter [AutoXchange 2024](https://cadviewer.com/alldownloads/autoxchange), - and other converters -, needs to be installed and referenced through the configuration file. The converters typically are in the /cadviewer-conversion-server/converters/ folder structure. If using ***autodetect_*** under **2.** above, then paths will be set up automatically 

9: The [CADViewer](https://cadviewer.com/cadviewertechdocs) front-end can be found from our [download](https://cadviewer.com/download) resources, or installed directly from npm with: **npm i cadviewer**.

9: See [Business Extensions to Handlers](https://cadviewer.com/cadviewertechdocs/handlers_business/) and [CADViewer RESTFUL API](https://cadviewer.com/cadviewertechdocs/rest_api/) to extend the back-end with a customExtension for reading of Blobs/internal datastructure, etc. 


**NOTE:** Make sure the converter version number in CADViwer_config.json match the converters you install, and change any paths settings to correspond to your install folders.  

**Run:** Run by using the *npm start* script or *node cadviewer_server* from the command line.


## CADViewer_config.json

The user controlled parameters in the configuration file ***[CADViewer_config.json](https://github.com/CADViewer/cadviewer-conversion-server/blob/master/CADViewer_config.json)*** has the following default settings:

```json
{
    "ServerPort" : 3000,
    "ServerUrl" : "http://localhost:3000/",
    "https" : false,
    "ServerFrontEndUrl" : "",
    "ServerFrontEndUrlAsAllowedOriginOnly" : false,
    "cvjs_svgz_compress" : true,
    "cached_conversion" : false,
    "remainOnServer" : true,
    "cvjs_debug" : true,
    "autodetect_platform" : true,
    "platform" :"windows or linux",
    "autodetect_location" : true,
    "ServerLocation" : "c:/nodejs/cadviewer-conversion-server/",
    "ServerLocation_windows" : "c:/nodejs/cadviewer-conversion-server/",
    "ServerLocation_linux" : "/opt/cadviewer-conversion-server/",
    "fileLocation" : "/converters/files/",
    "fileLocationUrl" : "http://localhost:3005/converters/files/", 
    "converterLocation" : "/converters/ax2024/",
    "converterpathWin": "windows/",
    "converterpathLin": "linux/",
    "fontLocation" : "fonts/",
    "ax2024_executable" : "AX2024_W64_24_07_128.exe",
    "ax2024_executable_windows" : "AX2024_W64_24_07_128.exe",
    "ax2024_executable_linux" : "ax2023_L64_23_12_128",
    "licenseLocation" : "/converters/ax2024/",
    "xpathLocation" : "/converters/xpath/",
    "temp_print_folder" : "/temp_print",
    "callbackMethod_gatewayUrl_flag" : false,
    "callbackMethod_gatewayUrl" : "http://localhost:3000",
    "callbackMethod" : "getcadviewercontent",
    "dwgmergeLocation" : "/converters/dwgmerge2023",
    "dwgmerge2023_executable" : "DwgMerge2023_W32_23_01_01.exe",
    "dwgmerge2023_executable_windows" : "DwgMerge2023_W32_23_01_01.exe",
    "dwgmerge2023_executable_linux" : "DwgMerge2023_W32_23_01_01.exe",
    "linklistLocation" : "/converters/linklist2023/",
    "linklist2023_executable" : "LinkList_2023_W64_23_08_26.exe",
    "linklist2023_executable_windows" : "LinkList_2023_W64_23_08_26.exe",
    "linklist2023_executable_linux" : "LinkList_2023_W64_23_08_26.exe",
    "custom_bearerAutentication" : "d5d483e8-2f8d-463e-cc01-f41a78b1d94c",
    "custom_postFixServerToken" : "?mysasToken",
    "mysqlHost" : "host.docker.internal",
    "mysqlUsername" : "root",
    "mysqlPassword" : "root",
    "mysqlDatabase" : "visualquery",
    "ContentSecurityPolicyReportOnly" : true,
    "ContentSecurityPolicy" : "default-src 'self'; font-src 'self'; img-src 'self' https://cadviewer.com data:; script-src 'self' 'nonce-INSERTNONCE'; style-src 'self' 'unsafe-inline'; frame-src 'self'",
    "fileLoad_PasswordAuthentication" : false,
    "fileLoad_UserName" : "myusername",
    "fileLoad_Password" : "mypassword",
    "contentLocationCheck" : true,
    "version" : "v9.39.2",
    "folderLocation" : "/nodejs/cadviewer-conversion-server/content/",
    "jwtSecretKey" : "a45f6g7h8j9k0l193skdlmdj",
    "bcryptSaltRounds" : 10
}	
```



## General Documentation 

-   [CADViewer Techdocs and Installation Guide](https://cadviewer.com/cadviewertechdocs)



## Updating CAD Converters

This repository should contain the latest converters, but in case you need to update any of the back-end converters please follow: 

* [Download **AutoXchange**](/download/) (and other converters), install (unzip) AX2024 in **/converters/ax2024/windows** or **/converters/ax2024/linux** or in the designated folder structure.

* Read the sections on installing and handling [Fonts](https://tailormade.com/ax2020techdocs/installation/fonts/) in [AutoXchange 2024 TechDocs](https://tailormade.com/ax2020techdocs/) and [TroubleShooting](https://tailormade.com/ax2020techdocs/troubleshooting/).

* Try out the samples and build your own application!
 
 

