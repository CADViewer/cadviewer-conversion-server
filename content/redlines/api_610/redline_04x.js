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
						username: "James Smith",
						userid: "user_01",
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
						color: "#ffa500",
						strokeWidth: "3",
						fill: "#FFF",
						username: "James Smith",
						userid: "user_01",
						currentPage: 1,
						triangle_design: "-9.105038370861669,11.12838023105315 1.011670930095741,-9.105038370861669 11.12838023105315,11.12838023105315",
						polypath_arrow: "M353.7376312099895,886.558469135588L524.104747792856,793.2621910068755L695.8239843486022,873.037269406789L694.4718643757222,873.037269406789L694.4718643757222,873.037269406789",
						redline_text: "none",
						fill_opacity: "0.01",
						transform: "T694.4718643757222,873.037269406789r-244.90847029032616",
						drawingRotation: 0
					}
						,
					2: {
						node: "RED_3",
						name: "redline3",
						id: "3",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#ffa500",
						strokeWidth: "3",
						fill: "#FFF",
						username: "James Smith",
						userid: "user_01",
						currentPage: 1,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "Sample Text!",
						fill_opacity: "0.01",
						transform: "T244.21591340671827,946.0517479423032S0.6744472867304939",
						drawingRotation: 0
					}
						,
					3: {
						node: "RED_4",
						name: "redline4",
						id: "4",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#FF0000",
						strokeWidth: "3",
						fill: "#FF0000",
						username: "Jane Doe",
						userid: "user_02",
						currentPage: 1,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "none",
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
						group: "unassigned",
						color: "#FF0000",
						strokeWidth: "3",
						fill: "#FFF",
						username: "Jane Doe",
						userid: "user_02",
						currentPage: 1,
						triangle_design: "-9.105038370861669,11.12838023105315 1.011670930095741,-9.105038370861669 11.12838023105315,11.12838023105315",
						polypath_arrow: "M1308.2040105627934,834.1617929795297L1619.2337841967637,610.8048414437255L1861.3777690393179,836.2492411247241L1855.1154246037345,867.5609633026405L1855.1154246037345,867.5609633026405L1855.1154246037345,867.5609633026405",
						redline_text: "none",
						fill_opacity: "0.01",
						transform: "T1855.1154246037345,867.5609633026405r-168.6900675259796",
						drawingRotation: 0
					}
						,
					5: {
						node: "RED_6",
						name: "redline6",
						id: "6",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#FF0000",
						strokeWidth: "3",
						fill: "#FFF",
						username: "Jane Doe",
						userid: "user_02",
						currentPage: 1,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "Sample Text <br>from user 2",
						fill_opacity: "0.01",
						transform: "T1270.6299439492936,907.2224780613348S0.6744472867304939",
						drawingRotation: 0
					}
						,
					6: {
						node: "RED_7",
						name: "redline7",
						id: "7",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#0000FF",
						strokeWidth: "3",
						fill: "#0000FF",
						username: "James Smith",
						userid: "user_01",
						currentPage: 1,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "none",
						fill_opacity: "0.1",
						transform: "none",
						drawingRotation: 0
					}
						,
					7: {
						node: "RED_8",
						name: "redline8",
						id: "8",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#0000FF",
						strokeWidth: "3",
						fill: "#FFF",
						username: "James Smith",
						userid: "user_01",
						currentPage: 1,
						triangle_design: "none",
						polypath_arrow: "none",
						redline_text: "User 1 text",
						fill_opacity: "0.01",
						transform: "T266.652831683727,302.9635633744362S0.6746108051736432",
						drawingRotation: 0
					}
						,
					8: {
						node: "RED_9",
						name: "redline9",
						id: "9",
						layer: "RedLineLayer",
						group: "unassigned",
						color: "#0000FF",
						strokeWidth: "3",
						fill: "#0000FF",
						username: "James Smith",
						userid: "user_01",
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

var cItemRed1= paper.path("M510.58354806405697,941.9953880236635L1009.5158180567371,914.9529885660656L991.9382584092984,1366.5610595079495L933.7970995754631,1384.1386191553881L513.2877880098167,983.9111071829402L513.2877880098167,983.9111071829402L513.2877880098167,983.9111071829402L510.58354806405697,941.9953880236635Z    ").attr({stroke: "#ffa500", "stroke-width": "3", "fill": "#ffa500", "fill-opacity": "0.1"})
.data("node","RED_1");
vqRedlines.push(cItemRed1);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[0]);

