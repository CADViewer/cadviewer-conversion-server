// temp_print.js
// version: 7.1.16


var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();



router.get('/temp_print', function (req, res) {

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
    
        var printfile = req.query.file;
    
         res.sendFile(config.temp_print_folder + '/'+ printfile);
        
        if (config.cvjs_debug) console.log("we are sending "+config.temp_print_folder + '/'+ printfile);
    
    
    
    }
    catch (e) {
        res.send("temp_print:"+e);	
        if (config.cvjs_debug) console.log("temp_print:"+e);
    }
    
    
    
    });
    
    


    module.exports = router;
    
    