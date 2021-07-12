// Version 6.5.12
const express = require('express');
const httprequest = require('request');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');

var config = require('./CADViewer_config.json');

// 6.5.09  - DLL load
//var ffi = require('ffi');


var loadredline = require("./routes/loadredlines_cv6.5.10.js");
var uploadfile = require("./routes/uploadfile_cv6.5.8.js");
var makesinglepagepdf = require("./routes/makesinglepagepdf_cv6.5.8.js");
var makethumbnails = require("./routes/makethumbnails_cv6.5.8.js");
var copyfile = require("./routes/copyfile_cv6.5.10.js");
var listdirectory = require("./routes/listdirectory_cv6.5.9.js");
var listdirectoryredlines = require("./routes/listdirectoryredlines_cv6.5.10.js");
var saveredline = require("./routes/saveredline_cv6.5.10.js");
var savefile = require("./routes/savefile_cv6.5.10.js");
var appendfile = require("./routes/appendfile_cv6.5.10.js");
var getFile_09 = require("./routes/getFile_09_cv6.5.12.js");
var returnpdfparams = require("./routes/returnpdfparams_cv6.5.9.js");
var callapiconversion = require("./routes/callapiconversion_cv6.5.12.js");
var returnpdfparams = require("./routes/returnpdfparams_cv6.5.9.js");
var temp_print = require("./routes/temp_print_cv6.5.9.js");
var files = require("./routes/files_cv6.5.9.js");
var mergedwg = require("./routes/mergedwg_cv6.5.9.js");
var loadfile = require("./routes/loadfile_cv6.5.9.js");
var directload = require("./routes/directload_cv6.5.9.js");



var cvjs_debug = config.cvjs_debug;
var version = "CADViewer Server v6.5.10"

var globalCounter = 0;

console.log("Version: "+version)
console.log("ServerUrl: "+config.ServerUrl);
console.log("ServerFrontEndUrl: "+config.ServerFrontEndUrl);
console.log("ServerLocation: "+config.ServerLocation);
console.log("Callback: "+config.callbackMethod);
console.log("debug: "+config.cvjs_debug);
console.log("converter: "+config.ax2020_executable);


//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(bodyParser.json({limit: '99mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '99mb', extended: true, parameterLimit: 50000 }));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// CADViewer  - handlers

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
app.get('/getFile_09', getFile_09);
app.get('/callapiconversion', callapiconversion);
app.post('/callapiconversion', callapiconversion);
app.post('/returnpdfparams', returnpdfparams);
app.get('/temp_print', temp_print);
app.get('/files', files);
app.post('/mergedwg', mergedwg);
app.get('/loadfile', loadfile);
app.post('/loadfile', loadfile);
app.get('/directload', directload);





// 6.4.34  - loading of content for print Modal

app.get('/app/*', (req, res) => {

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

app.get('/converters/files/*', (req, res) => {

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
                res.send("error - get /content/files/* "+err);  // no file
                if (config.cvjs_debug) console.log(err);
            }
            else

                // if it is a svg we have to parse that...
                if (inputFile.indexOf(".svg")>-1){

                    var xmlheader = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>"
                    var xmllength =  xmlheader.length;
                    if (config.cvjs_debug) console.log("xml length "+xmllength);

                    if (data.indexOf(xmlheader) == 0) 
                        data = data.substring(xmllength)

                    res.header("Content-Type","image/svg+xml");
                    res.send(data);	

                }
                else{
                    // other files we just pass back
                    res.send(data);	
                }
                
            // send string back up to request
        });	
    }
    catch(e){
        res.send("error - get /content/files/*");  // no file
        if (config.cvjs_debug) console.log("error - get /content/files/*"+e);
    }      
});


// TEST CONTENT

// test + direct load parameter
// loadfile get
app.get('/helloworld', function (req, res) {
	if (config.cvjs_debug) console.log("hello ");	
    res.send("hello world!");
});



/**
app.get('/loadsvgz', function (req, res) {
    //res.send("hello svgz");

    var mime = require('mime');
 //   inputFile = config.ServerLocation + "/content/drawings/svg/1st.svg";
//    inputFile = config.ServerLocation + "/content/drawings/svg/lightning2a.txt";
    inputFile = config.ServerLocation + "/content/drawings/svg/f4.svgz";
	if (config.cvjs_debug) console.log("hello svgz "+inputFile);	
            
    var fs = require('fs');
    fs.readFile( inputFile, function(err, data) {
        if (err){
            //throw err;
            res.send("error - get /app/* "+err);  // no file
            if (config.cvjs_debug) console.log(err);
        }
        else{

        if (config.cvjs_debug) console.log("hello svgz: data=");	

        var zlib = require('zlib');
        zlib.gunzip(data, {chunkSize: 65536}, function (err, data) {

            var buf = new Buffer(data, 'utf-8'); 
            
            zlib.gzip(buf, function(_, result) { 
                res.setHeader('Content-Type', 'image/svg+xml');
                res.setHeader('Content-Encoding', 'gzip');
                res.send(result);   
            });
        });
    }        
    });	
});

*/
// TEST CONTENT



app.listen(3000, () => console.log('CADViewer Server is listening on port 3000!'))
//app.listen(3000, '127.0.0.1');

/**
app.listen(3000,'127.0.0.1',function(){
  if (config.cvjs_debug) console.log('Server running at http://127.0.1.1:3000/')
})
**/
