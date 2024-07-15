const express = require('express');
const router = express.Router();
const clienteController = require('../modulos/clientes/controlador-clientes');
const { error } = require('jquery');
/* 
router.get('/', clienteController.obtenerClientes);
router.get('/:id', clienteController.obtenerClientePorId);
router.post('/', clienteController.agregarCliente);
router.put('/:id', clienteController.actualizarClientePorId);
router.delete('/:id', clienteController.eliminarClientePorId); */


    router.get('/', async (req, res) => {
    try {
      const clientes = await clienteController.obtenerClientes();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(clientes);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  
  router.get('/:id', async (req, res) => {
    const clienteId = req.params.id;
    try {
      const cliente = await clienteController.obtenerClientePorId(clienteId);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(cliente);
    } catch (error) {
      console.error(`Error al obtener cliente con ID ${clienteId}:`, error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const nuevoCliente = await clienteController.agregarCliente(req.body);
      res.status(201).json(nuevoCliente);
    } catch (error) {
      console.error('Error al agregar cliente:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  
  router.put('/:id', clienteController.actualizarClientePorId);
  
  router.delete('/:id', async (req, res) => {
    const clienteId = req.params.id;
    //const mensajeOK = `Se ha eliminado el cliente numero ${clienteId}`;
    try {
      const resultado = await clienteController.eliminarClientePorId(clienteId);
      if (resultado && resultado.affectedRows > 0) {
        return res.status(200).json({ error: `Cliente id ${clienteId} eliminado correctamente`  });
      }
      return res.status(404).json({error: `No se ha encontrado el cliente numero ${clienteId}`});
    } catch (error) {
      console.error(`Error al eliminar cliente con ID ${clienteId}:`, error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  
  module.exports = router;
  
  /* router.put('/:id', async (req, res) => {
    const clienteId = req.params.id;
    try {
      const clienteActualizado = await clienteController.actualizarClientePorId(clienteId, req.body);
      if (!clienteActualizado) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.status(200).json(clienteActualizado);
    } catch (error) {
      console.error(`Error al actualizar cliente con ID ${clienteId}:`, error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }); */
  

