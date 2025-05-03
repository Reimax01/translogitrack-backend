// controllers/pedido.controller.js
const db = require('../config/db');

// Obtener todos los pedidos
const getAllPedidos = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM pedidos');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener pedidos:', error);
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

// Crear nuevo pedido
const createPedido = async (req, res) => {
  const { id_usuario, id_conductor, id_vehiculo, id_ruta, estado , descripcion} = req.body;

  try {
    const result = await db.query(
      `INSERT INTO pedidos (id_usuario, id_conductor, id_vehiculo, id_ruta, estado, descripcion)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id_usuario, id_conductor, id_vehiculo, id_ruta, estado, descripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al crear pedido:', error);
    res.status(500).json({ message: 'Error al crear pedido' });
  }
};

// Actualizar pedido
const updatePedido = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const result = await db.query(
      `UPDATE pedidos
       SET estado = $1
       WHERE id = $2
       RETURNING *`,
      [estado, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al actualizar pedido:', error);
    res.status(500).json({ message: 'Error al actualizar pedido' });
  }
};

// Eliminar pedido
const deletePedido = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM pedidos WHERE id = $1', [id]);
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
