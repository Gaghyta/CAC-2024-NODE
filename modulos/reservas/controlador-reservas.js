const db = require('../../db/funciones-mysql');
const respuesta = require('../../red/respuestas');
const TABLA = 'reservas';

async function obtenerReservas(req, res) {
    try {
        const records = await db.getRecords(TABLA);
        console.log('Records:', records); 
        //respuesta.success(req, res, records, 200);
        return records
    } catch (error) {
        console.error('Error al obtener los registros de las reservas:', error);
        //respuesta.error(req, res, 'Error al obtener reservas', 500);
        throw error;
    }
} 

async function agregarReserva(req, res) {
    const data = req.body; // Datos de la reserva a agregar
    console.log('Datos recibidos:', data);
    try {
        const resultado = await db.addRecord(TABLA, data);
        respuesta.success(req, res, 'Reserva agregada correctamente', 201);
    } catch (error) {
        console.error('Error al agregar reserva:', error);
        respuesta.error(req, res, 'Error al agregar reserva', 500);
    }
}



/* async function obtenerReservas() {
    try {
      const [rows] = await connection.query('SELECT * FROM reservas');
      return rows;
    } catch (error) {
      console.error('Error al obtener reservas:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión de vuelta a la pool
    }
  }
 */
/* async function obtenerReservasConUsuarios() {
    // OPCIONAL SELECT r.id_reservas, u.nombre AS nombre_usuario, u.email AS email_usuario, r.fecha_reserva, r.cantidad_comensales, r.estado
    const sql = `
       
        SELECT r.id_reservas, r.user_id, u.nombre AS usuario_nombre, r.fecha_reserva, r.cantidad_comensales, r.estado
        FROM reservas r
        JOIN usuarios u ON r.user_id = u.id
    `;
    try {
        const [rows] = await query(sql);
        return rows;
    } catch (error) {
        throw new Error(`Error al obtener reservas con usuarios: ${error.message}`);
    }
}
 */
async function obtenerReservaPorId(id) {
    try {
        const reserva = await db.getRecords(TABLA, { id: id });
        return reserva.length > 0 ? reserva[0] : null;
    } catch (error) {
        console.error('Error al obtener reserva por ID:', error);
        throw error;
    }
}

async function eliminarReservaPorId(id) {
    try {
        const resultado = await db.deleteRecord(TABLA, { id: id });
        if (resultado === 0) {
            return null; // Devuelve null si ningún registro fue eliminado
        }
        return resultado;
    } catch (error) {
        console.error('Error al eliminar reserva por ID:', error);
        throw error;
    }
}
/* async function eliminarReservaPorId(id) {
    try {
        const resultado = await db.deleteRecord(TABLA, { id: id });
        return resultado;
    } catch (error) {
        console.error('Error al eliminar reserva por ID:', error);
        throw error;
    }
} */



async function actualizarReservaPorId(req, res) {
    const { id } = req.params;
    const datosActualizados = req.body;

    console.log('ID de la reserva:', id);
    console.log('Datos actualizados:', datosActualizados);

    try {
        const resultado = await db.updateRecord(TABLA, datosActualizados, { id: id });
        if (resultado.affectedRows > 0) {
            respuesta.success(req, res, 'Reserva actualizada correctamente', 200);
        } else {
            respuesta.error(req, res, 'Reserva no encontrada', 404);
        }
    } catch (error) {
        console.error('Error al actualizar reserva por ID:', error);
        respuesta.error(req, res, 'Error al actualizar reserva', 500);
        throw error;
    }
}

module.exports = {
    agregarReserva,
    obtenerReservas,
    //obtenerReservasConUsuarios,
    obtenerReservaPorId,
    eliminarReservaPorId,
    actualizarReservaPorId
};
