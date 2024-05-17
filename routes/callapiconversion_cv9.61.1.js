var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;
var globalCounter = 0;

const httprequest = require('request');
var http = require('http');
var urlExists = require('url-exists');

var fs = require('fs');   // 8.19.1

// 9.5.2
var response_serverUrl = "";

var customendpointextension = require('./cvjs_customConversionEndpointExtension_cv9.61.1.js');

var customConversionEndpointExtension = false;
var setPostFixServerToken = false;


var contentLocationOrg = "";

var crypto = require("crypto");

var express = require('express'),
    router = express.Router();

    function get_file_format(contentLocation){

        var fileFormat = ".dwg";   // default to trigger conversions
        
        if (contentLocation.lastIndexOf(".")>-1)
            fileFormat =contentLocation.toLowerCase().substring(contentLocation.lastIndexOf("."));   

        // postfixservertoken      9.39.2
        if (fileFormat.indexOf("?")>-1){
            fileFormat = fileFormat.substring(0, fileFormat.indexOf("?"));
        }


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
            
            // 9.61.1            
            // if we have a RAILS SERVER, THERE MAY BE " IN THE FILENAME, WE NEED TO replace wih %22
            contentLocationOrg =  contentLocationOrg.replace(/"/g, '%22');
            if (config.cvjs_debug) console.log("SVG_callback contentLocationOrg:"+contentLocationOrg+"XX");
                        
            
            if (outputFormat.toLowerCase().indexOf("svg")>-1){   // svg + svgz
        
                if (exitCode == undefined || exitCode == null|| exitCode == "") 
                    exitCode = 0;

                CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2024\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\", \"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?returnCadviewer=0&remainOnServer="+remainOnServer+"&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
        
                if (cvjs_debug) console.log(CVJSresponse);
                // send callback message and terminate
                res.send(CVJSresponse);
            }
            else{
                if (outputFormat.toLowerCase().indexOf("pdf")>-1){
        
                    var contentStream = "";
                    // we need to change the location into a string with fileload
                    if (cvjs_debug) console.log(" make file="+config.fileLocationUrl+"  "+config.ServerUrl);

                    // 9.7.1   -automated generation we need to modify - fileLocationUrl is "" originally concatnated with the location
                    if (config.fileLocationUrl.indexOf(config.ServerLocation) == 0){

                        if (cvjs_debug) console.log(" branch 1");

                        contentStream = config.ServerUrl+"/files?file="+config.fileLocationUrl.substring(config.ServerLocation.length)+tempFileName+"."+outputFormat


                    }else{
                        if (cvjs_debug) console.log(" branch 2");
                        contentStream = config.ServerUrl+"/files?file="+config.fileLocationUrl.substring(config.ServerUrl.length)+tempFileName+"."+outputFormat
                    }


                    
                
                    if (exitCode == undefined || exitCode == null|| exitCode == "") 
                        exitCode = 0;

                    CVJSresponse = "{\"completedAction\":\"pdf_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2024\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"file\",\"contentStreamData\":\""+contentStream+"\"}";
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


            // 9.61.1
            // if we have a RAILS SERVER, THERE MAY BE " IN THE FILENAME, WE NEED TO replace wih %22
            contentLocationOrg =  contentLocationOrg.replace(/"/g, '%22');
            if (config.cvjs_debug) console.log("SVG_callback contentLocationOrg:"+contentLocationOrg+"XX");


            CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2024\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?returnCadviewer=0&remainOnServer="+remainOnServer+"&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
    
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

        // 9.5.2

        if (config.callbackMethod_gatewayUrl_flag){
            fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
        }
        else 
            fullcallback = response_serverUrl+"/"+config.callbackMethod;

        SVG_callback(res, "", "0", outputFormat, contentLocation, fullcallback, tempFileName);

    }



    // 6.8.83  - rest call to return CADViewer
    function CADViewer_callback(res, stderr, exitCode, outputFormat, contentLocation, callbackMethod, tempFileName){

        try{	
			var CVJSresponse = "not populated";
            globalCounter++;
    

          // 6.8.89
          var remainOnServer = 0;
          if (config.remainOnServer == true) remainOnServer = 1;
          if (customConversionEndpointExtension) remainOnServer = 1; // we keep on server for first load of endpoint



            if (config.cvjs_debug) console.log("CADViewer_callback  outputFormat:"+outputFormat+" exitcode:"+exitCode+"XX");
                    
            if (exitCode == undefined || exitCode == null || exitCode == "") 
                    exitCode = 0;

            CVJSresponse = "{\"completedAction\":\"cadviewer_display\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2024\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?returnCadviewer=1&remainOnServer="+remainOnServer+"&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
    
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
        

            // 8.77.4
            var contentLocationCheck = true;
            if (config.contentLocationCheck != undefined) contentLocationCheck = config.contentLocationCheck;
            if (config.cvjs_debug) console.log(config.version+":  contentLocationCheck="+contentLocationCheck);


            // 6.8.65 we only substitute for the back-end, if front-end then user controlled
            if (contentLocation.indexOf(config.ServerUrl)==0   && contentLocationCheck){

            // we only replace ServerUrl = back-end match
            // if (contentLocation.indexOf(config.ServerUrl)==0){
                // the ServerUrl is replaced with ServerLocation
                contentLocation = config.ServerLocation + contentLocation.substring(config.ServerUrl.length);
            }			


            if (config.cvjs_debug) console.log("cvjs_processLinkList: callapiconversion "+contentLocation+" "+config.ServerFrontEndUrl+"  "+config.ServerUrl);
            
            var randomInt = crypto.randomBytes(20).toString('hex');

                        
            var tempFileName = "F"+randomInt;
            var writeFile  = config.fileLocation + tempFileName + "." + outputFormat;           
            
            if (cvjs_debug) console.log("writeFile="+writeFile);
            if (cvjs_debug) console.log("linklist BEFORE HTTP BRANCH "+contentLocation);

            
            // 6.2.37 - If http file, then it must be downloaded to server	
            if (contentLocation.indexOf("http:")>-1  || contentLocation.indexOf("https:")>-1){  // download file
                // download the file
                if (contentLocation.indexOf("http")>0)
                    contentLocation = contentLocation.substring(contentLocation.indexOf("http"));
                
                var fileFormat = ".none";	
                fileFormat = get_file_format(contentLocation);


                


                var newcontentLocation = config.fileLocation + tempFileName + fileFormat;			
                var fs = require('fs');


                if (cvjs_debug) console.log("newcontentlocation BEFORE HTTP BRANCH "+newcontentLocation);


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
                                                    fullcallback = response_serverUrl+"/"+config.callbackMethod;


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
                                            fullcallback = response_serverUrl+"/"+config.callbackMethod;
                                                                                
                                        LinkList2023_callback(res, outputFormat, contentLocation, fullcallback, tempFileName, splityflag);	                                        
                                        
                                    }  // standard callback
                            });	    
                    });
                    else{

                    // 8.77.5
                    var contentLocationCheck = true;
                    if (config.contentLocationCheck != undefined) contentLocationCheck = config.contentLocationCheck;
                    // if no content location check, we pass over the standard file load process


                    // 8.77.5
                    console.log(config.version+' 1 contentLocationCheck after UrlExits check:'+contentLocationCheck);

                    if (!contentLocationCheck){
                        // 8.77.5
                    
                        contentLocation = decodeURIComponent(contentLocation);
                        console.log('content location check false, we use :'+contentLocation);

                        try{


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
                                                        fullcallback = response_serverUrl+"/"+config.callbackMethod;
    
    
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
                                                fullcallback = response_serverUrl+"/"+config.callbackMethod;
                                                                                    
                                            LinkList2023_callback(res, outputFormat, contentLocation, fullcallback, tempFileName, splityflag);	                                        
                                            
                                        }  // standard callback
                                });	    
    
                            });
    
                            
                        }
                        catch(err_contentlocation){

                            // cannot load file
                            console.log('LinkList location does not exist:'+contentLocation);                            
                            var CVJSresponse = "{\"completedAction\":\"data_extraction\",\"errorCode\":\"E"+1+"\",\"converter\":\"LinkList2023\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?remainOnServer="+remainOnServer+"&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
                            res.send(CVJSresponse);
                            return;

                        }

                                        
                        /*
                        */


                        // 8.77.5
                    }
                    else{

                        // cannot load file
                        console.log('LinkList location does not exist:'+contentLocation);                            
                        var CVJSresponse = "{\"completedAction\":\"data_extraction\",\"errorCode\":\"E"+1+"\",\"converter\":\"LinkList2023\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?remainOnServer="+remainOnServer+"&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
                        res.send(CVJSresponse);
                        return;

                    }


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
                                    fullcallback = response_serverUrl+"/"+config.callbackMethod;


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
                                fullcallback = response_serverUrl+"/"+config.callbackMethod;


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

        var serverloc = config.ServerLocation;
        if (serverloc.indexOf(":")>-1) serverloc = serverloc.substring(serverloc.indexOf(":")+1);


        if (config.cvjs_debug) console.log("cvjs_buildcommandline_and_execute() "+contentLocation+" contentLocation.indexOf(config.ServerLocation)"+contentLocation.indexOf(serverloc)+"  "+serverloc+"  "+setPostFixServerToken);



        // 9.48.2 if we have a server path, and we have concatenated a SAS token, then we remove, because we are on our own server
        if ((contentLocation.indexOf(serverloc)>-1) && setPostFixServerToken){

            // 9.49.1

            if (contentLocation.indexOf(config.globalApplicationSasToken)>-1)
                contentLocation = contentLocation.substring(0, contentLocation.indexOf(config.globalApplicationSasToken));

            //contentLocation = contentLocationOrg;
            if (config.cvjs_debug) console.log("cvjs_buildcommandline_and_execute() : contentLocation:"+contentLocation);

        }
    
        // we strip out the 




        // 9.23.1

        if (contentLocation.toLowerCase().indexOf(".svg")>0 
            && ( contentLocation.toLowerCase().indexOf(".dwg")==-1 && contentLocation.toLowerCase().indexOf(".dxf")==-1 && contentLocation.toLowerCase().indexOf(".dwf")==-1)
            && ( contentLocation.toLowerCase().indexOf(".dgn")==-1 && contentLocation.toLowerCase().indexOf(".pcf")==-1 && contentLocation.toLowerCase().indexOf(".pdf")==-1)
            
            ){

                if (cvjs_debug) console.log("direct svg/svgz load "+contentLocation)

                // if  conversion, svg_display, pdf_display  
                if (action == "conversion" || action == "svg_creation" || action == "pdf_creation"){


                    // 8.33.1 
                    var fullcallback = "";
                    if (config.callbackMethod_gatewayUrl_flag){
                        fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                    }
                    else 
                        fullcallback = response_serverUrl+"/"+config.callbackMethod;

                        // 9.50.1
                    // we need to copy the file to the temp folder
                    var fs = require('fs');
                    fs.copyFile( contentLocation, writeFile, function(err, data) {
                        if (err){   
                            if (config.cvjs_debug) console.log(err);
                        }   
                        else                                                
                            if (config.cvjs_debug) console.log("file copied!");
                    });



                    // callback for custom creation with file ?
                    ax2024_callback(res, "none", "0", outputFormat, contentLocation, fullcallback, tempFileName);	  
                    return;

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
                        fullcallback = response_serverUrl+"/"+config.callbackMethod;
                    CADViewer_callback(res, "none", "0", outputFormat, contentLocation, fullcallback, tempFileName);	  
                    return;
                }


        }



        var commandline = config.converterLocation + config.ax2024_executable+" "+"-i=\""+contentLocation+"\" -o=\""+writeFile+"\" ";		
        commandline = commandline + parameters;		
        if (parameters.indexOf("lpath")>-1){}
        else
            commandline = commandline + "-lpath=\""+config.licenseLocation+"\" ";
        

        // 9.49.2
        if (config.cvjs_debug) console.log("XPATH contentLocation "+contentLocation+" contentLocationOrg:"+contentLocationOrg);

        // 9.49.2
        if (parameters.indexOf("xpath")>-1){
            // do nothing
            if (config.cvjs_debug) console.log("XPATH: do nothing xpath");
        }
        else{
            var xpathlocation = contentLocationOrg;
            console.log("xpathlocation"+xpathlocation+"xx xx"+config.ServerUrl);
            if (xpathlocation.indexOf(config.ServerUrl)>-1){
                if (config.cvjs_debug) console.log("XPATH xpathlocation 1:"+xpathlocation);
                xpathlocation = config.ServerLocation + xpathlocation.substring(config.ServerUrl.length);
            }
            else{
                // if localhost, serverUrl will default to 127.0.0.1, so we simply strip out the serverUrl
                if (xpathlocation.indexOf("http://localhost:"+config.ServerPort)>-1 || xpathlocation.indexOf("http://127.0.0.1:"+config.ServerPort)>-1){

                    var pos = 18+config.ServerPort.toString().length;

                    //console.log("XPATH: xpathlocation"+xpathlocation+"  "+config.ServerPort+" pos"+pos);
                    xpathlocation = config.ServerLocation + xpathlocation.substring(pos);

                    if (config.cvjs_debug) console.log("XPATH xpathlocation 2:"+xpathlocation);

                }
            }
            commandline = commandline + "-xpath=\""+xpathlocation.substring(0, xpathlocation.lastIndexOf("/")+1)+"\" ";

        }
        
        if (parameters.indexOf("fpath")>-1){}
        else
            commandline = commandline + "-fpath=\""+config.fontLocation+"\" ";
        
        if (cvjs_debug) console.log("callapiconversion commandline: "+commandline+"XXX");
        


        // execute ax2020 - AX2024
            
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
                    fullcallback = response_serverUrl+"/"+config.callbackMethod;



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
                    fullcallback = response_serverUrl+"/"+config.callbackMethod;


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

            // if it is an SVG on the server then we simply echo it back up

            //  how could this happen!!!
