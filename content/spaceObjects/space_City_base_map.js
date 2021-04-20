function drawPathsGeneric(paper, cvjs_active_floorplan_div_nr, vqRooms, buildings){ 


 var buildings = {
 	 BUILDING_NAME_GOES_HERE: {
		name: "",
		company: "",
		address: "",
		city: "",
		state: "Test1",
		zipcode: "",
		country: "",
		FacMgr: "Hello 2!",
		FacMgr_title: "",
		FacMgr_email: "",
		FacMgr_phone: "",
		floors: {
			space_objects_01 : {
				name: "space_objects_01",
				file: "space_objects_01.js",
				rooms: {
					NODE_1: {
						name: "1_qq",
						id: "1_qq",
						layer: "cvjs_Data_Layer",
						group: "",
						occupancy: "",
						type: "Space",
						tags:  {  }, 
						attributes: [],
						linked: true,
					}
						,
					NODE_2: {
						name: "2_xx",
						id: "2_xx",
						layer: "cvjs_Data_Layer",
						group: "",
						occupancy: "",
						type: "Space",
						tags:  {  }, 
						attributes: [],
						linked: true,
					}
						,
					NODE_3: {
						name: "3_downtown",
						id: "3_downtown",
						layer: "cvjs_Data_Layer",
						group: "",
						occupancy: "",
						type: "Space",
						tags:  {  }, 
						attributes: [],
						linked: true,
					}
						,
					NODE_4: {
						name: "4_river",
						id: "4_river",
						layer: "cvjs_Data_Layer",
						group: "",
						occupancy: "",
						type: "Space",
						tags:  {  }, 
						attributes: [],
						linked: true,
					}
						,
					NODE_5: {
						name: "5_river",
						id: "5_river",
						layer: "cvjs_Data_Layer",
						group: "",
						occupancy: "",
						type: "Space",
						tags:  {  }, 
						attributes: [],
						linked: true,
					}
						,
					NODE_6: {
						name: "6_mid_section",
						id: "6_mid_section",
						layer: "cvjs_Data_Layer",
						group: "",
						occupancy: "",
						type: "Space",
						tags:  {  }, 
						attributes: [],
						linked: true,
					}
					}
				}
			}
		}
	}


var uItem1= paper.path("M354.02257420557623,302.44923692312295h382.1739977724063v445.52904553146834h-382.1739977724063v-445.52904553146834 Z     ")
.data("node","NODE_1");
vqRooms[cvjs_active_floorplan_div_nr].push(uItem1);

var uItem2= paper.path("M815.9013094813187,206.39480967551282h165.54060866077492v222.76452276573417h-165.54060866077492v-222.76452276573417 Z     ")
.data("node","NODE_2");
vqRooms[cvjs_active_floorplan_div_nr].push(uItem2);

var uItem3= paper.path("M1078.6749105152605,677.462905171354h816.9508476937585v390.4212614669067h-816.9508476937585v-390.4212614669067 Z    ")
.data("node","NODE_3");
vqRooms[cvjs_active_floorplan_div_nr].push(uItem3);

var uItem4= paper.path("M2010.7210433813443,1162.6685191331167L1931.7340829689642,1029.519071580819L1816.6387977966392,948.2753408709425L1699.2867423268174,932.4779487884665L1613.5294710219478,871.5451507560591L1543.569591799554,824.1529745086311L1521.0018888245884,769.9904873687134L1649.637795781893,736.1389329062649L1683.4893502443415,790.3014200461826L1803.0981760116597,848.9774477810934L1902.3960691015088,891.8560834335283L1963.3288671339162,943.7618002759493L2037.8022869513031,1009.2081389033499L2094.221544388717,1088.19509931573L2103.2486255787035,1099.4789508032127L2046.8293681412893,1149.1278973481374L2046.8293681412893,1149.1278973481374L2046.8293681412893,1149.1278973481374L2010.7210433813443,1162.6685191331167   ")
.data("node","NODE_4");
vqRooms[cvjs_active_floorplan_div_nr].push(uItem4);

var uItem5= paper.path("M2025.4199439520046,1178.9816758913523L2113.7520538513336,1109.24579965504L2322.9596825602703,1309.1553115324684L2127.699229098596,1299.85719470096L2111.4275246434563,1264.989256582804L2064.936940485915,1232.445847672525L2044.0161776150212,1195.2533803464917L2044.0161776150212,1195.2533803464917L2044.0161776150212,1195.2533803464917L2025.4199439520046,1178.9816758913523  ")
.data("node","NODE_5");
vqRooms[cvjs_active_floorplan_div_nr].push(uItem5);

var uItem6= paper.path("M1083.1792180123693,455.1971143600892L1153.0511630070946,495.42641602371896L1216.5711130022996,520.8343960218009L1257.8590804991827,533.5383860208418L1302.3230454958261,531.4210543543351L1345.7283446592162,545.1837101866294L1374.3123221570584,584.3543460170057L1391.250975489113,600.234333515807L1418.7762871537018,547.3010418531362L1441.0082696520235,466.84243852587673L1396.54430465538,475.31176519190404L1363.7256638245242,443.55179019430165L1327.7310254939082,448.84511936056873L1292.7950529965453,448.84511936056873L1273.739067997984,444.6104560275551L1270.5630704982236,426.613136862247L1119.1738563429853,456.2557801933426L1081.0618863458626,450.96245102707553L1081.0618863458626,450.96245102707553L1081.0618863458626,450.96245102707553L1083.1792180123693,455.1971143600892 ")
.data("node","NODE_6");
vqRooms[cvjs_active_floorplan_div_nr].push(uItem6);

return (buildings);
}

jQuery(document).ready(function() { 
	setUpVqRoomsGeneric(); 
}); 
