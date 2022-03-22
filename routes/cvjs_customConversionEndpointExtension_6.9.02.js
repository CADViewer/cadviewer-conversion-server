var config = require('../CADViewer_config.json');
var callapiconversion = require('./callapiconversion_cv6.9.02.js');
var cvjs_debug = config.cvjs_debug;

const request = require('request');

var bearerautentication = config.custom_bearerAutentication;  // settings can be in general CADViewer config file, or loaded in here

exports.cvjs_customConversionEndpointExtension =  function (contentLocation, writeFile, outputFormat, parameters, tempFileName, res,  action, fileFormat){

    // USER CHANGES THIS CONTENT

    // var bearerautentication = "XX";  // from config file or set by user

    // contentLocation is passed over from REST API
    // writeFile is the location on server to write the file/blob
    // cvjs_standard_CV_AX_processing() is the call to continue the processing to convert and return to CADViewer
    var cadfilename = "";   // filename is passed over from cadviewer contentLocation, or pulled from user call

    
    fileurl =  contentLocation;

    // pull a file from a blob or something
    console.log("fileurl:"+fileurl+" Bearer:"+bearerautentication);

  
    var options = {
        url: fileurl,
        json: true,
        method: 'GET',
        Authorization: 'Bearer '+ bearerautentication,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/plain',
        }
      };
      
      var callback = (error, response, body) => {

        console.log("error:"+error);
        console.log("response:"+response);
        var myJSON = JSON.stringify(response); 
        console.log("response:"+myJSON);
        console.log("statuscode:"+response.statusCode);

        // type out body
        console.log("body:"+body+":body");
        var myJSON = JSON.stringify(body); 
        console.log("body json:"+myJSON+"XX");

        // NOTE:  if fileFormat of blob different from "dwg", then  substitute the writeFile, lastIndexOf  ".dwg" with new format. 

        try{
          // save the file or blob-body to the location of:  writeFile
          var buffer = Buffer.from(body);
          var fs = require('fs');    
          if (config.cvjs_debug) console.log("savefile"+ writeFile);
      
          fs.open(writeFile, 'w', function(err, fd) {			
            fs.write(fd, buffer, 0, buffer.length, null, function(err) {
              if (err) {
                  if (config.cvjs_debug) console.log("error savefile: "+err);
              }
              else
                fs.close(fd, function() {
                  if (config.cvjs_debug) console.log('file written');
    

                  // when saved call the CADServer to convert the drawing and send back to CADViewer
                  // from here standard processing 

                  // NOTE: here contentLocation can be replaced with CAD file-name, cadfilename, for filename to display in CADViewer




                  callapiconversion.cvjs_standard_CV_AX_processing(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action)
    
                })
            });
          });
        }

        catch(err){
          console.log("err cvjs_customConversionEndpointExtension:"+err);
        }

      }
      
      request(options, callback);
}
