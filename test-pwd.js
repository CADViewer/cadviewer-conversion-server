const conn = require('./libs/mysql.js');
const bcrypt = require('bcryptjs');

async function test() {
  try {
    const email = 'casper.harnung@tailormade.com';
    const [rows] = await conn.promise().execute("SELECT crypted_password FROM `users` WHERE `email` = ?", [email]);
    if (rows.length > 0) {
      const hash = rows[0].crypted_password;
      const testPwds = ['123456', 'password', '12345678', 'casper', 'admin', 'admin123', 'casper123'];
      for (const pwd of testPwds) {
        const matches = await bcrypt.compare(pwd, hash);
        if (matches) {
          console.log(`MATCH FOUND! The password is: ${pwd}`);
          process.exit();
        }
      }
      console.log("None of the common passwords matched the hash in the database.");
    }
  } catch(e) {
    console.error("DB Error:", e.message);
  }
  process.exit();
}
test();
