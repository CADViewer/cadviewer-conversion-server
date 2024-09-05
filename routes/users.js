// users.js

const conn = require("../libs/mysql.js");
const verifyToken = require('../libs/jwt').verifyToken;


const express = require("express"),
    router = express.Router();

const {randomUUID} = require("crypto");

// user listing endpoint
router.get("", verifyToken, async (req, res, next) => {
    let users;
    try {
      const [rows] = await conn.promise().execute('SELECT * FROM `users`', []);
      users = rows;
    } catch (err) {
      console.log({err});
      res.status(500).json({"error": "Error! Something went wrong."});
      return;
    }
    res.status(200).json({success: true, data: users});
});

// change user role endpoint
router.put("/:id/change-role", verifyToken, async (req, res, next) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
      await conn.promise().execute('UPDATE `users` SET `role` = ? WHERE `id` = ?', [role, id]);
    } catch (err) {
      console.log({err});
      res.status(500).json({"error": "Error! Something went wrong."});
      return;
    }
    res.status(200).json({success: true, message: "Role changed successfully"});
});

// delete user endpoint
router.delete("/:id", verifyToken, async (req, res, next) => {
    const { id } = req.params;
    try {
      await conn.promise().execute('DELETE FROM `users` WHERE `id` = ?', [id]);
    } catch (err) {
      console.log({err});
      res.status(500).json({"error": "Error! Something went wrong."});
      return;
    }
    res.status(200).json({success: true, message: "User deleted successfully"});
});

// enable / disable user endpoint
router.put("/:id/enable-disable", verifyToken, async (req, res, next) => {
    const { id } = req.params;
    const { is_enabled } = req.body;
    try {
      await conn.promise().execute('UPDATE `users` SET `is_enabled` = ? WHERE `id` = ?', [is_enabled, id]);
    } catch (err) {
      console.log({err});
      res.status(500).json({"error": "Error! Something went wrong."});
      return;
    }
    res.status(200).json({success: true, message: is_enabled ? "User enabled successfully" : "User disabled successfully"});
});

module.exports = router;