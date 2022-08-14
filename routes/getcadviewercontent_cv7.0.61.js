const { exit } = require('process');
var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();



// getCADViewerContent  - the callback from conversion

router.get('/getcadviewercontent', function (req, res) {

    
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed	
    	
        
        if (config.cvjs_debug) console.log("first in /getcadviewercontent");

        try {
            var remainOnServer = req.query.remainOnServer;
            var fileTag = req.query.fileTag;
            var Type = req.query.Type;

            var returnCadviewer = req.query.returnCadviewer;
            var pickOriginalFile = req.query.pickOriginalFile;
            var inputFile = config.fileLocation + fileTag +"."+Type;
            
                
            if (config.cvjs_debug) console.log('/loadfile: '+inputFile+" Remain on Server:  "+remainOnServer+" fileType="+Type+ " returnCadviewer="+returnCadviewer+ " pickOriginalFile="+pickOriginalFile);
            
            var fs = require('fs');



            if (pickOriginalFile == 1){

                try {
                    const data = fs.readFileSync(inputFile);

                    res.setHeader('Content-Type', 'application/octet-stream');        
                    res.send(data);   

                    console.log("pickOriginalFile return length="+data.length);
                    if (remainOnServer == 0){			
                        if (config.cvjs_debug) console.log("We have to clean the file!!!!!!");
                        
                        fs.unlink(inputFile, function (un_err) {
                            if (un_err) console.log('ERROR: app.get '+un_err)
                            else
                            if (config.cvjs_debug) console.log('File deleted!');
                            // if no error, file has been deleted successfully
                        });  				
    
                    }        

                    return;

                  } catch (err) {
                    console.error(err);
                    return;
                  }

            }


            if (returnCadviewer == 1){   // cadviewer response	

                    var randomInt = Math.floor(Math.random() * Math.floor(1000000));
                    var tempFileName = "/html/CV"+randomInt+".html";
                    var writeFile  = config.ServerLocation + tempFileName;           
                    var orgFile  = config.ServerLocation +"/html/CADViewer_base_680_restresponse.html";           
            
                    fs.copyFile(orgFile, writeFile, (err) => {
                        if (err) {
                          console.log("Error Found:", err);
                        }
                        else {                       
                            fs.readFile( writeFile, 'utf8', function(err, data) {						
                                // send string back up to request

                                var mystring0 = data.toString();

                                // console.log(mystring0);

                                var mystring1 = mystring0.substring(0, mystring0.indexOf("INSERTFILENAME"));
                                var mystring2 = mystring0.substring(mystring0.indexOf("INSERTFILENAME")+14);
                                //res.render(data);	
                                // inject the converted file into the document. 
                                mystring0 = mystring1+config.fileLocationUrl+"/" + fileTag + "." + Type+mystring2;
                                // update inputFile and return back. 
                                mystring1 = mystring0.substring(0, mystring0.indexOf("INSERTSERVERBACKEND"));
                                mystring2 = mystring0.substring(mystring0.indexOf("INSERTSERVERBACKEND")+19);

                                mystring0 = mystring1+config.ServerUrl+"/"+mystring2;

                                mystring1 = mystring0.substring(0, mystring0.indexOf("INSERTSERVERURL"));
                                mystring2 = mystring0.substring(mystring0.indexOf("INSERTSERVERURL")+15);


                                // this is hosted on CADViewer server so front-end and back-end are the same!!!!!

                                mystring0 = mystring1+config.ServerUrl+"/"+mystring2;

                                //console.log("mydata="+mydata)
                                fs.open(writeFile, 'w', function(err, fd) {		
                                    
                                    var buffer = Buffer.from(mystring0);
                                    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                                        if (err) {
                                                if (config.cvjs_debug) console.log("error savefile: "+err);
                                        }
                                        else
                                            fs.close(fd, function() {
                                                if (config.cvjs_debug) console.log('file written');
                                                res.sendFile(writeFile);
                                            });
                                    });
                                });
                    
                            });	
                    
                        }
                    });                    
                    
            }
            else{   // conversion response

                // svgz compression
                if (Type.indexOf("svgz")>-1 && config.cvjs_svgz_compress){   

                    fs.readFile( inputFile, function(err, data) {
                        if (err){
                            //throw err;
                            res.send("error - get /app/* "+err);  // no file
                            if (config.cvjs_debug) console.log(err);
                        }
                        else{
                                    
                            if (pickOriginalFile==1){
                                // load it up and send it

                                var zlib = require('zlib');
                                zlib.gunzip(data, {chunkSize: 65536}, function (err, data) {
                        
                                    var buf = new Buffer(data, 'utf-8'); 
                                    //var buf = Buffer.from(data);
                                    
                                    zlib.gzip(buf, function(_, result) { 
                                            res.setHeader('Content-Type', 'image/jpeg');        
                                            res.send(result);   
                                        });    
                                    });

                            } 
                            else{

                                var zlib = require('zlib');
                                zlib.gunzip(data, {chunkSize: 65536}, function (err, data) {
                        
                                    var buf = new Buffer(data, 'utf-8'); 
                                    //var buf = Buffer.from(data);
                                    
                                    zlib.gzip(buf, function(_, result) { 
                                        res.setHeader('Content-Type', 'image/svg+xml');
                                        res.setHeader('Content-Encoding', 'gzip');
    
                                        res.send(result);   
                                    });
                                });
    
                                if (remainOnServer == 0){			
                                    if (config.cvjs_debug) console.log("We have to clean the file!!!!!!");
                                    
                                    fs.unlink(inputFile, function (un_err) {
                                        if (un_err) console.log('ERROR: app.get '+un_err)
                                        else
                                        if (config.cvjs_debug) console.log('File deleted!');
                                        // if no error, file has been deleted successfully
                                    });  				
                
    
                                }        


                            }
                        }

                    });	
                
                }
                else{

                    fs.readFile( inputFile, 'utf8', function(err, data) {
                        // send string back up to request
                        if (Type.indexOf("svg") == 0){
                            // 6.9.06
                            if (pickOriginalFile==1){
                                res.setHeader('Content-Type', 'image/jpeg');
                            } 
                            else{
                                res.setHeader('Content-Type', 'image/svg+xml');
                            }


                        }        
                        if (Type.indexOf("json") == 0){
                            res.setHeader('Content-Type', 'application/json');
                        }
                        else{   // some binary data
                            res.setHeader('Content-Type', 'application/octet-stream');
                        }
                        
                        
                        // LinkList does not properly clean up content  - \& replace with &
                        if (Type.indexOf("json") == 0){
                            // fixed in linklist 23.05.25
                            // data = data.replaceAll('\\&','&');
                            


                        }


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

            }  // conversion response



        }
        catch (e) {
            res.send("error - getCADViewerContent");	
            if (config.cvjs_debug) console.log(e);
        }
        
    //    res.send("hello world!");
    //	if (config.cvjs_debug) console.log("get ");
    });
    


    module.exports = router;
    
    