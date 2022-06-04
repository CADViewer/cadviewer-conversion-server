var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();

const fs = require('fs');
const path = require('path');

// loadredline post - non conversion drawings

function createDirRecursively(dir) {
    if (!fs.existsSync(dir)) {        
        createDirRecursively(path.join(dir, ".."));
        fs.mkdirSync(dir);
    }
}

// savefile

router.post('/savefile', (req, res) => {

/*
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
*/	

	try {
		var fileName = req.body.file;
		var fileContent = req.body.file_content;
		var buffer = Buffer.from(fileContent);
		
        console.log("first index"+fileName.indexOf("/"));

        // if relative path we concatenate the serverlocation
        if (fileName.indexOf("/") == 0 || fileName.indexOf("\\") == 0) 
            fileName = config.ServerLocation + fileName;


        console.log("after"+fileName);

		var dirname = path.dirname(fileName);
		
		createDirRecursively(dirname);
	
        
/*
console.log("dirnaem = "+dirname)

		if (fs.existsSync(dirname)) {
			// do nothing
		}
		else{
			//ensureDirectoryExistence(dirname);
//			fs.mkdirSync(dirname);		
			fs.mkdirSync(dirname, { recursive: true });			
		}

*/

		fileName = decodeURI(fileName);
		fileName = fileName.replace(/%3A/g, ':');
		fileName = fileName.replace(/%2F/g, '/');
		fileName = fileName.replace(/%20/g, ' ');

	
		if (config.cvjs_debug) console.log("HERE "+fileName+" "+config.ServerFrontEndUrl+"  "+config.ServerUrl);
		
		if (fileName.indexOf(config.ServerFrontEndUrl)==0){
				// the ServerFrontEndUrl is replaced with ServerLocation
				fileName = config.ServerLocation + fileName.substring(config.ServerFrontEndUrl.length);
		}
		else{
			if (fileName.indexOf(config.ServerUrl)==0){
					// the ServerUrl is replaced with ServerLocation
					fileName = config.ServerLocation + fileName.substring(config.ServerUrl.length);
			}			
		}

		fileName = fileName.replace(/\\/g, '/');
		
				
		//if (config.cvjs_debug) console.log(fileContent);
		if (config.cvjs_debug) console.log("savefile"+ fileName);

		fs.open(fileName, 'w', function(err, fd) {			
			fs.write(fd, buffer, 0, buffer.length, null, function(err) {
				if (err) {
						if (config.cvjs_debug) console.log("error savefile: "+err);
						res.send("error savefile: "+err);	
				}
				else
					fs.close(fd, function() {
						if (config.cvjs_debug) console.log('file written');
						res.send("Succes");	
					})
			});
		});
	}
	catch (e) {
		res.send("error - savefile");	
		if (config.cvjs_debug) console.log(e);
	}
});


    module.exports = router;

    
    