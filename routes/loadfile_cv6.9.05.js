var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();



function loadFile(req,res){

	try {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
		res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
		
		if (config.cvjs_debug) console.log("get-post /loadfile");

		var inputFile = req.body.file;
		
		if (inputFile == undefined){
			inputFile = req.query.file
		}			
					
        var loadtype = req.body.loadtype;

		if (loadtype == undefined){
			loadtype = req.query.loadtype;
		}			



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
            else{

                // if menu-file with blank path, we must concatenate the path
                if (loadtype.indexOf("menufile")==0){

                    inputFile = config.ServerLocation + inputFile;


                }



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


}

// loadfile get - direct load of file content

router.get('/loadfile', function (req, res) {

    loadFile(req, res);
	
});

// loadfile post - non conversion drawings
router.post('/loadfile', (req, res) => {
    
    loadFile(req, res);	
});


    module.exports = router;
    
    