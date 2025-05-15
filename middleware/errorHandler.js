// middleware/errorHandler.js

/**
 * Middleware global para manejo de errores.
 * Captura cualquier error que ocurra en las rutas y devuelve una respuesta con un mensaje y código de estado.
 */
function errorHandler(err, req, res, next) {
  console.error(err); // Log del error para depuración
  
  // Puedes personalizar aquí la respuesta según el tipo o propiedades del error
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  res.status(statusCode).json({
    error: message,
    // opcional: stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
}

module.exports = errorHandler;
