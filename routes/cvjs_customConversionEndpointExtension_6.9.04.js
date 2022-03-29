var config = require('../CADViewer_config.json');
var callapiconversion = require('./callapiconversion_cv6.9.04.js');

const request = require('request');

var bearerautentication = config.custom_bearerAutentication;  // settings can be in general CADViewer config file, or loaded in here

exports.cvjs_customConversionEndpointExtension =  function (contentLocation, writeFile, outputFormat, parameters, tempFileName, res,  action, fileFormat){

    // USER CHANGES THIS CONTENT

    // var bearerautentication = "XX";  // from config file or set by user

    // contentLocation is passed over from REST API
    // writeFile is the location on server to write the file/blob
    // cvjs_standard_CV_AX_processing() is the call to continue the processing to convert and return to CADViewer
    
    var cadfilename = "";   // filename is passed over from cadviewer contentLocation, or pulled from user call
    var fileurl =  "";

    // we make branches depending on how the incoming stream is parsed  
    var branch = 1;   // simply request a URL and store in /converters/files/ folder and as server to convert  
    //  branch = 2   // sample to do a GET (or POST) with bearer authentication to get a blob and then save that to /converter/files/folder

  
    if (branch == 1){

    contentLocation = decodeURIComponent(contentLocation);
        
    if (config.cvjs_debug) console.log("fileFomat ="+fileFormat+"  outputFormat: "+outputFormat+" format from contentLocation string:"+contentLocation.indexOf("ftype="));

    var conversionFlag = true;
    var svgTest = false;  // test only
     // we need to do the following checks:  
     // if no ftype, then assuming dwg
     // if ftype, we have to find it and update the command string fileFormat string



    if (contentLocation.indexOf("ftype=")>0){

        fileFormat = "."+contentLocation.substring( contentLocation.indexOf("ftype")+6, contentLocation.indexOf("ftype")+10);
        if (fileFormat.indexOf("svg")>-1){
            conversionFlag = false;
            outputFormat = "svg";
        } 

        if (config.cvjs_debug) console.log("new fileFomat ="+fileFormat);

    }

    // location of intermediary file for conversion
    var newcontentLocation = config.fileLocation + tempFileName + fileFormat;			

      // add bearer tokents, etc to url
      if (contentLocation.indexOf("ftype=")>0)
        fileurl = contentLocation+"&access_token="+bearerautentication+"&download";
      else
        fileurl = contentLocation+"?access_token="+bearerautentication+"&download";

    // if we have SVG test then we test with CADViewer server SVG
    if (svgTest)
        fileurl = "https://onlinedemo.cadviewer.com/cadviewer_7_0/php/load-demo-file-npm-install.php?file=base_xref_json_Mar_15_H11_8.svg";



    if (config.cvjs_debug) console.log("fileurl="+fileurl+ " newcontentLocation="+newcontentLocation);

    var fs = require('fs');
    request(fileurl).pipe(fs.createWriteStream(newcontentLocation))
    .on('error', () => {
        if (config.cvjs_debug) console.log('ERROR - httprequest/createWriteStream does this location exist?: '+newcontentLocation);
    })
    .on('finish', () => {
        
        if (config.cvjs_debug) console.log("finished!");

        // NOTE: here contentLocation is replaced with with the temp name

        contentLocation = newcontentLocation;

      // if ftype then make two brances:
      // 1) move the folder for conversion
      // 2) move to folder for direct extraction

        if (conversionFlag){
            callapiconversion.cvjs_standard_CV_AX_processing(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action)
        }
        else{

            if (config.cvjs_debug) console.log(outputFormat+" "+contentLocation+" "+tempFileName)

            callapiconversion.SVG_callback(res, outputFormat, contentLocation, tempFileName);
        }


    });	    
  
  


    }


    if (branch == 2){



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
              // save the file or blob-body to the location of temp folder
  
              var newcontentLocation = config.fileLocation + tempFileName + fileFormat;			


              var buffer = Buffer.from(body);
              var fs = require('fs');    
              if (config.cvjs_debug) console.log("savefile temp dwg"+ newcontentLocation);
          
              fs.open(newcontentLocation, 'w', function(err, fd) {			
                fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                  if (err) {
                      if (config.cvjs_debug) console.log("error savefile: "+err);
                  }
                  else
                    fs.close(fd, function() {
                      if (config.cvjs_debug) console.log('file written');
        
    
                      // when saved call the CADServer to convert the drawing and send back to CADViewer
                      // from here standard processing 
    
                      // NOTE: here contentLocation is replaced with with the temp name

                      contentLoation = newcontentLocation
    
  
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
  

}




