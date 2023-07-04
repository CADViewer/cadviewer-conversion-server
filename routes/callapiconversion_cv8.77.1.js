var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;
var globalCounter = 0;

const httprequest = require('request');
var http = require('http');
var urlExists = require('url-exists');

var fs = require('fs');   // 8.19.1



var customendpointextension = require('./cvjs_customConversionEndpointExtension_cv8.77.1.js');

var customConversionEndpointExtension = false;

var contentLocationOrg = "";

var crypto = require("crypto");

var express = require('express'),
    router = express.Router();

    function get_file_format(contentLocation){

        var fileFormat = ".dwg";   // default to trigger conversions
        
        if (contentLocation.lastIndexOf(".")>-1)
            fileFormat =contentLocation.toLowerCase().substring(contentLocation.lastIndexOf("."));   

        if (cvjs_debug) console.log("get_file_format:  fileFormat "+fileFormat+"XXX");


        if (fileFormat == ".svg" || fileFormat == ".svgz" ){
            // do nothing
        }
        else{
            if (fileFormat.length > 4 || fileFormat.length < 3 ) // we assume dwg if endpoint does not have file format in call.
            fileFormat = ".dwg";
        }


        if (cvjs_debug) console.log("get_file_format:  fileFormat "+fileFormat);


        return fileFormat;
    }

    // 6.8.80

    function ax2024_callback(res, stderr, exitCode, outputFormat, contentLocation, callbackMethod, tempFileName){

        try{	

            // 6.8.89
            var remainOnServer = 0;
            if (config.remainOnServer) remainOnServer = 1;
            if (customConversionEndpointExtension) remainOnServer = 1; // we keep on server for first load of endpoint




			var CVJSresponse = "not populated";
            globalCounter++;
    
            if (config.cvjs_debug) console.log("ax2024_callback outputFormat:"+outputFormat+" exitcode:"+exitCode+"XX");
            
            if (outputFormat.toLowerCase().indexOf("svg")>-1){   // svg + svgz
        
                if (exitCode == undefined || exitCode == null|| exitCode == "") 
                    exitCode = 0;

                CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2023\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\", \"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?returnCadviewer=0&remainOnServer="+remainOnServer+"&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
        
                if (cvjs_debug) console.log(CVJSresponse);
                // send callback message and terminate
                res.send(CVJSresponse);
            }
            else{
                if (outputFormat.toLowerCase().indexOf("pdf")>-1){
        
                    // we need to change the location into a string with fileload
                    
                    var contentStream = config.ServerUrl+"/files?file="+config.fileLocationUrl.substring(config.ServerUrl.length)+tempFileName+"."+outputFormat
                

                    if (exitCode == undefined || exitCode == null|| exitCode == "") 
                        exitCode = 0;

                    CVJSresponse = "{\"completedAction\":\"pdf_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2023\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"file\",\"contentStreamData\":\""+contentStream+"\"}";
            //		var CVJSresponse = "{\"completedAction\":\"pdf_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"file\",\"contentStreamData\":\""+config.fileLocationUrl+tempFileName+"."+outputFormat+"\"}";
            //				String CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2017\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?remainOnServer=0&fileTag="+tempFileName+"&Type=svg\"}";
                    if (cvjs_debug) console.log(CVJSresponse);
                    // send callback message and terminate
                    res.send(CVJSresponse);
                }
            }
            if (config.cvjs_debug) console.log("finished - ax2024_callback"+CVJSresponse+" "+outputFormat);	
                
        
        }
        catch (e) {
            res.send("ax2024_callback:"+e);	
            if (config.cvjs_debug) console.log("ax2024_callback:"+e);
        }   
    };



    // 6.9.04
    function SVG_callback(res, stderr, exitCode, outputFormat, contentLocation, callbackMethod, tempFileName){
        

        try{	

            // 6.8.89
            var remainOnServer = 0;
            if (config.remainOnServer) remainOnServer = 1;
            if (customConversionEndpointExtension) remainOnServer = 1; // we keep on server for first load of endpoint
  
			var CVJSresponse = "not populated";
    
            if (config.cvjs_debug) console.log("SVG_callback outputFormat:"+outputFormat+" exitcode:"+exitCode+"XX");
                    
            if (exitCode == undefined || exitCode == null|| exitCode == "") 
                exitCode = 0;

            CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2023\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?returnCadviewer=0&remainOnServer="+remainOnServer+"&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
    
            if (cvjs_debug) console.log(CVJSresponse);
            // send callback message and terminate
            res.send(CVJSresponse);
            if (config.cvjs_debug) console.log("finished - ax2024_callback"+CVJSresponse+" "+outputFormat);	
                
        
        }
        catch (e) {
            res.send("SVG_callback:"+e);	
            if (config.cvjs_debug) console.log("SVG_callback:"+e);
        }   

    }


    exports.SVG_callback = function (res, outputFormat, contentLocation, tempFileName){

        // 8.33.1 
        var fullcallback = "";
        if (config.callbackMethod_gatewayUrl_flag){
            fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
        }
        else 
            fullcallback = config.ServerUrl+"/"+config.callbackMethod

        SVG_callback(res, "", "0", outputFormat, contentLocation, fullcallback, tempFileName);

    }



    // 6.8.83  - rest call to return CADViewer
    function CADViewer_callback(res, stderr, exitCode, outputFormat, contentLocation, callbackMethod, tempFileName){

        try{	
			var CVJSresponse = "not populated";
            globalCounter++;
    

          // 6.8.89
          var remainOnServer = 0;
          if (config.remainOnServer) remainOnServer = 1;
          if (customConversionEndpointExtension) remainOnServer = 1; // we keep on server for first load of endpoint



            if (config.cvjs_debug) console.log("CADViewer_callback  outputFormat:"+outputFormat+" exitcode:"+exitCode+"XX");
                    
            if (exitCode == undefined || exitCode == null || exitCode == "") 
                    exitCode = 0;

            CVJSresponse = "{\"completedAction\":\"cadviewer_display\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2023\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?returnCadviewer=1&remainOnServer="+remainOnServer+"&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
    
            if (cvjs_debug) console.log(CVJSresponse);
            // send callbacks message and terminate
            res.send(CVJSresponse);
            if (config.cvjs_debug) console.log("finished - CADViewer_callback"+CVJSresponse+" "+outputFormat);	 
        }
        catch (e) {
            res.send("CADViewer_callback:"+e);	
            if (config.cvjs_debug) console.log("CADViewer_callback:"+e);
        }
    };


    function LinkList2023_callback(res, outputFormat, contentLocation, callbackMethod, tempFileName, splityflag){
        try{	
    
			var CVJSresponse = "not populated";
            globalCounter++;

            console.log("LinkList2023_callback: "+splityflag+"  "+(!splityflag));

            // 6.8.89
            var remainOnServer = 0;
            if (config.remainOnServer) remainOnServer = 1;
            if (customConversionEndpointExtension) remainOnServer = 1; // we keep on server for first load of endpoint

    
            if (config.cvjs_debug) console.log("LinkList2023_callback  - global counter: "+globalCounter+" outputFormat:"+outputFormat);
                    
            var exitCode = 0;

            CVJSresponse = "{\"completedAction\":\"data_extraction\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"LinkList2023\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?remainOnServer="+remainOnServer+"&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";

            /*
            if (!splityflag){  // standard execution
                CVJSresponse = "{\"completedAction\":\"data_extraction\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"LinkList2023\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?remainOnServer="+remainOnServer+"&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
                console.log("non split");
            }
            else{   // splitter
                    // pull the splitter file
                // 7.0.26   - new
                //$splitterFile = true;
                // remainOnServer = true
                CVJSresponse = "{\"completedAction\":\"data_extraction\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"LinkList2023\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?remainOnServer="+1+"&splitterFile="+true+"}";
            }
            */

            
            if (cvjs_debug) console.log("Response:"+CVJSresponse);

            // send callback message and terminate
            res.send(CVJSresponse);
            if (config.cvjs_debug) console.log("finished - LinkLists2023_callback"+CVJSresponse+" "+outputFormat);	
                
        }
        catch (e) {
            res.send("LinkList2023_callback:"+e);	
            if (config.cvjs_debug) console.log("LinkList2023_callback:"+e);
        }
    }



    function cvjs_processLinkList(cvjsRequestJSON, res){

        try{
            var converter = cvjsRequestJSON.converter;
            var version = cvjsRequestJSON.version;
            var contentLocation = cvjsRequestJSON.contentLocation;
            var contentType = cvjsRequestJSON.contentType;
            var contentFormat = cvjsRequestJSON.contentFormat;
            var contentUsername = cvjsRequestJSON.contentUsername;
            var contentPassword = cvjsRequestJSON.contentPassword;
            var userLabel= cvjsRequestJSON.userLabel;
            var contentResponse= cvjsRequestJSON.contentResponse;
            var leaveStreamOnServer= cvjsRequestJSON.leaveStreamOnServer;

            var action = cvjsRequestJSON.action;
            // get parameters
            var paramName = new Array();
            var paramValue = new Array();
            var parameters = "";
            var outputFormat = "json";
            var splityflag = false;


            for (var i = 0; i < cvjsRequestJSON.parameters.length; i++) {
                paramName[i] = cvjsRequestJSON.parameters[i].paramName; //some game data
                paramValue[i] = cvjsRequestJSON.parameters[i].paramValue; //some game data
                
                    // we build the parameter list 
                    if (paramValue[i] == ""){ 
                        parameters = parameters +"-"+paramName[i]+" ";
                        if (paramName[i].toLowerCase() == "xml") 
                            outputFormat = "xml";
                        else 
                        if (paramName[i].toLowerCase() == "json") 
                            outputFormat = "json";
                        else
                        if (paramName[i].toLowerCase() == "splity") 
                            splityflag = true;
                    }
                    else{
                            parameters = parameters + "-" +paramName[i] + "=\"" +paramValue[i]+"\" ";
                    }
            }

            // build output
            contentLocation = decodeURI(contentLocation);
            contentLocation = contentLocation.replace(/%3A/g, ':');
            contentLocation = contentLocation.replace(/%2F/g, '/');
            contentLocation = contentLocation.replace(/%20/g, ' ');
            
            if (config.cvjs_debug) console.log("\n\r \n\r  decodeURL contentLocation: "+contentLocation+" Server URL: "+config.ServerUrl+" \n\r ");
        
            // we only replace ServerUrl = back-end match
            if (contentLocation.indexOf(config.ServerUrl)==0){
                // the ServerUrl is replaced with ServerLocation
                contentLocation = config.ServerLocation + contentLocation.substring(config.ServerUrl.length);
            }			


            if (config.cvjs_debug) console.log("cvjs_processLinkList: callapiconversion "+contentLocation+" "+config.ServerFrontEndUrl+"  "+config.ServerUrl);
            
            var randomInt = crypto.randomBytes(20).toString('hex');

                        
            var tempFileName = "F"+randomInt;
            var writeFile  = config.fileLocation + tempFileName + "." + outputFormat;           
            
            if (cvjs_debug) console.log("writeFile="+writeFile);
            if (cvjs_debug) console.log("BEFORE HTTP BRANCH "+contentLocation);

            
            // 6.2.37 - If http file, then it must be downloaded to server	
            if (contentLocation.indexOf("http:")>-1  || contentLocation.indexOf("https:")>-1){  // download file
                // download the file
                if (contentLocation.indexOf("http")>0)
                    contentLocation = contentLocation.substring(contentLocation.indexOf("http"));
                
                var fileFormat = ".none";	
                fileFormat = get_file_format(contentLocation);

                            
                var newcontentLocation = config.fileLocation + tempFileName + fileFormat;			
                var fs = require('fs');

                // 7.2.5  - add password check
                if (config.fileLoad_PasswordAuthentication == true){
                    // find the location of //
                    var location = contentLocation.indexOf("//")+1;
                    // split the contentlocation
                    var part1 = contentLocation.substring(0, location);
                    var part2 = contentLocation.substring(location+1);
                    // add username and password, and glue them back together
                    contentLocation = part1 + config.fileLoad_UserName + ':' + config.fileLoad_Password + '@'+part2;
                }



                var hostname = "";
                if (contentLocation.indexOf("//") > -1) {
                    hostname = contentLocation.split('/')[0]+"//"+contentLocation.split('/')[2];
                } else {
                    hostname = contentLocation.split('/')[0];
                }
    
                urlExists(hostname, function(err, exists) {
                    console.log(hostname+' '+exists); // true 
                    if (exists) 
                        httprequest(contentLocation).pipe(fs.createWriteStream(newcontentLocation))
                        .on('error', () => {
                            console.log('ERROR - httprequest/createWriteStream does this location exist?: '+contentLocation);
                        })
                        .on('finish', () => {
                                        
                            contentLocation = newcontentLocation;
                                        
                                // building the command line
                                var commandline = "";
        
                                if (!splityflag){  // standard processing
                                    commandline =config.linklistLocation + config.linklist2023_executable+" "+"-i=\""+contentLocation+"\" -o=\""+writeFile+"\" ";		
                                    commandline = commandline + parameters;		
                                }
                                else{  // splitter processing  - no output file specified
                                    commandline =config.linklistLocation + config.linklist2023_executable+" "+"-i=\""+contentLocation+"\" ";		
                                    commandline = commandline + parameters;		
                                }
                                
                                if (cvjs_debug) if (config.cvjs_debug) console.log("Commandline: "+commandline+"XXX");
                                
                                // execute linklist2022
                                    
                                const { exec } = require('child_process');
                                exec(commandline, (err, stdout, stderr) => {
                                if (err) {
                                    // node couldn't execute the command
                                    if (config.cvjs_debug) console.log("Error exec() "+err);
                                    
                                    // error handling, method response with error 
                                    
                                    return;
                                }
                                // the *entire* stdout and stderr (buffered)
                                if (config.cvjs_debug) console.log(`stdout-log: ${stdout}`);
                                if (config.cvjs_debug) console.log(`stderr-log: ${stderr}`);                
                                if (config.cvjs_debug) console.log("action= "+action);
        
        
                                // if splitfile, then copy splitter to temp folder
                                console.log("splityflag: "+splityflag);
        
        
        
                                    if (splityflag){    // 7.0.26
                                        // if splitterfile then inputFile file is contentLocation + splitter.json
                                        var inputFile = contentLocation.substring(0, contentLocation.lastIndexOf("."))+"_split_details.json";
                                    
                                        console.log("SPLIT inputfile "+inputFile);
                                        var fs = require('fs');						
                                        fs.copyFile( inputFile, writeFile, function(err, data) {
                                            if (err){
                                                if (config.cvjs_debug) console.log(err);
                                            }
                                            else
                                                if (config.cvjs_debug) console.log("file copied!");

                                                // 8.33.1 
                                                var fullcallback = "";
                                                if (config.callbackMethod_gatewayUrl_flag){
                                                    fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                                                }
                                                else 
                                                    fullcallback = config.ServerUrl+"/"+config.callbackMethod


                                                LinkList2023_callback(res, outputFormat, contentLocation, fullcallback, tempFileName, splityflag);	                                        
                                            });	
                                    }
                                    else {
                                        
                                        // 8.33.1 
                                        var fullcallback = "";
                                        if (config.callbackMethod_gatewayUrl_flag){
                                            fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                                        }
                                        else 
                                            fullcallback = config.ServerUrl+"/"+config.callbackMethod
                                                                                
                                        LinkList2023_callback(res, outputFormat, contentLocation, fullcallback, tempFileName, splityflag);	                                        
                                        
                                    }  // standard callback
                            });	    
                    });
                    else{
                        // cannot load file
                        console.log('location does not exist:'+contentLocation);                            
                        var CVJSresponse = "{\"completedAction\":\"data_extraction\",\"errorCode\":\"E"+1+"\",\"converter\":\"LinkList2023\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?remainOnServer="+remainOnServer+"&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
                        res.send(CVJSresponse);
                        return;
                    }			                                                            


                });


            }
            else{  // standard execution
            
                
                // building the command line
                var commandline = "";

                if (!splityflag){  // standard processing
                    commandline = config.linklistLocation + config.linklist2023_executable+" "+"-i=\""+contentLocation+"\" -o=\""+writeFile+"\" ";		
                    commandline = commandline = commandline + parameters;		
                }
                else{  // splitter processing  - no output file specified
                    commandline = config.linklistLocation + config.linklist2023_executable+" "+"-i=\""+contentLocation+"\" ";		
                    commandline = commandline + parameters;		
                }
                        
                if (cvjs_debug) if (config.cvjs_debug) console.log("commandline "+commandline+"XXX");
                




                // execute linklist2022
                    
                const { exec } = require('child_process');
                exec(commandline, (err, stdout, stderr) => {
                  if (err) {
                    // node couldn't execute the command
                    if (config.cvjs_debug) console.log("Error exec() "+err);
                    
                    // error handling, method response with error 
                    
                    return;
                  }
                  
                  // the *entire* stdout and stderr (buffered)
                  if (config.cvjs_debug) console.log(`stdout-log: ${stdout}`);
                  if (config.cvjs_debug) console.log(`stderr-log: ${stderr}`);
                  
                  if (config.cvjs_debug) console.log("action= "+action);


                    // if splitfile, then copy splitter to temp folder
                    console.log("splityflag: "+splityflag);



                    if (splityflag){    // 7.0.26
                        // if splitterfile then inputFile file is contentLocation + splitter.json
                        var inputFile = contentLocation.substring(0, contentLocation.lastIndexOf("."))+"_split_details.json";
                    
                        console.log("SPLIT inputfile "+inputFile);
                        var fs = require('fs');						
                        fs.copyFile( inputFile, writeFile, function(err, data) {
                            if (err){
                                if (config.cvjs_debug) console.log(err);
                            }
                            else
                                if (config.cvjs_debug) console.log("file copied!");

                                // 8.33.1 
                                var fullcallback = "";
                                if (config.callbackMethod_gatewayUrl_flag){
                                    fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                                }
                                else 
                                    fullcallback = config.ServerUrl+"/"+config.callbackMethod


                                LinkList2023_callback(res, outputFormat, contentLocation, fullcallback, tempFileName, splityflag);	                                        
                            });	
                    }
                    else{   // standard callback


                            // 8.33.1 
                            var fullcallback = "";
                            if (config.callbackMethod_gatewayUrl_flag){
                                fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                            }
                            else 
                                fullcallback = config.ServerUrl+"/"+config.callbackMethod


                        LinkList2023_callback(res, outputFormat, contentLocation, fullcallback, tempFileName, splityflag);	                                        
                    }

//                        LinkList2023_callback(res, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName, splityflag);	  
                
                });	

            } 

            // dev res.send(" 6.5.15 converter   "+converter+" "+contentLocation+" "+parameters+" writeFile:"+writeFile);	
        }
        catch (e) {
            res.send("processLinkList_callback:"+e);	
            if (config.cvjs_debug) console.log("LinkList2023_callback:"+e);
        }
    
    };



    function cvjs_buildcommandline_and_execute(outputFormat,contentLocation, parameters, res, writeFile, action, tempFileName){

        // building the command line
        var commandline = config.converterLocation + config.ax2024_executable+" "+"-i=\""+contentLocation+"\" -o=\""+writeFile+"\" ";		
        commandline = commandline + parameters;		
        if (parameters.indexOf("lpath")>-1){}
        else
            commandline = commandline + "-lpath=\""+config.licenseLocation+"\" ";
        
        if (parameters.indexOf("xpath")>-1){}
        else
            commandline = commandline + "-xpath=\""+contentLocation.substring(0, contentLocation.lastIndexOf("/")+1)+"\" ";
        

        if (parameters.indexOf("fpath")>-1){}
        else
            commandline = commandline + "-fpath=\""+config.fontLocation+"\" ";
        
        if (cvjs_debug) console.log("callapiconversion commandline:"+commandline+"XXX");
        
        // execute ax2020 - ax2023
            
        const { exec } = require('child_process');
        exec(commandline, (err, stdout, stderr) => {
            
            if (err) {
            // node couldn't execute the command
            if (config.cvjs_debug) console.log("Error exec() "+err);
                // error handling, method response with error 
                //return;
            }
            
            // the *entire* stdout and stderr (buffered)
            if (config.cvjs_debug) console.log(`stdout-log: ${stdout}`);
            if (config.cvjs_debug) console.log(`stderr-log: ${stderr}`);
            if (config.cvjs_debug) console.log("action= "+action);

        
            // if  conversion, svg_display, pdf_display  
            if (action == "conversion" || action == "svg_creation" || action == "pdf_creation"){


                // 8.33.1 
                var fullcallback = "";
                if (config.callbackMethod_gatewayUrl_flag){
                    fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                }
                else 
                    fullcallback = config.ServerUrl+"/"+config.callbackMethod



                // callback for custom creation with file ?
                ax2024_callback(res, stderr, err, outputFormat, contentLocation, fullcallback, tempFileName);	  
            }
            // if cadviewer                            
            if (action == "cadviewer_display"){
                // callback for custom creation with file ?
                // 8.33.1 
                var fullcallback = "";
                if (config.callbackMethod_gatewayUrl_flag){
                    fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                }
                else 
                    fullcallback = config.ServerUrl+"/"+config.callbackMethod


                CADViewer_callback(res, stderr, err, outputFormat, contentLocation, fullcallback, tempFileName);	  
            }
                        
        });	

    }


    function clean_contentLocation(contentLocation){
        // we assume either 
        // 1: http address on this server or
        // 2: full path on this server
        // first we url decode 
        contentLocation = decodeURI(contentLocation);
        contentLocation = contentLocation.replace(/%3A/g, ':');
        contentLocation = contentLocation.replace(/%2F/g, '/');
        contentLocation = contentLocation.replace(/%20/g, ' ');

        return(contentLocation);

    }

    function cvjs_returnIfSVGhttp(contentLocation, tempFileName, res){   // 8.37.1

            // 6.2.69 
            // if it is an SVG on the server then we simply echo it back up
            if (contentLocation.indexOf("http:")==-1  && contentLocation.indexOf("https:")==-1){
                var fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".svg");
                if (cvjs_debug) console.log("fileFormatFlag: "+fileFormatFlag);
                var fileFormat = ".none";			
    
                if (fileFormatFlag>-1){   // we have svg
                    fileFormat = ".svg";
    
                    // 6.4.21
                    var fs = require('fs');						
                    fs.copyFile( contentLocation, config.fileLocation +tempFileName+".svg", function(err, data) {
                        if (err){
                            if (config.cvjs_debug) console.log(err);
                        }
                        else
                            if (config.cvjs_debug) console.log("file copied!");
                    });	
    
                    // if a http location read in directly, we do not attempt to delete

                    // 8.33.1 
                    var fullcallback = "";
                    if (config.callbackMethod_gatewayUrl_flag){
                        fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                    }
                    else 
                        fullcallback = config.ServerUrl+"/"+config.callbackMethod

                    var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+fullcallback+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
                    if (config.cvjs_debug) console.log("response svg: "+CVJSresponse);
                    // send callback message and terminate
                    res.send(CVJSresponse);
                    return true;
                }
            }
            
            return false;
    }


    function cvjs_getOutputFormat(cvjsRequestJSON, paramName, paramValue){

        for (var i = 0; i < cvjsRequestJSON.parameters.length; i++) {
            if (paramName[i] == "fpath"){
                // do nothing   
            }
            else{
                if (paramName[i]=="f" ){
                    if (paramValue[i].indexOf("svg")>-1 && config.cvjs_svgz_compress){   // svgz compression
                        paramValue[i] = "svgz";
                        outputFormat = "svgz";
                    }
                    else
                        outputFormat = paramValue[i];        
                } 
            }
        }
        return outputFormat;
    }


    // GLOBAL VALUES  8.66.1
    var cvjs_comparehttpflag = false;
    var cvjs_comparehttp_orglocation = "";
    var cvjs_comparehttp_serverlocation = "";


    function cvjs_buildParametersList(cvjsRequestJSON, paramName, paramValue){

        var parameters = "";
        cvjs_comparehttpflag = false;

        for (var i = 0; i < cvjsRequestJSON.parameters.length; i++) {
            // get rid of fpath when calling from CV  6.8.64
            if (paramName[i] == "fpath"){
                // do nothing   
            }
            else{
                if (paramName[i]=="f" ){
                    if (paramValue[i].indexOf("svg")>-1 && config.cvjs_svgz_compress){   // svgz compression
                        paramValue[i] = "svgz";
                        outputFormat = "svgz";
                    }
                    else
                        outputFormat = paramValue[i];        
                } 
                // we build the parameter list 
                if (paramValue[i] == ""){ 
                    parameters = parameters +"-"+paramName[i]+" ";
                }
                else{
                    if (paramName[i].indexOf("compare")==0){    // we need to treat parameter as -i=    // 7.9.18

        		        if (cvjs_debug) console.log("COMPARE: active param="+i+" value="+paramValue[i]);              

                        //8.66.1
                        if (paramValue[i].indexOf(config.ServerUrl)==0){
                            // the ServerUrl is replaced with ServerLocation
                            paramValue[i] = config.ServerLocation + paramValue[i].substring(config.ServerUrl.length);
                            if (cvjs_debug) console.log("COMPARE: afterparamValue[i].indexOf(config.ServerUrl)==0 "+ paramValue[i]);              


                        }else{ // 8.64.3
                            if (paramValue[i].indexOf(config.ServerFrontEndUrl)==0){
                                // the ServerUrl is replaced with ServerLocation
                                paramValue[i] = config.ServerLocation + paramValue[i].substring(config.ServerFrontEndUrl.length);
                                if (cvjs_debug) console.log("COMPARE: afterparamValue[i].indexOf(config.ServerFrontEndUrl)==0 "+ paramValue[i]);              
                            }
                            else{
                                    // 8.66.1 
                                if (paramValue[i].indexOf("http")==0){

                                    cvjs_comparehttpflag = true;
                                    var randomInt = crypto.randomBytes(20).toString('hex');
                                    var tempFileName = "C"+randomInt;
                                    var outputFormat = "dwg";
                                    if (paramValue[i].lastIndexOf(".")>-1)
                                        outputFormat = paramValue[i].substring(paramValue[i].lastIndexOf(".")+1);
                                    cvjs_comparehttp_serverlocation= config.ServerLocation+"converters/files/"+tempFileName+"."+outputFormat;
                                    cvjs_comparehttp_orglocation = paramValue[i];                                
                                    paramValue[i] = cvjs_comparehttp_serverlocation;

                                }
                                else{
                                    if (cvjs_debug) console.log("COMPARE: standard case, do nothing!:"+paramValue[i]);              
                                }

                            }


                        }			
                    }
                    
                    parameters = parameters + "-" +paramName[i] + "=\"" +paramValue[i]+"\" ";
                    // if (paramName[i]=="layout" ){ } ....

                }
                    
            }
            if (cvjs_debug) console.log("END of loop "+paramName[i]+"  "+paramValue[i]);    
        }
        return parameters;
    }


    function  cvjs_downloadCADfromhttp_and_execute(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action){

        // download the file
        if (contentLocation.indexOf("http")>0)
            contentLocation = contentLocation.substring(contentLocation.indexOf("http"));
        
        var fileFormat = ".none";	
        fileFormat = get_file_format(contentLocation);

        var newcontentLocation = config.fileLocation + tempFileName + fileFormat;			
        var fs = require('fs');

        if (config.cvjs_debug) console.log("config.fileLoad_PasswordAuthentication: "+ config.fileLoad_PasswordAuthentication);

        // 7.2.5  - add password check
        if (config.fileLoad_PasswordAuthentication == true){
            // find the location of //
            var location = contentLocation.indexOf("//")+2;
            // split the contentlocation
            var part1 = contentLocation.substring(0, location);
            var part2 = contentLocation.substring(location);
            // add username and password, and glue them back together
            contentLocation = part1 + config.fileLoad_UserName + ':' + config.fileLoad_Password + '@'+part2;

            if (config.cvjs_debug) {
                console.log("");
                console.log("username/password contentLocation:"+contentLocation);
                console.log("");
            }            
        }

        if (config.cvjs_debug) console.log("here..");

        try{



            var hostname = "";
            if (contentLocation.indexOf("//") > -1) {
                hostname = contentLocation.split('/')[0]+"//"+contentLocation.split('/')[2];
            } else {
                hostname = contentLocation.split('/')[0];
            }

            urlExists(hostname, function(err, exists) {
                console.log(hostname+' '+exists); // true 

                if (exists)
                    httprequest(contentLocation).pipe(fs.createWriteStream(newcontentLocation))
                    .on('error', () => {

                        // 8.33.1 
                        var fullcallback = "";
                        if (config.callbackMethod_gatewayUrl_flag){
                            fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                        }
                        else 
                            fullcallback = config.ServerUrl+"/"+config.callbackMethod


                        console.log('ERROR httprequest('+contentLocation+")");
                        var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+fullcallback+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
                        res.send(CVJSresponse);
                        return;
            
                    })
                    .on('finish', () => {
                                    
                        contentLocation = newcontentLocation;
                        // if SVG we simply tell the front to pick it up the file back up from its new location
                        if ( fileFormat == ".svg"){

                            
                            // 8.33.1 
                            var fullcallback = "";
                            if (config.callbackMethod_gatewayUrl_flag){
                                fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                            }
                            else 
                                fullcallback = config.ServerUrl+"/"+config.callbackMethod

                            var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+fullcallback+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
            
                            if (config.cvjs_debug) console.log(CVJSresponse);
                            // send callback message and terminate
                            res.send(CVJSresponse);
                            return;
                        }          
            
                        cvjs_buildcommandline_and_execute(outputFormat,contentLocation, parameters, res, writeFile, action, tempFileName);
                    });	
                else{
                    console.log('location does not exist:'+contentLocation);

                    // 8.33.1 
                    var fullcallback = "";
                    if (config.callbackMethod_gatewayUrl_flag){
                        fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                    }
                    else 
                        fullcallback = config.ServerUrl+"/"+config.callbackMethod

                    var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+fullcallback+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
                    res.send(CVJSresponse);
                    return;
        
                }		

            });

            /*
            var site = http.request({port: 80, host: contentLocation, method : 'PUT'});
            site.on('error', function(err) {
                console.debug('ERROR unable to connect to:' + contentLocation); 
                var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+1+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+config.ServerUrl+"/"+config.callbackMethod+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
                res.send(CVJSresponse);
                return;
            });
            */
    

        }
        catch(err){
            console.log('ERROR httprequest('+contentLocation+"):"+err);

            // 8.33.1 
            var fullcallback = "";
            if (config.callbackMethod_gatewayUrl_flag){
                fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
            }
            else 
                fullcallback = config.ServerUrl+"/"+config.callbackMethod

            var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+fullcallback+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
            res.send(CVJSresponse);
            return;
            
        }


    }                                


    function cvjs_processConversion_pdf_svg_cadviewerdisplay(cvjsRequestJSON, res, action){

        // 
        contentLocationOrg = cvjsRequestJSON.contentLocation;
        contentLocationOrg = clean_contentLocation(contentLocationOrg);
        console.log("after clean: "+contentLocationOrg);
        var contentLocation = cvjsRequestJSON.contentLocation;

        customConversionEndpointExtension = cvjsRequestJSON.customConversionEndpointExtension;
        if (customConversionEndpointExtension == undefined) 
            customConversionEndpointExtension = false;
        /*
        var converter = cvjsRequestJSON.converter;
        var version = cvjsRequestJSON.version;
        var contentType = cvjsRequestJSON.contentType;
        var contentFormat = cvjsRequestJSON.contentFormat;
        var contentUsername = cvjsRequestJSON.contentUsername;
        var contentPassword = cvjsRequestJSON.contentPassword;
        var userLabel= cvjsRequestJSON.userLabel;
        var contentResponse= cvjsRequestJSON.contentResponse;
        var leaveStreamOnServer= cvjsRequestJSON.leaveStreamOnServer;
        */

        if(cvjs_debug) console.log("customEndpointExtension="+customConversionEndpointExtension);
        if (cvjs_debug) console.log("CALLAPI contentLocation: "+cvjsRequestJSON.contentLocation+"  compress:"+config.cvjs_svgz_compress);

        var paramName = new Array();
        var paramValue = new Array();
        var outputFormat = "";
        var parameters = "";
        
        for (var i = 0; i < cvjsRequestJSON.parameters.length; i++) {
            paramName[i] = cvjsRequestJSON.parameters[i].paramName; //some param data
            paramValue[i] = cvjsRequestJSON.parameters[i].paramValue; //some parem data
        }

        outputFormat = cvjs_getOutputFormat(cvjsRequestJSON, paramName, paramValue);
        parameters = cvjs_buildParametersList(cvjsRequestJSON, paramName, paramValue);
        contentLocation = clean_contentLocation(contentLocation);
        var randomInt = crypto.randomBytes(20).toString('hex');
        var tempFileName = "F"+randomInt;
        var writeFile  = config.fileLocation + tempFileName + "." + outputFormat;
        
        var fileFormat = ".none";	
        fileFormat = get_file_format(contentLocation);

        var FileStamp = "none;"
        if (cvjsRequestJSON.fileStamp != undefined){
            FileStamp = cvjsRequestJSON.fileStamp;
        }



        /*  external https load test - block out
        contentLocation = "https://onlinedemo.cadviewer.com/cadviewer_6_5/content/drawings/dwg/Hospital 1.dwg";
        */

        if (config.cvjs_debug) console.log("\n\rcallapiconversion PRE: decodeURL contentLocation: "+contentLocation+" Server URL: "+config.ServerUrl+" \n\r ");
            
        
        // customConversionEndpointExtension =true;


        if (customConversionEndpointExtension){
            // custom end-point processing
            console.log("NOTE: customConversionEndpointExtension")
            //contentLocation = "xlbpc-I6-f01.dwg"
            
            customendpointextension.cvjs_customConversionEndpointExtension(contentLocation, writeFile, outputFormat, parameters, tempFileName, res,  action, fileFormat)

        }
        else{

            // 8.66.1
            if (cvjs_comparehttpflag){
    
                urlExists(cvjs_comparehttp_orglocation, function(err, exists) {
                    console.log("COMPARE urlExists: "+cvjs_comparehttp_orglocation+' '+exists+" "+cvjs_comparehttp_serverlocation); // true 
                    if (exists) 
                        httprequest(cvjs_comparehttp_orglocation).pipe(fs.createWriteStream(cvjs_comparehttp_serverlocation))
                        .on('error', () => {
                            console.log('ERROR - httprequest/createWriteStream does this location exist?: '+cvjs_comparehttp_orglocation+"  "+cvjs_comparehttp_serverlocation);
                        })
                        .on('finish', () => {
    
                            console.log('COMPARE file created! at'+cvjs_comparehttp_serverlocation);
    
                            // standard CADViewer processing
                            cvjs_standard_CV_AX_processing(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action, fileFormat, paramName, paramValue, FileStamp);  // 8.19.1
    
    
                        })
                    });
                                
            }
            else{
            // standard CADViewer processing
            cvjs_standard_CV_AX_processing(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action, fileFormat, paramName, paramValue, FileStamp);  // 8.19.1
            }
        }

    }


    function cvjs_standard_CV_AX_processing(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action, fileFormat, paramName, paramValue, FileStamp){

        // 6.8.65 we only substitute for the back-end, if front-end then user controlled
        if (contentLocation.indexOf(config.ServerUrl)==0){
            // the ServerUrl is replaced with ServerLocation
            contentLocation = config.ServerLocation + contentLocation.substring(config.ServerUrl.length);
        }			
        
        if (config.cvjs_debug) console.log("callapiconversion  contentLocation:"+contentLocation+" frontEnd:"+config.ServerFrontEndUrl+"  ServerUrl:"+config.ServerUrl);


        // echo back SVG file if http/https
        if (cvjs_returnIfSVGhttp(contentLocation, tempFileName, res)) return;
        
        // in case of pdf creation, we make temp dir + filename similar to php setup
        // 6.1.25 / 25
        if (action == "pdf_creation"){
            var randomInt = crypto.randomBytes(20).toString('hex');
            var writeFolder = config.fileLocation + "pdf/" + randomInt;
            var fs = require('fs');
            if (!fs.existsSync(writeFolder)){
                fs.mkdirSync(writeFolder);
            }
            var outputFName = contentLocation;
            
            if (outputFName.lastIndexOf("/")>0) outputFName = outputFName.substring(outputFName.lastIndexOf("/")+1);
            if (outputFName.lastIndexOf("\\")>0) outputFName = outputFName.substring(outputFName.lastIndexOf("\\")+1);
            outputFName = outputFName.substring(0, outputFName.indexOf("."));
            
            tempFileName = "pdf/" + randomInt +"/" + outputFName;
            writeFile  = config.fileLocation + tempFileName + "." + outputFormat;
        }
        
        // end 	
        if (cvjs_debug) console.log("writeFile="+writeFile);
        if (cvjs_debug) console.log("BEFORE HTTP BRANCH "+contentLocation);

        // 8.19.1  8.19.3
        if (cvjs_check_file_cache(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action, fileFormat, paramName, paramValue, FileStamp)){

            // send back the cache
            console.log("SVG pure callback cache");

            // 8.33.1 
            var fullcallback = "";
            if (config.callbackMethod_gatewayUrl_flag){
                fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
            }
            else 
                fullcallback = config.ServerUrl+"/"+config.callbackMethod

            SVG_callback(res, "", "", outputFormat, contentLocation, fullcallback, cvjs_returnfile_from_cache);	  

        }
        else{
            // 6.2.37 - If http file, then it must be downloaded to server	
            if (contentLocation.indexOf("http:")>-1  || contentLocation.indexOf("https:")>-1){  // download file
                cvjs_downloadCADfromhttp_and_execute(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action);                  
            }
            else{  // standard execution from CAD server repository
                // building the command line
                cvjs_buildcommandline_and_execute(outputFormat,contentLocation, parameters, res, writeFile, action, tempFileName);
            }
        }

    }     


    // 8.19.1

    var cvjs_returnfile_from_cache = "none";
    function cvjs_check_file_cache(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action, fileFormat, paramName, paramValue, FileStamp){

        console.log("config.cached_conversion:"+config.cached_conversion);

        // cache conversion disabled
        if (!config.cached_conversion) return false;


        var filename =  contentLocation.substring(contentLocation.lastIndexOf("/"));
        var jsonfilename = config.fileLocation+filename+".json";


        var callback = false;
        cvjs_returnfile_from_cache = "none";

        // 8.19.1
        console.log("B 1 manage cached files : "+jsonfilename);
        console.log("B 2 if datestamp, filename and conversion parameters match ,use preconverted copy")
        console.log("B 3  if not, then build commandline and execute, BUT make a new cached file content")
        console.log(tempFileName);
        console.log(writeFile);
        console.log(FileStamp);

        // If FileStamp is "none" , we try get the file-stamp!!!!!


        // try open jsonfilename
        try{

            // test 
            //jsonfilename = "c:/nodejs/cadviewer-conversion-server///reference-cache-file.json";


            /*
                                {
                                    "fullfilepath": "full file path",
                                    "filename": "filename",
                                    "filecreatestamp": "date1",
                                    "filechangestamp": "2023-01-31T08:30:25.597Z",
                                    "cachedfiles": [{
                                            "fileName": "F1- 533271c6c7ec58eda68a0f882.svgz",
                                            "filecreatestamp": "datef1",
                                            "parameters": [{
                                                "paramName": "f",
                                                "paramValue": "svg"
                                            }, {
                                                "paramName": "ak",
                                                "paramValue": "FWK_1"
                                            }, {
                                                "paramName": "ia",
                                                "paramValue": ""
                                            }, {
                                                "paramName": "extents",
                                                "paramValue": ""
                                            }, {
                                                "paramName": "layout",
                                                "paramValue": "Sheet1"
                                            }]
                                        },
                                        {
                                            "fileName": "Fab55b0ffbf5497e533271c6c7ec58eda68a0f882.svgz",
                                            "filecreatestamp": "2023-01-31T08:30:25.597Z",
                                            "parameters": [{
                                                "paramName": "f",
                                                "paramValue": "svg"
                                            }, {
                                                "paramName": "ak",
                                                "paramValue": "FWK_DEVICE_TYPE"
                                            }, {
                                                "paramName": "ia",
                                                "paramValue": ""
                                            }, {
                                                "paramName": "extents",
                                                "paramValue": ""
                                            }, {
                                                "paramName": "last",
                                                "paramValue": ""
                                            }]
                                        }
                                    ]
                                }

            */

            var data = "none";
            var cachefileexist = false;
            var JSONstructure;
            try {
                if (fs.existsSync(jsonfilename)) {

                    //file exists
                    data = fs.readFileSync(jsonfilename);
                    cachefileexist = true;
                    JSONstructure = JSON.parse(data);
                    console.log("FILE EXISTS: this is data:"+data);

                }
                else{
                    console.log("NO FILE:  no file, new structure");
                    cachefileexist = false;                
                    JSONstructure = new Object()
                    // new json structure
                    JSONstructure.fullfilepath = contentLocation;
                    JSONstructure.filename = filename;
                    JSONstructure.filecreatestamp = FileStamp;
                    JSONstructure.filechangestamp = FileStamp;
                    JSONstructure.cachedfiles = [];        
                }
            } catch(err2) {
                    console.error(err2);
                    cachefileexist = false;                
                    JSONstructure = new Object()
                    // new json structure
                    JSONstructure.fullfilepath = contentLocation;
                    JSONstructure.filename = filename;
                    JSONstructure.filecreatestamp = FileStamp;
                    JSONstructure.filechangestamp = FileStamp;
                    JSONstructure.cachedfiles = [];        
            }

            //console.log(JSONstructure.fullfilepath);
            //console.log(JSONstructure.filename);
            //console.log(JSONstructure.filecreatestamp);
            //console.log(JSONstructure.filechangestamp);
            var equalparameters = [false,false, false, false, false, false, false, false, false, false, false, false, false ];   // we assume OK until we 
            var continueflag = true;
            var myobject;
            var mynewobject;

            if (cachefileexist){

                for (var ii=0; ii<JSONstructure.cachedfiles.length; ii++){

                    if (continueflag){
                        equalparameters = [false,false, false, false, false, false, false, false, false, false, false, false, false ];
                        //console.log("cachedfiles "+ii+ "  l="+JSONstructure.cachedfiles.length);
                        myobject = JSONstructure.cachedfiles[ii];
                        //console.log("fileName:"+ myobject.fileName);
        //                console.log(" here "+JSONstructure.cachedfiles[i].fileName);
                        //console.log("filecreatestamp:"+myobject.filecreatestamp);
                        //console.log("before parameter loop")
                        mynewobject = myobject.parameters;                                     
                            for (var i=1; i<paramName.length; i++){
                                // f= is index 0
                                //console.log(i+" paramName_current:"+paramName[i]);
                                //console.log(i+" paramValue_current:"+paramValue[i]);    
    
                                for (var j=0; j<mynewobject.length; j++){
                                    if (mynewobject[j].paramName!="f"){
                                        //console.log(j+" paramName:"+mynewobject[j].paramName);
                                        //console.log(j+" paramValue:"+mynewobject[j].paramValue);                    
                                        if (paramName[i] == mynewobject[j].paramName){
                                            //console.log("paramName match!")
                                            if (paramValue[i] == mynewobject[j].paramValue){            
                                                console.log("paramname and Value match");
                                                console.log(i+ "  "+paramName[i]+ "   "+paramValue[i]);
                                                equalparameters[i] = true;
                                            }
                                        }
                                    }
                                }
                            }
        
                            var paramcheck = true;
                            var paramcheck2 = (mynewobject.length -1) == (paramName.length -1);
                            for (var k=1; k<paramName.length; k++){   // we do not check first index
                                //console.log(k+" "+equalparameters[k]);
                                if (!equalparameters[k]) paramcheck = false;
                            }
                             var paramcheck3 =  (FileStamp == JSONstructure.filechangestamp);
                            console.log("check="+FileStamp+"  "+JSONstructure.filechangestamp);
                            console.log("paramcheck1="+paramcheck);
                            console.log("paramcheck2="+paramcheck2+"   "+(mynewobject.length -1) + "   " + (paramName.length - 1));
                            console.log("paramcheck3="+paramcheck3);
                            
                            if (paramcheck && paramcheck2 && paramcheck3){
                                continueflag = false;
                                callback = true; 
                                cvjs_returnfile_from_cache = myobject.fileName;
                                if (cvjs_returnfile_from_cache.indexOf(".svg")>-1) 
                                    cvjs_returnfile_from_cache = cvjs_returnfile_from_cache.substring(0, cvjs_returnfile_from_cache.indexOf(".svg"))
                                console.log("paramcheck x 3 all clear cvjs_returnfile_from_cache="+cvjs_returnfile_from_cache);
                            }
                    }                                                                            
                }

            }   // end cachefile
            // if open, then read the json file
            // not open then directly click through to file-conversion. 
        }
        catch (e) {
            if (config.cvjs_debug) console.log("Error loadfile:"+e);
            callback = false;
            cvjs_returnfile_from_cache = "none";

        }

        if (callback == false){
            // the cache file must be updated with the current parameter settings
            var i = JSONstructure.cachedfiles.length;
            console.log("JSONstructure.cachedfiles.length="+i);
            JSONstructure.cachedfiles[i] = {};
            JSONstructure.cachedfiles[i].fileName = tempFileName;
            JSONstructure.cachedfiles[i].filecreatestamp = "date_f1";

            var myObject = [];
            for (var k=0; k<paramName.length; k++){   // we do not check first index
                console.log(k+" "+paramName[k]);
                myObject[k] = {};
                myObject[k].paramName = paramName[k];
                myObject[k].paramValue = paramValue[k];
            }
            JSONstructure.cachedfiles[i].parameters = myObject;

            console.log("myobject:"+JSON.stringify(myObject));
            console.log("the structure"+JSON.stringify(JSONstructure));
            console.log("paramName.length="+paramName.length);

            // stringify and save
            var savecontent = JSON.stringify(JSONstructure);
            fs.writeFile(jsonfilename, savecontent, function(err) {
                if(err) {
                    console.log("writeFile error:"+err);
                }
                console.log("The file was saved!");
            });     

        }


        return (callback);
//        return(false); //return (callback);
    }


    
    exports.cvjs_standard_CV_AX_processing =  function(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action, fileFormat){

        cvjs_standard_CV_AX_processing(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action, fileFormat)
    }






