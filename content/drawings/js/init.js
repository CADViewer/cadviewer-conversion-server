var multiPages = { multiPages: 1,
                   currentPage:1,
                   pages : [
                        { fileName:"default", pageName:"Single Page"}
                   ]
};
var buildings = {
	BUILDING_NAME_GOES_HERE: {
		name: "",
		company: "",
		address: "",
		city: "",
		state: "",
		zipcode: "",
		country: "",
		FacMgr: "",
		FacMgr_title: "",
		FacMgr_email: "",
		FacMgr_phone: "",
		floors: {
			FLOOR_NAME_GOES_HERE: {
				name: "name_of_file_to_appear",
				file: "file_name",
				rooms: {

				}
			}
		}
	}
}
$(document).ready(function() {
      floor_loaded = true;
});
floor_loaded = true;
var layer_thumb;
function drawThumb (paper){
layer_thumb = paper.g();
}
$(document).ready(function() {thumbs_loaded = true;});
thumbs_loaded = true;

var layers_all;
function drawDrawing (paper){
var bb, tx;
layers_all = paper.g();
}
var actualLLX = 0;
var actualLLY = 0;
var actualURX = 1;
var actualURY = 1;
$(document).ready(function() {
	SetUpVq(1,15);
});
SetUpVq(1,15);


var vqBuilding = "BUILDING_NAME_GOES_HERE";
var vqFloor = "FLOOR_NAME_GOES_HERE";
var vqRooms = new Array();
var vqTBorder  = new Array();
var vqText  = new Array();
var vqURLs  = new Array();
vqRooms.length = 0;
vqTBorder.length = 0;
vqText.length = 0;
vqURLs.length = 0;
function drawPaths (paper){
}
$(document).ready(function() {nodes_loaded = true;});
nodes_loaded = true;


