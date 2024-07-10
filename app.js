const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');


const port = process.env.PORT || 3000;

// ************** PRUEBAS APP GET VIEWS **************

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware para parsear application/json
app.use(express.json());

app.use('/', routes);


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


