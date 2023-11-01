const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const config = require("../CADViewer_config.json");
const conn = require("../libs/mysql.js");

const express = require("express"),
	router = express.Router();

router.post("/login", async (req, res, next) => {
	let { email, password } = req.body;
  console.log({email, password})
  let existingUser;
  try {
    const [rows] = await conn.promise().execute('SELECT * FROM `users` WHERE `email` = ?', [email]);
    if (rows.length > 0) {
      existingUser = rows[0];
    }
  } catch (err) {
    console.log({err});
    res.status(500).json({"error": "Error! Something went wrong."});
    return;
  }
  if (!existingUser || ! await bcrypt.compare(password, existingUser.crypted_password)) {
    res.status(401).json({"error": "Invalid email or password"});
    return;
  }
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      config.jwtSecretKey,
      { expiresIn: "24h" }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({"error": "Error! Something went wrong."});
    return;
  }
 
  res
    .status(200)
    .json({
      success: true,
      data: {
        userId: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        token: token,
      },
    });
});

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  const [rows] = await conn.promise().execute('SELECT * FROM `users` WHERE `email` = ?', [email]);
  if (rows.length > 0) {
    res.status(422).json({"error": "User already exists"});
    return;
  }
  const crypted_password = await bcrypt.hash(password, 10);
  
  
  
  try {
    const [response] = await conn.promise().execute('INSERT INTO `users` (`username`, `email`, `crypted_password`) VALUES (?, ?, ?)', [username, email, crypted_password]);
    if (response.insertId) {
      const [rows] = await conn.promise().execute('SELECT * FROM `users` WHERE `id` = ?', [response.insertId]);
      if (rows.length > 0) {
        newUser = rows[0];
      }
    }
  } catch {
    res.status(500).json({"error": "Error! Something went wrong."});
    return;
  }
  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      config.jwtSecretKey,
      { expiresIn: "24h" }
    );
  } catch (err) {
    res.status(500).json({"error": "Error! Something went wrong."});
    return;
  }
  res
    .status(201)
    .json({
      success: true,
      data: { 
        userId: newUser.id,
        username: newUser.username,
        email: newUser.email,
        token: token
      },
    });
});

module.exports = router;