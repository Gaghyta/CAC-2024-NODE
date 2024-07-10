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