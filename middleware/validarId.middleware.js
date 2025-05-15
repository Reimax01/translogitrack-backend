// middleware/validarId.middleware.js

/**
 * Middleware para validar que el parámetro ID en la URL sea un entero positivo válido.
 * 
 * @param {string} paramName - Nombre del parámetro a validar (ejemplo: 'id_camion', 'id_conductor', etc).
 * @returns {Function} Middleware que valida el parámetro.
 */
const validarId = (paramName) => {
  return (req, res, next) => {
    const id = req.params[paramName];

    // Validar que sea número entero positivo
    const idNum = Number(id);
    if (!id || isNaN(idNum) || !Number.isInteger(idNum) || idNum <= 0) {
      return res.status(400).json({ error: `El parámetro ${paramName} debe ser un entero positivo válido.` });
    }

    next();
  };
};

module.exports = validarId;
