var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();


    router.post('/listdirectory', (req, res) => {
				
        /*
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
            res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
        */	
            
            try {
                var directory = req.body.directory;
        
                var listtype = req.body.listtype;
                if (cvjs_debug) console.log("list listtype:"+listtype)
    
                if (listtype == "serverfolder"){
                    directory = config.ServerLocation+directory;
                }
                if (cvjs_debug) console.log("directory:"+directory)
    

                directory = decodeURI(directory);
                directory = directory.replace(/%3A/g, ':');
                directory = directory.replace(/%2F/g, '/');
                directory = directory.replace(/%20/g, ' ');
        
                if (config.cvjs_debug) console.log('1 /directory: '+directory);		
                
                
                if (directory.indexOf(config.ServerFrontEndUrl)==0){
                        // the ServerUrl is replaced with ServerLocation
                        inputFile = config.ServerLocation + directory.substring(config.ServerFrontEndUrl.length);
                }else{
                    if (directory.indexOf(config.ServerUrl)==0){
                            // the ServerUrl is replaced with ServerLocation
                            directory = config.ServerLocation + directory.substring(config.ServerUrl.length);
                    }						
                }
            
        
            
                // change \ to /	
        
                if (config.cvjs_debug) console.log('1A /directory: '+directory);		
        
                
                directory = directory.replace(/\\/g, '/');
                if (config.cvjs_debug) console.log('/directory: '+directory+"  config.cvjs_Angular_path"+config.cvjs_Angular_path);		
                
                if (directory.indexOf(config.cvjs_Angular_path)==0){
                        // the ServerUrl is replaced with ServerLocation
                        directory = config.ServerLocation + directory.substring(config.cvjs_Angular_path.length);
                }
                        
                if (config.cvjs_debug) console.log('2 /directory: '+directory);		
                        
                const fs = require('fs');
                var dir_content = "";
                
                var files = fs.readdirSync(directory);
                for (var i in files){
                    var name = files[i];
                    if (config.cvjs_debug) console.log(name);
                    if (!(name.indexOf(".rw")>0)) dir_content= dir_content + "<br>" +name;			
                }		
                res.send(dir_content);
            }
            catch (e) {
                res.send("error listdirectory");  // no file
                if (config.cvjs_debug) console.log(e);
            }
        });
        
        
        

    module.exports = router;
    
    