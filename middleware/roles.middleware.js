// middleware/roles.middleware.js

/**
 * Middleware para verificar el rol del usuario autenticado.
 * Permite definir qué roles tienen acceso a una ruta específica.
 * 
 * @param {Array} roles - Array de roles que pueden acceder a la ruta.
 * @returns {Function} - Middleware que verifica si el rol del usuario está permitido.
 */
const verificarRol = (roles) => {
    return (req, res, next) => {
      // Verificamos si el usuario autenticado tiene el rol adecuado.
      if (!req.usuario || !req.usuario.rol) {
        return res.status(403).json({ error: "Acceso denegado. Rol no especificado." });
      }
  
      // Verificamos si el rol del usuario está en la lista de roles permitidos.
      if (!roles.includes(req.usuario.rol)) {
        return res.status(403).json({ error: "Acceso denegado. No tiene el rol adecuado." });
      }
  
      // Si todo está bien, dejamos pasar la solicitud a la siguiente función.
      next();
    };
  };
  
  module.exports = verificarRol;
  