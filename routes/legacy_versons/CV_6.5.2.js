// Version 6.4.45
const express = require('express');
const httprequest = require('request');
const app = express();
const bodyParser = require('body-parser');

var config = require('./CADViewer_config.json');

var cvjs_debug = config.cvjs_debug;
var version = "CADViewer Server v6.5.02"

var globalCounter = 0;

console.log("Version: "+version)
console.log("ServerUrl: "+config.ServerUrl);
console.log("ServerFrontEndUrl: "+config.ServerFrontEndUrl);
console.log("Callback: "+config.callbackMethod);
console.log("debug: "+config.cvjs_debug);


//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(bodyParser.json({limit: '99mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '99mb', extended: true, parameterLimit: 50000 }));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// CADViewer Pro  - handlers


// loadredline post - non conversion drawings
app.post('/loadredline', (req, res) => {
	
/*
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
*/	
	
	try {
		var inputFile = req.body.file;
		
		if (inputFile==undefined){
			inputFile = req.query.file
		}		

		inputFile = decodeURI(inputFile);
		inputFile = inputFile.replace(/%3A/g, ':');
		inputFile = inputFile.replace(/%2F/g, '/');
		inputFile = inputFile.replace(/%20/g, ' ');
		

		if (config.cvjs_debug) console.log('x1: '+inputFile+"  config.ServerFrontEndUrl="+config.ServerFrontEndUrl+" config.ServerUrl="+config.ServerUrl);		

	
		if (inputFile.indexOf(config.ServerFrontEndUrl)==0){
				// the ServerUrl is replaced with ServerLocation
				inputFile = config.ServerLocation + inputFile.substring(config.ServerFrontEndUrl.length);
		}else{
			if (inputFile.indexOf(config.ServerUrl)==0){
					// the ServerUrl is replaced with ServerLocation
					inputFile = config.ServerLocation + inputFile.substring(config.ServerUrl.length);
			}						
		}
				
	
		inputFile = inputFile.replace(/\\/g, '/');
		if (config.cvjs_debug) console.log(': '+inputFile+"  config.cvjs_Angular_path"+config.cvjs_Angular_path);		
		
		
		if (inputFile.indexOf(config.cvjs_Angular_path)==0){
				// the ServerUrl is replaced with ServerLocation
				inputFile = config.ServerLocation + inputFile.substring(config.cvjs_Angular_path.length);
		}
		
		
		
//		if (config.cvjs_debug) console.log('/loadfile: '+inputFile);
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
		res.send("error - loadredline");  // no file
		if (config.cvjs_debug) console.log(e);
	}
});

// loadfile post - non conversion drawings
app.post('/uploadfile', (req, res) => {
		
	req.setEncoding('binary');
if (config.cvjs_debug) console.log("first in upload file");
	var fs = require('fs');

	try {

		var uploadpath = req.param('ax-file-path');
		var name = req.param('ax-file-name');
		var ext = req.param('ax-allow-ext');
		var start = req.param('start');	
		var fileName = uploadpath + name;		
		var body = [];
		
        req.on('data', function (data) {
		   body.push(Buffer.from(data, 'binary'));
        });
        req.on('end', function () {
			
			var buffer = Buffer.concat(body);
			if (config.cvjs_debug) console.log("req.on.end buffer ..."+buffer.length);
			
			fs.open(fileName, 'w', function(err, fd) {				
			if (config.cvjs_debug) console.log("openfile w");
			
				fs.write(fd, buffer, 0, buffer.length, null, function(err) {

					if (config.cvjs_debug) console.log("write 0 to "+buffer.length);

					if (err) {
							if (config.cvjs_debug) console.log("error save upload: "+err);
							res.send("error save upload: "+err);	
					}
					else
						fs.close(fd, function() {
							if (config.cvjs_debug) console.log('upload file written');
							res.send("Succes");	
						})
				});
			});
        });
//		if (config.cvjs_debug) console.log('/uploadfile: !!! '+uploadpath+"  "+ext+"  "+name+"  "+start);
//		if (config.cvjs_debug) console.log(req.body);
		if (config.cvjs_debug) console.log('/uploadfile: !!! '+fileName);

	}
	catch (e) {
		res.send("error - uploadfile");  // no file
		if (config.cvjs_debug) console.log(e);
	}
	
});
	
	
// makesinglepagepdf
app.post('/makesinglepagepdf', (req, res) => {
// 6.1.25	
console.log("/makesinglepagepdf");	
	try {
	
	// parse content
    // make png
	// convert to pdf
		var fileName = req.body.fileName_0;
		var rotation = req.body.rotation_0;
		var pageformat = req.body.page_format_0;
		var base64_file = config.fileLocation + "/" + fileName + '_base64.png';
        var base64_content = ""; 

console.log("base64_file"+base64_file);

		var fs = require('fs');		
		fs.readFile( base64_file, 'utf8', function(err, data) {
		
//		base64_content = data;		
//console.log("data"+data);			
			
			if (err){
				res.send("error -loadfile: "+err);  // no file
				if (config.cvjs_debug) console.log(err);
			}
			else{
				base64_content = data;

				console.log("base64_content"+base64_content);

				let base64Image = base64_content.split(';base64,').pop();
				
				console.log("XX"+base64Image+"WW");
				fs.writeFile(config.fileLocation + "/" + fileName + '.png', base64Image, {encoding: 'base64'}, function(err) {
					console.log('File created');
				


			/*
					let buff = new Buffer(base64_content, 'base64');
					fs.writeFileSync(config.fileLocation + "/" + fileName + '.png', buff);		
			*/
					var commandline = config.converterLocation + config.ax2020_executable+" "+"-i=\""+config.fileLocation+fileName+".png\" -o=\""+config.fileLocation+fileName+".pdf\" -f=pdf -"+pageformat+" -"+rotation;

					const { exec } = require('child_process');
					exec(commandline, (err, stdout, stderr) => {
					  if (err) {
						// node couldn't execute the command
						if (config.cvjs_debug) console.log("Error exec() "+err);
						// error handling, method response with error 
						return;
					  }
					  
					  // the *entire* stdout and stderr (buffered)
					  if (config.cvjs_debug) console.log(`stdout-log: ${stdout}`);
					  if (config.cvjs_debug) console.log(`stderr-log: ${stderr}`);
					  
			// return link to pdf
					  res.send(fileName +".pdf");
							
					});	

				
				
				
				})			
			}
			
				
		});	



	}
	catch (e) {
		res.send("error - makesinglepagepdf");  // no file
		if (config.cvjs_debug) console.log(e);
	}
});

