const conn = require('./libs/mysql.js');

async function test() {
  try {
    const email = 'casper.harnung@tailormade.com';
    const [rows] = await conn.promise().execute("SELECT crypted_password FROM `users` WHERE `email` = ?", [email]);
    if (rows.length > 0) {
      const pwd = rows[0].crypted_password;
      console.log("Password hash starts with:", pwd ? pwd.substring(0, 10) : "null");
      console.log("Length:", pwd ? pwd.length : 0);
    }
  } catch(e) {
    console.error("DB Error:", e.message);
  }
  process.exit();
}
test();
