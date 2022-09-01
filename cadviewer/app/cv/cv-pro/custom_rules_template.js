function insert_vessel_03(){

	var loadSpaceImage_ID = "myid_"+iconObjectCounter;
	var loadSpaceImage_Name = "Myname_"+iconObjectCounter;
	var loadSpaceImage_Type = "MyType_"+iconObjectCounter;
	var loadSpaceImage_Layer = "cvjs_SpaceLayer";
	var loadSpaceImage_LocationOr64byteEncoded = ServerUrl+ "content/drawings/svg/" + "VESSEL_03.svg"

	iconObjectCounter++;

	var jsonSpaceObject = cvjs_createNewJSonSpaceObject();

	jsonSpaceObject.id =  loadSpaceImage_ID;  // "id_001" can be repeat objects from custom part
	jsonSpaceObject.name =  loadSpaceImage_Name; // "Vessel A"
	jsonSpaceObject.type =  loadSpaceImage_Type; // "Vessel A"
	jsonSpaceObject.layer =  loadSpaceImage_Layer;   // "Vessel Layer"
	//jsonSpaceObject.customContent =  {".customContent" : "all.customContentstructure"};

    var baseAttributes = {
	            fill: '#D30000',   // #FFF   #ffd7f4
	            "fill-opacity": "0.15",   // 0.1
	            stroke: '#CCC',  
	            'stroke-width': 1,
	            'stroke-linejoin': 'round',
    };

    var highlightAttributes = {
						fill: '#a4d7f4',
						"fill-opacity": "0.5",
						stroke: '#a4d7f4',
						'stroke-width': 3
					};
					
    var selectAttributes = {
						fill: '#5BBEF6',
						"fill-opacity": "0.5",
						stroke: '#5BBEF6',
						'stroke-width': 3
					};


    jsonSpaceObject.defaultcolor = baseAttributes;
    jsonSpaceObject.highlightcolor = highlightAttributes;
    jsonSpaceObject.selectcolor = selectAttributes;


	var scale = 1;     // if scale = 1 or null, no action is taken
	var width = 200;    // null, autoscale, value
	var height = 40;  // null, autoscale, value
	var unit = "m";   // svg = svg coordinates,  modelspace  = modelspace units,   mm, cm, m, inch , feet  = using transformation matrix values

    jsonSpaceObject.rotate = jQuery("#rotation_vessel").val();


    var d = new Date();
    var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
    var strDate2 = d.getFullYear() + "/" + (d.getMonth()+2) + "/" + 8;




	var customObject = 	{ 
        "insertType" :  "vessel", 
        "generalInfo": { "id": jsonSpaceObject.id, "name": loadSpaceImage_Name , "type": loadSpaceImage_Type, "begindate" :  strDate , "enddate" : strDate2 }, 
		"dimension" : { "unit" : "m", "width": jQuery("#width_vessel").val(), "length": jQuery("#length_vessel").val(), "rotationInsert": jQuery("#rotation_vessel").val(), "bufferPort": 5, "bufferStarbord" : 5, "bufferBow" : 10 , "bufferStern" : 10},
		"insertRules": { "mooredLevelsAllowed" : 1,  "mooredLevel": 0 , "initialPositionVerified" : false, "positionChanged" : false, "infoAdded": false, "inserted" : false},
		"logicalRules" : [
					{ "rule":"overlapping_vessel", "active": true, "initValue" : loadSpaceImage_ID, "insertStatus" : none},
					{ "rule":"snap_to_vessel", "active": true, "initValue" : loadSpaceImage_ID, "insertStatus" : none},
					{ "rule":"rigs_landside", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"crane_limitation", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"block_settings", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"dock_vessel_direction", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"safety_margin", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"default_preferred", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"double_trible_banks", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"draft validation", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"vlcc_dock_1_3", "active": true, "initValue" : "dock_02", "insertStatus" : none},
					{ "rule":"birth_gap_provided", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"docking_rule_dock1", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"docking_rule_dock2", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"docking_rule_dock3", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"dock_gate_2", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"dock_headwall", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"floating_dock_jetty_limitation", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"empty_for_heavy_lift", "active": false, "initValue" : none, "insertStatus" : none},						
					{ "rule":"docking_vessel_limitation", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"fd_limitation", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"rigs_berthing_prio", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"dock_2_beam_size", "active": false, "initValue" : none, "insertStatus" : none},
                   ],
		"userAddedInfo" : {"date1" : "date1", "date2" : "date2"}
	};

/* DT rules number
1:					{ "rule":"overlapping_vessel", "active": false, "initValue" : none, "insertStatus" : none},
1A:					{ "rule":"snap_to_vessel", "active": false, "initValue" : none, "insertStatus" : none},
2:					{ "rule":"rigs_landside", "active": false, "initValue" : none, "insertStatus" : none},
3:					{ "rule":"crane_limitation", "active": false, "initValue" : none, "insertStatus" : none},
4:					{ "rule":"block_settings", "active": false, "initValue" : none, "insertStatus" : none},
5:					{ "rule":"dock_vessel_direction", "active": false, "initValue" : none, "insertStatus" : none},
6:					{ "rule":"safety_margin", "active": false, "initValue" : none, "insertStatus" : none},
7:					{ "rule":"default_preferred", "active": false, "initValue" : none, "insertStatus" : none},
8:					{ "rule":"double_trible_banks", "active": false, "initValue" : none, "insertStatus" : none},
9:					{ "rule":"draft validation", "active": false, "initValue" : none, "insertStatus" : none},
10:					{ "rule":"vlcc_dock_1_3", "active": false, "initValue" : none, "insertStatus" : none},
11:					{ "rule":"birth_gap_provided", "active": false, "initValue" : none, "insertStatus" : none},
12a:				{ "rule":"docking_rule_dock1", "active": false, "initValue" : none, "insertStatus" : none},
12b:				{ "rule":"docking_rule_dock2", "active": false, "initValue" : none, "insertStatus" : none},
12c:				{ "rule":"docking_rule_dock3", "active": false, "initValue" : none, "insertStatus" : none},
(8)					{ "rule":"dock_gate_2", "active": false, "initValue" : none, "insertStatus" : none},
(9)					{ "rule":"dock_headwall", "active": false, "initValue" : none, "insertStatus" : none},
(10)				{ "rule":"floating_dock_jetty_limitation", "active": false, "initValue" : none, "insertStatus" : none},
(11)				{ "rule":"empty_for_heavy_lift", "active": false, "initValue" : none, "insertStatus" : none},						
12:					{ "rule":"docking_vessel_limitation", "active": false, "initValue" : none, "insertStatus" : none},
13:					{ "rule":"fd_limitation", "active": false, "initValue" : none, "insertStatus" : none},
15:					{ "rule":"rigs_berthing_prio", "active": false, "initValue" : none, "insertStatus" : none},
17:					{ "rule":"dock_2_beam_size", "active": false, "initValue" : none, "insertStatus" : none},
*/


/*
var customObject = {
        "insertType" :  "fabrication", 
		"generalInfo": { "id": jsonSpaceObject.id, "name": "objectx" , "type": "plactic mold", "begindate" :  "date1" , "enddate" : "date2" }, 
		"dimension" : { "unit" : "m", "width": jQuery("#width_vessel").val(), "length": jQuery("#length_vessel").val(), "rotationInsert": jQuery("#rotate_vessel").val(), "bufferLeft": 0, "bufferRight" : 0, "bufferTop" : 0 , "bufferBottom" : 0},
		"insertRules": { "overlapAllowed" : 1, "initialPositionVerified" : false, "positionChanged" : false, "infoAdded": false, "inserted" : false},
		"logicalRules" : [
					{ "rule":"specific_fabrication_area", "active": false, "initValue" : none, "insertStatus" : none},
					{ "rule":"overlay_allowed", "active": false, "initValue" : none, "insertStatus" : none},
                   ],
		"userAddedInfo" : {"date1" : "date1", "date2" : "date2"}
	};
*/

	jsonSpaceObject.customContent =  customObject;

	cvjs_addSpaceObject("floorPlan", loadSpaceImage_ID, loadSpaceImage_LocationOr64byteEncoded, scale, jQuery("#length_vessel").val(), jQuery("#width_vessel").val(), jQuery("#rotation_vessel").val(), unit, jsonSpaceObject);

}





