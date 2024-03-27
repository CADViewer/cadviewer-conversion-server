const fs = require("fs");
const path = require("path");
const config = require("../CADViewer_config.json");
const verifyTokenOptional = require("../libs/jwt").verifyTokenOptional;

const show_folders = false;
const express = require("express"),
	router = express.Router();
const conn = require("../libs/mysql");
const {randomUUID} = require("crypto");


// create a directory uploads in the root of the project if it doesn't exist
const dir = './uploads';
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}

const sortFoldersFirst = (a, b) => {
	if (a.children && !b.children) {
		return -1;
	} else if (!a.children && b.children) {
		return 1;
	} else {
		return 0;
	}
	};

const listFolderStructure = (directoryPath, indent = '') => {
	const files = fs.readdirSync(directoryPath);
	const dirs = [];

	files.forEach((file) => {
		const filePath = path.join(directoryPath, file);
		const stats = fs.statSync(filePath);

		if (stats.isDirectory()) {
			if(config.cvjs_debug && show_folders) console.log(`${indent}└── ${file}`);
			const sub_dirs = listFolderStructure(filePath, `${indent}   `);
			dirs.push({
				name: file,
				path: filePath,
				size: stats.size,
				created: stats.birthtime,
				modified: stats.mtime,
				children: sub_dirs,
			})
		} else {
			dirs.push({
				name: file,
				path: filePath,
				size: stats.size,
				created: stats.birthtime,
				modified: stats.mtime,
			})
			if(config.cvjs_debug&& show_folders) console.log(`${indent}├── ${file}`);
		}
	});
	return dirs.sort(sortFoldersFirst);
}

router.get("", verifyTokenOptional, async (req, res) => {
	const folderLocation = config.folderLocation;

    console.log("in listFolderStructure folderLocation="+folderLocation+" show_folders:"+show_folders+"cvhs_debug:"+config.cvjs_debug);

	let dirs = listFolderStructure(folderLocation);
	// load user data directory structure if user is logged in
	if (req.user) {

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

		const userDirPath = `./uploads/${folder_name}`;
		if (!fs.existsSync(userDirPath)) {
			fs.mkdirSync(userDirPath);
		}
		const userDirs = listFolderStructure(userDirPath);
		dirs = [
			{
				own: true,
				name: "MY FOLDER",
				path: userDirPath,
				children: userDirs,
			}, ...dirs];
	}
	res.send(dirs);
});

module.exports = router;
