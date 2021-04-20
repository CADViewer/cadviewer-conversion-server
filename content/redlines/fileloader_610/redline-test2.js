var cvjs_stickyNotesRedlines_Base = {
					0: {
						node: "RED_1",
						name: "redline1",
						id: "1",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#22B14C",
						strokeWidth: "3",
						fill: "#22B14C",
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
						,
					1: {
						node: "RED_2",
						name: "redline2",
						id: "2",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#22B14C",
						strokeWidth: "3",
						fill: "#FFF",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 1,
						triangle_design: "-9.313900588781816,11.383656275177778 1.0348778431979797,-9.313900588781816 11.383656275177778,11.383656275177778",
						polypath_arrow: "M573.6117068763624,123.42414935225185L667.2959411923483,45.59417007435584L736.4781449949226,103.24600657650103L736.4781449949226,103.24600657650103L736.4781449949226,103.24600657650103",
						redline_text: "none",
						fill_opacity: "0.01",
						transform: "T736.4781449949226,103.24600657650103r-230.19442890773482",
						drawingRotation: 0
					}
						,
					2: {
						node: "RED_3",
						name: "redline3",
						id: "3",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#22B14C",
						strokeWidth: "3",
						fill: "#FFF",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 1,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "Work planned for<br>September",
						fill_opacity: "0.01",
						transform: "T497.22302351102,156.57395534098535S0.6899185621319864,497.22302351102,156.57395534098535",
						drawingRotation: 0
					}
}

function cvjs_setUpStickyNotesRedlines(paper){

var cItemRed1= paper.path("M705.8572437126286,218.6617171700029L792.1828677316512,64.43953493377158L903.7272133742084,136.21589647767797L817.4015893551858,284.6183737238629L817.4015893551858,284.6183737238629L817.4015893551858,284.6183737238629L705.8572437126286,218.6617171700029Z ").attr({stroke: "#22B14C", "stroke-width": "3", "fill": "#22B14C", "fill-opacity": "0.1"})
.data("node","RED_1");
vqRedlines.push(cItemRed1);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[0]);

var cItemRed2= paper.g(paper.polyline("-9.313900588781816,11.383656275177778 1.0348778431979797,-9.313900588781816 11.383656275177778,11.383656275177778 ").attr({transform: "T736.4781449949226,103.24600657650103r-230.19442890773482", "fill": "#22B14C"}), paper.path("M573.6117068763624,123.42414935225185L667.2959411923483,45.59417007435584L736.4781449949226,103.24600657650103L736.4781449949226,103.24600657650103L736.4781449949226,103.24600657650103 ").attr({stroke: "#22B14C", "stroke-width": "3", "fill": "#FFF", "fill-opacity": "0.01"}))
.data("node","RED_2");
vqRedlines.push(cItemRed2);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[1]);

var cItemRed3= paper.path("M0,0")
.data("node","RED_3");
vqRedlines.push(cItemRed3);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[2]);

 cvjs_redline=3; 

 cvjs_stickynote=0; 

}

jQuery(document).ready(function() { 
	stickynotesRedlines_loaded = true; 
}); 
stickynotesRedlines_loaded = true; 