var cvjsPopUpBody;


function myCustomPopUpBody(rmid){

    myobject = cvjs_returnSpaceObjectID(rmid);
    //console.log("myCustomPopUpBody is called: "+ rmid+" "+JSON.stringify(myobject));


    try {
        // get block attribute:

        cvjsPopUpBody = "<div style='line-height:75%'><font size='0'>";
        
        for (var i = 1; i <= myobject.blockAttributeCount; i++) {
            var attribId = "#" + myobject.blockAttributeId + "_" + i;
            cvjsPopUpBody += $(attribId).attr('cvjs:tag')+": <span id=\"mymodal_name_"+$(attribId).attr('cvjs:value')+"\" >"+$(attribId).attr('cvjs:value')+"</span><br>";
        }
        cvjsPopUpBody+= "<font size='+2'></div>";
        return cvjsPopUpBody;
    }
    catch(err){


    }

    
    try{
        // template pop-up modal body
        cvjsPopUpBody = "<div> Id: <span id=\"mymodal_name_"+myobject.id+"\" >"+myobject.id+"</span><br>";
        cvjsPopUpBody += "Name: <span id=\"mymodal_name_"+myobject.name+"\" >"+myobject.name+"</span><br>";
        cvjsPopUpBody += "Type: <span id=\"mymodal_type_"+myobject.customContent.insertType+"\" >"+myobject.customContent.insertType+"</span><br>";
        cvjsPopUpBody += "Model: <span id=\"mymodal_type_"+myobject.type+"\" >"+myobject.type+"</span><br>";
        cvjsPopUpBody += "Begin Date: <span id=\"mymodal_startdate_"+myobject.customContent.generalInfo.begindate+"\" >"+myobject.customContent.generalInfo.begindate+"</span><br>";
        cvjsPopUpBody += "End Date: <span id=\"mymodal_startdate_"+myobject.customContent.generalInfo.enddate+"\" >"+myobject.customContent.generalInfo.enddate+"</span><br>";
//		cvjsPopUpBody += "Status: <div class=\"cvjs_callback_modal_1\" onclick=\"my_own_clickmenu1("+rmid+");\"><i class=\"glyphicon glyphicon-transfer\"></i>More Info </div>";
        cvjsPopUpBody += "Confirm change: <a href=\"javascript:custom_rules_clickmenu1('"+myobject.id+"');\"><i class=\"glyphicon glyphicon-transfer\" \"></i></a>&nbsp;&nbsp;<span id=\"mymodal_status_01_"+myobject.id+"\"><i style=\"color:gray\" class=\"glyphicon glyphicon-ok\" \"></i></span> ";
        cvjsPopUpBody += "</div>";
    }catch(err){
        // template pop-up modal body
        cvjsPopUpBody = "<div> Id: <span id=\"mymodal_name_"+myobject.id+"\" >"+myobject.id+"</span><br>";
        cvjsPopUpBody += "Name: <span id=\"mymodal_name_"+myobject.name+"\" >"+myobject.name+"</span><br>";
        cvjsPopUpBody += "Type: <span id=\"mymodal_type_"+myobject.type+"\" >"+myobject.type+"</span><br>";
        cvjsPopUpBody += "</div>";
    }
    return cvjsPopUpBody;
}

