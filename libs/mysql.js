// mysql connect to DB 
const mysql = require('mysql2');
const config = require("../CADViewer_config.json");

const con = mysql.createPool({
  host: config.mysqlHost,
  user: config.mysqlUsername,
  password: config.mysqlPassword,
  database: config.mysqlDatabase,
  waitForConnections: true,
  connectionLimit: 50,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// export the connection
module.exports = con;