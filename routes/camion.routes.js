const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const camionCtrl = require('../controllers/camion.controller');

// Rutas protegidas con middleware de autenticación
router.get('/', authMiddleware, camionCtrl.getAllCamiones);               // Obtener todos los camiones
router.post('/', authMiddleware, camionCtrl.createCamion);               // Crear un nuevo camión
router.put('/:id_camion', authMiddleware, camionCtrl.updateCamion);     // Actualizar un camión existente
router.delete('/:id_camion', authMiddleware, camionCtrl.deleteCamion);  // Eliminar (desactivar) un camión

module.exports = router;
