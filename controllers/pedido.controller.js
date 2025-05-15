const Pedido = require('../models/pedido.model');

const getAllPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.obtenerTodos();
    res.json(pedidos);
  } catch (error) {
    console.error('❌ Error al obtener pedidos:', error);
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

const getPedidoById = async (req, res) => {
  const { id_pedido } = req.params;
  try {
    const pedido = await Pedido.obtenerPorId(id_pedido);
    if (pedido) {
      res.json(pedido);
    } else {
      res.status(404).json({ message: 'Pedido no encontrado' });
    }
  } catch (error) {
    console.error('❌ Error al obtener pedido:', error);
    res.status(500).json({ message: 'Error al obtener pedido' });
  }
};

const createPedido = async (req, res) => {
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
    console.error('❌ Error al crear pedido:', error);
    res.status(500).json({ message: 'Error al crear pedido' });
  }
};

const updatePedido = async (req, res) => {
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
    console.error('❌ Error al actualizar pedido:', error);
    res.status(500).json({ message: 'Error al actualizar pedido' });
  }
};

const deletePedido = async (req, res) => {
  const { id_pedido } = req.params;

  try {
    await Pedido.eliminar(id_pedido);
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar pedido:', error);
    res.status(500).json({ message: 'Error al eliminar pedido' });
  }
};

module.exports = {
  getAllPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
};
