/* const db = require('../../db/funciones-mysql');
const respuesta = require('../../red/respuestas');
const TABLA = 'usuarios';

const routerLogin = express.Router();

routerLogin.post("/register", async (req, res) => {
    const { nombre, email, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }
  
    try {
      // Asegúrate de ajustar esta consulta a tu base de datos
      await db.query("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)", [nombre, email, password]);
      res.status(200).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error registrando usuario" });
    }
  });
  
  routerLogin.post("/delete-account", async (req, res) => {
    const { "usuario-delete": usuario, email, "name-password": password } = req.body;
  
    try {
      // Ajusta esta consulta a tu base de datos
      await db.query("DELETE FROM usuarios WHERE nombre = ? AND email = ? AND password = ?", [usuario, email, password]);
      res.status(200).json({ message: "Cuenta eliminada exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error eliminando cuenta" });
    }
  }); 

  module.exports = router;*/