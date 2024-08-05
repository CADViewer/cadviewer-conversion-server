// savefile.js
// version: 9.7.1


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





	try {
		var fileName = req.body.file;
		var fileContent = req.body.file_content;
		var buffer = Buffer.from(fileContent);


        var serverlocationconcatenation = false;
		
        console.log("savefile:"+fileName+" first index:"+fileName.indexOf("/"));

        if (fileName.indexOf("http:")>-1 || fileName.indexOf("https:")>-1){

            // do nothing this is https
        }
        else{
            if (fileName.indexOf(":")>0 &&  fileName.indexOf(":")<3){   // this is an incorrect windows full path  / added at the front of full path

                // strip off first /
                if (fileName.indexOf("/") == 0 )
                    fileName = fileName.substring(1); 

            }
            else{

                // if relative path we concatenate the serverlocation, only if its not in the path
                if (fileName.indexOf("/") == 0 || fileName.indexOf("\\") == 0){

                    
			console.log("first part is / or \\ , it is at:"+fileName.indexOf(config.ServerLocation));

					if (fileName.indexOf(config.ServerLocation)==-1 || fileName.indexOf(config.ServerLocation)>3){
						console.log("no serverlocation in part, or begins after 3rd item");
						fileName = config.ServerLocation + fileName;

                        serverlocationconcatenation = true;


					}

		} 

            }



        }




        console.log("after:"+fileName);

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

	
		if (config.cvjs_debug) console.log("HERE "+fileName+" X"+config.ServerFrontEndUrl+"X  "+config.ServerUrl);
		
		if (fileName.indexOf(config.ServerFrontEndUrl)==0){
				// the ServerFrontEndUrl is replaced with ServerLocation

                if (serverlocationconcatenation){
                    // if already concatenated, do nothing
                }
                else{
                    fileName = config.ServerLocation + fileName.substring(config.ServerFrontEndUrl.length);
                }
		}
		else{
			if (fileName.indexOf(config.ServerUrl)==0){
					// the ServerUrl is replaced with ServerLocation
					fileName = config.ServerLocation + fileName.substring(config.ServerUrl.length);
			}			
		}

		fileName = fileName.replace(/\\/g, '/');
		
				
		//if (config.cvjs_debug) console.log(fileContent);
		if (config.cvjs_debug) console.log("savefile:"+ fileName);

		fs.open(fileName, 'w', function(err, fd) {			
			fs.write(fd, buffer, 0, buffer.length, null, function(err) {
				if (err) {
						if (config.cvjs_debug) console.log("error savefile: "+err);
						res.send("error savefile: "+err);	
				}
				else{
					fs.close(fd, function() {
						if (config.cvjs_debug) console.log('file written');
						res.send("Succes");	
					})
                }
			});
		});
	}
	catch (e) {
		res.send("error - savefile");	
		if (config.cvjs_debug) console.log(e);
	}
});


    module.exports = router;

    
    
