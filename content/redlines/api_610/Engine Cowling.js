var cvjs_stickyNotesRedlines_Base = {
					1: {
						node: "RED_1",
						name: "redline1",
						id: "1",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#22B14C",
						strokeWidth: "4",
						fill: "#FFF",
						username: "ib",
						userid: "ib",
						currentPage: 1,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "none",
						redline_font_size: "undefined",
						fill_opacity: "0.01",
						transform: "none",
						drawingRotation: 0
					}
						,
					2: {
						node: "RED_2",
						name: "redline2",
						id: "2",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#22B14C",
						strokeWidth: "4",
						fill: "#FFF",
						username: "ib",
						userid: "ib",
						currentPage: 1,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "none",
						redline_font_size: "undefined",
						fill_opacity: "0.01",
						transform: "none",
						drawingRotation: 0
					}
						,
					3: {
						node: "RED_3",
						name: "redline3",
						id: "3",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#22B14C",
						strokeWidth: "4",
						fill: "#FFF",
						username: "ib",
						userid: "ib",
						currentPage: 1,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "none",
						redline_font_size: "undefined",
						fill_opacity: "0.01",
						transform: "none",
						drawingRotation: 0
					}
						,
					4: {
						node: "RED_4",
						name: "redline4",
						id: "4",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#22B14C",
						strokeWidth: "4",
						fill: "#FFF",
						username: "ib",
						userid: "ib",
						currentPage: 1,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "none",
						redline_font_size: "undefined",
						fill_opacity: "0.01",
						transform: "none",
						drawingRotation: 0
					}
						,
					5: {
						node: "RED_5",
						name: "redline5",
						id: "5",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#22B14C",
						strokeWidth: "4",
						fill: "#FFF",
						username: "ib",
						userid: "ib",
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

var cItemRed1= paper.ellipse(444.79134814814824,1045.4179555555554,60.89813333333333,101.49688888888888).attr({stroke: "#22B14C", "stroke-width": "4", "fill": "#FFF", "fill-opacity": "0.01"})
.data("node","RED_1");
vqRedlines.push(cItemRed1);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[1]);

var cItemRed2= paper.ellipse(784.805925925926,791.6757333333333,59.206518518518514,81.19751111111111).attr({stroke: "#22B14C", "stroke-width": "4", "fill": "#FFF", "fill-opacity": "0.01"})
.data("node","RED_2");
vqRedlines.push(cItemRed2);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[2]);

var cItemRed3= paper.ellipse(1711.8108444444445,805.2086518518518,62.589748148148146,91.34719999999999).attr({stroke: "#22B14C", "stroke-width": "4", "fill": "#FFF", "fill-opacity": "0.01"})
.data("node","RED_3");
vqRedlines.push(cItemRed3);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[3]);

var cItemRed4= paper.ellipse(2058.5918814814813,1052.1844148148148,67.66459259259258,101.49688888888888).attr({stroke: "#22B14C", "stroke-width": "4", "fill": "#FFF", "fill-opacity": "0.01"})
.data("node","RED_4");
vqRedlines.push(cItemRed4);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[4]);

var cItemRed5= paper.ellipse(2577.91762962963,201.30216296296297,62.589748148148146,59.206518518518514).attr({stroke: "#22B14C", "stroke-width": "4", "fill": "#FFF", "fill-opacity": "0.01"})
.data("node","RED_5");
vqRedlines.push(cItemRed5);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[5]);

 cvjs_redline=5; 

 cvjs_stickynote=0; 

}

jQuery(document).ready(function() { 
	stickynotesRedlines_loaded = true; 
}); 
stickynotesRedlines_loaded = true; 
