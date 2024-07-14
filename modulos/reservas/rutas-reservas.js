const express = require('express');
const path = require('path');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador-reservas')

const routerReservas = express.Router();


/* router.get('/', controlador.obtenerClientes);  */

/* routerReservas.get('/reservas', async function(req, res, next) {
    try {
        await controlador.obtenerReservas(req, res);
    } catch (error) {
    
        console.error('Error en la ruta /:', error);
        res.status(500).json({ error: true, message: 'Error interno del servidor' });
    }
}); */

routerReservas.get('/ver-reservas', async function(req, res, next) {
    try {
        await controlador.obtenerReservas(req, res);
    } catch (error) {
    
        console.error('Error en la ruta /:', error);
        res.status(500).json({ error: true, message: 'Error interno del servidor' });
    }
});


routerReservas.get('/:id', async function(req, res) {
    const { id } = req.params;
    try {
        const cliente = await controlador.obtenerReservaPorId(id);
        if (cliente) {
            respuesta.success(req, res, reserva, 200);
        } else {
            respuesta.error(req, res, 'Reserva no encontrado', 404);
        }
    } catch (error) {
        respuesta.error(req, res, 'Error obteniendo cliente por ID', 500);
    }
});



routerReservas.delete('/eliminar/:id', async function(req, res) {
    const { id } = req.params;
    try {
        const resultado = await controlador.eliminarReservaPorId(id);
        if (resultado.affectedRows > 0) {
            respuesta.success(req, res, 'Reserva eliminada correctamente', 200);
        } else {
            respuesta.error(req, res, 'Reserva no encontrada', 404);
        }
    } catch (error) {
        respuesta.error(req, res, 'Error eliminando reserva', 500);
    }
});


// Agregar un nuevo cliente
routerClientes.post('/agregar', controlador.agregarReserva);

/* router.post('/agregar', async function(req, res) {
    try {
        const resultado = await controlador.agregarCliente(req.body); 
        respuesta.success(req, res, 'Cliente agregado correctamente', 201);
    } catch (error) {
        respuesta.error(req, res, 'Error al agregar cliente', 500);
    }
});
 */

// Actualizar un cliente por ID
routerClientes.put('/actualizar/:id', controlador.actualizarReservaPorId);

/* router.put('actualizar/:id', async function(req, res) {
    const { id } = req.params;
    const datosActualizados = req.body;

    try {
        const resultado = await controlador.actualizarClientePorId(id, datosActualizados);

        if (resultado.affectedRows > 0) {
            respuesta.success(req, res, 'Cliente actualizado correctamente', 200);
        } else {
            respuesta.error(req, res, 'Cliente no encontrado', 404);
        }
    } catch (error) {
        respuesta.error(req, res, 'Error actualizando cliente', 500);
    }
});
// Eliminar un cliente por ID
/*router.delete('/clientes/:id', controlador.eliminarClientePorId);*/


module.exports = routerReservas;