// mergeemail.js
// version: 7.1.3

var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();

// mergeemail
router.post('/mergeemail', (req, res) => {
    console.log("/mergeemail");	
        try {
        
            // parse content
            // convert to pdf
        
            res.send("error - mergemail");  // no file
        }
        catch (e) {
            res.send("error - mergemail");  // no file
            if (config.cvjs_debug) console.log(e);
        }
    });
    
    module.exports = router;
    
    