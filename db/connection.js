const { createPool } = require('mysql2/promise');
require('dotenv').config(); // Para cargar las variables de entorno desde .env

// ************** CONEXION BD **************

const pool = createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    connectionLimit: 10,

 })
 module.exports = pool;
 /* pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
        if (err.code === 'ETIMEDOUT') {
            console.error('Connection to the database timed out.');
        }
    }

    if (connection) connection.release();

    return;
});

 */
