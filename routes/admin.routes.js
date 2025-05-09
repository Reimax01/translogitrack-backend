// routes/admin.routes.js
const express = require("express");
const router = express.Router();

// Importar middlewares
const verificarToken = require("../middleware/auth.middleware");
const verificarRol = require("../middleware/roles.middleware");

// Ruta solo para administradores
router.get("/admin-dashboard", verificarToken, verificarRol(["Administrador"]), (req, res) => {
  res.json({ message: "Bienvenido al panel de administración" });
});

// Ruta para operadores y administradores
router.get("/operaciones", verificarToken, verificarRol(["Operador", "Administrador"]), (req, res) => {
  res.json({ message: "Acceso a operaciones permitido" });
});

// Ruta para clientes, operadores y administradores
router.get("/pedidos", verificarToken, verificarRol(["Cliente", "Operador", "Administrador"]), (req, res) => {
  res.json({ message: "Tus pedidos están aquí" });
});

module.exports = router;
