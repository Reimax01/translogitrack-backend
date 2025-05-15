const Pedido = require('../models/pedido.model');

/**
 * Obtener todos los pedidos.
 */
const getAllPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedido.obtenerTodos();
    res.json(pedidos);
  } catch (error) {
    next(error); // Manejo de errores global
  }
};

/**
 * Obtener un pedido por su ID.
 */
const getPedidoById = async (req, res, next) => {
  const { id_pedido } = req.params;
  try {
    const pedido = await Pedido.obtenerPorId(id_pedido);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    next(error);
  }
};

/**
 * Crear un nuevo pedido.
 */
const createPedido = async (req, res, next) => {
  const {
    id_cliente,
    id_ruta,
    id_camion,
    id_conductor,
    estado,
    fecha_entrega_estimada,
    observaciones,
    precio,
    nro_guia,
  } = req.body;

  try {
    const nuevoPedido = await Pedido.crear({
      id_cliente,
      id_ruta,
      id_camion,
      id_conductor,
      estado,
      fecha_entrega_estimada,
      observaciones,
      precio,
      nro_guia,
    });

    res.status(201).json(nuevoPedido);
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar un pedido existente por ID.
 */
const updatePedido = async (req, res, next) => {
  const { id_pedido } = req.params;
  const {
    estado,
    fecha_entrega_real,
    observaciones,
    precio,
    nro_guia,
  } = req.body;

  try {
    const pedidoActualizado = await Pedido.actualizar(id_pedido, {
      estado,
      fecha_entrega_real,
      observaciones,
      precio,
      nro_guia,
    });

    res.json(pedidoActualizado);
  } catch (error) {
    next(error);
  }
};

/**
 * Eliminar un pedido por ID.
 */
const deletePedido = async (req, res, next) => {
  const { id_pedido } = req.params;

  try {
    await Pedido.eliminar(id_pedido);
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
};
