// directloadcadviewer.js
// version: 7.1.16


var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();


router.get('/directloadcadviewer', function (req, res) {
	
	
	try {
		if (config.cvjs_debug) console.log("directloadcadviewer");	


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


		/*
			var inputFile = req.query.filename;
			
			if (inputFile==undefined){
				inputFile = req.body.filename;
			}			
				
			inputFile = decodeURI(inputFile);
			inputFile = inputFile.replace(/%3A/g, ':');
			inputFile = inputFile.replace(/%2F/g, '/');
			inputFile = inputFile.replace(/%20/g, ' ');

			inputFile = config.ServerLocation + inputFile;

		*/

	
		// make a temp html file. 

		// make a conversion into SVG  , or retain original if it is a SVG

		// inject the converted file into the document. 

		// update inputFile and return back. 



		var inputFile = config.ServerLocation + "/html/CADViewer_base_7_restresponse.html";

		if (config.cvjs_debug) console.log(inputFile);	

		res.sendFile(inputFile);

		/*
				
		var fs = require('fs');
		fs.readFile( inputFile, 'utf8', function(err, data) {
			if (err){
				//throw err;
				res.send("error -loadfile: "+err);  // no file
				if (config.cvjs_debug) console.log(err);
			}
			else
				res.send(data);	
			// send string back up to request
		});
		
		*/
	}
	catch (e) {
		res.send("error - directloadcadviewer ");  // no file
		if (config.cvjs_debug) console.log(e);
	}
		

});

module.exports = router;
    
    