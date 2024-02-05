//mysql2
const { createConnection } = require("mysql2");

//dotenv
require("dotenv").config();

//connection config
const config = {
  user: process.env.USER_DB,
  host: process.env.HOST_DB,
  port: process.env.PORT_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_NAME_DB,
};

function createConn() {
  const connection = createConnection(config);

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.log(err);
        return reject({
          err,
          message: "ERROR AT FILE db.connection.js",
        });
      }
      resolve({
        connection,
        endConnection: () => connection.end(),
      });
    });
  });
}

module.exports = { createConn };
