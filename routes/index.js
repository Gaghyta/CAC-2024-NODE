const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db/connection');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Ruta para el home
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

// Rutas de las otras vistas
router.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

router.get('/ma-cuisine.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'ma-cuisine.html'));
});

router.get('/menu.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'menu.html'));
});

router.get('/contacto.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'contacto.html'));
});

// Ruta para obtener usuarios desde la base de datos
async function obtenerUsuarios() {
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
});

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validar los datos de entrada
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserción en la base de datos en la tabla 'registro_usuarios'
    const query = 'INSERT INTO registro_usuarios (username, email, password) VALUES (?, ?, ?)';
    const [result] = await pool.query(query, [username, email, hashedPassword]);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error durante el registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta para eliminar una cuenta de usuario
router.post('/delete-account', async (req, res) => {
  const { username, email, password } = req.body;

  // Define la consulta SQL para eliminar el usuario
  const query = 'DELETE FROM registro_usuarios WHERE username = ? AND email = ? AND password = ?';

  try {
    const [result] = await pool.query(query, [username, email, password]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Usuario no encontrado o datos incorrectos' });
    } else {
      res.status(200).json({ message: 'Cuenta eliminada exitosamente' });
    }
  } catch (error) {
    console.error('Error al eliminar cuenta:', error);
    res.status(500).json({ message: 'Error al eliminar cuenta' });
  }
});

module.exports = router;