// makethumbnails
app.post('/makethumbnails', (req, res) => {
// 6.1.25	
console.log("/makethumbnails");	
	try {
	

	}
	catch (e) {
		res.send("error - makesinglepagepdf");  // no file
		if (config.cvjs_debug) console.log(e);
	}
});
	

// copyfile
app.post('/copyfile', (req, res) => {
	
console.log("/copyfile!");	
		
	try {
		var inputFile = req.body.localfilename;
		
		if (inputFile==undefined){
			inputFile = req.query.localfilename
		}		

		inputFile = decodeURI(inputFile);
		inputFile = inputFile.replace(/%3A/g, ':');
		inputFile = inputFile.replace(/%2F/g, '/');
		inputFile = inputFile.replace(/%20/g, ' ');

		var outputFile = req.body.localdestination;

		outputFile = decodeURI(outputFile);
		outputFile = outputFile.replace(/%3A/g, ':');
		outputFile = outputFile.replace(/%2F/g, '/');
		outputFile = outputFile.replace(/%20/g, ' ');

		if (inputFile.indexOf(config.ServerFrontEndUrl)==0){
				// the ServerUrl is replaced with ServerLocation
				inputFile = config.ServerLocation + inputFile.substring(config.ServerFrontEndUrl.length);
		}else{
			if (inputFile.indexOf(config.ServerUrl)==0){
					// the ServerUrl is replaced with ServerLocation
					inputFile = config.ServerLocation + inputFile.substring(config.ServerUrl.length);
			}						
		}
				

		inputFile = inputFile.replace(/\\/g, '/');
		if (config.cvjs_debug) console.log(': '+inputFile);		
		if (inputFile.indexOf(config.cvjs_Angular_path)==0){
				// the ServerUrl is replaced with ServerLocation
				inputFile = config.ServerLocation + inputFile.substring(config.cvjs_Angular_path.length);
		}
		

		if (outputFile.indexOf(config.ServerFrontEndUrl)==0){
				// the ServerUrl is replaced with ServerLocation
				outputFile = config.ServerLocation + outputFile.substring(config.ServerFrontEnd.length);
		}
		else{
			if (outputFile.indexOf(config.ServerUrl)==0){
					// the ServerUrl is replaced with ServerLocation
					outputFile = config.ServerLocation + outputFile.substring(config.ServerUrl.length);
			}
			
		}


			
		
		
		outputFile = outputFile.replace(/\\/g, '/');
		if (config.cvjs_debug) console.log(': '+outputFile);				
		if (outputFile.indexOf(config.cvjs_Angular_path)==0){
				// the ServerUrl is replaced with ServerLocation
				outputFile = config.ServerLocation + outputFile.substring(config.cvjs_Angular_path.length);
		}

	
//		if (config.cvjs_debug) console.log('/loadfile: '+inputFile);
		var fs = require('fs');
						
		fs.copyFile( inputFile, outputFile, function(err, data) {
			if (err){
				//throw err;
				res.send("error -copyfile: "+err);  // no file
				if (config.cvjs_debug) console.log(err);
			}
			else
				if (config.cvjs_debug) console.log("file copied!");
				res.send("Succes");
		});	
	}
	catch (e) {
		res.send("error - loadredline");  // no file
		if (config.cvjs_debug) console.log(e);
	}
});


