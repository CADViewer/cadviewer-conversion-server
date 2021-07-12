var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();


router.get('/files', function (req, res) {

    try{	
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
    
        var file = req.query.file;
    
         res.sendFile(config.ServerLocation + '/'+ file);
        
        if (config.cvjs_debug) console.log("we are sending "+config.ServerLocation + '/'+ file);
    
    
    
    
    }
    catch (e) {
        res.send("files:"+e);	
        if (config.cvjs_debug) console.log("files:"+e);
    }
    
    
    
    });
    
    



    module.exports = router;
    
    