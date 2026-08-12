const conn = require('./libs/mysql.js');
const bcrypt = require('bcryptjs');

async function test() {
  try {
    const email = 'casper.harnung@tailormade.com';
    const pwd = '123456';
    const hash = await bcrypt.hash(pwd, 10);
    const [result] = await conn.promise().execute("UPDATE `users` SET `crypted_password` = ? WHERE `email` = ?", [hash, email]);
    console.log(`Updated ${result.affectedRows} row(s). Password for ${email} is now: ${pwd}`);
  } catch(e) {
    console.error("DB Error:", e.message);
  }
  process.exit();
}
test();