//            if (contentLocation.indexOf("http:")==-1  && contentLocation.indexOf("https:")==-1){

            // 9.47.14
            if (contentLocation.indexOf("http:")==-1  || contentLocation.indexOf("https:")==-1){
                var fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".svg");
                if (cvjs_debug) console.log("cvjs_returnIfSVGhttp()  fileFormatFlag: "+fileFormatFlag);
                var fileFormat = ".none";			
    

                // what if svgz ?


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
                        fullcallback = response_serverUrl+"/"+config.callbackMethod;

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


        // 9.7.7
        var rastersvgflag = false;
        for (var i = 0; i < cvjsRequestJSON.parameters.length; i++) {

            if (paramName[i].indexOf("rsvg") == 0) {
                rastersvgflag = true;
                paramName[i] = "rsvg";    // we simply turns everything to svg
            }

        }

        if (cvjs_debug) console.log("cvjs_getOutputFormat rsvg:"+rastersvgflag)

        for (var i = 0; i < cvjsRequestJSON.parameters.length; i++) {
            if (paramName[i] == "fpath"){
                // do nothing   
            }
            else{
                if (paramName[i]=="f" ){
                    if (paramValue[i].indexOf("svg")>-1 && config.cvjs_svgz_compress){   // svgz compression
                        paramValue[i] = "svgz";
                        outputFormat = "svgz";

                        // we force to svg out
                        if (rastersvgflag) {
                            outputFormat = "svg";
                            paramValue[i]="svg";
                        }

                    }
                    else{
                        outputFormat = paramValue[i];        
                    }
                } 
            }
        }


        if (cvjs_debug) console.log("outputFormat:"+outputFormat)


        return outputFormat;
    }


    // GLOBAL VALUES  8.66.1
    var cvjs_comparehttpflag = false;
    var cvjs_comparehttp_orglocation = "";
    var cvjs_comparehttp_serverlocation = "";


    function cvjs_buildParametersList(cvjsRequestJSON, paramName, paramValue){

        var parameters = "";
        cvjs_comparehttpflag = false;


        // 9.7.7
        var rastersvgflag = false;
        for (var i = 0; i < cvjsRequestJSON.parameters.length; i++) {

            if (paramName[i].indexOf("rsvg") == 0) {
                rastersvgflag = true;
                paramName[i] = "rsvg";    // we simply turns everything to svg
            }

        }


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

                        // we force to svg out
                        if (rastersvgflag) {
                            outputFormat = "svg";
                            paramValue[i]="svg";
                        }

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

                        //8.66.1   // 9.7.3
                        if (paramValue[i].indexOf(config.ServerUrl)==0 && config.ServerUrl.length>0){
                            // the ServerUrl is replaced with ServerLocation
                            paramValue[i] = config.ServerLocation + paramValue[i].substring(config.ServerUrl.length);
                            if (cvjs_debug) console.log("B COMPARE: afterparamValue[i].indexOf(config.ServerUrl)==0 "+ paramValue[i]+ "config.ServerFrontEndUrl XX"+config.ServerFrontEndUrl+"XX" );              


                        }else{ // 8.64.3
                            if (paramValue[i].indexOf(config.ServerFrontEndUrl)==0 && config.ServerFrontEndUrl.length>0){
                                // the ServerUrl is replaced with ServerLocation
                                paramValue[i] = config.ServerLocation + paramValue[i].substring(config.ServerFrontEndUrl.length);
                                if (cvjs_debug) console.log("C COMPARE: afterparamValue[i].indexOf(config.ServerFrontEndUrl)==0 "+ paramValue[i]);              
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
                                    if (cvjs_debug) console.log("D COMPARE: standard case, do nothing!:"+paramValue[i]);              
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

        if (config.cvjs_debug) console.log("IN cvjs_downloadCADfromhttp_and_execute:");

        try{



            var hostname = "";
            if (contentLocation.indexOf("//") > -1) {
                hostname = contentLocation.split('/')[0]+"//"+contentLocation.split('/')[2];
            } else {
                hostname = contentLocation.split('/')[0];
            }


            if (config.cvjs_debug) console.log("Z2: hostname="+hostname);

            // 8.77.6
            var contentLocationCheck = true;
            if (config.contentLocationCheck != undefined) 
                contentLocationCheck = config.contentLocationCheck;

            // 8.77.6
            console.log(config.version+' contentLocation Check after UrlExits check:'+contentLocationCheck);

            if (!contentLocationCheck){
                contentLocation = decodeURIComponent(contentLocation);
                console.log('content location check false, we use :'+contentLocation);
                // 8.776
                hostname = contentLocation;
            }

         
            // 9.47.14
            //if (setPostFixServerToken) 
            // 9.47.14  - we set to check the content location, not the host

            // 9.49.5
            hostname = contentLocation;

            if (config.cvjs_debug) console.log("Z2A: before urlExists hostname:"+hostname);

            //urlExists(hostname, function(err, exists) {
            urlExists(hostname, function(err, exists) {

                console.log(config.version+": Z3: urlExists: exists= "+exists+"  "+hostname); // true 


                //exists = true;  // 9.49.5

                // FOR RAILS URLS exits is false  9.61.1

                if (exists)
                    httprequest(contentLocation).pipe(fs.createWriteStream(newcontentLocation))
                    .on('error', () => {

                        // 8.33.1 
                        var fullcallback = "";
                        if (config.callbackMethod_gatewayUrl_flag){
                            fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                        }
                        else 
                            fullcallback = response_serverUrl+"/"+config.callbackMethod;


                        console.log('ERROR httprequest('+contentLocation+")");
                        var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+fullcallback+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
                        res.send(CVJSresponse);
                        return;
            
                    })
                    .on('finish', () => {

                        console.log('Finish httprequest('+contentLocation+") newLocation = "+newcontentLocation+" fileformat="+fileFormat);

                        // 9.20.1
                        if(!fs.existsSync(newcontentLocation)) {
                            if (cvjs_debug) console.log("error - callapiconversion - "+newcontentLocation+" file does not exist");
                            res.send("Input file does not exist");  // no file
                            return;
                        }
                        else{

                            //
                            if (cvjs_debug) console.log("after fs.existSync()");


                            var stats = fs.statSync(newcontentLocation);
                            var fileSizeInBytes = stats.size;
                            if (cvjs_debug) console.log("fileSizeInBytes="+fileSizeInBytes);

                            if(fileSizeInBytes<25) {  // assuming error in directload2
                                if (cvjs_debug) console.log("error - callapiconversion - "+newcontentLocation+" file does not exist");
                                res.send("Input file does not exist");  // no file
                                return;
                            }
    

                            contentLocation = newcontentLocation;
                            // if SVG we simply tell the front to pick it up the file back up from its new location
                            if ( fileFormat == ".svg"){
    
                                
                                // 8.33.1 
                                var fullcallback = "";
                                if (config.callbackMethod_gatewayUrl_flag){
                                    fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                                }
                                else 
                                    fullcallback = response_serverUrl+"/"+config.callbackMethod;
    
                                var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+fullcallback+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
                
                                if (config.cvjs_debug) console.log(CVJSresponse);
                                // send callback message and terminate
                                res.send(CVJSresponse);
                                return;
                            }          
                
                            cvjs_buildcommandline_and_execute(outputFormat,contentLocation, parameters, res, writeFile, action, tempFileName);
    


                        }


                    });	
                else{


                    // 8.77.5
                    var contentLocationCheck = true;
                    if (config.contentLocationCheck != undefined) contentLocationCheck = config.contentLocationCheck;


                    // 8.77.5
                    console.log(config.version+' cvjs_downloadCADfromhttp_and_execute() contentLocationCheck after UrlExits check:'+contentLocationCheck);

                    // if no content location check, we pass over the standard file load process
                    if (!contentLocationCheck){
                    
                        contentLocation = decodeURIComponent(contentLocation);
                        console.log('content location check false, we use :'+contentLocation);

                        try{

                            httprequest(contentLocation).pipe(fs.createWriteStream(newcontentLocation))
                            .on('error', () => {
                                    
                                console.log(config.version+' AX httprequest error contentLocationCheck after UrlExits check:'+config.contentLocationCheck);
    

                                // 8.33.1 
                                var fullcallback = "";
                                if (config.callbackMethod_gatewayUrl_flag){
                                    fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                                }
                                else 
                                    fullcallback = response_serverUrl+"/"+config.callbackMethod;
        
        
                                console.log('ERROR httprequest('+contentLocation+")");
                                var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+fullcallback+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
                                res.send(CVJSresponse);
                                return;
                    
                            })
                            .on('finish', () => {
                                            

                                // 9.20.1
                                if(!fs.existsSync(newcontentLocation)) {
                                    if (cvjs_debug) console.log("error - callapiconversion - "+newcontentLocation+" file does not exist");
                                    res.send("Input file does not exist");  // no file
                                    return;
                                }
                                else{


                                    var stats = fs.statSync(newcontentLocation);
                                    var fileSizeInBytes = stats.size;
                                    if (cvjs_debug) console.log("fileSizeInBytes="+fileSizeInBytes);
        
                                    if(fileSizeInBytes<25) {  // assuming error in directload2
                                        if (cvjs_debug) console.log("error - callapiconversion - "+newcontentLocation+" file does not exist");
                                        res.send("Input file does not exist");  // no file
                                        return;
                                    }
        
                                    // 9.47.14
                                    contentLocation = newcontentLocation;
                                    // if SVG we simply tell the front to pick it up the file back up from its new location
                                    if ( fileFormat == ".svg"){
            
                                        console.log(config.version+' Z7: SVG cvjs_downloadCADfromhttp_and_execute() httprequest OK, pick up svg contentLocationCheck after UrlExits check:'+config.contentLocationCheck);
                                        
                                        // 8.33.1 
                                        var fullcallback = "";
                                        if (config.callbackMethod_gatewayUrl_flag){
                                            fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                                        }
                                        else 
                                            fullcallback = response_serverUrl+"/"+config.callbackMethod;
            
                                        var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+fullcallback+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
                        
                                        if (config.cvjs_debug) console.log(CVJSresponse);
                                        // send callback message and terminate
                                        res.send(CVJSresponse);
                                        return;
                                    }   

                                    

                                    // 9.47.14
                                    // if SVGZ we simply tell the front to pick it up the file back up from its new location
                                    if ( fileFormat == ".svgz"){
            
                                        console.log(config.version+' Z8: SVGZcvjs_downloadCADfromhttp_and_execute() httprequest OK, pick up svg contentLocationCheck after UrlExits check:'+config.contentLocationCheck);
                                        
                                        // 8.33.1 
                                        var fullcallback = "";
                                        if (config.callbackMethod_gatewayUrl_flag){
                                            fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                                        }
                                        else 
                                            fullcallback = response_serverUrl+"/"+config.callbackMethod;
            
                                        var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+fullcallback+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svgz\"}";
                        
                                        if (config.cvjs_debug) console.log(CVJSresponse);
                                        // send callback message and terminate
                                        res.send(CVJSresponse);
                                        return;
                                    }   








                                    
                                    if (config.cvjs_debug) console.log("Z6: all other checks done: cvjs_buildcommandline_and_execute()")
                                    // execute
                                    cvjs_buildcommandline_and_execute(outputFormat,contentLocation, parameters, res, writeFile, action, tempFileName);
    

                                }



                            });	
    


                        }
                        catch(err_content){
                            console.log("error httprequest contentLocationCheck false:")+err_content;

                            console.log('Z4: cvjs_downloadCADfromhttp_and_execute(): location does not exist:'+contentLocation);

                            // 8.33.1 
                            var fullcallback = "";
                            if (config.callbackMethod_gatewayUrl_flag){
                                fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                            }
                            else 
                                fullcallback = response_serverUrl+"/"+config.callbackMethod;
        
                            var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+fullcallback+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
                            res.send(CVJSresponse);
                            return;
    
                        }

                        /*
                        */
    
                    }
                    else{

                        console.log('Z5:  AX: location does not exist:'+contentLocation);

                        // 8.33.1 
                        var fullcallback = "";
                        if (config.callbackMethod_gatewayUrl_flag){
                            fullcallback =  config.callbackMethod_gatewayUrl +"/"+config.callbackMethod
                        }
                        else 
                            fullcallback = response_serverUrl+"/"+config.callbackMethod;
    
                        var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+fullcallback+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
                        res.send(CVJSresponse);
                        return;
    
                    }

        
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
                fullcallback = response_serverUrl+"/"+config.callbackMethod;

            var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+fullcallback+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
            res.send(CVJSresponse);
            return;
            
        }


    }                                


    function cvjs_processConversion_pdf_svg_cadviewerdisplay(cvjsRequestJSON, res, action){


        if (config.cvjs_debug) console.log("before clean: "+contentLocationOrg);

        // 9.48.1 we set the contentlocationOrg to the actual filename
        contentLocationOrg = cvjsRequestJSON.contentLocation;
        contentLocationOrg = clean_contentLocation(contentLocationOrg);

        if (config.cvjs_debug) console.log("after clean: "+contentLocationOrg);


        try{
            if (cvjsRequestJSON.setPostFixServerToken!=undefined && cvjsRequestJSON.setPostFixServerToken!=""){
                setPostFixServerToken = cvjsRequestJSON.setPostFixServerToken;
                // postfix the contentlocation with the sas token
                if (setPostFixServerToken)
                    cvjsRequestJSON.contentLocation = cvjsRequestJSON.contentLocation + config.globalApplicationSasToken;
            }
        }
        catch(err){
            console.log();
        }
        if(cvjs_debug) console.log("setPostFixServerToken="+setPostFixServerToken);


        // 
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

        if (contentLocation.indexOf("http:")>-1 || contentLocation.indexOf("https:")>-1){
            // we download the file and then execute the conversion  - this is done later
            // we do not want to reformat anything
        }
        else{  // this is a local file, so we need to clean the contentLocation - make it readable on the server
            contentLocation = clean_contentLocation(contentLocation);
        }

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
                    console.log("E COMPARE urlExists: "+cvjs_comparehttp_orglocation+' '+exists+" "+cvjs_comparehttp_serverlocation); // true 
                    if (exists) 
                        httprequest(cvjs_comparehttp_orglocation).pipe(fs.createWriteStream(cvjs_comparehttp_serverlocation))
                        .on('error', () => {
                            console.log('ERROR - httprequest/createWriteStream does this location exist?: '+cvjs_comparehttp_orglocation+"  "+cvjs_comparehttp_serverlocation);
                        })
                        .on('finish', () => {
    
                            // 9.20.1

                            // 9.20.1
                            if(!fs.existsSync(cvjs_comparehttp_serverlocation)) {
                                if (cvjs_debug) console.log("error - callapiconversio compare- "+cvjs_comparehttp_serverlocation+" file does not exist");
                                res.send("Compare file does not exist");  // no file
                                return;
                            }
                            else{

                                // 9.20.1
                                if (cvjs_debug) console.log("after fs.existSync()");


                                var stats = fs.statSync(cvjs_comparehttp_serverlocation);
                                var fileSizeInBytes = stats.size;
                                if (cvjs_debug) console.log("fileSizeInBytes="+fileSizeInBytes);

                                if(fileSizeInBytes<25) {  // assuming error in directload2
                                    if (cvjs_debug) console.log("error - callapiconversio compare- "+cvjs_comparehttp_serverlocation+" file does not exist");
                                    res.send("Compare file does not exist");  // no file
                                    return;
                                }


                                console.log('F COMPARE file created! at'+cvjs_comparehttp_serverlocation);
    
                                // standard CADViewer processing
                                cvjs_standard_CV_AX_processing(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action, fileFormat, paramName, paramValue, FileStamp);  // 8.19.1
    
                                
                            }
    
    
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


        // 8.77.4
        var contentLocationCheck = true;
        if (config.contentLocationCheck != undefined) contentLocationCheck = config.contentLocationCheck;
        if (config.cvjs_debug) console.log(config.version+":  contentLocationCheck="+contentLocationCheck+" "+contentLocation+"  "+config.ServerUrl);


        // 6.8.65 we only substitute for the back-end, if front-end then user controlled
        if (contentLocation.indexOf(config.ServerUrl)==0   && contentLocationCheck){
            // the ServerUrl is replaced with ServerLocation
            contentLocation = config.ServerLocation + contentLocation.substring(config.ServerUrl.length);
            // 9.50.1
            if (contentLocation.indexOf("?")>-1){
                contentLocation = contentLocation.substring(0, contentLocation.indexOf("?"));
            }


        }			
        
        // 9.49.5   - adjust for localhost/ 127.0.0.1 

        if (contentLocation.indexOf("http://localhost:"+config.ServerPort)>-1 || contentLocation.indexOf("http://127.0.0.1:"+config.ServerPort)>-1){

            var str1 = "http://localhost:"+config.ServerPort;
            var str2 = "http://127.0.0.1:"+config.ServerPort;


            if (contentLocation.indexOf("http://localhost:"+config.ServerPort)>-1){
                contentLocation = config.ServerLocation + contentLocation.substring(str1.length);            
                // 9.50.1
                if (contentLocation.indexOf("?")>-1){
                    contentLocation = contentLocation.substring(0, contentLocation.indexOf("?"));
                }
    
            }
            
            if (contentLocation.indexOf("http://127.0.0.1:"+config.ServerPort)>-1){
                contentLocation = config.ServerLocation + contentLocation.substring(str2.length);            
                // 9.50.1
                if (contentLocation.indexOf("?")>-1){
                    contentLocation = contentLocation.substring(0, contentLocation.indexOf("?"));
                }
            }

        }


        if (config.cvjs_debug) console.log("callapiconversion  contentLocation:"+contentLocation+" frontEnd:"+config.ServerFrontEndUrl+"  ServerUrl:"+config.ServerUrl);


        // 9.47.14 -this check is done in the conversion section
        // echo back SVG file if http/https
        //if (cvjs_debug) console.log("before cvjs_returnIfSVGhttp()");
        //if (cvjs_returnIfSVGhttp(contentLocation, tempFileName, res)) return;
        //if (cvjs_debug) console.log("after cvjs_returnIfSVGhttp() - standard PDF or CONVERSION process ");


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
        if (cvjs_debug) console.log("axprocessing BEFORE HTTP BRANCH "+contentLocation);

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
                fullcallback = response_serverUrl+"/"+config.callbackMethod;

            SVG_callback(res, "", "", outputFormat, contentLocation, fullcallback, cvjs_returnfile_from_cache);	  

        }
        else{
            // 6.2.37 - If http file, then it must be downloaded to server	
            if (contentLocation.indexOf("http:")>-1  || contentLocation.indexOf("https:")>-1){  // download file

                if (config.cvjs_debug) console.log("Z1:  before cvjs_downloadCADfromhttp_and_execute()");
                cvjs_downloadCADfromhttp_and_execute(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action);                  
            }
            else{  // standard execution from CAD server repository
                if (config.cvjs_debug) console.log("Z1:  cvjs_buildcommandline_and_execute()");
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



// 9.50.1

function getToken(req) {
if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
) {
    return req.headers.authorization.split(" ")[1];
} 
return null;
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



// 9.50.1


router.post('/callapiconversion', (req, res) => {

	try{
	
        // 9.50.1

        const token = getToken(req);
        if (config.cvjs_debug) console.log("TOKEN TOKEN TOKEN token:"+token);

        if (!config.globalBearerAutentication){            
                console.log("Authorization token is not applied, so this is OK");
            //console.log("Authorization token is required");
            //res.send("Authorization token is required");
            //return;
        }
        else{  // Authorization token is applied, so we can check the token here
            console.log("Authorization token is applied");
            // 9.50.1
            if (token==config.globalBearerAutenticationToken){
                console.log("Authorization token is OK");
            }
            else{  // 9.50.7
                res.send("Authorization token is required or incorrect");
                return;
            }
        }
    
        /*    we can choose to use JWT token verification here or abort the call

        if (!token) {
          throw new Error("Authorization token is required");
        } 

        jwt.verify(token, secret, function (err, decoded) {
          if (err) {
            throw new Error("Error : " + err);
          }
          console.log(decoded);
        });
        */



        // 9.5.2
        var reqhost =  req.get('host'); 

        console.log(config.version+" callingHost:"+reqhost+ "  config:"+config.ServerUrl);


        if (config.ServerUrl.indexOf("::")>-1){ // we replace with request url, as we have multiple IP that we are listening on

            console.log(config.version+" callingHost:"+reqhost+ "  config:"+config.ServerUrl);

            if (config.https){
                // 9.5.2 - set all server URL paths with new host and port
                response_serverUrl = "https://"+reqhost;
            }
            else{
                response_serverUrl = "http://"+reqhost;

            }
        }
        else{
            // we use config.ServerUrl as coded!
            response_serverUrl = config.ServerUrl;
        }

        


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


        if (Array.isArray(cvjsRequestJSON)){

            console.log("THIS IS AN ARRAY!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
        else
            console.log("THIS IS NOT AN ARRAY!!!!!!!!!!!!!!!!!!!!!!!!!!");


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
    
    