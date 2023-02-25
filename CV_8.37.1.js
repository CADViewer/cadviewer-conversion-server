var version = "CADViewer Server v8.37.1";
const express = require('express');
const httprequest = require('request');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');
const os = require('os');

var config = require('./CADViewer_config.json');

// serve static files  - pull /app/ content from /cadviewer folder
app.use(express.static('cadviewer'))


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

var callapiconversion = require("./routes/callapiconversion_cv8.37.1.js");
var makesinglepagepdf = require("./routes/makesinglepagepdf_cv7.9.1.js");
var copyfile = require("./routes/copyfile_cv7.1.17.js");
var savefile = require("./routes/savefile_cv7.1.16.js");
var mergeemail = require("./routes/mergeemail_cv7.1.3.js");
var appendfile = require("./routes/appendfile_cv7.1.16.js");
var mergedwg = require("./routes/mergedwg_cv7.1.4.js");
var getCADViewerContent = require("./routes/getcadviewercontent_cv7.1.16.js");
var returnpdfparams = require("./routes/returnpdfparams_cv7.1.16.js");
var makethumbnails = require("./routes/makethumbnails_cv6.5.8.js");
var temp_print = require("./routes/temp_print_cv7.1.16.js");
var files = require("./routes/files_cv7.1.16.js");
var loadfile = require("./routes/loadfile_cv7.7.11.js");
var directload = require("./routes/directload_cv7.1.16.js");
var directloadcadviewer = require("./routes/directloadcadviewer_cv7.1.16.js");

var directload2 = require("./routes/directload2_cv7.6.25.js");
var uploadfile = require("./routes/uploadfile_cv6.8.83.js");
var saveredline = require("./routes/saveredline_cv7.7.11.js");
var listdirectory = require("./routes/listdirectory_cv7.6.1.js");
var listdirectoryredlines = require("./routes/listdirectoryredlines_cv7.6.1.js");
var loadredline = require("./routes/loadredlines_cv7.1.17.js");


var cvjs_debug = config.cvjs_debug;

var port = config.ServerPort;  // 3000  or 4000


var globalCounter = 0;

console.log("Version: "+version)
console.log("ServerUrl: "+config.ServerUrl);
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
console.log("AX converter: "+config.ax2023_executable);
console.log("LinkList converter: "+config.linklist2023_executable);
console.log("DwgMerge converter: "+config.dwgmerge2023_executable);
console.log("OS Type:"+os.type()); 
console.log("Release: "+os.release()); 
console.log("Platform: "+os.platform()); 
console.log("Content-Security-Policy: "+config.ContentSecurityPolicy); 
console.log("CSP report only: "+config.ContentSecurityPolicyReportOnly); 
console.log("Username/Password Authentication on fileload: "+config.fileLoad_PasswordAuthentication); 





var mysqlconnectflag = false;

if (mysqlconnectflag){

// mysql connect to DB 
var mysql = require('mysql');

var con = mysql.createConnection({
  host: config.mysqlHost,
  user: config.mysqlUsername,
  password: config.mysqlPassword
});

con.connect(function(err) {
  if (err) throw err;
  console.log("mySql - Connected!");
});


}



//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(bodyParser.json({limit: '99mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '99mb', extended: true, parameterLimit: 50000 }));


app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
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
	if (config.cvjs_debug) console.log("hello ");	
    res.send("hello world!");
});



app.get('/favicon.ico', (req, res) => res.status(204));

// LAST BRANCH
// LOAD EVERYTHING UP!!

 app.get('/*', directload2);  // direct load all other 




var host = config.ServerUrl.substring(0, config.ServerUrl.lastIndexOf(":"));
host = host.substring(host.lastIndexOf("/")+1);
console.log(host);


// ECHO SERVER LOCATION: set port and host from the config file. 

//console.log("config.https:"+config.https+"   "+(config.https == false));

if (config.https == false){   // http   - see config
    if (port == "")
    app.listen(host, () => console.log('CADViewer Server '+config.ServerUrl+' is listening on host: '+host+' and port:'+port+'!'));
else 
    app.listen(port, host, () => console.log('CADViewer Server '+config.ServerUrl+' is listening on host: '+host+' and port:'+port+'!'));

}
else{   // https  - see config
        const options = {
            key: fs.readFileSync('key.pem'),
            cert: fs.readFileSync('cert.pem')
        };

        https.createServer(options, app).listen(443);
        if (port == "")
            https.createServer(options, app).listen(host, () => console.log('CADViewer Server '+config.ServerUrl+' is listening on host: '+host+' and port:'+port+'!'));
        else 
            https.createServer(options, app).listen(port, host, () => console.log('CADViewer Server '+config.ServerUrl+' is listening on host: '+host+' and port:'+port+'!'));
}

