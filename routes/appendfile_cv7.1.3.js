var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();


// appendfile

router.post('/appendfile', (req, res) => {

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
    
            fileName = decodeURI(fileName);
            fileName = fileName.replace(/%3A/g, ':');
            fileName = fileName.replace(/%2F/g, '/');
            fileName = fileName.replace(/%20/g, ' ');
            
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
            
                    
            //if (config.cvjs_debug) console.log(fileContent);
            if (config.cvjs_debug) console.log("appendfile"+ fileName);
    
            fs.open(fileName, 'a', function(err, fd) {
                
                fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                    if (err) {
                            if (config.cvjs_debug) console.log("error append file: "+err);
                            res.send("error append file: "+err);	
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
            res.send("error - appendfile");	
            if (config.cvjs_debug) console.log(e);
        }
    });
    

    module.exports = router;
    
    