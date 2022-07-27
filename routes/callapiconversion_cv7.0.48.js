var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;
var globalCounter = 0;

const httprequest = require('request');

var customendpointextension = require('./cvjs_customConversionEndpointExtension_cv7.0.48.js');

var customConversionEndpointExtension = false;

var contentLocationOrg = "";

 
var express = require('express'),
    router = express.Router();

    function get_file_format(contentLocation){

        var fileFormat = ".dwg";   // default to trigger conversions
        
        if (contentLocation.lastIndexOf(".")>-1)
            fileFormat =contentLocation.toLowerCase().substring(contentLocation.lastIndexOf("."));   

        if (fileFormat.length > 4 ) // we assume dwg if endpoint does not have file format in call.
            fileFormat = ".dwg";



        if (cvjs_debug) console.log("fileFormat "+fileFormat);


        return fileFormat;
    }

    // 6.8.80

    function AX2023_callback(res, stderr, exitCode, outputFormat, contentLocation, callbackMethod, tempFileName){

        try{	

            // 6.8.89
            var remainOnServer = 0;
            if (config.remainOnServer) remainOnServer = 1;
            if (customConversionEndpointExtension) remainOnServer = 1; // we keep on server for first load of endpoint




			var CVJSresponse = "not populated";
            globalCounter++;
    
            if (config.cvjs_debug) console.log("AX2023_callback outputFormat:"+outputFormat+" exitcode:"+exitCode+"XX");
            
            if (outputFormat.toLowerCase().indexOf("svg")>-1){   // svg + svgz
        
                if (exitCode == undefined || exitCode == null|| exitCode == "") 
                    exitCode = 0;

                CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2022\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\", \"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?returnCadviewer=0&remainOnServer="+remainOnServer+"&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
        
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

                    CVJSresponse = "{\"completedAction\":\"pdf_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2022\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"file\",\"contentStreamData\":\""+contentStream+"\"}";
            //		var CVJSresponse = "{\"completedAction\":\"pdf_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"file\",\"contentStreamData\":\""+config.fileLocationUrl+tempFileName+"."+outputFormat+"\"}";
            //				String CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2017\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?remainOnServer=0&fileTag="+tempFileName+"&Type=svg\"}";
                    if (cvjs_debug) console.log(CVJSresponse);
                    // send callback message and terminate
                    res.send(CVJSresponse);
                }
            }
            if (config.cvjs_debug) console.log("finished - AX2023_callback"+CVJSresponse+" "+outputFormat);	
                
        
        }
        catch (e) {
            res.send("AX2023_callback:"+e);	
            if (config.cvjs_debug) console.log("AX2023_callback:"+e);
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

            CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2022\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?returnCadviewer=0&remainOnServer="+remainOnServer+"&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
    
            if (cvjs_debug) console.log(CVJSresponse);
            // send callback message and terminate
            res.send(CVJSresponse);
            if (config.cvjs_debug) console.log("finished - AX2023_callback"+CVJSresponse+" "+outputFormat);	
                
        
        }
        catch (e) {
            res.send("SVG_callback:"+e);	
            if (config.cvjs_debug) console.log("SVG_callback:"+e);
        }   

    }


    exports.SVG_callback = function (res, outputFormat, contentLocation, tempFileName){

        SVG_callback(res, "", "0", outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName);

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

            CVJSresponse = "{\"completedAction\":\"cadviewer_display\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2022\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?returnCadviewer=1&remainOnServer="+remainOnServer+"&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
    
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
            
            var randomInt = Math.floor(Math.random() * Math.floor(1000000));
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
                                        LinkList2023_callback(res, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName, splityflag);	                                        
                                    });	
                            }
                            else   // standard callback
                                LinkList2023_callback(res, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName, splityflag);	                                        
                    });	    
               });;			                                                            
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
                                LinkList2023_callback(res, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName, splityflag);	                                        
                            });	
                    }
                    else   // standard callback
                        LinkList2023_callback(res, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName, splityflag);	                                        


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
        var commandline = config.converterLocation + config.ax2023_executable+" "+"-i=\""+contentLocation+"\" -o=\""+writeFile+"\" ";		
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

                // callback for custom creation with file ?
                AX2023_callback(res, stderr, err, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName);	  
            }
            // if cadviewer                            
            if (action == "cadviewer_display"){
                // callback for custom creation with file ?

                CADViewer_callback(res, stderr, err, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName);	  
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

    function cvjs_returnIfSVGhttp(contentLocation, tempFileName){

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

                    var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+config.ServerUrl+"/"+config.callbackMethod+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
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




    function cvjs_buildParametersList(cvjsRequestJSON, paramName, paramValue){

        var parameters = "";

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
                else
                    parameters = parameters + "-" +paramName[i] + "=\"" +paramValue[i]+"\" ";
                    // if (paramName[i]=="layout" ){ } ....
            }
        //		if (cvjs_debug) if (config.cvjs_debug) console.log(" "+paramName[i]+"  "+paramValue[i]);                }
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
        httprequest(contentLocation).pipe(fs.createWriteStream(newcontentLocation))
        .on('error', () => {
            console.log('ERROR');
        })
        .on('finish', () => {
                        
            contentLocation = newcontentLocation;
            // if SVG we simply tell the front to pick it up the file back up from its new location
            if ( fileFormat == ".svg"){
                    
                var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"tempFile\":\""+tempFileName+"."+outputFormat+"\",\"contentLocation\":\""+contentLocationOrg+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+config.ServerUrl+"/"+config.callbackMethod+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";

                if (config.cvjs_debug) console.log(CVJSresponse);
                // send callback message and terminate
                res.send(CVJSresponse);
                return;
            }          

            cvjs_buildcommandline_and_execute(outputFormat,contentLocation, parameters, res, writeFile, action, tempFileName);

    });;			
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

        console.log("customEndpointExtension="+customConversionEndpointExtension);


        if (cvjs_debug) console.log("CALLAPI contentLocation: "+cvjsRequestJSON.contentLocation+"  compress:"+config.cvjs_svgz_compress);

        var paramName = new Array();
        var paramValue = new Array();
        var outputFormat = "";
        var parameters = "";
        
        for (var i = 0; i < cvjsRequestJSON.parameters.length; i++) {
            paramName[i] = cvjsRequestJSON.parameters[i].paramName; //some game data
            paramValue[i] = cvjsRequestJSON.parameters[i].paramValue; //some game data
        }

        outputFormat = cvjs_getOutputFormat(cvjsRequestJSON, paramName, paramValue);
        parameters = cvjs_buildParametersList(cvjsRequestJSON, paramName, paramValue);
        contentLocation = clean_contentLocation(contentLocation);
        var randomInt = Math.floor(Math.random() * Math.floor(1000000));
        var tempFileName = "F"+randomInt;
        var writeFile  = config.fileLocation + tempFileName + "." + outputFormat;
        
        var fileFormat = ".none";	
        fileFormat = get_file_format(contentLocation);



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
            // standard CADViewer processing
            cvjs_standard_CV_AX_processing(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action, fileFormat)
        }

    }


    function cvjs_standard_CV_AX_processing(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action, fileFormat){

        // 6.8.65 we only substitute for the back-end, if front-end then user controlled
        if (contentLocation.indexOf(config.ServerUrl)==0){
            // the ServerUrl is replaced with ServerLocation
            contentLocation = config.ServerLocation + contentLocation.substring(config.ServerUrl.length);
        }			
        
        if (config.cvjs_debug) console.log("callapiconversion  contentLocation:"+contentLocation+" frontEnd:"+config.ServerFrontEndUrl+"  ServerUrl:"+config.ServerUrl);


    

        // echo back SVG file if http/https
        if (cvjs_returnIfSVGhttp(contentLocation, tempFileName)) return;
        
        // in case of pdf creation, we make temp dir + filename similar to php setup
        // 6.1.25 / 25
        if (action == "pdf_creation"){
            var randomInt = Math.floor(Math.random() * Math.floor(1000000));
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



        // 6.2.37 - If http file, then it must be downloaded to server	
        if (contentLocation.indexOf("http:")>-1  || contentLocation.indexOf("https:")>-1){  // download file
            cvjs_downloadCADfromhttp_and_execute(outputFormat,contentLocation, parameters, tempFileName, res, writeFile, action);                  
        }
        else{  // standard execution from CAD server repository
            // building the command line
            cvjs_buildcommandline_and_execute(outputFormat,contentLocation, parameters, res, writeFile, action, tempFileName);
        }


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
	
        res.setHeader('Access-Control-Allow-Origin', '*');
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
    
    