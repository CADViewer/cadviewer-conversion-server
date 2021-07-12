var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();



// loadfile get - direct load of file content

router.get('/loadfile', function (req, res) {
	
	try {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
		res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
		
	
		if (config.cvjs_debug) console.log("get /loadfile");

		var inputFile = req.query.file;
					
		if (config.cvjs_debug) console.log('/loadfile: '+inputFile+"   ");
	

		inputFile = decodeURI(inputFile);
		inputFile = inputFile.replace(/%3A/g, ':');
		inputFile = inputFile.replace(/%2F/g, '/');
		inputFile = inputFile.replace(/%20/g, ' ');

	
		if (inputFile.indexOf(config.ServerFrontEndUrl)==0){
            // the ServerFrontEndUrl is replaced with ServerLocation
            inputFile = config.ServerLocation + inputFile.substring(config.ServerFrontEndUrl.length);
        }
        else{
            if (inputFile.indexOf(config.ServerUrl)==0){
                    // the ServerUrl is replaced with ServerLocation
                    inputFile = config.ServerLocation + inputFile.substring(config.ServerUrl.length);
            }			
        }
    

		if (config.cvjs_debug) console.log('2:  /loadfile: '+inputFile+"   ");

        var fs = require('fs');
		fs.readFile( inputFile, 'utf8', function(err, data) {						
			// send string back up to request
			//res.render(data);	
			res.send(data);	
		});	
	}
	catch (e) {
		res.send("error - loadfile");	
		if (config.cvjs_debug) console.log(e);
	}
	
//    res.send("hello world!");
//	if (config.cvjs_debug) console.log("get ");
});

// loadfile post - non conversion drawings
router.post('/loadfile', (req, res) => {
		
	
	try {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
		res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
		

		var inputFile = req.body.file;
		
		if (inputFile==undefined){
			inputFile = req.query.file
		}			
		
		
		inputFile = decodeURI(inputFile);
		inputFile = inputFile.replace(/%3A/g, ':');
		inputFile = inputFile.replace(/%2F/g, '/');
		inputFile = inputFile.replace(/%20/g, ' ');
		
		
		if (inputFile.indexOf(config.ServerFrontEndUrl)==0){
				// the ServerUrl is replaced with ServerLocation
				inputFile = config.ServerLocation + inputFile.substring(config.ServerFrontEndUrl.length);
		}else{
			if (inputFile.indexOf(config.ServerUrl)==0){
					// the ServerUrl is replaced with ServerLocation
					inputFile = config.ServerLocation + inputFile.substring(config.ServerUrl.length);
			}						
		}
				
	
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
	}
	catch (e) {
		res.send("error -loadfile");  // no file
		if (config.cvjs_debug) console.log(e);
	}
});


    module.exports = router;
    
    