// loadredline post - non conversion drawings

router.get('/callapiconversion', (req, res) => {
	if (config.cvjs_debug) console.log("callapiconversion - direct call");	

	/*
	var cvjsRequest = req.body.request;	
	var cvjsRequestJSON = JSON.parse(cvjsRequest);
	var action = cvjsRequestJSON.action;
*/
	res.send("callapiconversion! - get call - no further action");
})








router.post('/callapiconversion', (req, res) => {

	try{
	
        // 7.1.16
        //var origin = req.headers.origin;   - we cannot get the headers.origin , so we only allow from config
        if (config.ServerFrontEndUrlAsAllowedOriginOnly == true) {
            res.setHeader('Access-Control-Allow-Origin', config.ServerFrontEndUrl);
            if (cvjs_debug) console.log('Access-Control-Allow-Origin :'+config.ServerFrontEndUrl)
        }
        else{
            res.setHeader('Access-Control-Allow-Origin', '*');
            if (cvjs_debug )console.log('Access-Control-Allow-Origin : *')
        }

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed	

        
		// get request:
		//if (config.cvjs_debug) console.log(" body: "+req.body);
		if (cvjs_debug) console.log("callapiconversion body.request: "+req.body.request);
		
		// CADViewer request 
		var cvjsRequest = req.body.request;	
		var cvjsRequestJSON = JSON.parse(cvjsRequest);
		var action = cvjsRequestJSON.action;
        
        if (cvjs_debug) console.log("callapiconversion action="+action);

        switch(action) {
            case "data_extraction":
                cvjs_processLinkList(cvjsRequestJSON, res);
                break;
            case "pdf_creation":
              // code block
              // break;
            case "svg_creation":
            // code block
              // break;
            case "conversion":
            // code block
                // break;
            case "cadviewer_display":
                // code block
                    // break;
            default:  // handle all for now
                cvjs_processConversion_pdf_svg_cadviewerdisplay(cvjsRequestJSON, res, action);
                // code block
          } 
			
	}
	catch (e) {
		res.send("callapiconversion"+e);	
		if (config.cvjs_debug) console.log(e);
	}
		
});

    module.exports = router;
    
    