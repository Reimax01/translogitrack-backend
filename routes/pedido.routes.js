// routes/pedido.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const pedidoCtrl = require('../controllers/pedido.controller');

// Rutas protegidas con middleware de autenticación
router.get('/', authMiddleware, pedidoCtrl.getAllPedidos);
router.post('/', authMiddleware, pedidoCtrl.createPedido);
router.put('/:id', authMiddleware, pedidoCtrl.updatePedido);
router.delete('/:id', authMiddleware, pedidoCtrl.deletePedido);

module.exports = router;
