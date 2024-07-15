const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config');
const frontendRouter = require('./routes/index'); // FRONTEND
const routerClientes = require('./routes/clientes'); //BACKEND API
//const routerClientes = require('./modulos/clientes/rutas'); //BACKEND API NO VA
const routerReservas = require('./routes/reservas'); //BACKEND API
/*const routerLogin = require('./routes/login'); //BACKEND API SIN DESARROLLO */


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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite cualquier origen
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use('/', frontendRouter);
app.use('/api/clientes',routerClientes);
app.use('/api/reservas', routerReservas);
// app.use('/login', routerLogin);


app.listen(config.app.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.app.port}`);
  });

module.exports = {
    app,
    routerClientes,
    routerReservas,
    frontendRouter
    /*routerLogin*/

}







