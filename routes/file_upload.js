// file_upload.js
// version: 9.5.2

const multer = require('multer');
const fs = require('fs');
const { randomUUID } = require('crypto');
const { userFolderMaximumFiles, userFolderMaximumSizeInMB } = require('../CADViewer_config.json');
const conn = require("../libs/mysql.js");

const verifyToken = require('../libs/jwt').verifyToken;

// create a directory uploads in the root of the project if it doesn't exist
const dir = './uploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const express = require("express"),
	router = express.Router();
const config = require("../CADViewer_config.json");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    }
})

const upload = multer({ storage: storage });

router.post('/files', upload.array('files'), verifyToken, async (req, res, next) => {
    const files = req.files;
    const { global, path } = req.body;
    const folderLocation = config.folderLocation;

    console.log({global})
    console.log(files);
    console.log({user: req.user});

    if (global) {

        files.forEach(file => {
            fs.renameSync(file.path, `${path || folderLocation}/${file.originalname}`);
        });

        res.send({files: files.map(file => ({
                ...file,
                path: `${path || folderLocation}/${file.originalname}`
            }))});
        return;
    }

    let existingUser;
    try {
        const [rows] = await conn.promise().execute('SELECT * FROM `users` WHERE `email` = ?', [req.user.email]);
        if (rows.length > 0) {
            existingUser = rows[0];
        }
    } catch (err) {
        console.log({err});
        res.status(500).json({"error": "Error! Something went wrong."});
        return;
    }

    if (!existingUser) {
        res.status(401).json({"error": "Invalid user"});
        return;
    }

    // if user not have folder_name, create it
    let folder_name = existingUser.folder_name;
    if (!folder_name) {
        folder_name = randomUUID();
        try {
            await conn.promise().execute('UPDATE `users` SET `folder_name` = ? WHERE `email` = ?', [folder_name, req.user.email]);
        } catch (err) {
            console.log({err});
            res.status(500).json({"error": "Error! Something went wrong."});
            return;
        }
    }

    // remove special characters (@, ., _) from user.email and use it as the name of the directory to store the user files
    const userDirPath = `./uploads/${folder_name}`;
    if (!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }
    if (!files) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }

    // userFolderMaximumFiles, userFolderMaximumSizeInMB
    // check if the user has exceeded the maximum number of files that can be uploaded
    const numberOfSize = fs.readdirSync(userDirPath).length + files.length;
    console.log({numberOfSize})
    if (numberOfSize> userFolderMaximumFiles) {
        return res.status(400).json({error: `You can only upload a maximum of ${userFolderMaximumFiles} files`});
    }

    // check if the user has exceeded the maximum size of files that can be uploaded in is given directory
    // total size of files in the directory
    const totalSize = fs.readdirSync(userDirPath).reduce((acc, file) => acc + fs.statSync(`${userDirPath}/${file}`).size, 0);
    const uploadedSize = files.reduce((acc, file) => acc + file.size, 0);
    console.log({totalSize, uploadedSize})
    if (uploadedSize + totalSize> userFolderMaximumSizeInMB * 1024 * 1024) {
        return res.status(400).json({error: `You can only upload a maximum of ${userFolderMaximumSizeInMB} MB of files`});
    }


    files.forEach(file => {
        fs.renameSync(file.path, `${userDirPath}/${file.originalname}`);
    });

    res.send({files: files.map(file => ({
        ...file,
        path: `${userDirPath}/${file.originalname}`
    }))});
})

// post endpoint for create folder (folder_name) inside directory (path)
router.post('/folder', verifyToken, async (req, res) => {
    const { path, folder_name } = req.body;
    const folderLocation = config.folderLocation;

    console.log({path, folder_name})

    if (!path) {
        return res.status(400).json({error: 'Path is required'});
    }

    if (!folder_name) {
        return res.status(400).json({error: 'Folder name is required'});
    }

    const userDirPath = `${path}/${folder_name}`;
    if (!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }

    res.send({path: userDirPath});
})

// endpoint for remove file and folder
router.delete('/remove', verifyToken, async (req, res) => {
    const { isFolder, path } = req.body;

    if (!isFolder) {
        fs.unlinkSync(path);
    } else {
        fs.rmdirSync(path, { recursive: true });
    }

    res.send({success: true});
});

module.exports = router;