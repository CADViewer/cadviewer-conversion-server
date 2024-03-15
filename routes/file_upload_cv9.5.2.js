const multer = require('multer');
const fs = require('fs');

const verifyToken = require('../libs/jwt').verifyToken;

// create a directory uploads in the root of the project if it doesn't exist
const dir = './uploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const express = require("express"),
	router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    }
})

const upload = multer({ storage: storage });

router.post('/files', upload.array('files'), verifyToken, (req, res, next) => {
    const files = req.files;
    console.log(files);
    console.log({user: req.user});
    // remove special characters (@, ., _) from user.email and use it as the name of the directory to store the user files
    const userDir = req.user.email.replace(/[@._]/g, '');
    const userDirPath = `./uploads/${userDir}`;
    if (!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }
    if (!files) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    files.forEach(file => {
        fs.renameSync(file.path, `${userDirPath}/${file.originalname}`);
    });

    res.send({files: files.map(file => ({
        ...file,
        path: `${userDirPath}/${file.originalname}`
    }))});
})

module.exports = router;