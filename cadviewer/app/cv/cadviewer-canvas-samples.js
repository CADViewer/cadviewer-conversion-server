/////////  CANVAS CONTROL METHODS START


///  HERE ARE ALL THE CUSTOM TEMPLATES TO DO STUFF ON THE CANVAS 

var generic_canvas_flag_first_click_rectangle = false;
var generic_canvas_flag_rectangle= false;
var tPath_r;
var cvjs_RubberBand;
var cvjs_firstX;
var cvjs_firstY;
var cvjs_lastX;
var cvjs_lastY;

var selected_handles = [];
var handle_selector = false;
var current_selected_handle = "";



///// DRAG + CLICK ON CANVAS  - CONSOLE

/**
 * Template start drag method for custom canvas
 */

 var generic_start_method_01 = function() {
  console.log("generic_start_method_01");
}

/**
* Template move drag method for custom canvas
*/
var generic_move_method_01 = function(dx,dy,x,y) {

  var svg_x =  cvjs_SVG_x(x);
  var svg_y =  cvjs_SVG_y(y);
  console.log("generic_move_method_01: dx="+dx+" dy="+dy+" x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);
}

/**
* Template stop drag method for custom canvas
*/
var generic_stop_method_01 = function() {

   cvjs_removeCustomCanvasMethod();
  console.log("REMOVE: generic_stop_method_01");
};

/**
* Template mouse-move method for custom canvas
*/

var generic_mousemove_method_01 = function(e,x,y) {

  var svg_x =  cvjs_SVG_x(x);
  var svg_y =  cvjs_SVG_y(y);
  
  // cvjs_removeCustomCanvasMethod();
  console.log("generic_mousemove_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);
}

/**
* Template mouse-down method for custom canvas
*/

var generic_mousedown_method_01 = function(e,x,y) {

  var svg_x =  cvjs_SVG_x(x);
  var svg_y =  cvjs_SVG_y(y);
  
  // cvjs_removeCustomCanvasMethod();
  console.log("generic_mousedown_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);

};

/**
* Template mouse-up method for custom canvas
*/

var generic_mouseup_method_01 = function(e,x,y) {

  var svg_x =  cvjs_SVG_x(x);
  var svg_y =  cvjs_SVG_y(y);
  
  console.log("generic_mouseup_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);

};

/**
* Template double-click method for custom canvas
*/

var generic_dblclick_method_01 = function(e,x,y) {
   cvjs_removeCustomCanvasMethod();

  var svg_x =  cvjs_SVG_x(x);
  var svg_y =  cvjs_SVG_y(y);
  console.log("REMOVE: generic_dblclick_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);
};


///// DRAG + CLICK ON CANVAS  - CONSOLE


// SAMPLE TO CREATE RECTANGLE BY CLICK

var generic_make_rect_init_method = function(){
  console.log("generic_make_rect_init_method");
  generic_canvas_flag_first_click_rectangle = false;
  generic_canvas_flag_rectangle= false;
}


var generic_make_rect_mousedown_method = function(e, x, y) {

  try{
      console.log("generic_make_rect_mousedown_method");

      if (!generic_canvas_flag_first_click_rectangle){
      var tPath_r = "M" + 0 + "," + 0;
          cvjs_RubberBand =  cvjs_makeGraphicsObjectOnCanvas('Path', tPath_r).attr({stroke: "#b00000", fill : "none", 'stroke-width': 0.5});
          generic_canvas_flag_first_click_rectangle = true;
          generic_canvas_flag_rectangle= false;
          console.log("rubberband");
      }
      else{
          console.log(generic_canvas_flag_first_click_rectangle+"  "+generic_canvas_flag_rectangle);            
          if (generic_canvas_flag_rectangle){
              generic_make_rect_stop_method();
          }
      }
  }
  catch(err){console.log(err)}
  //console.log("mouse down ");
}


var generic_make_rect_mouseup_method = function() {

  try{
      console.log("generic_make_rect_mouseup_method");
  }
  catch(err){console.log(err)}
}


var generic_make_rect_dblclick_method = function() {

  try{
      console.log("generic_make_rect_dblclick_method");
  }
  catch(err){console.log(err)}
}


var generic_make_rect_mousemove_method = function(e, x, y) {
 
 try{
      if (generic_canvas_flag_first_click_rectangle){
           cvjs_customCanvasMethod_globalScale();        
          if (!generic_canvas_flag_rectangle){
              cvjs_firstX =  cvjs_SVG_x(x);
              cvjs_firstY =  cvjs_SVG_y(y)
              cvjs_lastX = cvjs_firstX;
              cvjs_lastY = cvjs_firstY;
              generic_canvas_flag_rectangle = true;
          }
          else{
              // we cannot have the mouse directly on top of the rubberband path, then it will not respond
              var mousedelta = 2;
              cvjs_lastX =  cvjs_SVG_x(x-mousedelta);
              cvjs_lastY =  cvjs_SVG_y(y-mousedelta);
          }	
          
          tPath_r = "M" + cvjs_firstX + "," + cvjs_firstY;		
          tPath_r += "L" + cvjs_firstX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_firstY;
          tPath_r += "L" + cvjs_firstX + "," + cvjs_firstY+" Z"; 
          cvjs_RubberBand.attr({'path': tPath_r});
      }
  }
  catch(err){
      console.log(err);
  } 
}

var generic_make_rect_stop_method = function() {

 // find the current highest node number
 var Node_id =  cvjs_currentMaxSpaceNodeId();
 Node_id++;
 var currentNode_underbar = "Node_"+Node_id;
  
 window.alert("generic_make_rect_stop_method "+currentNode_underbar);


  var loadSpaceImage_ID = jQuery('#image_ID').val();
  var loadSpaceImage_Type = jQuery('#image_Type').val();
  var loadSpaceImage_Layer = "cvjs_SpaceLayer";

  // create a group with space as main object
   cvjs_createSpaceObjectGroup( currentNode_underbar, cvjs_RubberBand, loadSpaceImage_ID, loadSpaceImage_ID, loadSpaceImage_Type, loadSpaceImage_Layer, "myGroup");   

  // make an equal rect, but with the proper color settings and controls
  var grayBox =  cvjs_makeGraphicsObjectOnCanvas('Path', tPath_r).attr({fill: '#808080', "fill-opacity": "1.0", stroke: '#000', 'stroke-opacity': "1.0", 'stroke-width': 0.5 });
   cvjs_addGraphicsToSpaceObjectGroup( currentNode_underbar,  grayBox, "rect01");

   cvjs_removeCustomCanvasMethod();    
};

// END - SAMPLE TO CREATE RECTANGLE BY CLICK





// SAMPLE TO CREATE RECTANGLE BY DRAG

var generic_drag_rect_start = function() {

  generic_canvas_flag_first_click_rectangle = true;
  generic_canvas_flag_rectangle = false;

  var tPath_r = "M" + 0 + "," + 0;
  cvjs_RubberBand =  cvjs_makeGraphicsObjectOnCanvas('Path', tPath_r).attr({stroke: "#b00000", fill : "none"});

  console.log("generic_start_method_01");
}

/**
* Template move drag method for custom canvas
*/
var generic_drag_rect_move = function(dx,dy,x,y) {

  try{
      if (generic_canvas_flag_first_click_rectangle){
           cvjs_customCanvasMethod_globalScale();        
          if (!generic_canvas_flag_rectangle){
              cvjs_firstX =  cvjs_SVG_x(x);
              cvjs_firstY =  cvjs_SVG_y(y)
              cvjs_lastX = cvjs_firstX;
              cvjs_lastY = cvjs_firstY;
              generic_canvas_flag_rectangle = true;
          }
          else{
              // we cannot have the mouse directly on top of the rubberband path, then it will not respond
              var mousedelta = 1;
              cvjs_lastX =  cvjs_SVG_x(x-mousedelta);
              cvjs_lastY =  cvjs_SVG_y(y-mousedelta);
          }	
          
          var tPath_r = "M" + cvjs_firstX + "," + cvjs_firstY;		
          tPath_r += "L" + cvjs_firstX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_firstY;
          tPath_r += "L" + cvjs_firstX + "," + cvjs_firstY+" Z"; 
          cvjs_RubberBand.attr({'path': tPath_r});
      }
  }
  catch(err){
      console.log(err);
  } 

}

/**
* Template stop drag method for custom canvas
*/
var generic_drag_rect_stop = function() {

  cvjs_RubberBand.attr({fill: '#99ff99', "fill-opacity": "0.5", stroke: '#ff9999', 'stroke-opacity': "1"});
   cvjs_removeCustomCanvasMethod();
  console.log("REMOVE: generic_drag_rect_stop");
};

// END - SAMPLE TO CREATE RECTANGLE BY DRAG






// SAMPLE TO DRAG RECTANGLE if overlapping space objects 

var select_drag_rect_start = function() {

  generic_canvas_flag_first_click_rectangle = true;
  generic_canvas_flag_rectangle = false;

  var tPath_r = "M" + 0 + "," + 0;
  cvjs_RubberBand =  cvjs_makeGraphicsObjectOnCanvas('Path', tPath_r).attr({fill: '#ff9999', "fill-opacity": "0.5", stroke: '#ff9999', 'stroke-opacity': "1"});

  console.log("generic_start_method_01");
}

var select_drag_rect_move = function(dx,dy,x,y) {

  try{
      if (generic_canvas_flag_first_click_rectangle){
           cvjs_customCanvasMethod_globalScale();        
          if (!generic_canvas_flag_rectangle){
              cvjs_firstX =  cvjs_SVG_x(x);
              cvjs_firstY =  cvjs_SVG_y(y)
              cvjs_lastX = cvjs_firstX;
              cvjs_lastY = cvjs_firstY;
              generic_canvas_flag_rectangle = true;
          }
          else{
              // we cannot have the mouse directly on top of the rubberband path, then it will not respond
              var mousedelta = 1;
              cvjs_lastX =  cvjs_SVG_x(x-mousedelta);
              cvjs_lastY =  cvjs_SVG_y(y-mousedelta);
          }	
          
          var tPath_r = "M" + cvjs_firstX + "," + cvjs_firstY;		
          tPath_r += "L" + cvjs_firstX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_firstY;
          tPath_r += "L" + cvjs_firstX + "," + cvjs_firstY+" Z"; 
          cvjs_RubberBand.attr({'path': tPath_r});
      }
  }
  catch(err){
      console.log(err);
  } 

}


var select_drag_rect_stop = function() {

  cvjs_RubberBand.attr({'path': "M0,0"});
  var mybox;
  var overlap;
  var selected_list = "";

  // reorder x,  if not dragged left to right, top to buttom
  var temp;
  if (cvjs_firstX>cvjs_lastX){
      temp = cvjs_firstX;
      cvjs_firstX = cvjs_lastX;
      cvjs_lastX = temp;
  }
  // reorder y,  if not dragged left to right, top to buttom
  if (cvjs_firstY>cvjs_lastY){
      temp = cvjs_firstY;
      cvjs_firstY = cvjs_lastY;
      cvjs_lastY = temp;
  }

  
  // get all spaces
  var spaceObjectIds =  cvjs_getSpaceObjectIdList();
  // loop over all spaces
  for (var spc in spaceObjectIds){
      // get the bounding box of the space
      
      mybox =  cvjs_getSpaceObjectBoundingBox(spaceObjectIds[spc]);
      // check if it operlaps with the drag rectangle
      if (mybox == false) continue;

      //console.log(cvjs_firstX+"  "+ cvjs_firstY+" "+ cvjs_lastX+ " "+ cvjs_lastY+"  "+spc);
      //console.log(mybox.x+" "+ mybox.y+" "+ (mybox.x+mybox.width) + " "+ (mybox.y+mybox.height));

      overlap=  cvjs_rect_doOverlap( cvjs_firstX, cvjs_firstY, cvjs_lastX, cvjs_lastY, mybox.x, mybox.y, mybox.x+mybox.width, mybox.y+mybox.height);

      if (overlap) 
          selected_list+= spaceObjectIds[spc]+";";
  }

  if (selected_list == "") selected_list = "None";

  window.alert("Selected Objects: "+selected_list);
  //cvjs_RubberBand.attr({fill: '#99ff99', "fill-opacity": "0.5", stroke: '#ff9999', 'stroke-opacity': "1"});
   cvjs_removeCustomCanvasMethod();
  console.log("REMOVE: generic_drag_rect_stop");
};

// END - SAMPLE TO DRAG RECTANGLE if overlapping space objects 





// SAMPLE TO CREATE RECTANGLE w TEXT and ARRow BY CLICK

var logic_flags = [false,false,false,false,false,false];
var operation_type = "";
var mybasewidth = 1;

var generic_make_rect_arrow_init_method = function(){
  console.log("generic_make_rect_init_method");
  logic_flags = [false,false,false,false,false,false];
  operation_type = "box";    
}

var tPath_r;

var generic_make_rect_arrow_mousedown_method = function(e, x, y) {

  try{
      if ((operation_type.indexOf("arrow") ==0) && logic_flags[0] && logic_flags[1]){
          generic_make_rect_arrow_stop_method2();
      }

      if ((operation_type.indexOf("box") ==0) && !logic_flags[0]){  // first box
          var tPath_r = "M" + 0 + "," + 0;
          cvjs_RubberBand =  cvjs_makeGraphicsObjectOnCanvas('Path', tPath_r).attr({stroke: "#b00000", fill : "none"});
          logic_flags[0] = true;
          logic_flags[1]= false;
      }
      if ((operation_type.indexOf("box") ==0) && logic_flags[0] && logic_flags[1]){
          generic_make_rect_arrow_stop_method1();
      }
 }
  catch(err){console.log(err)}
  //console.log("mouse down ");
}


var generic_make_rect_arrow_mouseup_method = function() {

  try{
      console.log("generic_make_rect_mouseup_method");
  }
  catch(err){console.log(err)}
}


var generic_make_rect_arrow_dblclick_method = function() {

  try{
      console.log("generic_make_rect_dblclick_method");
  }
  catch(err){console.log(err)}
}


var generic_make_rect_arrow_mousemove_method = function(e, x, y) {
 
 try{
      if ((operation_type.indexOf("box") ==0) && logic_flags[0]){
           cvjs_customCanvasMethod_globalScale();        
          if (!logic_flags[1]){
              cvjs_firstX =  cvjs_SVG_x(x);
              cvjs_firstY =  cvjs_SVG_y(y)
              cvjs_lastX = cvjs_firstX;
              cvjs_lastY = cvjs_firstY;
              logic_flags[1] = true;
          }
          else{
              // we cannot have the mouse directly on top of the rubberband path, then it will not respond
              var mousedelta = 1;
              cvjs_lastX =  cvjs_SVG_x(x-mousedelta);
              cvjs_lastY =  cvjs_SVG_y(y-mousedelta);
          }	
          
          tPath_r = "M" + cvjs_firstX + "," + cvjs_firstY;		
          tPath_r += "L" + cvjs_firstX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_lastY;
          tPath_r += "L" + cvjs_lastX + "," + cvjs_firstY;
          tPath_r += "L" + cvjs_firstX + "," + cvjs_firstY+" Z"; 
          cvjs_RubberBand.attr({'path': tPath_r});
      }


      if ((operation_type.indexOf("arrow") ==0) && logic_flags[0]){
           cvjs_customCanvasMethod_globalScale();        

          logic_flags[1] = true;
          var mousedelta = 1;
          cvjs_lastX =  cvjs_SVG_x(x-mousedelta);
          cvjs_lastY =  cvjs_SVG_y(y-mousedelta);

          tPath_r = "M" + cvjs_firstX + "," + cvjs_firstY;		
          tPath_r += "L" + cvjs_lastX + "," + cvjs_lastY;
          cvjs_RubberBand.attr({'path': tPath_r});
      }
  }
  catch(err){
      console.log(err);
  } 
}

var randomNr;

var generic_make_rect_arrow_stop_method1 = function() {

  // find the current highest node number
  var Node_id =  cvjs_currentMaxSpaceNodeId();
  // increment and set current node underbar
  Node_id++;
  var currentNode_underbar = "Node_"+Node_id;

  randomNr = Math.floor(Math.random() * Math.floor(100000)); window.alert("randomNr "+randomNr);

  cvjs_RubberBand.attr({fill: 'none', "fill-opacity": "0.5", stroke: '#0000b0', 'stroke-opacity': "1"});
  // create a group with space as main object

  // we pull the ID from the general settings:  
  var loadSpaceImage_ID = jQuery('#image_ID').val();
  var loadSpaceImage_Type = jQuery('#image_Type').val();
  var loadSpaceImage_Layer = "cvjs_SpaceLayer";

  cvjs_createSpaceObjectGroup( currentNode_underbar, cvjs_RubberBand, loadSpaceImage_ID, loadSpaceImage_ID, loadSpaceImage_Type, loadSpaceImage_Layer, "myGroup");   

  // create a new border object as separate graphics - we use the rubberband as our graphics variable
  cvjs_RubberBand =  cvjs_makeGraphicsObjectOnCanvas('Path', tPath_r).attr({fill: 'none', "fill-opacity": "1", stroke: '#000', 'stroke-opacity': "1", 'stroke-width': mybasewidth});
   cvjs_addGraphicsToSpaceObjectGroup( currentNode_underbar,  cvjs_RubberBand, "rect01");

  // create the text string add add to graphics group
  //var myText =  cvjs_makeTextObjectOnCanvas(cvjs_firstX+(cvjs_lastX-cvjs_firstX)/10.0, cvjs_lastY - (cvjs_lastY-cvjs_firstY)/5.0, "API"+randomNr).attr({fill: "none", "fill-opacity": "1", stroke: '#000', 'font-size' : (Math.abs(cvjs_lastY-cvjs_firstY)/2.0) });
  var myText =  cvjs_makeTextObjectOnCanvas(cvjs_firstX+(cvjs_lastX-cvjs_firstX)/10.0, cvjs_lastY - (cvjs_lastY-cvjs_firstY)/5.0, "API"+randomNr).attr({fill: '#000', "fill-opacity": "1", stroke: '#000', 'font-size' : (Math.abs(cvjs_lastY-cvjs_firstY)/2.0) });
   cvjs_addGraphicsToSpaceObjectGroup( currentNode_underbar,  myText, "text01");

  // we change to arrow, and directly make the mouse draggable
  operation_type = "arrow";
  logic_flags[0] = true;
  logic_flags[1]= false;  

  // set rubberband to middle of box side
  cvjs_firstX = (cvjs_firstX+cvjs_lastX)/2.0;
  cvjs_firstY = cvjs_lastY;
// make new rubberband 
  tPath_r = "M" + cvjs_firstX + "," + cvjs_firstY;
  cvjs_RubberBand =  cvjs_makeGraphicsObjectOnCanvas('Path', tPath_r).attr({stroke: "#b00000", fill : "none"});
};



var generic_make_rect_arrow_stop_method2 = function() {

  cvjs_RubberBand.attr({fill: 'none', "fill-opacity": "1", stroke: '#000', 'stroke-opacity': "1", 'stroke-width': mybasewidth});
// we create an arrow object and add to space object

  // here we have to add the graphical object to our already created object
  var Node_id =  cvjs_currentMaxSpaceNodeId();
  var currentNode_underbar = "Node_"+Node_id;
  
   cvjs_addGraphicsToSpaceObjectGroup( currentNode_underbar, cvjs_RubberBand, "arrow-line01");

// create an arrow
var angleInDegrees = ( Math.atan2((cvjs_lastY-cvjs_firstY),(cvjs_lastX-cvjs_firstX)) / Math.PI * 180.0);
var scaleTriangle = mybasewidth;  // same as stroke-width
var triangle_design= -5.0*scaleTriangle+","+5.5*scaleTriangle+" "+0.0*scaleTriangle+","+-4.5*scaleTriangle+" "+5.0*scaleTriangle+","+5.5*scaleTriangle;
var mysin = Math.sin(angleInDegrees/180*Math.PI);
var mycos = Math.cos(angleInDegrees/180*Math.PI);
var Ttrans = 'r' + (angleInDegrees - 270)+'T' + (cvjs_lastX+ mycos*scaleTriangle) +"," + cvjs_lastY ;
  var Triangle =  cvjs_makeGraphicsObjectOnCanvas('Polyline', triangle_design);
  Triangle.attr({fill: 'none', "fill-opacity": "1", stroke: '#000', 'stroke-opacity': "1", 'stroke-width': mybasewidth});
Triangle.attr({
  fill: "#000",
  transform: Ttrans
});

// here we add an arrow to the object
 cvjs_addGraphicsToSpaceObjectGroup( currentNode_underbar, Triangle, "arrow01");

  //NOTE:  IF THE CADViewer callback method is not exported from this component, then we need to catch it
  try{
    this.cvjs_graphicalObjectOnChange('Create', 'CustomObject',  "API"+randomNr);  
  }
  catch(err){console.log("cvjs_graphicalObjectOnChange: arrow method:"+ err);};
   cvjs_removeCustomCanvasMethod();    
};



function change_arrow_text(){

	var spaceObjectId = jQuery('#image_ID').val();
	var subGroupObjectId = "text01";    // the group id of text is text01
	var newText = jQuery('#arrow_text').val();

	cvjs_changeTextOnSpaceObjectGroup(spaceObjectId, subGroupObjectId, newText);	

}

// END OF DRAG  Arrow



// CLICK TO SELECT HANDLES


// NOTE  - for Handles to be processed in DWG conversion, the conversion parameter -hlall  must be set:
      // USE THIS FOR PROCESSING AUTOCAD HANDLES        
// include this:          cvjs_conversion_addAXconversionParameter("hlall", "");		

// USE THESE TO PROCESS LAYERS RM_ AND RM_TXT FOR INTERACTIVE HIGHLIGHT 
// optional:        cvjs_conversion_addAXconversionParameter("rl", "RM_");		 
// optional:		 cvjs_conversion_addAXconversionParameter("tl", "RM_TXT");	

var generic_handles_init_method_01 = function(){
  selected_handles = [];
  // we want to send click object to back!!!!!!
  // so we can click on Handle Objects
   cvjs_sendCustomCanvasToBack("floorPlan");
  handle_selector = true;
}

/**
* Template mouse-move method for custom canvas
*/

var generic_handles_mousemove_method_01 = function(e,x,y) {

var svg_x =  cvjs_SVG_x(x);
var svg_y =  cvjs_SVG_y(y);

// cvjs_removeCustomCanvasMethod();
// console.log("generic_mousemove_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);
}


/**
* Template mouse-down method for custom canvas
*/

var generic_handles_mousedown_method_01 = function(e,x,y) {

var svg_x =  cvjs_SVG_x(x);
var svg_y =  cvjs_SVG_y(y);

//  cvjs_removeCustomCanvasMethod();
// onsole.log("generic_mousedown_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);

};

/**
* Template mouse-up method for custom canvas
*/

var generic_handles_mouseup_method_01 = function(e,x,y) {

var svg_x =  cvjs_SVG_x(x);
var svg_y =  cvjs_SVG_y(y);

// console.log("generic_mouseup_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);

};

/**
* Template double-click method for custom canvas
*/

var generic_handles_dblclick_method_01 = function(e,x,y) {
 cvjs_removeCustomCanvasMethod();
handle_selector = false;

var mystring = "";
for (var spc in selected_handles){
  // we find all handles
  mystring+= selected_handles[spc].handle+";";
  // we need to clean out highlighted handles
   cvjs_mouseout_handleObjectStyles(selected_handles[spc].id, selected_handles[spc].handle);
}

window.alert(mystring);

var svg_x =  cvjs_SVG_x(x);
var svg_y =  cvjs_SVG_y(y);
console.log("REMOVE: generic_dblclick_method_01: x="+x+" y="+y+" svg_x="+svg_x+"  svg_y="+svg_y);
};


// END - SAMPLE TO DRAG RECTANGLE over HANDLES



/////////  CANVAS CONTROL METHODS END

