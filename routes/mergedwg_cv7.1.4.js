var config = require('../CADViewer_config.json');
var cvjs_debug = config.cvjs_debug;

var express = require('express'),
    router = express.Router();



// merge DWG files

router.post('/mergedwg', (req, res) => {

    try{
    
        var base_file = req.body.base_file;	
        var merge_file = req.body.merge_file;	
        var out_file = req.body.out_file;	
     
        if (base_file.indexOf(config.ServerUrl)==0){
            // the ServerUrl is replaced with ServerLocation
            base_file = config.ServerLocation + base_file.substring(config.ServerUrl.length);
        }
        else{
            // we add serverlocation
            base_file = config.ServerLocation + base_file;
        }			


        if (merge_file.indexOf(config.ServerUrl)==0){
            // the ServerUrl is replaced with ServerLocation
            merge_file = config.ServerLocation + merge_file.substring(config.ServerUrl.length);
        }
        else{
            // we add serverlocation
            merge_file = config.ServerLocation + merge_file;
        }			


        if (out_file.indexOf(config.ServerUrl)==0){
            // the ServerUrl is replaced with ServerLocation
            out_file = config.ServerLocation + out_file.substring(config.ServerUrl.length);
        }
        else{
            // we add serverlocation
            out_file = config.ServerLocation + out_file;
        }			


        var executable = config.dwgmergeLocation + '/' + config.dwgmerge2020_executable;
        
        var commandline = executable + ' -base="' + base_file + '" -merge="' + merge_file + '" -out="' +out_file +'" -over -lpath="' + config.dwgmergeLocation +'"' ;
    
        if (config.cvjs_debug)	console.log("/mergedwg command line: "+commandline);
    
    
        const { exec } = require('child_process');
        exec(commandline, (err, stdout, stderr) => {
          if (err) {
            // node couldn't execute the command
            if (config.cvjs_debug) console.log("Error exec() "+err);		
            res.send("error mergedwg: "+err);  // no file
          }else{
            // the *entire* stdout and stderr (buffered)
            res.send(`stdout-log: ${stdout}`);
            if (cvjs_debug) console.log(`stderr-log: ${stderr}`);  
          }
        });	
    
    
    }
    catch (e) {
        res.send("/mergedwg error:"+e);	
        if (config.cvjs_debug) console.log("mergedwg:"+e);
    }
    
    
    });
    
    
    module.exports = router;
    
    