const fs = require("fs");
const path = require("path");
const config = require("../CADViewer_config.json");
const verifyTokenOptional = require("../libs/jwt").verifyTokenOptional;

const show_folders = false;
const express = require("express"),
	router = express.Router();


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

router.get("", verifyTokenOptional, (req, res) => {
	const folderLocation = config.folderLocation;

    console.log("in listFolderStructure folderLocation="+folderLocation+" show_folders:"+show_folders+"cvhs_debug:"+config.cvjs_debug);

	let dirs = listFolderStructure(folderLocation);
	// load user data directory structure if user is logged in
	if (req.user) {
		const userDir = req.user.email.replace(/[@._]/g, '');
		const userDirPath = `./uploads/${userDir}`;
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
