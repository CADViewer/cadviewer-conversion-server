// makethumbnails.js
// version: 6.5.8

var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();

// makethumbnails

router.post('/makethumbnails', (req, res) => {
    // 6.1.25	
    console.log("/makethumbnails");	
        try {
        
    
        }
        catch (e) {
            res.send("error - makesinglepagepdf");  // no file
            if (config.cvjs_debug) console.log(e);
        }
    });
        

    module.exports = router;
    
    