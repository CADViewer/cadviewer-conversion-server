const config = require("../CADViewer_config.json");
const multer = require('multer');
const express = require("express"),
router = express.Router();
const fs = require("fs");
const path = require('path');

const {randomUUID} = require("crypto");
const {exec} = require("child_process");


// create a directory uploads in the root of the project if it doesn't exist
const dir = './uploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    }
})

const upload = multer({ storage: storage });

// get endpoint that return html page with form to upload license file
router.get("", async (req, res) => {
    res.sendFile(path.join(path.dirname(require.main.filename), 'cadviewer/app/licence.html'));
});

router.get("/verify", async (req, res) => {

    const converterLocation = config.converterLocation.replaceAll("//", "/");
    const script =  `${converterLocation}${config.ax2024_executable} -verify`;
    const { exec } = require('child_process');
    fs.readFile(path.join(path.dirname(require.main.filename), 'cadviewer/app/js/cvlicense.js'), 'utf8', (err, data) => {
        const regex = /cvKey:\s*"([^']+)"/;
        let binaryValues = []
        if (data && !err){
            const match = data.match(regex);
            if (match) {
                const binaryString = match[1];
                binaryValues = binaryString.trim().split(' ');
            } else {
                console.log('cvKey not found');
            }
        }

        // exec script and send response to client
        exec(script, (error, stdout, stderr) => {
            console.error(`stderr: ${stderr}`);
            res.status(200).json({verify: "verify", stdout, cvjs: binaryValues.join(' ')});
        });
    });
});


router.put("/cvjs/applylicense", async (req, res) => {
    const { cvjs } = req.body;

    const cvjsFileContent = `
    var cvjsLicenseKey = { cvKey: "${cvjs}" };
    cvjs_licenseKeyLoaded = true;
    `;

    try {
        fs.writeFileSync(path.join(path.dirname(require.main.filename), 'cadviewer/app/js/cvlicense.js'), cvjsFileContent, { flag: 'w' })
        res.status(200).json({msg: "License applied"});
    } catch (err) {
        res.status(200).json({msg: "Error writing licence to file"});
    }

});


router.post("/autoxchange/applylicense", upload.single('file'), async (req, res) => {
    const licenseLocation = config.licenseLocation.replaceAll("//", "/");
    const converterLocation = config.converterLocation.replaceAll("//", "/");

    const script =  `${converterLocation}${config.ax2024_executable} -verify`;
    if (req.file) {
        const path = `${licenseLocation}/axlic.key`;
        fs.renameSync(req.file.path, path);
        const { exec } = require('child_process');
        // exec script and send response to client
        exec(script, (error, stdout, stderr) => {
            console.error(`stderr: ${stderr}`);
            res.status(200).json({msg: "License applied", stdout});
        });
    } else {
        res.status(400).json({"error": ""});
        return;
    }
});


router.post("/linklist/applylicense", upload.single('file'), async (req, res) => {
    const licenseLocation = config.linklistLocation.replaceAll("//", "/");
    const converterLocation = config.converterLocation.replaceAll("//", "/");

    const script =  `${converterLocation}${config.ax2024_executable} -verify`;
    if (req.file) {
        const path = `${licenseLocation}/ll_lic.key`;
        fs.renameSync(req.file.path, path);
        const { exec } = require('child_process');
        // exec script and send response to client
        exec(script, (error, stdout, stderr) => {
            console.error(`stderr: ${stderr}`);
            res.status(200).json({msg: "License applied", stdout});
        });
    } else {
        res.status(400).json({"error": ""});
        return;
    }
});
router.post("/dwgmerge/applylicense", upload.single('file'), async (req, res) => {
    const licenseLocation = config.dwgmergeLocation.replaceAll("//", "/");
    const converterLocation = config.converterLocation.replaceAll("//", "/");

    const script =  `${converterLocation}${config.ax2024_executable} -verify`;
    if (req.file) {
        const path = `${licenseLocation}/dl_lic.key`;
        fs.renameSync(req.file.path, path);
        const { exec } = require('child_process');
        // exec script and send response to client
        exec(script, (error, stdout, stderr) => {
            console.error(`stderr: ${stderr}`);
            res.status(200).json({msg: "License applied", stdout});
        });
    } else {
        res.status(400).json({"error": ""});
        return;
    }
});

module.exports = router;