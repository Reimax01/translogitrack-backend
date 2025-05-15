const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const verificarRol = require('../middleware/roles.middleware');
const validarId = require('../middleware/validarId.middleware');
const conductorCtrl = require('../controllers/conductor.controller');

// Rutas protegidas con middleware de autenticación
router.get('/', authMiddleware,verificarRol(['Administrador', 'Operador', 'Cliente']), conductorCtrl.getAllConductores);               
router.post('/', authMiddleware, verificarRol(['Administrador', 'Operador']), conductorCtrl.createConductor);               
router.put('/:id_conductor', authMiddleware, validarId('id_conductor'), verificarRol(['Administrador', 'Operador']), conductorCtrl.updateConductor);   
router.delete('/:id_conductor', authMiddleware, validarId('id_conductor'), verificarRol(['Administrador', 'Operador']), conductorCtrl.deleteConductor);

module.exports = router;
