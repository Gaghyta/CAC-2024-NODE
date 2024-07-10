const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const { createPool } = require('mysql2/promise');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
//const fetch = require('node-fetch');
require('dotenv').config(); // Para cargar las variables de entorno desde .env

const app = express();

//const ejs = require('ejs');


const port = process.env.PORT || 3000;


// ************** PRUEBAS CONEXIONES BD **************
// Configuración de la conexión a la base de datos
/* const db = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
}); */

// Configuración de la conexión a la base de datos
/* const dbConfig = {
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
};
 */


const pool = createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    connectionLimit: 10,

 })



// Conectar a la base de datos
/* db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    } console.log('Conectado a la base de datos MySQL');
});
 */
//  archivos estáticos

// ************** PRUEBAS APP GET VIEWS **************

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Ruta para el home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rutas de las otras vistas
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/ma-cuisine.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ma-cuisine.html'));
});

app.get('/menu.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'menu.html'));
});

app.get('/contacto.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contacto.html'));
});

// Endpoint para obtener todos los usuarios
/* app.get('/usuarios.html', (req, res) => {
    const sql = 'SELECT * FROM usuarios'; // Ajusta según el nombre real de tu tabla de usuarios
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            //res.status(500).json({ error: 'Error en la base de datos' });
            res.status(500).send({ error: 'Error en la base de datos' });
            return;
        }
        console.log('Resultados de la consulta:', results); 
        //res.status(200).json(results);
        res.render('usuarios', { usuarios: results });
        //res.sendFile(path.join(__dirname, 'public', 'usuarios.html'));
        //res.sendFile(path.join(__dirname, 'views', 'usuarios.html'));
    
    });
}); 
 */

/* app.get('/usuarios.html', (req, res) => {
    const sql = 'SELECT * FROM usuarios'; // Ajusta según el nombre real de tu tabla de usuarios
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        res.json(results);
    });
});
 */
/* app.get('/usuarios', async (req, res) => {
    const sql = 'SELECT * FROM usuarios'; // Ajusta según el nombre real de tu tabla de usuarios

    try {
        // Crear una conexión a la base de datos
        const connection = await mysql.createConnection(dbConfig);
        console.log('Conexión a la base de datos establecida');
        // Ejecutar la consulta
        const [results, fields] = await connection.execute(sql);
        console.log('Consulta ejecutada, resultados:', results);
        // Cerrar la conexión
        await connection.end();
        console.log('Conexión a la base de datos cerrada');

        res.render('usuarios', { usuarios: results });
        // Enviar los resultados como JSON
        //res.json(results);
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        res.status(500).json({ error: 'Error en la base de datos' });
    }
}); */

//app.use(express.static(path.join(__dirname, 'views')));


// ************** PRUEBAS APP GET VIEW USUARIOS DE LA BD 1 **************
/* app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await obtenerUsuariosDeLaBaseDeDatos();
        res.render('usuarios', { usuarios: usuarios });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error en la base de datos' });
    }
});

async function obtenerUsuariosDeLaBaseDeDatos() {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexión a la base de datos establecida');
    const [results, fields] = await connection.execute('SELECT * FROM usuarios');
    console.log('Consulta ejecutada, resultados:', results);
    await connection.end();
    console.log('Conexión a la base de datos cerrada');
    return results;
} */

// ************** PRUEBAS APP GET VIEW USUARIOS DE LA BD 2 **************
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
app.get('/usuarios.html', async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios();
        res.render('usuarios', { usuarios: usuarios });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error en la base de datos' });
    }
});


// Uso de la función para obtener usuarios
/* obtenerUsuarios().then((usuarios) => {
    console.log('Usuarios:', usuarios);
}).catch((error) => {
    console.error('Error en la consulta:', error);
});
 */

app.post('/register', async (req, res) => {
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
      connection.query(query, [username, email, hashedPassword], (err, results) => {
        if (err) {
          console.error('Error inserting into the database:', err);
          return res.status(500).json({ message: 'Server error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

