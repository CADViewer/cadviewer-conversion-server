var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();



// loadfile post - non conversion drawings

router.post('/uploadfile', (req, res) => {
		
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
	
    module.exports = router;
    
    