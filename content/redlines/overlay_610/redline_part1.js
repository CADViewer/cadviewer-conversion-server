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
						drawingRotation: undefined
					}
						,
					3: {
						node: "RED_2",
						name: "redline2",
						id: "2",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#ffa500",
						strokeWidth: "3",
						fill: "#FFF",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 1,
						triangle_design: "-9.101100669973935,11.123567485523699 1.0112334077748817,-9.101100669973935 11.123567485523699,11.123567485523699",
						polypath_arrow: "M920.1467983259128,794.550130764805L1236.2090150019374,801.1006430275205L1291.8883692350194,928.8356321504735L1291.8883692350194,928.8356321504735L1291.8883692350194,928.8356321504735",
						redline_text: "none",
						fill_opacity: "0.01",
						transform: "T1291.8883692350194,928.8356321504735r-203.5522636728946",
						drawingRotation: undefined
					}
						,
					4: {
						node: "RED_3",
						name: "redline3",
						id: "3",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#ffa500",
						strokeWidth: "3",
						fill: "#FFF",
						username: "Bob Smith",
						userid: "user_1",
						currentPage: 1,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "Change floor elements",
						fill_opacity: "0.01",
						transform: "T649.938167488897,835.490832406777S0.6741556051832545,649.938167488897,835.490832406777",
						drawingRotation: undefined
					}
}

function cvjs_setUpStickyNotesRedlines(paper){

var cItemRed1= paper.path("M594.258813255815,1032.0062002882432L1042.968903251829,1470.8905218901841L1514.6057861673476,959.9505653983723L646.6629113575392,956.6753092670145L602.4469535842094,1022.1804318941698L602.4469535842094,1022.1804318941698L602.4469535842094,1022.1804318941698L594.258813255815,1032.0062002882432Z ").attr({stroke: "#ffa500", "stroke-width": "3", "fill": "#ffa500", "fill-opacity": "0.1"})
.data("node","RED_1");
vqRedlines.push(cItemRed1);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[0]);

var cItemRed2= paper.g(paper.polyline("-9.101100669973935,11.123567485523699 1.0112334077748817,-9.101100669973935 11.123567485523699,11.123567485523699 ").attr({transform: "T1291.8883692350194,928.8356321504735r-203.5522636728946", "fill": "#ffa500"}), paper.path("M920.1467983259128,794.550130764805L1236.2090150019374,801.1006430275205L1291.8883692350194,928.8356321504735L1291.8883692350194,928.8356321504735L1291.8883692350194,928.8356321504735 ").attr({stroke: "#ffa500", "stroke-width": "3", "fill": "#FFF", "fill-opacity": "0.01"}))
.data("node","RED_2");
vqRedlines.push(cItemRed2);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[3]);

var cItemRed3= paper.path("M0,0")
.data("node","RED_3");
vqRedlines.push(cItemRed3);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[4]);

 cvjs_redline=3; 

 cvjs_stickynote=0; 

}

jQuery(document).ready(function() { 
	stickynotesRedlines_loaded = true; 
}); 
stickynotesRedlines_loaded = true; 
