const mysql = require('mysql2/promise'); // Usar la versión "promise" para await/async

// Crear la conexión
const pool = mysql.createPool({
  host: 'localhost', 
  user: 'root',
  password: '1234567890',
  database: 'mossan',
  waitForConnections: true,
  connectionLimit: 10, // Máximo de conexiones simultáneas
  queueLimit: 0
});

module.exports = pool;
