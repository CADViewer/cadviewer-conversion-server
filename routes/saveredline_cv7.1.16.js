var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
router = express.Router();

// loadredline post - non conversion drawings

// saveredline

router.post('/saveredline', (req, res) => {
	
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
            var fileName = req.body.file;
            var fileContent = req.body.file_content;
            var buffer = Buffer.from(fileContent);

            var listtype = req.body.listtype;

            if (cvjs_debug) console.log("save redline listtype:"+listtype)

            if (listtype == "serverfolder"){
                fileName = config.ServerLocation+fileName;
            }
            
            if (cvjs_debug) console.log("filename:"+fileName)

            
            var fs = require('fs');
                
            //if (config.cvjs_debug) console.log(fileContent);
            if (config.cvjs_debug) console.log("saveredline  "+ fileName);
        
            fileName = decodeURI(fileName);
            fileName = fileName.replace(/%3A/g, ':');
            fileName = fileName.replace(/%2F/g, '/');
            fileName = fileName.replace(/%20/g, ' ');
        
            if (config.cvjs_debug) console.log("saveredline  "+ fileName);
        
                
            if (fileName.indexOf(config.ServerFrontEndUrl)==0){
                    // the ServerUrl is replaced with ServerLocation
                    fileName = config.ServerLocation + fileName.substring(config.ServerFrontEndUrl.length);
            }else{
                if (fileName.indexOf(config.ServerUrl)==0){
                        // the ServerUrl is replaced with ServerLocation
                        fileName= config.ServerLocation + fileName.substring(config.ServerUrl.length);
                }						
            }
            
    
            
            fileName = fileName.replace(/\\/g, '/');
                        
            
            fs.open(fileName, 'w', function(err, fd) {
                
                fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                    if (err) {
                            if (config.cvjs_debug) console.log("error saveredlines: "+err);
                            res.send("error saveredlines: "+err);	
                    }
                    else{
                        fs.close(fd, function() {
                            if (config.cvjs_debug) console.log('file written');
                            res.send("Succes");	
                        })

                    }
                });
            });
        }
        catch (e) {
            res.send("error - saveredline");  // no file
            if (config.cvjs_debug) console.log(e);
        }
    });
    

    module.exports = router;
    
    