const config = require("../CADViewer_config.json");
const fetch = require('node-fetch');

const express = require("express"),
router = express.Router();

const https = require('https');


// create post endpoint proxy that will fetch GET response from the url pass trough the request body
router.post("/proxy", async (req, res) => {
    console.log("/proxy call:");
    console.log({body: req.body});
    const url = req.body.url;
    const globalApplicationSasToken = config.globalApplicationSasToken;
    const proxyUrl = url + globalApplicationSasToken;
    console.log("proxyUrl before getResponse(): ", proxyUrl);

    const response = await getResponse(proxyUrl);

    res.status(200).json(response);

});


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
    console.log("plans_cv9.47.1.js - get response JSON loaded");
    return data;
}


module.exports = router;