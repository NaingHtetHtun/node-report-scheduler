require('dotenv').config();
const mysql = require('mysql2/promise');
const { Client } = require('ssh2');

async function connectToServer(serverConfig) {
  const ssh = new Client();
  return new Promise((resolve, reject) => {
  ssh.on('ready', () => {
    ssh.forwardOut(
      '127.0.0.1',
      3306,
      serverConfig.DB_HOST,
      serverConfig.DB_PORT,
      async (err, stream) => {
        if (err) return reject(err);

        try {
          const connection = await mysql.createConnection({
              host: serverConfig.DB_HOST,
              user: serverConfig.DB_USERNAME,
              password: serverConfig.DB_PASSWORD,
              database: serverConfig.DB_DATABASE,            
              stream // use SSH tunnel stream
          });
          resolve({ name: serverConfig.NAME, connection, ssh, sqlQuery: serverConfig.SQL_QUERY, mails: serverConfig.MAILS });
        } catch (dbErr) {
          reject(dbErr);
        }
      }
    );
  }).connect({
      host: serverConfig.DB_SSH_HOST,
      port: serverConfig.DB_SSH_PORT || 22,
      username: serverConfig.DB_SSH_USERNAME,
      privateKey: process.env.DB_SSH_PRIVATE_KEY
    });
});

}
module.exports = { connectToServer };
