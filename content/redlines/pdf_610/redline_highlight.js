var cvjs_stickyNotesRedlines_Base = {
					0: {
						node: "RED_1",
						name: "redline1",
						id: "1",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#ffa500",
						strokeWidth: "3",
						fill: "#ffa500",
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
					2: {
						node: "RED_2",
						name: "redline2",
						id: "2",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#ffa500",
						strokeWidth: "3",
						fill: "#ffa500",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 2,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "none",
						fill_opacity: "0.1",
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
						color: "#ffa500",
						strokeWidth: "3",
						fill: "#ffa500",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 3,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "none",
						fill_opacity: "0.1",
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
						color: "#ffa500",
						strokeWidth: "3",
						fill: "#ffa500",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 4,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "none",
						fill_opacity: "0.1",
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
						color: "#ffa500",
						strokeWidth: "3",
						fill: "#ffa500",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 5,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "none",
						fill_opacity: "0.1",
						transform: "none",
						drawingRotation: 0
					}
}

function cvjs_setUpStickyNotesRedlines(paper){

var cItemRed1= paper.path("M72.87936168404514,244.5042032091008h323.7563416237055v26.90961800508721h-323.7563416237055v-26.90961800508721 Z ").attr({stroke: "#ffa500", "stroke-width": "3", "fill": "#ffa500", "fill-opacity": "0.1"})
.data("node","RED_1");
vqRedlines.push(cItemRed1);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[0]);

var cItemRed2= paper.path("M70.86354652404788,116.83551635742191h226.9474542236328v24.707988967895506h-226.9474542236328v-24.707988967895506 Z ").attr({stroke: "#ffa500", "stroke-width": "3", "fill": "#ffa500", "fill-opacity": "0.1"})
.data("node","RED_2");
vqRedlines.push(cItemRed2);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[2]);

var cItemRed3= paper.path("M70.68635711669926,126.8151881408692h334.0310620880127v21.725597534179684h-334.0310620880127v-21.725597534179684 Z ").attr({stroke: "#ffa500", "stroke-width": "3", "fill": "#ffa500", "fill-opacity": "0.1"})
.data("node","RED_3");
vqRedlines.push(cItemRed3);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[3]);

var cItemRed4= paper.path("M72.88047210693361,117.8434602355957h344.2481231689453v68.84962463378906h-344.2481231689453v-68.84962463378906 Z ").attr({stroke: "#ffa500", "stroke-width": "3", "fill": "#ffa500", "fill-opacity": "0.1"})
.data("node","RED_4");
vqRedlines.push(cItemRed4);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[4]);

var cItemRed5= paper.path("M69.6993825531006,144.91985275268559h186.47804550170898v22.630830764770504h-186.47804550170898v-22.630830764770504 Z ").attr({stroke: "#ffa500", "stroke-width": "3", "fill": "#ffa500", "fill-opacity": "0.1"})
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
