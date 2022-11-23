var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

const httprequest = require('request');

var express = require('express'),
    router = express.Router();

function loadFile(req,res){

	try {
		        
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
		
		if (config.cvjs_debug) console.log("get-post /loadfile");

		var inputFile = req.body.file;
		
		if (inputFile == undefined){
			inputFile = req.query.file
		}			
					
        var loadtype = req.body.loadtype;
		if (loadtype == undefined){
			loadtype = req.query.loadtype;
		}			


		if (config.cvjs_debug) console.log('1: /loadfile: '+inputFile+"  loadtype= "+loadtype);
	
        
		inputFile = decodeURI(inputFile);
		inputFile = inputFile.replace(/%3A/g, ':');
		inputFile = inputFile.replace(/%2F/g, '/');
		inputFile = inputFile.replace(/%20/g, ' ');
        inputFile = inputFile.replaceAll("+", ' ');


        console.log("inputFile="+inputFile);
	
		if (inputFile.indexOf(config.ServerFrontEndUrl)==0 && (inputFile.indexOf(config.ServerUrl)!=0)){
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
                // 7.0.70   - menufile / languagefile
                if ((loadtype!= undefined && loadtype.indexOf("menufile")==0) || (loadtype!= undefined && loadtype.indexOf("languagefile")==0) || (loadtype!= undefined && loadtype.indexOf("merge")==0) || (loadtype!= undefined && loadtype.indexOf("redline")==0)){

                    if (inputFile.indexOf("http:")==0 || inputFile.indexOf("https:")==0){
                        // do nothing  - this is a call with http or https
                    }
                    else 
                        inputFile = config.ServerLocation + inputFile;
                }
            }			
        }
    
		if (config.cvjs_debug) console.log('2:  /loadfile: '+inputFile+"   ");

        var fs = require('fs');


        if (inputFile.indexOf("http")==0){

            var randomInt = Math.floor(Math.random() * Math.floor(1000000));
            var tempFileName = "F"+randomInt;

            var outputFormat = inputFile.substring(inputFile.lastIndexOf(".")+1);

            var newcontentLocation  = config.fileLocation + tempFileName + "." + outputFormat;           
    
            if (cvjs_debug) console.log("newcontenLocation "+newcontentLocation);

            var fs = require('fs');
            httprequest(inputFile).pipe(fs.createWriteStream(newcontentLocation))
            .on('error', () => {
                console.log('ERROR - httprequest/createWriteStream does this location exist?: '+inputFile);
                res.send("/loadfile - error");	
              })
            .on('finish', () => {

                if (cvjs_debug) console.log("finshed loading "+inputFile+" , writing to: "+newcontentLocation);

                var data = fs.readFileSync(newcontentLocation);

                if (outputFormat.indexOf("png")==0) 
                    res.setHeader('Content-Type', 'image/png')
                else
                if (outputFormat.indexOf("jpg")==0) 
                    res.setHeader('Content-Type', 'image/jpeg')
                else
                if (outputFormat.indexOf("jpeg")==0) 
                    res.setHeader('Content-Type', 'image/jpeg')
                else
                if (outputFormat.indexOf("gif")==0) 
                    res.setHeader('Content-Type', 'image/gif')
                else
                if (outputFormat.indexOf("json")==0) 
                    res.setHeader('Content-Type', 'application/json')
                else
                if (outputFormat.indexOf("svg")==0) 
                    res.setHeader('Content-Type', 'image/svg+xml')
                else
                if (outputFormat.indexOf("dwg")==0) {
                    res.setHeader('Content-Type', 'application/dwg');
                    var returnfilename = inputFile.substring(inputFile.lastIndexOf("/")+1);
                    res.setHeader('Content-Disposition', 'attachment;filename="'+returnfilename+'"');
                }
                else
                res.setHeader('Content-Type', 'text/plain')

                if (cvjs_debug) console.log("4:"+outputFormat);
                if (cvjs_debug) console.log(" reading and sending data png:"+ (outputFormat.indexOf("png")==0));

                res.send(data);	

//                fs.readFile( newcontentLocation, 'utf8', function(err, data) {						
                    // send string back up to request
                    //res.render(data);	
                });	

 //           })
        }
        else{

            var data = fs.readFileSync(inputFile);

            var outputFormat = inputFile.substring(inputFile.lastIndexOf(".")+1);

            if (outputFormat.indexOf("png")==0) 
                res.setHeader('Content-Type', 'image/png')
            else
            if (outputFormat.indexOf("jpg")==0) 
                res.setHeader('Content-Type', 'image/jpeg')
            else
            if (outputFormat.indexOf("jpeg")==0) 
                res.setHeader('Content-Type', 'image/jpeg')
            else
            if (outputFormat.indexOf("gif")==0) 
                res.setHeader('Content-Type', 'image/gif')
            else
            if (outputFormat.indexOf("json")==0) 
                res.setHeader('Content-Type', 'application/json')
            else
            if (outputFormat.indexOf("svg")==0) 
                res.setHeader('Content-Type', 'image/svg+xml')
            else
            if (outputFormat.indexOf("dwg")==0) {
                res.setHeader('Content-Type', 'application/dwg')
                var returnfilename = inputFile.substring(inputFile.lastIndexOf("/")+1);
                res.setHeader('Content-Disposition', 'attachment;filename="'+returnfilename+'"');
        }
            else
                res.setHeader('Content-Type', 'text/plain')

            if (cvjs_debug) console.log("3:"+outputFormat);

            res.send(data);	

            /*
            fs.readFile( inputFile, 'utf8', function(err, data) {						
                // send string back up to request
                //res.render(data);	
                res.send(data);	
            });	
            */

        }
	}
	catch (e) {
		res.send("error - loadfile");	
		if (config.cvjs_debug) console.log("Error loadfile:"+e);
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
    
    