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

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    // Validar los datos de entrada
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
  
    try {
      // Verificar si el usuario ya existe en la base de datos
      const queryCheck = 'SELECT * FROM registro_usuarios WHERE email = ?';
      const [rowsCheck] = await pool.query(queryCheck, [email]);
  
      if (rowsCheck.length > 0) {
        return res.status(400).json({ message: 'El usuario ya está registrado' });
      }
  
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Inserción en la base de datos en la tabla 'registro_usuarios'
      const queryInsert = 'INSERT INTO registro_usuarios (username, email, password) VALUES (?, ?, ?)';
      const [result] = await pool.query(queryInsert, [username, email, hashedPassword]);
  
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error('Error durante el registro:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }
  
    try {
        const query = 'SELECT * FROM registro_usuarios WHERE email = ?';
        const [rows, fields] = await pool.query(query, [email]);
    
        if (rows.length === 0) {
          return res.status(401).json({ message: 'Credenciales inválidas' });
        }
    
        const user = rows[0];
    
        // Comparar la contraseña ingresada con la contraseña hasheada almacenada en la base de datos
        const match = await bcrypt.compare(password, user.password);
    
        if (!match) {
          return res.status(401).json({ message: 'Credenciales inválidas' });
        }
    
        // Si las credenciales son correctas, puedes devolver un mensaje de éxito o redireccionar al usuario
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
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