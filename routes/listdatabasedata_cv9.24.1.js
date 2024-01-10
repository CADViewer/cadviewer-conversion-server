const fs = require("fs");
const path = require("path");
const config = require("../CADViewer_config.json");
const conn = require("../libs/mysql.js");

const express = require("express"),
	router = express.Router();

router.get("/photos/:room_id", async (req, res) => {
	try {
		const id = req.params.room_id;
		const sql = `SELECT id, image_file_name, image_content_type, image_file_size, image_updated_at, created_at, updated_at FROM photos WHERE room_id = ${id}`;
		const images = [];
		const [rows] = await conn.promise().query(sql);
		for (let i = 0; i < rows.length; i++) {
			const row = rows[i];
			images.push({
				id: row.id,
				image_file_name: `/photos/${row.id}/original/${row.image_file_name}`,
				image_content_type: row.image_content_type,
				image_file_size: row.image_file_size,
				image_updated_at: row.image_updated_at,
				created_at: row.created_at,
				updated_at: row.updated_at,
			});
		}
		res.send(images);
	} catch (err) {
		console.log(err);
		res.send([]);
	}
});

router.get("/org2s", async(req, res) => {


try{

	const sql_list_employees = `SELECT id, room_id, employee_number, phone, floor_id, org2_id, employeeName FROM employees`;
	const sql_list_org2s = `SELECT id, name, color_id FROM org2s`;
	const sql_list_colors = `SELECT id, hex FROM colors`;
	const employees = [];
	const orgs = {};
	const colors = {};
	// get colors in database without callback and set it as map
	const [rows] = await conn.promise().query(sql_list_colors);
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];
		colors[row.id] = {
			id: row.id,
			hex: `#${row.hex}`,
		};
	}

	// get orgs in database without callback and set it as map 
	const [rows2] = conn.promise().query(sql_list_org2s);
	for (let i = 0; i < rows2.length; i++) {
		const row = rows2[i];
		orgs[row.id] = {
			id: row.id,
			name: row.name,
			color_id: row.color_id,
			color: colors[row.color_id].hex,
		};
	}
	return res.send(orgs);



}
catch(err){

    console.log("DB /org2s error"+err);

    res.send("[]");

}




});

router.get("/employees", async (req, res) => {

    try{


        const sql_list_employees = `SELECT id, room_id, employee_number, phone, floor_id, org2_id, employeeName FROM employees`;
        const sql_list_org2s = `SELECT id, name, color_id FROM org2s`;
        const sql_list_colors = `SELECT id, hex FROM colors`;
        const employees = [];
        const orgs = {};
        const colors = {};
        // get colors in database without callback and set it as map
        let [rows] = await conn.promise().query(sql_list_colors)
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            colors[row.id] = {
                id: row.id,
                hex: `#${row.hex}`,
            };
        }
        console.log({colors})
        // get orgs in database without callback and set it as map 
        const [rows2] = await conn.promise().query(sql_list_org2s);
        for (let i = 0; i < rows2.length; i++) {
            const row = rows2[i];
            orgs[row.id] = {
                id: row.id,
                name: row.name,
                color_id: row.color_id,
                color: colors[row.color_id].hex,
            };
        }
        // get all employees and construct json for response
        const [rows3] = await conn.promise().query(sql_list_employees);
        for (let i = 0; i < rows3.length; i++) {
            const row = rows3[i];
            employees.push({
                id: row.id,
                room_id: row.room_id,
                employee_number: row.employee_number,
                phone: row.phone,
                floor_id: row.floor_id,
                org2_id: row.org2_id,
                firstname: row.employeeName.split(" ")[0],
                lastname: row.employeeName.split(" ")[1],
                employeeName: row.employeeName,
                department: orgs[row.org2_id],
            });
        }
        res.send(employees);




    }
    catch(err){

        console.log("DB /employees error"+err);

        res.send("[]");

    }


});

module.exports = router;