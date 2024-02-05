//services
const { createConn } = require("../services/db.connection");

function query({ query, params = [] }) {
  return new Promise(async (resolve, reject) => {
    try {
      const { connection, endConnection } = await createConn();
      connection.query(query, params, (error, results) => {
        endConnection();
        if (error) {
          console.log({
            error,
            message: "ERROR AT FILE query.js - Invalid query",
          });
          return reject(error);
        }
        resolve(results);
      });
    } catch (error) {
      console.log({
        error,
        message: "ERROR AT FILE query.js - Error createConnection",
      });
      reject(error);
    }
  });
}

module.exports = { query };
