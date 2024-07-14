const db = require ('../../db/funciones-mysql')
const respuesta = require('../../red/respuestas');
const TABLA = 'clientes';

/* function getRecords (){
    return db.getRecords(TABLA)
} */
      

async function obtenerClientes(req, res) {
    try {
        const records = await db.getRecords(TABLA);
        console.log('Records:', records); // Añadir log aquí
        //respuesta.success(req, res, records, 200);
        return records;
    } catch (error) {
        console.error('Error al obtener los registros de los clientes:', error);
        //respuesta.error(req, res, 'Error al obtener registros', 500);
        throw error;
    }
}  


async function agregarCliente(req, res) {
    const data = req.body; // Datos del cliente a agregar
    console.log('Datos recibidos:', data);
    try {
        const resultado = await db.addRecord('clientes', data); // Llamar a la función de inserción en la base de datos
        respuesta.success(req, res, 'Cliente agregado correctamente', 201);
    } catch (error) {
        console.error('Error al agregar cliente:', error);
        respuesta.error(req, res, 'Error al agregar cliente', 500);
     }
}



/* async function obtenerClientes(req, res) {
    try {
        const clientes = await getRecords('clientes');
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ error: 'Error en la base de datos' });
    }
}
 */

async function obtenerClientePorId(id) {
    try {
        const clientes = await db.getRecords(TABLA, { id: id });
        return clientes.length > 0 ? clientes[0] : null;
    } catch (error) {
        console.error('Error al obtener cliente por ID:', error);
        throw error;
    }
}

async function eliminarClientePorId(id) {
    try {
        const resultado = await db.deleteRecord(TABLA, { id: id });
        if (resultado === 0) {
            return null; // Devuelve null si ningún registro fue eliminado
        }
        return resultado;
    } catch (error) {
        console.error('Error al eliminar cliente por ID:', error);
        throw error;
    }
}


async function actualizarClientePorId(req, res) {
    const { id } = req.params;
    const datosActualizados = req.body; // Asegúrate de que req.body contenga los datos esperados

    console.log('ID del cliente:', id);
    console.log('Datos actualizados:', datosActualizados);

    try {
        const resultado = await db.updateRecord(TABLA, datosActualizados, { id: id });
        console.log('Resultado de la actualización:', resultado);

        if (resultado.affectedRows > 0) {
            respuesta.success(req, res, 'Cliente actualizado correctamente', 200);
        } else {
            respuesta.error(req, res, 'Cliente no encontrado', 404);
        }
    } catch (error) {
        console.error('Error al actualizar cliente por ID:', error);
        respuesta.error(req, res, 'Error al actualizar cliente', 500);
        throw error;
    }
}


module.exports = {
    agregarCliente,
    obtenerClientes,
    obtenerClientePorId,
    eliminarClientePorId,
    actualizarClientePorId
}