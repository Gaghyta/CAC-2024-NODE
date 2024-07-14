const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config');
const frontendRouter = require('./routes/index'); // FRONTEND
const routerClientes = require('./routes/clientes'); //BACKEND API
//const routerClientes = require('./modulos/clientes/rutas'); //BACKEND API NO VA
const routerReservas = require('./routes/reservas'); //BACKEND API


const app = express();
// CONFIG
app.set('view engine', 'ejs');
app.set('port', config.app.port);


// RUTAS
//app.use('/', indexRouter)
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

// RUTAS

app.use('/', frontendRouter);
app.use('/api/clientes',routerClientes);
app.use('/api/reservas', routerReservas);

app.listen(config.app.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.app.port}`);
  });

module.exports = {
    app,
    routerClientes,
    routerReservas,
    frontendRouter
}

/* const path = require('path');
const bodyParser = require('body-parser'); */

//const routes = require('./routes');