function populateMyCustomPopUpBody(rmid, node){

    console.log("populateMyCustomPopUpBody is called: "+ rmid+"  "+node+"   - this extra custom callbac- method can be used in conjunction with myCustomPopUpBody or not at all..");
}


function cvjs_callbackForModalDisplay(rmid, node){

    console.log("WE call our server, then we update the modal"+ rmid+"  "+node);

    //jQuery(cvjs_SpaceObjectsContent[cvjs_active_floorplan_div_nr][rmid].node).qtip('hide');
    populateMyCustomPopUpBody(rmid, node);
}



function custom_rules_clickmenu1(){
    
    var id = cvjs_idObjectClicked();
    //		var node = cvjs_NodeObjectClicked();
    window.alert("custom_rules_clickmenu1: this is the callback to DT app with content");

    // change check arrow to green!!!
    jQuery("#mymodal_status_01_"+id).html("<i style=\"color:green\" class=\"glyphicon glyphicon-ok\" \"></i>");

    var myobject = cvjs_returnSpaceObjectID(id);
    // update my internal DB with new JSON myobject 

    
}






/**
 * Custom methods that programs rules against the CADViewer Space Management API
 * @param {*} spaceID   the id of the space object currently selected
 * @param {*} jsonObject  the space object itself currently selected
 * @returns {boolean} true if rules conditions are met, false otherwise
 */

