var cvjs_stickyNotesRedlines_Base = {
					0: {
						node: "SNOTE_1",
						name: "Bob Smith",
						id: "1",
						layer: "RedlineLayer",
						group: "unassigned",
						text: "",
						userid: "user_1",
						currentPage: 1,
						date: "Mon May 30 2022 09:43:42 GMT+0200 (centraleuropeisk sommartid)",
						linked: true,
						transform: "T1641.5002012027342,428.4609504820016S2.6466666666666665",
						drawingRotation: 0
					}
}

function cvjs_setUpStickyNotesRedlines(paper){

 cvjs_redline=0; 

var itemSNote1=paper.group(paper.path("M0,0h20v20h-20v-20Z").attr({stroke: "#000000", "stroke-width" : "1.0"}),paper.path("M7,12h1.3M9.5,12h3.5M11.25,12v5M9.75,12v1.75M12.75,12v1.75M10.5,17h1.5M7,13.5h1.3M7,15.25h3M7,17.0h2.2").attr({stroke: "#000000", "stroke-width" : "0.5"}),paper.text(6,9,"#1").attr({"font-size": "8px", "font-style": "italic", stroke: "#000000", "stroke-width" : "0.3", "stroke" : "0.3", "fill" : "#000000", "fill-opacity" : 1.0})).attr({'transform': "t0,0S0.01" , "opacity" : "0.1"}).attr({	fill: '#FFF', "fill-opacity": "0.8", stroke: '#000', 'stroke-opacity': "1" })
.data("node","SNOTE_1");
vqStickyNotes.push(itemSNote1);

cvjs_stickyNotesRedlines.push(cvjs_stickyNotesRedlines_Base[0]);

 cvjs_stickynote=1; 

}

jQuery(document).ready(function() { 
	stickynotesRedlines_loaded = true; 
}); 
stickynotesRedlines_loaded = true; 
