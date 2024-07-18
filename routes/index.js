const express = require('express');
const path = require('path');
//const app = require('../app');
const config = require('../config');
const router = express.Router();
const apiUrl = process.env.API_URL || 'http://localhost:3000';
const reservasController = require('../modulos/reservas/controlador-reservas');
const clientesController = require('../modulos/clientes/controlador-clientes');


// **************  APP GET VIEWS **************
 
/* router.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, '../views', 'index.html'));
  res.sendFile(path.join(__dirname, '../views/index.html'));
}); */
/*router.get('/', (req, res) => {
  res.redirect('/home');
});*/

router.get('/', (req, res) => {
  res.render('index', {titulo: "mi titulo dinámico"});
});


/* router.get('/ma-cuisine', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/ma-cuisine.html'));
}); */

router.get('/ma-cuisine', (req, res) => {
  res.render('ma-cuisine', {titulo: "mi titulo dinámico"});
});

/* router.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/menu.html'));
});  */

router.get('/menu', (req, res) => {
  res.render('menu');
});


/* router.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/contacto.html')); //con ejs no funciona cambiar a res.render
}); */

router.get('/contacto', (req, res) => {
  res.render('contacto');
});


/* router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
}); */

router.get('/login', (req, res) => {
  res.render('login');
});


router.get('/clientes', async (req, res) => {
  try {
    const clientes = await clientesController.obtenerClientes();
    //res.render('clientes', { cliente: clientes }); // esta no funciono Renderiza la vista 'clientes.ejs'
    res.render('clientes', { clientes });
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
}); 

router.get('/api/clientes', async (req, res) => {
  try {
    const clientes = await clientesController.obtenerClientes(); // async
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite cualquier origen, ajusta según tus necesidades de seguridad
    res.status(200).json(clientes); // Envía la respuesta JSON con los clientes obtenidos
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


router.get('/reservas', async (req, res) => {
  try {
    const reservas = await reservasController.obtenerReservas();
    res.render('reservas', { reservas: reservas }); // Renderiza la vista 'reserva.ejs'
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
}); 

router.get('/api/reservas', async (req, res) => {
  try {
    const reservas = await reservasController.obtenerReservas(); // Suponiendo que tienes una función asíncrona para obtener clientes
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite cualquier origen, ajusta según tus necesidades de seguridad
    res.status(200).json(reservas); // Envía la respuesta JSON con los clientes obtenidos
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});



// router.get('/reservas', reservaController.obtenerReservasConUsuarios);

/* 
router.get('/reservas', async (req, res) => {
  try {
    const response = await fetch(`${apiUrl}/api/reservas`);
    if (!response.ok) {
      throw new Error('Error al obtener las reservas');
    }
    const reservas = await response.json();
    res.render('reservas', { reservas }); // Pasar reservas como un objeto al renderizar la vista
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}); */

//router.get('/api/reservas', reservaController.obtenerReservasConUsuarios);
/* router.post('/api/reservas', reservaController.agregarReserva);
router.put('/api/reservas/:id', reservaController.actualizarReservaPorId);
router.delete('/api/reservas/:id', reservaController.eliminarReservaPorId); */

/* router.get('/clientes', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/clientes.html'));
});*/


module.exports = router
/* 
const bcrypt = require('bcrypt');
/* 


// OBTENER USUARIOS
// Ruta para obtener usuarios desde la base de datos
/* async function obtenerUsuarios() {
  const connection = await pool.getConnection();
  try {
    const [rows, fields] = await connection.query('SELECT * FROM usuarios');
    return rows;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  } finally {
    connection.release(); // Liberar la conexión de vuelta a la pool
  }
}

router.get('/usuarios.html', async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.render('usuarios', { usuarios: usuarios }); // Renderiza la vista 'usuarios.ejs'
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
}); */


