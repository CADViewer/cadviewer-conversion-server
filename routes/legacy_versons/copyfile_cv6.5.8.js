var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();



// copyfile

router.post('/copyfile', (req, res) => {
	
    console.log("/copyfile!");	
            
        try {
            var inputFile = req.body.localfilename;
            
            if (inputFile==undefined){
                inputFile = req.query.localfilename
            }		
    
            inputFile = decodeURI(inputFile);
            inputFile = inputFile.replace(/%3A/g, ':');
            inputFile = inputFile.replace(/%2F/g, '/');
            inputFile = inputFile.replace(/%20/g, ' ');
    
            var outputFile = req.body.localdestination;
    
            outputFile = decodeURI(outputFile);
            outputFile = outputFile.replace(/%3A/g, ':');
            outputFile = outputFile.replace(/%2F/g, '/');
            outputFile = outputFile.replace(/%20/g, ' ');
    
            if (inputFile.indexOf(config.ServerFrontEndUrl)==0){
                    // the ServerUrl is replaced with ServerLocation
                    inputFile = config.ServerLocation + inputFile.substring(config.ServerFrontEndUrl.length);
            }else{
                if (inputFile.indexOf(config.ServerUrl)==0){
                        // the ServerUrl is replaced with ServerLocation
                        inputFile = config.ServerLocation + inputFile.substring(config.ServerUrl.length);
                }						
            }
                    
    
            inputFile = inputFile.replace(/\\/g, '/');
            if (config.cvjs_debug) console.log(': '+inputFile);		
            if (inputFile.indexOf(config.cvjs_Angular_path)==0){
                    // the ServerUrl is replaced with ServerLocation
                    inputFile = config.ServerLocation + inputFile.substring(config.cvjs_Angular_path.length);
            }
            
    
            if (outputFile.indexOf(config.ServerFrontEndUrl)==0){
                    // the ServerUrl is replaced with ServerLocation
                    outputFile = config.ServerLocation + outputFile.substring(config.ServerFrontEnd.length);
            }
            else{
                if (outputFile.indexOf(config.ServerUrl)==0){
                        // the ServerUrl is replaced with ServerLocation
                        outputFile = config.ServerLocation + outputFile.substring(config.ServerUrl.length);
                }
                
            }
    
    
                
            
            
            outputFile = outputFile.replace(/\\/g, '/');
            if (config.cvjs_debug) console.log(': '+outputFile);				
    
        
    //		if (config.cvjs_debug) console.log('/loadfile: '+inputFile);
            var fs = require('fs');
                            
            fs.copyFile( inputFile, outputFile, function(err, data) {
                if (err){
                    //throw err;
                    res.send("error -copyfile: "+err);  // no file
                    if (config.cvjs_debug) console.log(err);
                }
                else
                    if (config.cvjs_debug) console.log("file copied!");
                    res.send("Succes");
            });	
        }
        catch (e) {
            res.send("error - loadredline");  // no file
            if (config.cvjs_debug) console.log(e);
        }
    });
    

    module.exports = router;
    
    