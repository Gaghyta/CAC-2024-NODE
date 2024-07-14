const mysql2 = require('mysql2');

const config = require('../config');

const pool = require('./connection')


/* async function query(sql, params) {
    try {
        const result = await pool.query(sql, params);
        return result;
    } catch (error) {
        throw new Error(`Error en la consulta SQL: ${error.message}`);
    }
} */

async function executeQuery(query, params) {
    const connection = await pool.getConnection(); // Obtener una conexión del pool
    try {
        const [results, fields] = await connection.execute(query, params);
        return results;
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        throw error;
    } finally {
        connection.release(); // Liberar la conexión de vuelta al pool
    }
}

// Función para ver un registro
async function getRecords(table, conditions = {}) {
    let query = `SELECT * FROM ${table}`;
    const keys = Object.keys(conditions);
    const values = Object.values(conditions);

    if (keys.length > 0) {
        const placeholders = keys.map(key => `${key} = ?`).join(' AND ');
        query += ` WHERE ${placeholders}`;
    }

    return await executeQuery(query, values);
}

// Función para agregar un registro
async function addRecord(table, data) {
    if (!data || typeof data !== 'object') {
        throw new Error('Data is invalid or empty');
    }
    const keys = Object.keys(data).join(', ');
    const values = Object.values(data);
    console.log('Data recibida:', data);
    const placeholders = values.map(() => '?').join(', ');
    const query = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
    return await executeQuery(query, values);
}

// Función para eliminar un registro
async function deleteRecord(table, condition) {
    const keys = Object.keys(condition).join(' = ? AND ') + ' = ?';
    const values = Object.values(condition);
    const query = `DELETE FROM ${table} WHERE ${keys}`;
    return await executeQuery(query, values);
}
async function updateRecord(table, data, conditions) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const conditionsKeys = Object.keys(conditions);
    const conditionsValues = Object.values(conditions);

    const placeholders = keys.map(key => `${key} = ?`).join(', ');
    const conditionPlaceholders = conditionsKeys.map(key => `${key} = ?`).join(' AND ');

    const query = `UPDATE ${table} SET ${placeholders} WHERE ${conditionPlaceholders}`;
    const params = [...values, ...conditionsValues];

    try {
        const result = await executeQuery(query, params);
        return result;
    } catch (error) {
        throw error;
    }
} 


module.exports = {
    //query,
    getRecords,
    executeQuery,
    addRecord,
    deleteRecord,
    updateRecord,
    
};