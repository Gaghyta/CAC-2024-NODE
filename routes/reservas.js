const express = require('express');
const router = express.Router();
const reservaController = require('../modulos/reservas/controlador-reservas');
const { error } = require('jquery');
//router.get('/', reservaController.obtenerReservas);
/* router.get('/', reservaController.obtenerReservas);
router.get('/:id', reservaController.obtenerReservaPorId);
router.post('/', reservaController.agregarReserva);
router.put('/:id', reservaController.actualizarReservaPorId);
router.delete('/:id', reservaController.eliminarReservaPorId);
 */

router.get('/', async (req, res) => {
    try {
      const reservas = await reservaController.obtenerReservas();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(reservas);
    } catch (error) {
      console.error('Error al obtener reservas:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  router.get('/:id', async (req, res) => {
    const reservaId = req.params.id;
    try {
      const reserva = await reservaController.obtenerReservaPorId(reservaId);
      if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(reserva);
    } catch (error) {
      console.error(`Error al obtener reserva con ID ${reservaId}:`, error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  router.post('/', reservaController.agregarReserva);
/*   router.post('/', async (req, res) => {
    try {
      const nuevaReserva = await reservaController.agregarReserva(req.body);
      res.status(201).json(nuevaReserva);
    } catch (error) {
      console.error('Error al agregar reserva:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }); */

  router.put('/:id', reservaController.actualizarReservaPorId);

  router.delete('/:id', async (req, res) => {
    const reservaId = req.params.id;
    //const mensajeOK = `Se ha eliminado el reserva numero ${reservaId}`;
    try {
      const resultado = await reservaController.eliminarReservaPorId(reservaId);
      if (resultado && resultado.affectedRows > 0) {
        return res.status(200).json({ error: `Reserva id ${reservaId} eliminado correctamente`  });
      }
      return res.status(404).json({error: `No se ha encontrado el reserva numero ${reservaId}`});
    } catch (error) {
      console.error(`Error al eliminar reserva con ID ${reservaId}:`, error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  });

module.exports = router;