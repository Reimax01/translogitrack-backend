const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const conductorCtrl = require('../controllers/conductor.controller');

// Rutas protegidas con middleware de autenticación
router.get('/', authMiddleware, conductorCtrl.getAllConductores);               // Obtener todos los conductores
router.post('/', authMiddleware, conductorCtrl.createConductor);               // Crear un nuevo conductor
router.put('/:id_conductor', authMiddleware, conductorCtrl.updateConductor);   // Actualizar un conductor existente
router.delete('/:id_conductor', authMiddleware, conductorCtrl.deleteConductor); // Eliminar (desactivar) un conductor

module.exports = router;
