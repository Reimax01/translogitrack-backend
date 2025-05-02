// middlewares/auth.middleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware para verificar token JWT en rutas protegidas.
 * Requiere que el token esté en el header "Authorization: Bearer <token>".
 */
const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(403).json({ error: "Token requerido" });

  try {
    // Validar token ignorando la palabra "Bearer"
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.usuario = decoded;  // Adjuntamos datos del token al objeto req
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = verificarToken;

