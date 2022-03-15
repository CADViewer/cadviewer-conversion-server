var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;
var globalCounter = 0;

const httprequest = require('request');


var express = require('express'),
    router = express.Router();

    function get_file_format(contentLocation){

        var fileFormat = ".none";

        var fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".dwg");
        if (fileFormatFlag>-1){ 
            fileFormat = ".dwg";
        }
        else{
            fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".dxf");
            if (fileFormatFlag>-1){ 
                fileFormat = ".dxf";
            }
            else{
                fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".dwf");
                if (fileFormatFlag>-1){ 
                    fileFormat = ".dwf";
                }
                else{
                    fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".tif");
                    if (fileFormatFlag>-1){ 
                        fileFormat = ".tif";
                    }
                    else{
                        fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".dwg");
                        if (fileFormatFlag>-1){ 
                            fileFormat = ".dgn";
                        }
                        else{
    
                            fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".pcf");
                            if (fileFormatFlag>-1){ 
                                fileFormat = ".pcf";
                            }
                            else{
    
                                fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".pdf");
                                if (fileFormatFlag>-1){ 
                                    fileFormat = ".pdf";
                                }
                                else{
    
                                    fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".svg");
                                    if (fileFormatFlag>-1){ 
                                        fileFormat = ".svg";
                                    }
                                    else{
    
                                    }	
    
                                }	
                            }							
                        }							
                    }						
                }			
            }
        }
    
        return fileFormat;

    }

    // 6.8.80

    function AX2022_callback(res, exitCode, outputFormat, contentLocation, callbackMethod, tempFileName){
	

        try{	
    
			var CVJSresponse = "not populated";
            globalCounter++;
    
            if (config.cvjs_debug) console.log("AX2022_callback  - global counter: "+globalCounter+" outputFormat:"+outputFormat+" exitcode:"+exitCode+"XX");
            
            if (outputFormat.toLowerCase().indexOf("svg")>-1){   // svg + svgz
        
                if (exitCode == undefined || exitCode == null|| exitCode == "") 
                    exitCode = 0;

                CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2022\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocation+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?returnCadviewer=0&remainOnServer=0&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
        
                if (cvjs_debug) console.log(CVJSresponse);
                // send callback message and terminate
                res.send(CVJSresponse);
            }
            else{
                if (outputFormat.toLowerCase().indexOf("pdf")>-1){
        
                    // we need to change the location into a string with fileload
                    
                    var contentStream = config.ServerUrl+"/files?file="+config.fileLocationUrl.substring(config.ServerUrl.length)+tempFileName+"."+outputFormat
                
//                    var exitCode = 0;

                    CVJSresponse = "{\"completedAction\":\"pdf_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2022\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocation+"\",\"contentResponse\":\"file\",\"contentStreamData\":\""+contentStream+"\"}";
            //		var CVJSresponse = "{\"completedAction\":\"pdf_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocation+"\",\"contentResponse\":\"file\",\"contentStreamData\":\""+config.fileLocationUrl+tempFileName+"."+outputFormat+"\"}";
            //				String CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2017\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocation+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?remainOnServer=0&fileTag="+tempFileName+"&Type=svg\"}";
                    if (cvjs_debug) console.log(CVJSresponse);
                    // send callback message and terminate
                    res.send(CVJSresponse);
                }
            }
            if (config.cvjs_debug) console.log("finished - AX2022_callback"+CVJSresponse+" "+outputFormat);	
                
        
        }
        catch (e) {
            res.send("AX2022_callback:"+e);	
            if (config.cvjs_debug) console.log("AX2022_callback:"+e);
        }
        
    };


    function CADViewer_callback(res, exitCode, outputFormat, contentLocation, callbackMethod, tempFileName){
	

        try{	
    
			var CVJSresponse = "not populated";
            globalCounter++;
    
            if (config.cvjs_debug) console.log("CADViewer_callback  - global counter: "+globalCounter+" outputFormat:"+outputFormat+" exitcode:"+exitCode+"XX");
                    
            if (exitCode == undefined || exitCode == null || exitCode == "") 
                    exitCode = 0;

            CVJSresponse = "{\"completedAction\":\"cadviewer_display\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2022\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocation+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?returnCadviewer=1&remainOnServer=0&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
    
            if (cvjs_debug) console.log(CVJSresponse);
            // send callback message and terminate
            res.send(CVJSresponse);
            if (config.cvjs_debug) console.log("finished - CADViewer_callback"+CVJSresponse+" "+outputFormat);	
                
        
        }
        catch (e) {
            res.send("CADViewer_callback:"+e);	
            if (config.cvjs_debug) console.log("CADViewer_callback:"+e);
        }
        
    };















    function LinkList2022_callback(res, outputFormat, contentLocation, callbackMethod, tempFileName){



        try{	
    
			var CVJSresponse = "not populated";
            globalCounter++;
    
            if (config.cvjs_debug) console.log("LinkList2022_callback  - global counter: "+globalCounter+" outputFormat:"+outputFormat);
                    
            var exitCode = 0;
            CVJSresponse = "{\"completedAction\":\"data_extraction\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"LinkList2022\",\"version\":\"V2.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocation+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?remainOnServer=0&fileTag="+tempFileName+"&Type="+outputFormat+"\"}";
    
            if (cvjs_debug) console.log(CVJSresponse);
            // send callback message and terminate
            res.send(CVJSresponse);
            if (config.cvjs_debug) console.log("finished - LinkLists2022_callback"+CVJSresponse+" "+outputFormat);	
                
        
        }
        catch (e) {
            res.send("AX2022_callback:"+e);	
            if (config.cvjs_debug) console.log("AX2022_callback:"+e);
        }


//        if (config.cvjs_debug) console.log("LinkList2022_callback  - global counter: "+globalCounter+" outputFormat:"+outputFormat);

    }






    function cvjs_processLinkList(cvjsRequestJSON, res){

        try{
            //res.send("WE are processing LinkList!!!:");	

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
            var outputFormat = "xxx";


            for (var i = 0; i < cvjsRequestJSON.parameters.length; i++) {
                paramName[i] = cvjsRequestJSON.parameters[i].paramName; //some game data
                paramValue[i] = cvjsRequestJSON.parameters[i].paramValue; //some game data
                

                    // we build the parameter list 
                    if (paramValue[i] == ""){ 
                        parameters = parameters +"-"+paramName[i]+" ";

                        if (paramName[i].toLowerCase() == "xml") outputFormat = "xml";
                        if (paramName[i].toLowerCase() == "json") outputFormat = "json";

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
        
            if (contentLocation.indexOf(config.ServerFrontEndUrl)==0){
                    // the ServerFrontEndUrl is replaced with ServerLocation
                    contentLocation = config.ServerLocation + contentLocation.substring(config.ServerFrontEndUrl.length);
            }
            else{
                if (contentLocation.indexOf(config.ServerUrl)==0){
                        // the ServerUrl is replaced with ServerLocation
                        contentLocation = config.ServerLocation + contentLocation.substring(config.ServerUrl.length);
                }			
            }
            
            
            if (config.cvjs_debug) console.log("callapiconversion "+contentLocation+" "+config.ServerFrontEndUrl+"  "+config.ServerUrl);
            
            var randomInt = Math.floor(Math.random() * Math.floor(1000000));
            var tempFileName = "F"+randomInt;
            var writeFile  = config.fileLocation + tempFileName + "." + outputFormat;           
            
            // end 	
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
                    console.log('ERROR - httprequest');
                  })
                .on('finish', () => {
                                
                    contentLocation = newcontentLocation;
                                
                        // building the command line
                        var commandline = config.linklistLocation + config.linklist2020_executable+" "+"-i=\""+contentLocation+"\" -o=\""+writeFile+"\" ";		
                        commandline = commandline + parameters;		

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


                          LinkList2022_callback(res, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName);	  
                            
                                    
                    });	
    
               });;			
                                            
                
            }
            else{  // standard execution
            
                
                // building the command line
                var commandline = config.linklistLocation + config.linklist2020_executable+" "+"-i=\""+contentLocation+"\" -o=\""+writeFile+"\" ";		
                commandline = commandline + parameters;		

                
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


                  LinkList2022_callback(res, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName);	  
                
                });	
    
            } 

            // dev res.send(" 6.5.15 converter   "+converter+" "+contentLocation+" "+parameters+" writeFile:"+writeFile);	

        }
        catch (e) {
            res.send("processLinkList_callback:"+e);	
            if (config.cvjs_debug) console.log("LinkList2022_callback:"+e);
        }
    
    };

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

		/*
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
			res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
		*/	

		// get request:
		//if (config.cvjs_debug) console.log(" body: "+req.body);
		if (cvjs_debug) console.log("callapiconversion body.request: "+req.body.request);
		
		// CADViewer JS request 
		var cvjsRequest = req.body.request;	
		var cvjsRequestJSON = JSON.parse(cvjsRequest);
		var action = cvjsRequestJSON.action;
        
        if (cvjs_debug) console.log("callapiconversion action="+action);

        if (action == "data_extraction"){
            cvjs_processLinkList(cvjsRequestJSON, res);
        }
        else{

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
    

            if (cvjs_debug) console.log("CALLAPI contentLocation: "+cvjsRequestJSON.contentLocation+"  compress:"+config.cvjs_svgz_compress);

            var paramName = new Array();
            var paramValue = new Array();
            var outputFormat = "";
            var parameters = "";
            
            for (var i = 0; i < cvjsRequestJSON.parameters.length; i++) {
                paramName[i] = cvjsRequestJSON.parameters[i].paramName; //some game data
                paramValue[i] = cvjsRequestJSON.parameters[i].paramValue; //some game data
    
    
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
                        if (paramName[i]=="layout" ){
                            parameters = parameters + "-" +paramName[i] + "=\"" +paramValue[i]+"\" ";
                        }
                        else{ 
                            parameters = parameters + "-" +paramName[i] + "=\"" +paramValue[i]+"\" ";
                        }
                    }
            //		if (cvjs_debug) if (config.cvjs_debug) console.log(" "+paramName[i]+"  "+paramValue[i]);
                }
            }
            
            // we assume either 
            // 1: http address on this server or
            // 2: full path on this server
            // first we url decode 
            
            contentLocation = decodeURI(contentLocation);
            contentLocation = contentLocation.replace(/%3A/g, ':');
            contentLocation = contentLocation.replace(/%2F/g, '/');
            contentLocation = contentLocation.replace(/%20/g, ' ');
            
          
            /*  external https load test - block out
            contentLocation = "https://onlinedemo.cadviewer.com/cadviewer_6_5/content/drawings/dwg/Hospital 1.dwg";
            */


            if (config.cvjs_debug) console.log("\n\rcallapiconversion PRE: decodeURL contentLocation: "+contentLocation+" Server URL: "+config.ServerUrl+" \n\r ");
        

            // 6.8.65, we only substitute for the back-end, if front-end then user controlled
            /*
            if (contentLocation.indexOf(config.ServerFrontEndUrl)==0){
                    // the ServerFrontEndUrl is replaced with ServerLocation
                    contentLocation = config.ServerLocation + contentLocation.substring(config.ServerFrontEndUrl.length);
            }
            else{
                if (contentLocation.indexOf(config.ServerUrl)==0){
                        // the ServerUrl is replaced with ServerLocation
                        contentLocation = config.ServerLocation + contentLocation.substring(config.ServerUrl.length);
                }			
            } 
            */
           
            // 6.8.65
            if (contentLocation.indexOf(config.ServerUrl)==0){
                // the ServerUrl is replaced with ServerLocation
                contentLocation = config.ServerLocation + contentLocation.substring(config.ServerUrl.length);
            }			

            
            if (config.cvjs_debug) console.log("callapiconversion  contentLocation:"+contentLocation+" frontEnd:"+config.ServerFrontEndUrl+"  ServerUrl:"+config.ServerUrl);
            
            var randomInt = Math.floor(Math.random() * Math.floor(1000000));
            var tempFileName = "F"+randomInt;
            var writeFile  = config.fileLocation + tempFileName + "." + outputFormat;
        
            // in case of pdf creation, we make temp dir + filename similar to php setup
            // 6.1.25 / 25
            if (action == "pdf_creation"){
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
    
                    var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocation+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+config.ServerUrl+"/"+config.callbackMethod+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
                    if (config.cvjs_debug) console.log("response svg: "+CVJSresponse);
                    // send callback message and terminate
                    res.send(CVJSresponse);
                    return;
                }
            }
            
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
                    console.log('ERROR');
                  })
                .on('finish', () => {
                                
                    contentLocation = newcontentLocation;
            
                    // if SVG we simply tell the front to pick it up the file back up from its new location
    
                    if ( fileFormat == ".svg"){
                            
                        var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocation+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+config.ServerUrl+"/"+config.callbackMethod+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
    
                        if (config.cvjs_debug) console.log(CVJSresponse);
                        // send callback message and terminate
                        res.send(CVJSresponse);
                        return;
    
                    }
                    
                    // building the command line
                    var commandline = config.converterLocation + config.ax2020_executable+" "+"-i=\""+contentLocation+"\" -o=\""+writeFile+"\" ";		
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
                    
                    // execute ax2020
                        
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
                        if (action == "conversion" || action == "svg_creation" || action == "pdf_creation")
                            AX2022_callback(res, stderr, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName);	  
                        // if cadviewer                            
                        if (action == "cadviewer_display")
                            CADViewer_callback(res, stderr, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName);	  
                                 
                    });	
    
               });;			
                                            
                
            }
            else{  // standard execution
            
                
                // building the command line
                var commandline = config.converterLocation + config.ax2020_executable+" "+"-i=\""+contentLocation+"\" -o=\""+writeFile+"\" ";		
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
                
                if (cvjs_debug) if (config.cvjs_debug) console.log("commandline "+commandline+"XXX");
                
                // execute ax2020
                    
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
                  
                    // AX2022_callback(res, err, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName);	  
                    if (config.cvjs_debug) console.log("action= "+action);

                    // if  conversion, svg_display, pdf_display  
                    if (action == "conversion" || action == "svg_creation" || action == "pdf_creation")
                        AX2022_callback(res, stderr, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName);	  
                    // if cadviewer                            
                    if (action == "cadviewer_display")
                        CADViewer_callback(res, stderr, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName);	  

                });	
        

            }


        }

			
	}
	catch (e) {
		res.send("callapiconversion"+e);	
		if (config.cvjs_debug) console.log(e);
	}
		

});




    module.exports = router;
    
    