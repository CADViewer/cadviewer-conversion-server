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
    
    