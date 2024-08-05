// plans.js
// version: 6.83.6

const config = require("../CADViewer_config.json");
const fetch = require('node-fetch');

const express = require("express"),
router = express.Router();

const https = require('https');
const { get } = require("request");


// create post endpoint proxy that will fetch GET response from the url pass trough the request body
router.post("/proxy", async (req, res) => {
    console.log("/proxy call:");
    console.log({body: req.body});

    var token = getToken(req);

    console.log("/proxy call: getToken: "+token);

    if (!config.globalBearerAutentication){            
        console.log("Authorization token is not applied, so this is OK");
        //console.log("Authorization token is required");
        //res.send("Authorization token is required");
        //return;
    }
    else{  // Authorization token is applied, so we can check the token here
        console.log("Authorization token is applied");
        // 9.50.1

        console.log(token, config.globalBearerAutenticationToken);

        if (token==config.globalBearerAutenticationToken){
            console.log("Authorization token is OK");
        }
        else{
            console.log("Authorization token is reqired or incorrect");
            res.send("Authorization token is required or incorrect");
            return;
        }
    }



    try{
        const url = req.body.url;
        const globalApplicationSasToken = config.globalApplicationSasToken;
        const proxyUrl = url + globalApplicationSasToken;
        console.log("proxyUrl before getResponse(): ", proxyUrl);
    
        const response = await getResponse(proxyUrl);
    
        res.status(200).json(response);
    
    }

    catch(err){
        res.send("Server error:"+err);
        

    }


 
});



// 9.50.1
function getToken(req) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1];
    } 
    return null;
    }
    


async function getResponse(proxyUrl) {
	const response = await fetch(
		proxyUrl,
		{
			method: 'GET',
			headers: {
                Accept: "application/json"
			}
		}
	);

    if (!response.ok) {
		return( "{'status: '"+ response.status +"'}");
	}

    const data = await response.json(); // Extracting data as a JSON Object from the response
    //console.log("get response "+JSON.stringify(data));
    console.log("plans.js - get response JSON loaded");
    return data;
}


module.exports = router;