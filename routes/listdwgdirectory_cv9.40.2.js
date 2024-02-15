const fs = require("fs");
const path = require("path");
var config = require("../CADViewer_config.json");

var show_folders = false;
var express = require("express"),
	router = express.Router();


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

router.get("", (req, res) => {
	const folderLocation = config.folderLocation;

    console.log("in listFolderStructure folderLocation="+folderLocation+" show_folders:"+show_folders+"cvhs_debug:"+config.cvjs_debug);

	const dirs = listFolderStructure(folderLocation);
	res.send(dirs);
});

module.exports = router;