var cItemRed2= paper.g(paper.polyline("-9.105038370861669,11.12838023105315 1.011670930095741,-9.105038370861669 11.12838023105315,11.12838023105315    ").attr({transform: "T694.4718643757222,873.037269406789r-244.90847029032616", "fill": "#ffa500"}), paper.path("M353.7376312099895,886.558469135588L524.104747792856,793.2621910068755L695.8239843486022,873.037269406789L694.4718643757222,873.037269406789L694.4718643757222,873.037269406789    ").attr({stroke: "#ffa500", "stroke-width": "3", "fill": "#FFF", "fill-opacity": "0.01"}))
.data("node","RED_2");
vqRedlines.push(cItemRed2);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[1]);

var cItemRed3= paper.path("M0,0")
.data("node","RED_3");
vqRedlines.push(cItemRed3);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[2]);

var cItemRed4= paper.path("M1633.8459212131247,905.1350299161403L2141.0958204953718,907.2224780613348L2141.0958204953718,1253.7388701636103L2007.4991392029278,1393.5978958916373L1635.9333693583192,980.2831631431399L1635.9333693583192,980.2831631431399L1638.0208175035136,980.2831631431399L1633.8459212131247,905.1350299161403Z    ").attr({stroke: "#FF0000", "stroke-width": "3", "fill": "#FF0000", "fill-opacity": "0.1"})
.data("node","RED_4");
vqRedlines.push(cItemRed4);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[3]);

var cItemRed5= paper.g(paper.polyline("-9.105038370861669,11.12838023105315 1.011670930095741,-9.105038370861669 11.12838023105315,11.12838023105315    ").attr({transform: "T1855.1154246037345,867.5609633026405r-168.6900675259796", "fill": "#FF0000"}), paper.path("M1308.2040105627934,834.1617929795297L1619.2337841967637,610.8048414437255L1861.3777690393179,836.2492411247241L1855.1154246037345,867.5609633026405L1855.1154246037345,867.5609633026405L1855.1154246037345,867.5609633026405    ").attr({stroke: "#FF0000", "stroke-width": "3", "fill": "#FFF", "fill-opacity": "0.01"}))
.data("node","RED_5");
vqRedlines.push(cItemRed5);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[4]);

var cItemRed6= paper.path("M0,0")
.data("node","RED_6");
vqRedlines.push(cItemRed6);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[5]);

var cItemRed7= paper.path("M271.3497571432578,72.81421585742596h342.87555854575v154.99854016451712h-342.87555854575v-154.99854016451712 Z   ").attr({stroke: "#0000FF", "stroke-width": "3", "fill": "#0000FF", "fill-opacity": "0.1"})
.data("node","RED_7");
vqRedlines.push(cItemRed7);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[6]);

var cItemRed8= paper.path("M0,0")
.data("node","RED_8");
vqRedlines.push(cItemRed8);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[7]);

var cItemRed9= paper.path("M1026.9265667459238,250.65579710144917h805.8350317028985v400.7395833333333h-805.8350317028985v-400.7395833333333 Z ").attr({stroke: "#0000FF", "stroke-width": "3", "fill": "#0000FF", "fill-opacity": "0.1"})
.data("node","RED_9");
vqRedlines.push(cItemRed9);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[8]);

 cvjs_redline=9; 

 cvjs_stickynote=0; 

}

jQuery(document).ready(function() { 
	stickynotesRedlines_loaded = true; 
}); 
stickynotesRedlines_loaded = true; 
