// listdirectoryredlines.js
// version: 9.1.5

var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();

router.post('/listdirectoryredlines', (req, res) => {
                    
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
            var directory = req.body.directory;


            var listtype = req.body.listtype;
            if (cvjs_debug) console.log("list redline listtype:"+listtype)

            if (listtype == "serverfolder"){
                directory = config.ServerLocation+directory;
            }
            if (cvjs_debug) console.log("directory:"+directory)


        
            directory = decodeURI(directory);
            directory = directory.replace(/%3A/g, ':');
            directory = directory.replace(/%2F/g, '/');
            directory = directory.replace(/%20/g, ' ');

            directory = directory.replaceAll("+", ' ');
     
        
            if (directory.indexOf(config.ServerFrontEndUrl)==0){
                    // the ServerUrl is replaced with ServerLocation
                    directory = config.ServerLocation + directory.substring(config.ServerUrl.length);
            }
    
            // change \ to /	
    
            directory = directory.replace(/\\/g, '/');
            if (config.cvjs_debug) console.log('/directory: '+directory);		
            
                        
                    
            if (directory.indexOf(config.ServerFrontEndUrl)==0){
                    // the ServerUrl is replaced with ServerLocation
                    inputFile = config.ServerLocation + directory.substring(config.ServerFrontEndUrl.length);
            }else{
                if (directory.indexOf(config.ServerUrl)==0){
                        // the ServerUrl is replaced with ServerLocation
                        directory = config.ServerLocation + directory.substring(config.ServerUrl.length);
                }						
            }
    
                    
                    
            if (config.cvjs_debug) console.log('2 /directory: '+directory);		
                    
            const fs = require('fs');
            var dir_content = "";
            
            // { withFileTypes: true }
            //var files = fs.readdirSync(directory);
            //
            var files = fs.readdirSync(directory, { withFileTypes: true });


            for (var i in files){
                var name = files[i];
                if (config.cvjs_debug) console.log(name);
                if (!(name.indexOf(".rw")>0) && (name.toLowerCase.indexOf(".json")>0 || name.toLowerCase.indexOf(".red")>0) ) dir_content= dir_content +"<br>" +name;			
            }		
            res.send(dir_content);
        }
        catch (e) {
            res.send("error listdirectoryredlines");  // no file
            if (config.cvjs_debug) console.log(e);
        }
    });
    


module.exports = router;
    
    