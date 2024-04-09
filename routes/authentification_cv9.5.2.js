const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const config = require("../CADViewer_config.json");
const conn = require("../libs/mysql.js");
const multer = require('multer');
const fs = require('fs');
const verifyToken = require('../libs/jwt').verifyToken;


// create a directory uploads in the root of the project if it doesn't exist
if (!fs.existsSync('./avatars')) {
    fs.mkdirSync('./avatars');
}
const express = require("express"),
    router = express.Router();
const {randomUUID} = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'avatars');
  }
})

const upload = multer({ storage: storage });

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
        first_name: existingUser.first_name,
        last_name: existingUser.last_name,
        email: existingUser.email,
        avatar_url: existingUser.avatar_url,
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
  
  // generate a user folder name

  
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
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        avatar_url: newUser.avatar_url,
        token: token
      },
    });
});

// update user password
router.post("/update-password", verifyToken, async (req, res, next) => {
    const { current_password, new_password } = req.body;
    console.log({body: req.body})
    const email = req.user.email;

    let existingUser;
    try {
      const [rows] = await conn.promise().execute('SELECT * FROM `users` WHERE `email` = ?', [email]);
      if (rows.length > 0) {
        existingUser = rows[0];

        if (! await bcrypt.compare(current_password, existingUser.crypted_password)) {
          res.status(401).json({"error": "Invalid password"});
          return;
        }

        const crypted_password = await bcrypt.hash(new_password, 10);
        await conn.promise().execute('UPDATE `users` SET `crypted_password` = ? WHERE `email` = ?', [crypted_password, email]);
        res.status(200).json({"success": true});
      }
    } catch (err) {
      console.log({err});
      res.status(500).json({"error": "Error! Something went wrong."});
      return;
    }

});

// update user information avatar, username, first_name, last_name
router.post("/update-user-info", upload.single('avatar'), verifyToken, async (req, res, next) => {
    const { username, first_name, last_name } = req.body;
    const email = req.user.email;

    // save user avatar and update user information and avatar_url

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

    if (!existingUser) {
      res.status(401).json({"error": "Invalid user"});
      return;
    }
    console.log({req: req.body})
    let avatar_url = existingUser.avatar_url;
    if (req.file) {
      const avatar_path = `avatars/${randomUUID()}.png`;
        fs.renameSync(req.file.path, './'+avatar_path);
        avatar_url = `${config.ServerUrl}/${avatar_path}`;
    }
    try {
        await conn.promise().execute('UPDATE `users` SET `username` = ?, `first_name` = ?, `last_name` = ?, `avatar_url` = ? WHERE `email` = ?', [username, first_name, last_name, avatar_url, email]);

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

        res.status(200).json({"success": true, data: {
            userId: existingUser.id,
            username,
            first_name,
            last_name,
            email: existingUser.email,
            avatar_url,
            token
        }});
    } catch (err) {
      console.log({err});
      res.status(500).json({"error": "Error! Something went wrong."});
      return;
    }
});


module.exports = router;