const config = require("../CADViewer_config.json");

const express = require("express"),
    router = express.Router();

// create post endpoint proxy that will fetch GET response from the url pass trough the request body
router.post("/proxy", (req, res) => {
    console.log({body: req.body})
    const url = req.body.url;
    const globalApplicationSasToken = config.globalApplicationSasToken;
    const proxyUrl = url + globalApplicationSasToken;
    console.log("proxyUrl: ", proxyUrl);
    // make the request to the url
    fetch(proxyUrl)
        .then((response) => {
            // return the response back to the client
            return response.json();
        })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log({err})
            res.status(404).json({
                message: "Plan file not found",
            });
        });
});

module.exports = router;