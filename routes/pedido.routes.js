// routes/pedido.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const pedidoCtrl = require('../controllers/pedido.controller');

// Rutas protegidas con middleware de autenticación
router.get('/', authMiddleware, pedidoCtrl.getAllPedidos);          // Obtener todos los pedidos
router.post('/', authMiddleware, pedidoCtrl.createPedido);         // Crear un nuevo pedido
router.put('/:id_pedido', authMiddleware, pedidoCtrl.updatePedido); // Actualizar un pedido existente
router.delete('/:id_pedido', authMiddleware, pedidoCtrl.deletePedido); // Eliminar un pedido

module.exports = router;
