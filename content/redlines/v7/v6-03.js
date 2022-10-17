var cvjs_stickyNotesRedlines_Base = {
					0: {
						node: "RED_1",
						name: "redline1",
						id: "1",
						layer: "RedLineLayer",
						group: "RedLineLayer",
						color: "#FF0000",
						strokeWidth: "4",
						fill: "#FFF",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 2,
						triangle_design: "undefined",
						polypath_arrow: "none",
						redline_text: "Text!",
						redline_font_size: "10",
						fill_opacity: "0.01",
						transform: "T111.6582481751826,530.8858394160584S4",
						drawingRotation: 0
					}
						,
					1: {
						node: "RED_2",
						name: "redline2",
						id: "2",
						layer: "RedLineLayer",
						group: "RedLineLayer",
						color: "#FF0000",
						strokeWidth: "4",
						fill: "#FFF",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 2,
						triangle_design: "undefined",
						polypath_arrow: "none",
						redline_text: "none",
						redline_font_size: "undefined",
						fill_opacity: "0.01",
						transform: "none",
						drawingRotation: 0
					}
						,
					2: {
						node: "RED_3",
						name: "redline3",
						id: "3",
						layer: "RedLineLayer",
						group: "RedLineLayer",
						color: "#FF0000",
						strokeWidth: "4",
						fill: "#FFF",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 2,
						triangle_design: "undefined",
						polypath_arrow: "none",
						redline_text: "none",
						redline_font_size: "undefined",
						fill_opacity: "0.01",
						transform: "none",
						drawingRotation: 0
					}
						,
					3: {
						node: "RED_4",
						name: "redline4",
						id: "4",
						layer: "RedLineLayer",
						group: "RedLineLayer",
						color: "#22B14C",
						strokeWidth: "4",
						fill: "#22B14C",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 2,
						triangle_design: "undefined",
						polypath_arrow: "none",
						redline_text: "none",
						redline_font_size: "undefined",
						fill_opacity: "0.1",
						transform: "none",
						drawingRotation: 0
					}
						,
					4: {
						node: "RED_5",
						name: "redline5",
						id: "5",
						layer: "RedLineLayer",
						group: "RedLineLayer",
						color: "#22B14C",
						strokeWidth: "4",
						fill: "#FFF",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 2,
						triangle_design: "undefined",
						polypath_arrow: "M701.2478102189782,781.0147445255474L203.5423357664235,954.5735766423356L142.2862773722629,569.1708759124087L142.2862773722629,569.1708759124087L142.2862773722629,569.1708759124087",
						redline_text: "none",
						redline_font_size: "undefined",
						fill_opacity: "0.01",
						transform: "T141.73688212555925,569.1708759124087r-369.03107179644064",
						drawingRotation: 0
					}
}

function cvjs_setUpStickyNotesRedlines(paper){

var cItemRed1= paper.path("M0,0")
.data("node","RED_1");
vqRedlines.push(cItemRed1);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[0]);

var cItemRed2= paper.path("cv_RED_2_redline ").attr({stroke: "#FF0000", "stroke-width": "4", "fill": "#FFF", "fill-opacity": "0.01"})
.data("node","RED_2");
vqRedlines.push(cItemRed2);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[1]);

var cItemRed3= paper.ellipse(722.9426642335767,450.4872627737226,159.52098540145982,103.36959854014597).attr({stroke: "#FF0000", "stroke-width": "4", "fill": "#FFF", "fill-opacity": "0.01"})
.data("node","RED_3");
vqRedlines.push(cItemRed3);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[2]);

var cItemRed4= paper.path("cv_RED_4_redline ").attr({stroke: "#22B14C", "stroke-width": "4", "fill": "#22B14C", "fill-opacity": "0.1"})
.data("node","RED_4");
vqRedlines.push(cItemRed4);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[3]);

var cItemRed5= paper.g(paper.polyline("-17.5,19.25 0,-15.75 17.5,19.25 ").attr({transform: "T141.73688212555925,569.1708759124087r-369.03107179644064", "fill": "#22B14C"}), paper.path("cv_RED_5_redline ").attr({stroke: "#22B14C", "stroke-width": "4", "fill": "#FFF", "fill-opacity": "0.01"}))
.data("node","RED_5");
vqRedlines.push(cItemRed5);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[4]);

 cvjs_redline=5; 

 cvjs_stickynote=0; 

}

jQuery(document).ready(function() { 
	stickynotesRedlines_loaded = true; 
}); 
stickynotesRedlines_loaded = true; 