function cvjs_insertSpaceObjectCustomCodePlaceholder(spaceID, jsonObject){

    try{
        console.log("cvjs_insertSpaceObjectCustomCodePlaceholder(): "+spaceID);
        // myobject = cvjs_returnSpaceObjectID(spaceID);  - cannot use, because object not created yet
        console.log(jsonObject);
        // general check, inside dock or berth areay


        if (true) return true;


        // if there are no rules, then return true;
        if (jsonObject.customContent.logicalRules.length == 0) return true;



        var process = false;
        // loop over rules
        for (var i=0; i<jsonObject.customContent.logicalRules.length; i++){
        
            console.log("rules loop: "+jsonObject.customContent.logicalRules[i].rule+" "+jsonObject.customContent.logicalRules[i].active);

            // overlapping Spaces not allowed
            if (jsonObject.customContent.logicalRules[i].rule == "overlapping_vessel" && jsonObject.customContent.logicalRules[i].active == true) {
                process = false;             
                jsonElement = ["customContent", "insertType"];
                process = cvjs_spaceObjectOverlapAnyOtherObject(jsonObject,  jsonElement, "vessel");

                console.log("overlap "+process);
                if (process) window.alert("NOTE Rule:"+i+", "+jsonObject.customContent.logicalRules[i].rule+" not met, with init value:"+jsonObject.customContent.logicalRules[i].initValue) 
                console.log("process_rule_overlapping_vessels result: "+process);
                if (process) return false;
            }            

            /*

            // snap to nearest vessel, if close
            if (jsonObject.customContent.logicalRules[i].rule == "overlapping_vessel" && jsonObject.customContent.logicalRules[i].active == true) {
                process = false;             
                process = process_rule_snap_to_vessel(spaceID, i, jsonObject);                    
                if (!process) window.alert("NOTE Rule:"+i+", "+jsonObject.customContent.logicalRules[i].rule+" not met, with init value:"+jsonObject.customContent.logicalRules[i].initValue) 
                console.log("process_rule_snap_to_vessel result: "+process);
                if (!process) return false;
            }            

            */


            if (jsonObject.customContent.logicalRules[i].rule == "vlcc_dock_1_3" && jsonObject.customContent.logicalRules[i].active == true) {
                process = false;             
                process = process_rule_vlcc_dock_1_3(spaceID, i, jsonObject);                    
                if (!process) window.alert("rule:"+i+", "+jsonObject.customContent.logicalRules[i].rule+" not met, with init value:"+jsonObject.customContent.logicalRules[i].initValue) 
                console.log("process_rule_vlcc_dock_1_3 result: "+process);
                if (!process) return false;
            }            
        }

        //

    }
    catch(err){
            console.log("cvjs_insertSpaceObjectCustomCodePlaceholder: "+err);
    }

    // return process
    return process;

}


// functions for rules

// rule for inside specific dock
function process_rule_vlcc_dock_1_3(spaceID, i, jsonObject){
    var term = false;
    // let us pull the init value from the spaceObject for the rule number i
    var space_value =jsonObject.customContent.logicalRules[i].initValue;
    // test the coordinates of object against base object. 
    var baseObject = cvjs_returnSpaceObjectID(space_value);

    term = cvjs_isSpaceObjectInside(baseObject, jsonObject)

    if (term) 
        return true;
    // in any case return false
    return false;
}


// snap to nearest space object, with logical 
/**
 * 
 * @param {*} spaceID 
 * @param {*} i 
 * @param {*} jsonObject 
 * @returns 
 */

