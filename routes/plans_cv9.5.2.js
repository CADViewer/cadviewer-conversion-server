const fs = require("fs").promises;
const config = require("../CADViewer_config.json");

const express = require("express"),
    router = express.Router();

// get json plan file content
router.get("/:plan", async (req, res) => {
    // Retrieve the plan file name from the request
    const plan_file_name = req.params.plan;
    const plan_file_path = config.jsonPlansLocation + plan_file_name;
    console.log("plan_file_path: ", plan_file_path);
    // Read the plan file content and send it back to the client or send an 404 error message
    try {
        const plan_file_content = await fs.readFile(plan_file_path);
        res.status(200).json(JSON.parse(plan_file_content.toString()));
    } catch (err) {
        res.status(404).json({
            message: "Plan file not found",
        });
    }

});

// get svg content of a plan
router.get("/svg/:svg", async (req, res) => {
    const svg_file_name = req.params.svg;
    const svg_file_path = config.fileBlobLocation + svg_file_name;
    console.log("svg_file_path: ", svg_file_path);
    // Read the plan file content and send it back to the client or send an 404 error message
    try {
        const plan_file_content = await fs.readFile(svg_file_path);
        res.status(200).send(plan_file_content.toString());
    } catch (err) {
        res.status(404).json({
            message: "Svg file not found",
        });
    }

});

module.exports = router;