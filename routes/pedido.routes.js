// routes/pedido.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const verificarRol = require('../middleware/roles.middleware');
const validarId = require('../middleware/validarId.middleware');
const pedidoCtrl = require('../controllers/pedido.controller');

// Rutas protegidas con middleware de autenticación
router.get('/', authMiddleware, verificarRol(['Administrador', 'Operador', 'Cliente']), pedidoCtrl.getAllPedidos);          
router.post('/', authMiddleware, verificarRol(['Administrador', 'Operador', 'Cliente']), pedidoCtrl.createPedido);         
router.put('/:id_pedido', authMiddleware, validarId('id_pedido'), verificarRol(['Administrador', 'Operador']), pedidoCtrl.updatePedido); 
router.delete('/:id_pedido', authMiddleware, validarId('id_pedido'), verificarRol(['Administrador']), pedidoCtrl.deletePedido);

module.exports = router;
