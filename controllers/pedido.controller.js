// controllers/pedido.controller.js
const db = require('../config/db');

// Obtener todos los pedidos
const getAllPedidos = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Pedido');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener pedidos:', error);
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

// Crear nuevo pedido
const createPedido = async (req, res) => {
  const { id_cliente, id_conductor, id_camion, id_ruta, estado, fecha_entrega_estimada, precio, nro_guia, observaciones } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO Pedido (id_cliente, id_conductor, id_camion, id_ruta, estado, fecha_entrega_estimada, precio, nro_guia, observaciones)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [id_cliente, id_conductor, id_camion, id_ruta, estado, fecha_entrega_estimada, precio, nro_guia, observaciones]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al crear pedido:', error);
    res.status(500).json({ message: 'Error al crear pedido' });
  }
};

// Actualizar pedido
const updatePedido = async (req, res) => {
  const { id_pedido} = req.params;
  const { estado, fecha_entrega_real, observaciones } = req.body;

  try {
    const result = await db.query(
      `UPDATE Pedido
       SET estado = $1, fecha_entrega_real = $2, observaciones = $3
       WHERE id_pedido = $4
       RETURNING *`,
      [estado, fecha_entrega_real, observaciones, id_pedido]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al actualizar pedido:', error);
    res.status(500).json({ message: 'Error al actualizar pedido' });
  }
};

// Eliminar pedido
const deletePedido = async (req, res) => {
  const { id_pedido } = req.params;

  try {
    await db.query('DELETE FROM Pedido WHERE id_pedido = $1', [id_pedido]);
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar pedido:', error);
    res.status(500).json({ message: 'Error al eliminar pedido' });
  }
};

module.exports = {
  getAllPedidos,
  createPedido,
  updatePedido,
  deletePedido,
};
