const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const verificarRol = require('../middleware/roles.middleware');
const validarId = require('../middleware/validarId.middleware');
const camionCtrl = require('../controllers/camion.controller');

// Rutas protegidas con middleware de autenticación
router.get('/', authMiddleware, verificarRol(['Administrador', 'Operador', 'Cliente']),camionCtrl.getAllCamiones);               // Obtener todos los camiones
router.post('/', authMiddleware, verificarRol(['Administrador', 'Operador']), camionCtrl.createCamion);               // Crear un nuevo camión
router.put('/:id_camion', validarId('id_camion'), authMiddleware, verificarRol(['Administrador', 'Operador']), camionCtrl.updateCamion);     // Actualizar un camión existente
router.delete('/:id_camion', validarId('id_camion'), authMiddleware, verificarRol(['Administrador', 'Operador']), camionCtrl.deleteCamion);  // Eliminar (desactivar) un camión

module.exports = router;
