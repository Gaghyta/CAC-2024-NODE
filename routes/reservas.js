const express = require('express');
const router = express.Router();
const reservaController = require('../modulos/reservas/controlador-reservas');

//router.get('/', reservaController.obtenerReservas);
router.get('/', reservaController.obtenerReservas);
router.get('/:id', reservaController.obtenerReservaPorId);
router.post('/', reservaController.agregarReserva);
router.put('/:id', reservaController.actualizarReservaPorId);
router.delete('/:id', reservaController.eliminarReservaPorId);

module.exports = router;