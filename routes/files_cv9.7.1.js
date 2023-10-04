var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();


router.get('/files', function (req, res) {

    try{	
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

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
    
        var file = req.query.file;

        
        if (config.cvjs_debug) console.log("serverlocation: "+config.ServerLocation +" file:"+file);




        if (file.indexOf(config.ServerLocation)==0){
            // do nothing
        }
        else{
            file = config.ServerLocation + '/'+ file
        }

         res.sendFile(file);
        
        if (config.cvjs_debug) console.log("we are sending "+config.ServerLocation + '/'+ file);
    
    
    
    
    }
    catch (e) {
        res.send("files:"+e);	
        if (config.cvjs_debug) console.log("files:"+e);
    }
    
    
    
    });
    
    



    module.exports = router;
    
    