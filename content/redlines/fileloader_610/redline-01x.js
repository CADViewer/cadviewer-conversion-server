var cvjs_stickyNotesRedlines_Base = {
					0: {
						node: "RED_1",
						name: "redline1",
						id: "1",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#FF0000",
						strokeWidth: "4",
						fill: "#FFF",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 1,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "none",
						redline_font_size: "undefined",
						fill_opacity: "0.01",
						transform: "none",
						drawingRotation: 0
					}
}

function cvjs_setUpStickyNotesRedlines(paper){

var cItemRed1= paper.ellipse(782.2600724637681,723.8985507246377,259.5652173913044,207.65217391304347).attr({stroke: "#FF0000", "stroke-width": "4", "fill": "#FFF", "fill-opacity": "0.01"})
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
