// middleware/auth.middleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware para verificar token JWT en rutas protegidas.
 * Requiere que el token esté en el header "Authorization: Bearer <token>".
 */
const verificarToken = (req, res, next) => {
  // Obtener el token desde el encabezado 'Authorization'
  const token = req.headers.authorization;

  // Validar que el token esté presente y que tenga el formato adecuado (Bearer <token>)
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Token requerido en formato 'Bearer <token>'" });
  }

  try {
    // Extraer el token real (sin la palabra "Bearer")
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    
    // Adjuntar los datos del usuario decodificado al objeto req para acceso en las rutas
    req.usuario = decoded;

    // Continuar con la siguiente función de la cadena
    next();
  } catch (error) {
    // Manejo de error: Token expirado
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expirado" });
    }
    
    // Manejo de error: Token inválido
    res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = verificarToken;

