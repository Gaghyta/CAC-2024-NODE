const express = require('express');
const router = express.Router();
const clienteController = require('../modulos/clientes/controlador-clientes');

router.get('/', clienteController.obtenerClientes);
router.get('/:id', clienteController.obtenerClientePorId);
router.post('/', clienteController.agregarCliente);
router.put('/:id', clienteController.actualizarClientePorId);
router.delete('/:id', clienteController.eliminarClientePorId);

module.exports = router;