app.post('/listdirectory', (req, res) => {
				
/*
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
*/	
	
	try {
		var directory = req.body.directory;

		directory = decodeURI(directory);
		directory = directory.replace(/%3A/g, ':');
		directory = directory.replace(/%2F/g, '/');
		directory = directory.replace(/%20/g, ' ');

		if (config.cvjs_debug) console.log('1 /directory: '+directory);		
		
		
		if (directory.indexOf(config.ServerFrontEndUrl)==0){
				// the ServerUrl is replaced with ServerLocation
				inputFile = config.ServerLocation + directory.substring(config.ServerFrontEndUrl.length);
		}else{
			if (directory.indexOf(config.ServerUrl)==0){
					// the ServerUrl is replaced with ServerLocation
					directory = config.ServerLocation + directory.substring(config.ServerUrl.length);
			}						
		}
	

	
		// change \ to /	

		if (config.cvjs_debug) console.log('1A /directory: '+directory);		

		
		directory = directory.replace(/\\/g, '/');
		if (config.cvjs_debug) console.log('/directory: '+directory+"  config.cvjs_Angular_path"+config.cvjs_Angular_path);		
		
		if (directory.indexOf(config.cvjs_Angular_path)==0){
				// the ServerUrl is replaced with ServerLocation
				directory = config.ServerLocation + directory.substring(config.cvjs_Angular_path.length);
		}
				
		if (config.cvjs_debug) console.log('2 /directory: '+directory);		
				
		const fs = require('fs');
		var dir_content = "";
		
		var files = fs.readdirSync(directory);
		for (var i in files){
			var name = files[i];
			if (config.cvjs_debug) console.log(name);
		    if (!(name.indexOf(".rw")>0)) dir_content= dir_content + "<br>" +name;			
		}		
		res.send(dir_content);
	}
	catch (e) {
		res.send("error listdirectory");  // no file
		if (config.cvjs_debug) console.log(e);
	}
});



app.post('/listdirectoryredlines', (req, res) => {
				
/*
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
*/	
	
	try {
		var directory = req.body.directory;
	
		directory = decodeURI(directory);
		directory = directory.replace(/%3A/g, ':');
		directory = directory.replace(/%2F/g, '/');
		directory = directory.replace(/%20/g, ' ');
	
		if (directory.indexOf(config.ServerFrontEndUrl)==0){
				// the ServerUrl is replaced with ServerLocation
				directory = config.ServerLocation + directory.substring(config.ServerUrl.length);
		}

		// change \ to /	

		directory = directory.replace(/\\/g, '/');
		if (config.cvjs_debug) console.log('/directory: '+directory+"  config.cvjs_Angular_path"+config.cvjs_Angular_path);		
		

		if (directory.indexOf(config.cvjs_Angular_path)==0){
				// the ServerUrl is replaced with ServerLocation
				directory = config.ServerLocation + directory.substring(config.cvjs_Angular_path.length);
		}
				
				
		if (directory.indexOf(config.ServerFrontEndUrl)==0){
				// the ServerUrl is replaced with ServerLocation
				inputFile = config.ServerLocation + directory.substring(config.ServerFrontEndUrl.length);
		}else{
			if (directory.indexOf(config.ServerUrl)==0){
					// the ServerUrl is replaced with ServerLocation
					directory = config.ServerLocation + directory.substring(config.ServerUrl.length);
			}						
		}

				
				
		if (config.cvjs_debug) console.log('2 /directory: '+directory);		
				
		const fs = require('fs');
		var dir_content = "";
		
		var files = fs.readdirSync(directory);
		for (var i in files){
			var name = files[i];
			if (config.cvjs_debug) console.log(name);
		    if (!(name.indexOf(".rw")>0)) dir_content= dir_content +"<br>" +name;			
		}		
		res.send(dir_content);
	}
	catch (e) {
		res.send("error listdirectoryredlines");  // no file
		if (config.cvjs_debug) console.log(e);
	}
});