function process_rule_snap_to_vessel(spaceID, i, jsonObject){
    var term = false;
    var thisXY = new Array();
    var closestPoint = new Array();
    var point = new Array();

    // we have to use the current click cursor point as our reference point





    // let us pull the init value from the spaceObject for the rule number i
    var space_value =jsonObject.customContent.logicalRules[i].initValue;
    console.log("space_value snap"+space_value);
    var all = cvjs_returnAllSpaceObjects();

    for (var i=0; i<all.SpaceObjects.length; i++){
        // loop over all space objects
        // if the object is a vessel and different from the search object
        // check if overlapping
        // we only check vessels with ID different to insert object
        try{
            if (all.SpaceObjects[i].id !=spaceID   && all.SpaceObjects[i].customContent.insertType == "vessel"){

                // calculate nearest point
                // if closer than previous nearest point, then change point

                thisXY = cvjs_getSpaceObjectPath(oall.SpaceObjects[i], true);
        





                cvjs_closestPoint_SpaceModule(pathNode, point)

                /*
                term = cvjs_spaceObjectsOverlap(all.SpaceObjects[i], jsonObject)                
                if (term) 
                    i=all.SpaceObjects.length;
                */
        }
        }catch(err){
        }
    }

    // set a flag to use the nearest point as insertion !!!!!



    // if overlapping we must return false, as overlap is not allowed
    if (term) 
        return false;
    else 
        return true;
}

function cvjsspace_addRectangleSpaceObjectCore(floorplan_div){

	



	// 3.0.15c   - add "_svg" to div, if called through external API
	if (floorplan_div.lastIndexOf("_svg") == floorplan_div.length-4){
			// do nothing
	}
	else{
		floorplan_div = floorplan_div + "_svg";
	}

	cvjs_active_floorplan_div_nr = cvjs_rPaperIndex(floorplan_div);	


	cvjs_hidePop();
	var Node_id = cvjs_currentMaxSpaceNodeId();
	//console.log("xurrent Node_id="+Node_id);
	Node_id++;
	var currentNode_underbar = Node_underbar+Node_id;


	var mylayer = jQuery("#cvjs_spaceobjectLayerFromModal").val();
    cvjs_currentNode_layer = mylayer;
    
    var currentNode_id;
    var currentNode_name;


	var myid = jQuery("#cvjs_spaceobjectIdFromModal").val();
	if (myid != ""){
		currentNode_id = myid;
		currentNode_name = myid;		
	}
	else{
		currentNode_id = Node_id;
		currentNode_name = Node_id;		
	}
	

// 6.2.32
	var currentNode_layer = cvjs_currentNode_layer;
	var currentNode_group = "";
	var currentNode_attributes = "";
	var currentNode_attributeStatus = "";  // 3.2.02b
	var currentNode_type = "Space";
	var currentNode_occupancy = "";
	var currentNode_tags = "unassigned";



    // 6.4.23
    var myType = jQuery("#cvjs_spaceobjectTypeFromModal").val();
    if (myType != "")
        currentNode_type = myType;


	
/***	
	currentNode_name = "unassigned";
	currentNode_layer = "unassigned";
	currentNode_group = "unassigned";
	currentNode_attributes = "unassigned";
	currentNode_attributeStatus = "unpopulated";  // 3.2.02b
	currentNode_type = "unassigned";
	currentNode_tags = "unassigned";
	currentNode_tags = "unassigned";

*/

    var currentNode_translate_x = 0;
    var currentNode_translate_y = 0;
    var currentNode_scale_x = 1;
    var currentNode_scale_y = 1;
    var currentNode_rotate = 0;
    // , currentNode_translate_x, currentNode_translate_y, currentNode_scale, currentNode_rotate

    var currentNode_transform = "";


    var currentNode_area = "unassigned";
    var currentNode_defaultcolor = "undefined";
    var currentNode_highlightcolor = "undefined";
    var currentNode_selectcolor = "undefined";


    var currentNode_linked = false;
	cvjs_setCurrentNodeValues(currentNode_underbar, currentNode_name, currentNode_id, currentNode_layer, currentNode_group, currentNode_attributes, currentNode_attributeStatus, currentNode_type, currentNode_tags, currentNode_occupancy, currentNode_linked, currentNode_translate_x, currentNode_translate_y, currentNode_scale_x, currentNode_scale_y, currentNode_rotate, currentNode_transform, currentNode_area, currentNode_defaultcolor, currentNode_highlightcolor, currentNode_selectcolor, multiPages[cvjs_active_floorplan_div_nr].currentPage, multiPages[cvjs_active_floorplan_div_nr].pages[multiPages[cvjs_active_floorplan_div_nr].currentPage -1].pageName);
	cvjs_addHandleFunc_Rectangle();

}




