
const express = require('express');
const cors = require('cors');
const app = express();
// Import aws-serverless-express
const awsServerlessExpress = require('aws-serverless-express');
const server = awsServerlessExpress.createServer(app);
const version = require('./libs/config').version;

const bodyParser = require('body-parser');

const os = require('os');

//
//var cors = require('cors');
//app.use(cors())


var config = require('./CADViewer_config.json');

// serve static files  - pull /app/ content from /cadviewer folder
app.use(express.static('cadviewer'))
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

const https = require('https');
/* HOW TO GENERATE A TEST SSL CERTIFICATE FOR HTTPS
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
*/
/*  NOTE - IF ON CHROME TO TEST - ALLOW INSECURE LOCALHOST IF NOT RUNNING ON HTTP HOST
chrome://flags/#allow-insecure-localhost
*/



// 6.5.09  - DLL load
//var ffi = require('ffi');
try{
    var callapiconversion = require("./routes/callapiconversion.js");
    var makesinglepagepdf = require("./routes/makesinglepagepdf.js");
    var copyfile = require("./routes/copyfile.js");
    var savefile = require("./routes/savefile.js");
    var mergeemail = require("./routes/mergeemail.js");
    var appendfile = require("./routes/appendfile.js");
    var mergedwg = require("./routes/mergedwg.js");
    var getCADViewerContent = require("./routes/getcadviewercontent.js");
    var returnpdfparams = require("./routes/returnpdfparams.js");
    var makethumbnails = require("./routes/makethumbnails.js");
    var temp_print = require("./routes/temp_print.js");
    var files = require("./routes/files.js");
    var loadfile = require("./routes/loadfile.js");
    var directload = require("./routes/directload.js");
    var directloadcadviewer = require("./routes/directloadcadviewer.js");

    var directload2 = require("./routes/directload2.js");
    var uploadfile = require("./routes/uploadfile.js");
    var saveredline = require("./routes/saveredline.js");
    var listdirectory = require("./routes/listdirectory.js");
    var listdirectoryredlines = require("./routes/listdirectoryredlines.js");
    var loadredline = require("./routes/loadredlines.js");
    var listdwgdirectory = require("./routes/listdwgdirectory.js");


}
catch(err){

    console.log("general route error:"+err);

}



var directload2 = require("./routes/directload2.js");
var uploadfile = require("./routes/uploadfile.js");
var saveredline = require("./routes/saveredline.js");
var listdirectory = require("./routes/listdirectory.js");
var listdirectoryredlines = require("./routes/listdirectoryredlines.js");
var loadredline = require("./routes/loadredlines.js");

var listdwgdirectory = require("./routes/listdwgdirectory.js");
var plans = require('./routes/plans.js');
var licences = require('./routes/licence.js');

var listdatabasedata ;
var authentification ;
var users;
var file_upload;

try{
    if (config.setup_mysqlHost){
        listdatabasedata = require("./routes/listdatabasedata.js");
        authentification = require("./routes/authentification.js");
        users = require("./routes/users.js");
        file_upload = require("./routes/file_upload.js");
    }
}
catch(db_err){

    console.log("database route error!"+db_err);

}





var cvjs_debug = config.cvjs_debug;

/*
"autodetect_platform" : true,
"platform" :"windows or linux",
"autodetect_location" : true,
*/
console.log("Platform: "+os.platform())

// autodetect platform
if (config.autodetect_platform) {
    config.platform = os.platform();
    if (config.platform == "win32")  config.platform = "windows";
}
if (os.platform() == "darwin"){
    config.platform = "linux";
}

// if autodetect location, all path are automatically created
if (config.autodetect_location){

    if (config.platform == "windows"){
        config.ServerLocation = __dirname+"/";

        const regex = /\\/g;
        config.ServerLocation =  config.ServerLocation.replace(regex, '/');

    }
    else {
        if (config.platform == "linux"){
            config.ServerLocation = __dirname+"/";
        }
        else{
            console.log("Abort! - we support Windows and Linux back-end!");
            process.exit();
        }

    }

    // If AutoDetect, we build all paths

    if (config.platform == "windows"){

        config.autoxchange_executable = config.autoxchange_executable_windows;
        config.linklist_executable = config.linklist_executable_windows;
        config.dwgmerge_executable = config.dwgmerge_executable_windows;

        // 9.2.1
        config.fontLocation = config.ServerLocation + config.converterLocation + config.fontLocation;


        config.converterLocation = config.ServerLocation + config.converterLocation + config.converterpathWin;
        config.linklistLocation = config.ServerLocation + config.linklistLocation + config.converterpathWin;
        config.dwgmergeLocation = config.ServerLocation + config.dwgmergeLocation + config.converterpathWin;

        config.licenseLocation = config.ServerLocation + config.licenseLocation + config.converterpathWin;
        config.folderLocation = config.folderLocation_windows;

    }
    else{   // linux
        config.autoxchange_executable = config.autoxchange_executable_linux;
        config.linklist_executable = config.linklist_executable_linux;
        config.dwgmerge_executable = config.dwgmerge_executable_linux;

        // 9.2.1
        config.fontLocation = config.ServerLocation + config.converterLocation + config.fontLocation;


        config.converterLocation = config.ServerLocation + config.converterLocation + config.converterpathLin;
        config.linklistLocation = config.ServerLocation + config.linklistLocation + config.converterpathLin;
        config.dwgmergeLocation = config.ServerLocation + config.dwgmergeLocation + config.converterpathLin;

        config.licenseLocation = config.ServerLocation + config.licenseLocation + config.converterpathLin;
        config.folderLocation = config.folderLocation_linux;

    }
    config.fileLocationUrl = config.ServerUrl + config.fileLocation;
    // 9.7.1
    config.fileLocation = config.ServerLocation + config.fileLocation;
    config.xpathLocation = config.ServerLocation + config.xpathLocation;

}


