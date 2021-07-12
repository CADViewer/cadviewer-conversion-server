var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();



// loadredline post - non conversion drawings

router.post('/returnpdfparams', (req, res) => {

	try{	
/*
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
*/	
	
//	var printfile = req.query.file;
	var responseParam = config.ServerLocation + "/converters/files/" + "|" + config.ServerUrl + "/converters/files/" + "|";
	res.send(responseParam);
	if (config.cvjs_debug) console.log("we are sending "+responseParam);
	
	}
	catch (e) {
		res.send("returnpdf params "+e);	
		if (config.cvjs_debug) console.log(e);
	}
	
});


    module.exports = router;
    
    