var cvjs_stickyNotesRedlines_Base = {
					0: {
						node: "RED_1",
						name: "redline1",
						id: "1",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#FF0000",
						strokeWidth: "3",
						fill: "#FF0000",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 1,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "none",
						fill_opacity: "0.1",
						transform: "none",
						drawingRotation: 0
					}
}

function cvjs_setUpStickyNotesRedlines(paper){

var cItemRed1= paper.path("M644.8953235677084,542.0373333333333h1236.5226666666665v622.496h-1236.5226666666665v-622.496 Z ").attr({stroke: "#FF0000", "stroke-width": "3", "fill": "#FF0000", "fill-opacity": "0.1"})
.data("node","RED_1");
vqRedlines.push(cItemRed1);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[0]);

 cvjs_redline=1; 

 cvjs_stickynote=0; 

}

jQuery(document).ready(function() { 
	stickynotesRedlines_loaded = true; 
}); 
stickynotesRedlines_loaded = true; 
