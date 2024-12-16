const mysql = require('mysql2');
require('dotenv').config({ path: './bd.env' });

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Teste de conexão
pool.promise()
  .getConnection()
  .then(connection => {
    console.log('Conectado ao banco de dados!');
    connection.release(); // Lembre-se de liberar a conexão após o teste
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

module.exports = pool.promise();
