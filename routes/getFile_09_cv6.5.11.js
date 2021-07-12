var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();



// getFile_09  - the callback from conversion

router.get('/getFile_09', function (req, res) {

    /*
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
    */	
        
        try {
            var remainOnServer = req.query.remainOnServer;
            var fileTag = req.query.fileTag;
            var Type = req.query.Type;
                
            var inputFile = config.fileLocation + fileTag +"."+Type;
                    
            if (config.cvjs_debug) console.log('/loadfile: '+inputFile+" Remain on Server:  "+remainOnServer+" fileType="+Type)
            
            var fs = require('fs');

            // svgz compression
            if (Type.indexOf("svgz")>-1 && config.cvjs_svgz_compress){   

                fs.readFile( inputFile, function(err, data) {
                    if (err){
                        //throw err;
                        res.send("error - get /app/* "+err);  // no file
                        if (config.cvjs_debug) console.log(err);
                    }
                    else{
            
                        if (config.cvjs_debug) console.log("svgz: returnfile");	
                
                        var zlib = require('zlib');
                        zlib.gunzip(data, {chunkSize: 65536}, function (err, data) {
                
                            var buf = new Buffer(data, 'utf-8'); 
                            
                            zlib.gzip(buf, function(_, result) { 
                                res.setHeader('Content-Type', 'image/svg+xml');
                                res.setHeader('Content-Encoding', 'gzip');
                                res.send(result);   
                            });
                        });

                        if (remainOnServer == 0){			
                            if (config.cvjs_debug) console.log("We have to clean the file!!!!!!");
                            
                            fs.unlink(inputFile, function (un_err) {
                                if (un_err) console.log('ERROR: app.get '+un_err)
                                else
                                if (config.cvjs_debug) console.log('File deleted!');
                                // if no error, file has been deleted successfully
                            });  				
        

                        }        
                    }
                });	
            
            }
            else{

                fs.readFile( inputFile, 'utf8', function(err, data) {
                    // send string back up to request
                    if (Type.indexOf("svg") == 0)
                        res.setHeader('Content-Type', 'image/svg+xml');
                    res.send(data);	
    
                    if (remainOnServer == 0){			
                        if (config.cvjs_debug) console.log("We have to clean the file!!!!!!");
                        
                        fs.unlink(inputFile, function (un_err) {
                            if (un_err) console.log('ERROR: app.get '+un_err)
                            else
                            if (config.cvjs_debug) console.log('File deleted!');
                            // if no error, file has been deleted successfully
                        });  				
                    }
                });	
    

            }


        }
        catch (e) {
            res.send("error - getFile_09");	
            if (config.cvjs_debug) console.log(e);
        }
        
    //    res.send("hello world!");
    //	if (config.cvjs_debug) console.log("get ");
    });
    


    module.exports = router;
    
    