var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();



// loadredline post - non conversion drawings

router.post('/loadredline', (req, res) => {
	
    /*
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
    */	
	
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

	
	
        
        try {
            var inputFile = req.body.file;
            
            if (inputFile==undefined){
                inputFile = req.query.file
            }		
    



            
            inputFile = decodeURI(inputFile);
            inputFile = inputFile.replace(/%3A/g, ':');
            inputFile = inputFile.replace(/%2F/g, '/');
            inputFile = inputFile.replace(/%20/g, ' ');
            
    
            if (config.cvjs_debug) console.log('x1: '+inputFile+"  config.ServerFrontEndUrl="+config.ServerFrontEndUrl+" config.ServerUrl="+config.ServerUrl);		
    
        
			if (inputFile.indexOf(config.ServerFrontEndUrl)==0 && (inputFile.indexOf(config.ServerUrl)!=0)){
                    // the ServerUrl is replaced with ServerLocation
                    inputFile = config.ServerLocation + inputFile.substring(config.ServerFrontEndUrl.length);
            }else{
                if (inputFile.indexOf(config.ServerUrl)==0){
                        // the ServerUrl is replaced with ServerLocation
                        inputFile = config.ServerLocation + inputFile.substring(config.ServerUrl.length);
                }						
            }
                    
        
            inputFile = inputFile.replace(/\\/g, '/');
            if (config.cvjs_debug) console.log('Inputfile: '+inputFile);		
            
            
    //		if (config.cvjs_debug) console.log('/loadfile: '+inputFile);
            var fs = require('fs');
            fs.readFile( inputFile, 'utf8', function(err, data) {
                if (err){
                    //throw err;
                    res.send("error -loadfile: "+err);  // no file
                    if (config.cvjs_debug) console.log(err);
                }
                else{
                    res.send(data);	
                // send string back up to request
				
					if (config.cvjs_debug) console.log('res.send('+data+")");		
					
				
				}
			
			});	
        }
        catch (e) {
            res.send("error - loadredline");  // no file
            if (config.cvjs_debug) console.log(e);
        }
    });


    module.exports = router;
    
    