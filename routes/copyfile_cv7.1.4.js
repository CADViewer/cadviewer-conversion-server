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
                inputFile = req.query.localfilename;
            }		
    
            inputFile = decodeURI(inputFile);
            inputFile = inputFile.replace(/%3A/g, ':');
            inputFile = inputFile.replace(/%2F/g, '/');
            inputFile = inputFile.replace(/%20/g, ' ');
    
            var outputFile = req.body.localdestination;

            
            if (outputFile==undefined){
                outputFile = req.query.localdestination;
            }		


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
            
            var copytype = req.body.copytype;
            if (copytype==null || copytype==undefined) copytype = "none";

    
            inputFile = inputFile.replace(/\\/g, '/');
            if (config.cvjs_debug) console.log(': '+inputFile);		
            
    
            if (outputFile.indexOf(config.ServerFrontEndUrl)==0){
                    // the ServerUrl is replaced with ServerLocation
                    outputFile = config.ServerLocation + outputFile.substring(config.ServerFrontEnd.length);
            }
            else{
                if (outputFile.indexOf(config.ServerUrl)==0){
                        // the ServerUrl is replaced with ServerLocation
                        outputFile = config.ServerLocation + outputFile.substring(config.ServerUrl.length);
                }
                else{
            
                 if(copytype.indexOf("merge")==0){
                    outputFile = config.ServerLocation + outputFile;
                 }


                }
                
            }
    
    



                
            
            
            outputFile = outputFile.replace(/\\/g, '/');
            if (config.cvjs_debug) console.log(': '+outputFile);				
    
        
    //		if (config.cvjs_debug) console.log('/loadfile: '+inputFile);
            var fs = require('fs');
                            
            fs.copyFile( inputFile, outputFile, function(err, data) {
                if (err){
                    if (config.cvjs_debug) console.log("err:"+err+"XXXXXX");
                    //throw err;
                    res.send("error -copyfile: "+err);  // no file
                }
                else{
                    if (config.cvjs_debug) console.log("file copied!");
                    res.send("Succes");
                }
            });	
        }
        catch (e) {
            if (config.cvjs_debug) console.log("copyfile error: "+e);
            res.send("error - loadredline");  // no file
        }
    });
    

    module.exports = router;
    
    