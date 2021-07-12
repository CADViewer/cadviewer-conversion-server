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
    
        try {
            var fileName = req.body.file;
            var fileContent = req.body.file_content;
            var buffer = Buffer.from(fileContent);
            
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
            
            if (fileName.indexOf(config.cvjs_Angular_path)==0){
                    // the ServerUrl is replaced with ServerLocation
                    fileName = config.ServerLocation + fileName.substring(config.cvjs_Angular_path.length);
            }
            
            
            fs.open(fileName, 'w', function(err, fd) {
                
                fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                    if (err) {
                            if (config.cvjs_debug) console.log("error saveredlines: "+err);
                            res.send("error saveredlines: "+err);	
                    }
                    else
                        fs.close(fd, function() {
                            if (config.cvjs_debug) console.log('file written');
                            res.send("Succes");	
                        })
                });
            });
        }
        catch (e) {
            res.send("error - saveredline");  // no file
            if (config.cvjs_debug) console.log(e);
        }
    });
    

    module.exports = router;
    
    