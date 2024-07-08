const express = require('express');
const path = require('path');
const mysql = require('mysql2');
//const fetch = require('node-fetch');
require('dotenv').config(); // Para cargar las variables de entorno desde .env

const app = express();

//const ejs = require('ejs');


const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    } console.log('Conectado a la base de datos MySQL');
});

//  archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/usuarios.html', (req, res) => {
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

//app.use(express.static(path.join(__dirname, 'views')));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});