// saveredline
app.post('/saveredline', (req, res) => {
	
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
		
		var fs = require('fs');
			
		//if (config.cvjs_debug) console.log(fileContent);
		if (config.cvjs_debug) console.log("saveredline  "+ fileName);
	
		fileName = decodeURI(fileName);
		fileName = fileName.replace(/%3A/g, ':');
		fileName = fileName.replace(/%2F/g, '/');
		fileName = fileName.replace(/%20/g, ' ');
	
		if (config.cvjs_debug) console.log("saveredline  "+ fileName);
	
			
		if (fileName.indexOf(config.ServerFrontEndUrl)==0){
				// the ServerUrl is replaced with ServerLocation
				fileName = config.ServerLocation + fileName.substring(config.ServerFrontEndUrl.length);
		}else{
			if (fileName.indexOf(config.ServerUrl)==0){
					// the ServerUrl is replaced with ServerLocation
					fileName= config.ServerLocation + fileName.substring(config.ServerUrl.length);
			}						
		}
		

		
		fileName = fileName.replace(/\\/g, '/');
		
		if (fileName.indexOf(config.cvjs_Angular_path)==0){
				// the ServerUrl is replaced with ServerLocation
				fileName = config.ServerLocation + fileName.substring(config.cvjs_Angular_path.length);
		}
		
		
		fs.open(fileName, 'w', function(err, fd) {
			
			fs.write(fd, buffer, 0, buffer.length, null, function(err) {
				if (err) {
						if (config.cvjs_debug) console.log("error saveredlines: "+err);
						res.send("error saveredlines: "+err);	
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
		res.send("error - saveredline");  // no file
		if (config.cvjs_debug) console.log(e);
	}
});



const path = require('path');
const fs = require('fs');

function createDirRecursively(dir) {
    if (!fs.existsSync(dir)) {        
        createDirRecursively(path.join(dir, ".."));
        fs.mkdirSync(dir);
    }
}


// savefile
app.post('/savefile', (req, res) => {

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
		
		var fs = require('fs');

		var path = require('path');
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

		
		console.log("HERE "+fileName+" "+config.ServerFrontEndUrl+"  "+config.ServerUrl);
		
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
		
		
		if (fileName.indexOf(config.cvjs_Angular_path)==0){
				// the ServerUrl is replaced with ServerLocation
				fileName = config.ServerLocation + fileName.substring(config.cvjs_Angular_path.length);
		}
		
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



// appendfile
app.post('/appendfile', (req, res) => {

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
		
		var fs = require('fs');

		fileName = decodeURI(fileName);
		fileName = fileName.replace(/%3A/g, ':');
		fileName = fileName.replace(/%2F/g, '/');
		fileName = fileName.replace(/%20/g, ' ');
		
		if (fileName.indexOf(config.ServerFrontEndUrl)==0){
				// the ServerUrl is replaced with ServerLocation
				fileName = config.ServerLocation + fileName.substring(config.ServerFrontEndUrl.length);
		}else{
			if (fileName.indexOf(config.ServerUrl)==0){
					// the ServerUrl is replaced with ServerLocation
					fileName= config.ServerLocation + fileName.substring(config.ServerUrl.length);
			}						
		}



		fileName = fileName.replace(/\\/g, '/');
		
		if (fileName.indexOf(config.cvjs_Angular_path)==0){
				// the ServerUrl is replaced with ServerLocation
				fileName = config.ServerLocation + fileName.substring(config.cvjs_Angular_path.length);
		}
				
		//if (config.cvjs_debug) console.log(fileContent);
		if (config.cvjs_debug) console.log("appendfile"+ fileName);

		fs.open(fileName, 'a', function(err, fd) {
			
			fs.write(fd, buffer, 0, buffer.length, null, function(err) {
				if (err) {
						if (config.cvjs_debug) console.log("error append file: "+err);
						res.send("error append file: "+err);	
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
		res.send("error - appendfile");	
		if (config.cvjs_debug) console.log(e);
	}
});

// getFile_09  - the callback from conversion
app.get('/getFile_09', function (req, res) {

/*
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
*/	
	
	try {
		var remainOnServer = req.query.remainOnServer;
		var fileTag = req.query.fileTag;
		var Type = req.query.Type;
			
		var inputFile = config.fileLocation + fileTag +"."+Type;
				
		if (config.cvjs_debug) console.log('/loadfile: '+inputFile+" Remain on Server:  "+remainOnServer);
		
		var fs = require('fs');
		fs.readFile( inputFile, 'utf8', function(err, data) {
			// send string back up to request
			//res.render(data);	
			res.send(data);	
			if (remainOnServer == 0){			
				if (config.cvjs_debug) console.log("We have to clean the file!!!!!!");
				
				fs.unlink(inputFile, function (un_err) {
					if (un_err) console.log('ERROR: app.get '+un_err)
					else
					if (config.cvjs_debug) console.log('File deleted!');
					// if no error, file has been deleted successfully
				});  				
			}
		});	
	}
	catch (e) {
		res.send("error - getFile_09");	
		if (config.cvjs_debug) console.log(e);
	}
	
//    res.send("hello world!");
//	if (config.cvjs_debug) console.log("get ");
});


app.post('/returnpdfparams', (req, res) => {

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


// callapiconversion
app.post('/callapiconversion', (req, res) => {

	try{

		/*
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
			res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
		*/	

		// get request:
		//if (config.cvjs_debug) console.log(" body: "+req.body);
		if (cvjs_debug) if (config.cvjs_debug) console.log(" body.request: "+req.body.request);
		
		// CADViewer JS request 
		var cvjsRequest = req.body.request;	
		var cvjsRequestJSON = JSON.parse(cvjsRequest);

		var action = cvjsRequestJSON.action;
		var converter = cvjsRequestJSON.converter;
		var version = cvjsRequestJSON.version;
		var contentLocation = cvjsRequestJSON.contentLocation;
		var contentType = cvjsRequestJSON.contentType;
		var contentFormat = cvjsRequestJSON.contentFormat;
		var contentUsername = cvjsRequestJSON.contentUsername;
		var contentPassword = cvjsRequestJSON.contentPassword;
		var userLabel= cvjsRequestJSON.userLabel;
		var contentResponse= cvjsRequestJSON.contentResponse;
		var leaveStreamOnServer= cvjsRequestJSON.leaveStreamOnServer;

		if (cvjs_debug) if (config.cvjs_debug) console.log(" contentLocation: "+cvjsRequestJSON.contentLocation);

		var paramName = new Array();
		var paramValue = new Array();
		var outputFormat = "";
		var parameters = "";
		
		for (var i = 0; i < cvjsRequestJSON.parameters.length; i++) {
			paramName[i] = cvjsRequestJSON.parameters[i].paramName; //some game data
			paramValue[i] = cvjsRequestJSON.parameters[i].paramValue; //some game data

			if (paramName[i]=="f" ) outputFormat = paramValue[i];
			
			// we build the parameter list 
			if (paramValue[i] == ""){ 
				parameters = parameters +"-"+paramName[i]+" ";
			}
			else{
				if (paramName[i]=="layout" ){
					parameters = parameters + "-" +paramName[i] + "=\"" +paramValue[i]+"\" ";
				}
				else{ 
					parameters = parameters + "-" +paramName[i] + "=\"" +paramValue[i]+"\" ";
				}
			}
	//		if (cvjs_debug) if (config.cvjs_debug) console.log(" "+paramName[i]+"  "+paramValue[i]);
		}
		
		// we assume either 
		// 1: http address on this server or
		// 2: full path on this server
		// first we url decode 
		
		contentLocation = decodeURI(contentLocation);
		contentLocation = contentLocation.replace(/%3A/g, ':');
		contentLocation = contentLocation.replace(/%2F/g, '/');
		contentLocation = contentLocation.replace(/%20/g, ' ');
		
		
		if (config.cvjs_debug) console.log("\n\r \n\r  decodeURL contentLocation: "+contentLocation+" Server URL: "+config.ServerUrl+" \n\r ");
	
		if (contentLocation.indexOf(config.ServerFrontEndUrl)==0){
				// the ServerFrontEndUrl is replaced with ServerLocation
				contentLocation = config.ServerLocation + contentLocation.substring(config.ServerFrontEndUrl.length);
		}
		else{
			if (contentLocation.indexOf(config.ServerUrl)==0){
					// the ServerUrl is replaced with ServerLocation
					contentLocation = config.ServerLocation + contentLocation.substring(config.ServerUrl.length);
			}			
		}
		
		
		if (config.cvjs_debug) console.log("HERE "+contentLocation+" "+config.ServerFrontEndUrl+"  "+config.ServerUrl);
		if (config.cvjs_debug) console.log("Server Location contentLocation: "+contentLocation);
		
		var randomInt = Math.floor(Math.random() * Math.floor(1000000));
		var tempFileName = "F"+randomInt;
		var writeFile  = config.fileLocation + tempFileName + "." + outputFormat;
	
		// in case of pdf creation, we make temp dir + filename similar to php setup
		// 6.1.25 / 25
		if (action == "pdf_creation"){
			var writeFolder = config.fileLocation + "pdf/" + randomInt;
			var fs = require('fs');
			if (!fs.existsSync(writeFolder)){
				fs.mkdirSync(writeFolder);
			}
			var outputFName = contentLocation;
			
			if (outputFName.lastIndexOf("/")>0) outputFName = outputFName.substring(outputFName.lastIndexOf("/")+1);
			if (outputFName.lastIndexOf("\\")>0) outputFName = outputFName.substring(outputFName.lastIndexOf("\\")+1);
			outputFName = outputFName.substring(0, outputFName.indexOf("."));
			
			tempFileName = "pdf/" + randomInt +"/" + outputFName;
			writeFile  = config.fileLocation + tempFileName + "." + outputFormat;
		}
		
		
		// end 	
		if (cvjs_debug) console.log("writeFile="+writeFile);
		if (cvjs_debug) console.log("BEFORE HTTP BRANCH "+contentLocation);

		// 6.2.69 
		// if it is an SVG on the server then we simply echo it back up
		if (contentLocation.indexOf("http:")==-1  && contentLocation.indexOf("https:")==-1){
			var fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".svg");
            if (cvjs_debug) console.log("fileFormatFlag: "+fileFormatFlag);
			var fileFormat = ".none";			

			if (fileFormatFlag>-1){   // we have svg
				fileFormat = ".svg";

                // 6.4.21
                var fs = require('fs');						
                fs.copyFile( contentLocation, config.fileLocation +tempFileName+".svg", function(err, data) {
                    if (err){
                        if (config.cvjs_debug) console.log(err);
                    }
                    else
                        if (config.cvjs_debug) console.log("file copied!");
                });	

                var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocation+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+config.ServerUrl+"/"+config.callbackMethod+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";
                if (config.cvjs_debug) console.log("response svg: "+CVJSresponse);
                // send callback message and terminate
                res.send(CVJSresponse);
                return;
			}
		}
		
		
		// 6.2.37 - If http file, then it must be downloaded to server	
		if (contentLocation.indexOf("http:")>-1  || contentLocation.indexOf("https:")>-1){  // download file
			// download the file
			if (contentLocation.indexOf("http")>0)
				contentLocation = contentLocation.substring(contentLocation.indexOf("http"));
			
			var fileFormat = ".none";			
			var fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".dwg");
			if (fileFormatFlag>-1){ 
				fileFormat = ".dwg";
			}
			else{
				fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".dxf");
				if (fileFormatFlag>-1){ 
					fileFormat = ".dxf";
				}
				else{
					fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".dwf");
					if (fileFormatFlag>-1){ 
						fileFormat = ".dwf";
					}
					else{
						fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".tif");
						if (fileFormatFlag>-1){ 
							fileFormat = ".tif";
						}
						else{
							fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".dwg");
							if (fileFormatFlag>-1){ 
								fileFormat = ".dgn";
							}
							else{

								fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".pcf");
								if (fileFormatFlag>-1){ 
									fileFormat = ".pcf";
								}
								else{

									fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".pdf");
									if (fileFormatFlag>-1){ 
										fileFormat = ".pdf";
									}
									else{

										fileFormatFlag = contentLocation.toLowerCase().lastIndexOf(".svg");
										if (fileFormatFlag>-1){ 
											fileFormat = ".svg";
										}
										else{
		
										}	

									}	
								}							
							}							
						}						
					}			
				}
			}
						
			var newcontentLocation = config.fileLocation + tempFileName + fileFormat;			
			var fs = require('fs');
			httprequest(contentLocation).pipe(fs.createWriteStream(newcontentLocation))
			.on('error', () => {
				console.log('ERROR');
			  })
		    .on('finish', () => {
			  			  
				contentLocation = newcontentLocation;
		
				// if SVG we simply tell the front to pick it up the file back up from its new location

				if ( fileFormat == ".svg"){
						
					var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+0+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocation+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+config.ServerUrl+"/"+config.callbackMethod+"?remainOnServer=1&fileTag="+tempFileName+"&Type=svg\"}";

					if (config.cvjs_debug) console.log(CVJSresponse);
					// send callback message and terminate
					res.send(CVJSresponse);
					return;

				}
				
					// building the command line
					var commandline = config.converterLocation + config.ax2020_executable+" "+"-i=\""+contentLocation+"\" -o=\""+writeFile+"\" ";		
					commandline = commandline + parameters;		
					if (parameters.indexOf("lpath")>-1){}
					else
						commandline = commandline + "-lpath=\""+config.licenseLocation+"\" ";
					
					if (parameters.indexOf("xpath")>-1){}
					else
						commandline = commandline + "-xpath=\""+contentLocation.substring(0, contentLocation.lastIndexOf("/")+1)+"\" ";
					

					if (parameters.indexOf("fpath")>-1){}
					else
						commandline = commandline + "-fpath=\""+config.fontLocation+"\" ";
					
					if (cvjs_debug) if (config.cvjs_debug) console.log("commandline "+commandline+"XXX");
					
					// execute ax2020
						
					const { exec } = require('child_process');
					exec(commandline, (err, stdout, stderr) => {
					  if (err) {
						// node couldn't execute the command
						if (config.cvjs_debug) console.log("Error exec() "+err);
						
						// error handling, method response with error 
						
						return;
					  }
					  
					  // the *entire* stdout and stderr (buffered)
					  if (config.cvjs_debug) console.log(`stdout-log: ${stdout}`);
					  if (config.cvjs_debug) console.log(`stderr-log: ${stderr}`);
					  
					  AX2020_callback(res, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName);	  
						
								
				});	

		   });;			
										
			
		}
		else{  // standard execution
		
			
			// building the command line
			var commandline = config.converterLocation + config.ax2020_executable+" "+"-i=\""+contentLocation+"\" -o=\""+writeFile+"\" ";		
			commandline = commandline + parameters;		
			if (parameters.indexOf("lpath")>-1){}
			else
				commandline = commandline + "-lpath=\""+config.licenseLocation+"\" ";
			
			if (parameters.indexOf("xpath")>-1){}
			else
				commandline = commandline + "-xpath=\""+contentLocation.substring(0, contentLocation.lastIndexOf("/")+1)+"\" ";
			

			if (parameters.indexOf("fpath")>-1){}
			else
				commandline = commandline + "-fpath=\""+config.fontLocation+"\" ";
			
			if (cvjs_debug) if (config.cvjs_debug) console.log("commandline "+commandline+"XXX");
			
			// execute ax2020
				
			const { exec } = require('child_process');
			exec(commandline, (err, stdout, stderr) => {
			  if (err) {
				// node couldn't execute the command
				if (config.cvjs_debug) console.log("Error exec() "+err);
				
				// error handling, method response with error 
				
				return;
			  }
			  
			  // the *entire* stdout and stderr (buffered)
			  if (config.cvjs_debug) console.log(`stdout-log: ${stdout}`);
			  if (config.cvjs_debug) console.log(`stderr-log: ${stderr}`);
			  
			  AX2020_callback(res, outputFormat, contentLocation, config.ServerUrl+"/"+config.callbackMethod, tempFileName);	  
			
			});	
						
		}
			
	}
	catch (e) {
		res.send("callapiconversion"+e);	
		if (config.cvjs_debug) console.log(e);
	}
		

});



function   AX2020_callback(res, outputFormat, contentLocation, callbackMethod, tempFileName){
	

	try{	


		globalCounter++;

		if (config.cvjs_debug) console.log("AX2020_callback  - global counter: "+globalCounter);
		
		if (outputFormat.toLowerCase().indexOf("svg")>-1){
	
			var exitCode = 0;
			var CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocation+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?remainOnServer=0&fileTag="+tempFileName+"&Type=svg\"}";
	
			if (cvjs_debug) if (config.cvjs_debug) console.log(CVJSresponse);
			// send callback message and terminate
			res.send(CVJSresponse);
		}
		else{
			if (outputFormat.toLowerCase().indexOf("pdf")>-1){
	
				// we need to change the location into a string with fileload
				
				var contentStream = config.ServerUrl+"/files?file="+config.fileLocationUrl.substring(config.ServerUrl.length)+tempFileName+"."+outputFormat
			
				var exitCode = 0;
				var CVJSresponse = "{\"completedAction\":\"pdf_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocation+"\",\"contentResponse\":\"file\",\"contentStreamData\":\""+contentStream+"\"}";
		//		var CVJSresponse = "{\"completedAction\":\"pdf_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2020\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocation+"\",\"contentResponse\":\"file\",\"contentStreamData\":\""+config.fileLocationUrl+tempFileName+"."+outputFormat+"\"}";
		//				String CVJSresponse = "{\"completedAction\":\"svg_creation\",\"errorCode\":\"E"+exitCode+"\",\"converter\":\"AutoXchange AX2017\",\"version\":\"V1.00\",\"userLabel\":\"fromCADViewerJS\",\"contentLocation\":\""+contentLocation+"\",\"contentResponse\":\"stream\",\"contentStreamData\":\""+callbackMethod+"?remainOnServer=0&fileTag="+tempFileName+"&Type=svg\"}";
				if (cvjs_debug) if (config.cvjs_debug) console.log(CVJSresponse);
				// send callback message and terminate
				res.send(CVJSresponse);
			}
		}
		if (config.cvjs_debug) console.log("finished - AX2020_callback");	
			
	
	}
	catch (e) {
		res.send("AX2020_callback:"+e);	
		if (config.cvjs_debug) console.log("AX2020_callback:"+e);
	}
	
};


app.get('/returnpdfparams', function (req, res) {

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
	
//	res.sendFile(config.temp_print_folder + '/'+ printfile);
	if (config.cvjs_debug) console.log("we are sending "+responseParam);



}
catch (e) {
	res.send("returnpdfparams:"+e);	
	if (config.cvjs_debug) console.log("returnpdfparams:"+e);
}


});





app.get('/temp_print', function (req, res) {

try{	
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed	

	var printfile = req.query.file;

	 res.sendFile(config.temp_print_folder + '/'+ printfile);
	
	if (config.cvjs_debug) console.log("we are sending "+config.temp_print_folder + '/'+ printfile);



}
catch (e) {
	res.send("temp_print:"+e);	
	if (config.cvjs_debug) console.log("temp_print:"+e);
}



});


app.get('/files', function (req, res) {

try{	
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed	

	var file = req.query.file;

	 res.sendFile(config.ServerLocation + '/'+ file);
	
	if (config.cvjs_debug) console.log("we are sending "+config.ServerLocation + '/'+ file);




}
catch (e) {
	res.send("files:"+e);	
	if (config.cvjs_debug) console.log("files:"+e);
}



});


// merge DWG files
app.post('/mergedwg', (req, res) => {

try{

	var base_file = req.body.base_file;	
	var merge_file = req.body.merge_file;	
	var out_file = req.body.out_file;	
 
	var executable = config.dwgmergeLocation + '/' + config.dwgmerge2020_executable;
	
	var commandline = executable + ' -base="' + base_file + '" -merge="' + merge_file + '" -out="' +out_file +'" -over -lpath="' + config.dwgmergeLocation +'"' ;

	if (config.cvjs_debug)	console.log("MERGE command line: "+commandline);


	const { exec } = require('child_process');
	exec(commandline, (err, stdout, stderr) => {
	  if (err) {
		// node couldn't execute the command
		if (config.cvjs_debug) console.log("Error exec() "+err);		
		res.send("error merge");  // no file
		return;
	  }
	  
	  // the *entire* stdout and stderr (buffered)
	  res.send(`stdout-log: ${stdout}`);
	  if (cvjs_debug) console.log(`stderr-log: ${stderr}`);  
	
	});	


}
catch (e) {
	res.send("mergedwg:"+e);	
	if (config.cvjs_debug) console.log("mergedwg:"+e);
}



});




// test + direct load parameter

// loadfile get
app.get('/helloworld', function (req, res) {
	if (config.cvjs_debug) console.log("hello ");	
    res.send("hello world!");
});


// loadfile get - direct load of file content
app.get('/loadfile', function (req, res) {
	
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


// loadfile get  - we set the content path  
app.get('/directload', function (req, res) {
	
	
	try {
		if (config.cvjs_debug) console.log("directload");	

	
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
		res.setHeader('Access-Control-Allow-Credentials', true); // If needed	

		var inputFile = req.query.filename;
		
		if (inputFile==undefined){
			inputFile = req.body.filename;
		}			
			
		inputFile = decodeURI(inputFile);
		inputFile = inputFile.replace(/%3A/g, ':');
		inputFile = inputFile.replace(/%2F/g, '/');
		inputFile = inputFile.replace(/%20/g, ' ');

		inputFile = config.ServerLocation + inputFile;
				
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


// loadfile post - non conversion drawings
app.post('/loadfile', (req, res) => {
		
	
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



// 6.4.34  - loading of content for print Modal

app.get('/app/*', (req, res) => {

    try{
        var inputFile = req.path;
		inputFile = decodeURI(inputFile);
		inputFile = inputFile.replace(/%3A/g, ':');
		inputFile = inputFile.replace(/%2F/g, '/');
		inputFile = inputFile.replace(/%20/g, ' ');
		
        inputFile = config.ServerLocation + inputFile
            
        var fs = require('fs');
        fs.readFile( inputFile, 'utf8', function(err, data) {
            if (err){
                //throw err;
                res.send("error - get /app/* "+err);  // no file
                if (config.cvjs_debug) console.log(err);
            }
            else

                res.send(data);	
            // send string back up to request
        });	
//        res.send("flat  /app/* path:"+req.path);
    }
    catch(e){
        res.send("error - get /app/*");  // no file
        if (config.cvjs_debug) console.log("error - get /app/*"+e);
    }    
});


app.get('/converters/files/*', (req, res) => {

    try{

        var inputFile = req.path;
		inputFile = decodeURI(inputFile);
		inputFile = inputFile.replace(/%3A/g, ':');
		inputFile = inputFile.replace(/%2F/g, '/');
		inputFile = inputFile.replace(/%20/g, ' ');
		
        inputFile = config.ServerLocation + inputFile
            
        var fs = require('fs');
        fs.readFile( inputFile, 'utf8', function(err, data) {
            if (err){
                //throw err;
                res.send("error - get /content/files/* "+err);  // no file
                if (config.cvjs_debug) console.log(err);
            }
            else

                // if it is a svg we have to parse that...
                if (inputFile.indexOf(".svg")>-1){

                    var xmlheader = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>"
                    var xmllength =  xmlheader.length;
                    if (config.cvjs_debug) console.log("xml length "+xmllength);

                    if (data.indexOf(xmlheader) == 0) 
                        data = data.substring(xmllength)

                    res.header("Content-Type","image/svg+xml");
                    res.send(data);	

                }
                else{
                    // other files we just pass back
                    res.send(data);	
                }
                
            // send string back up to request
        });	
    }
    catch(e){
        res.send("error - get /content/files/*");  // no file
        if (config.cvjs_debug) console.log("error - get /content/files/*"+e);
    }      
});



app.listen(3000, () => console.log('CADViewer Server is listening on port 3000!'))
//app.listen(3000, '127.0.0.1');

/**
app.listen(3000,'127.0.0.1',function(){
  if (config.cvjs_debug) console.log('Server running at http://127.0.1.1:3000/')
})
**/