var globalCounter = 0;

console.log("Version: "+version)
console.log("ServerUrl: "+config.ServerUrl);
console.log("fileLocationUrl: "+config.fileLocationUrl);
console.log("ServerFrontEndUrl: "+config.ServerFrontEndUrl);
console.log("Allowed Origin: either ServerFrontEndUrlAsAllowedOrigin (true) or * (false): "+config.ServerFrontEndUrlAsAllowedOriginOnly);
console.log("Is https: "+config.https);
console.log("ServerLocation: "+config.ServerLocation);
console.log("Callback: "+config.callbackMethod);
console.log("Callback gateway flag: "+config.callbackMethod_gatewayUrl_flag);
console.log("Callback gateway url: "+config.callbackMethod_gatewayUrl);
console.log("svgz_compress: "+config.cvjs_svgz_compress);
console.log("cached_conversion: "+config.cached_conversion);
console.log("debug: "+config.cvjs_debug);
console.log("AX converter: "+config.autoxchange_executable);
console.log("LinkList converter: "+config.linklist_executable);
console.log("DwgMerge converter: "+config.dwgmerge_executable);
console.log("OS Type:"+os.type());
console.log("Release: "+os.release());
console.log("Platform (computed): "+os.platform());
console.log("autodetect_platform: "+config.autodetect_platform);
console.log("Platform (autodetect or from config): "+config.platform);
console.log("autodetect_location: "+config.autodetect_location);
console.log("ServerLocation (autodetect or from config): "+config.ServerLocation);
console.log("folderLocation: "+config.folderLocation);

console.log("Content-Security-Policy: "+config.ContentSecurityPolicy);
console.log("CSP report only: "+config.ContentSecurityPolicyReportOnly);
console.log("Username/Password on fileload: "+config.fileLoad_PasswordAuthentication);



if (true){


    //app.use(bodyParser.json()); // support json encoded bodies
    //app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    app.use((req, res, next) => {
        req.version = version;
        next();
    });

    app.use(bodyParser.json({limit: '99mb', extended: true}))
    app.use(bodyParser.urlencoded({limit: '99mb', extended: true, parameterLimit: 50000 }));


    app.use(function(req, res, next) {

        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        if (cvjs_debug) console.log(version+": incoming request: req.path:"+req.path);


        next();
    });


    // CADViewer  - handlers

    app.post('/mergeemail', mergeemail);
    app.post('/returnpdfparams', returnpdfparams);
    app.post('/loadredline', loadredline);
    app.post('/uploadfile', uploadfile);
    app.post('/makesinglepagepdf', makesinglepagepdf);
    app.post('/makethumbnails', makethumbnails);
    app.post('/copyfile', copyfile);
    app.post('/listdirectory', listdirectory);
    app.post('/listdirectoryredlines', listdirectoryredlines);
    app.post('/saveredline', saveredline);
    app.post('/savefile', savefile);
    app.post('/appendfile', appendfile);
    app.get('/getcadviewercontent', getCADViewerContent);
    app.get('/callapiconversion', callapiconversion);
    app.post('/callapiconversion', callapiconversion);
    app.post('/returnpdfparams', returnpdfparams);
    app.get('/temp_print', temp_print);
    app.get('/files', files);
    app.post('/mergedwg', mergedwg);
    app.get('/loadfile', loadfile);
    app.post('/loadfile', loadfile);

    app.get('/directloadcadviewer', directloadcadviewer);
    app.post('/directloadcadviewer', directloadcadviewer);

    app.get('/directload', directload);


    // 6.4.34  - loading of content for print Modal

    app.get('/app/*', (req, res) => {


        if (cvjs_debug) console.log("app/branch");

        try{
            var inputFile = req.path;
            inputFile = decodeURI(inputFile);
            inputFile = inputFile.replace(/%3A/g, ':');
            inputFile = inputFile.replace(/%2F/g, '/');
            inputFile = inputFile.replace(/%20/g, ' ');

            inputFile = config.ServerLocation + inputFile


            // 9.47.6      remove garbage
            inputFile = inputFile.replaceAll("//", "/");
            //inputFile = inputFile.replaceAll(":/", "://");


            var fs = require('fs');
            fs.readFile( inputFile, 'utf8', function(err, data) {
                if (err){
                    //throw err;
                    res.send("error - get /app/* "+err);  // no file
                    if (config.cvjs_debug) console.log(err);
                }
                else

                    res.send(data);
                // send string back up to request
            });
            //        res.send("flat  /app/* path:"+req.path);
        }
        catch(e){
            res.send("error - get /app/*");  // no file
            if (config.cvjs_debug) console.log("error - get /app/*"+e);
        }
    });


    // TEST CONTENT

    // test + direct load parameter
    // loadfile get
    app.get('/helloworld', function (req, res) {
        if (config.cvjs_debug) console.log("hello world");
        res.send("Hello World! "+req.version);
    });



    app.get('/favicon.ico', (req, res) => res.status(204));

    // LAST BRANCH
    // LOAD EVERYTHING UP!!

    app.use('/loadjsonpostfix', plans);
    app.use('/listdwgdirectory', listdwgdirectory);
    app.use('/licences', licences)
    app.use('/licenses', licences)

    try{

        if (config.setup_mysqlHost){
            app.use('/database', listdatabasedata);
            app.use('/auth', authentification);
            app.use('/users', users);
            app.use('/upload', file_upload);
        }


    }
    catch(db_auth_err){

        console.log("listdatabase/authentication error:"+db_auth_err);
    }




    app.get('/*', directload2);  // direct load all other


} // end false

exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
};


