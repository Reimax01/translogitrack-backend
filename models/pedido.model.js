const db = require('../config/db');

const Pedido = {
  /**
   * Crea un nuevo pedido en la base de datos.
   * @param {Object} datos - Datos del pedido.
   * @returns {Object} - Pedido creado.
   */
  async crear({ id_cliente, id_ruta, id_camion,id_conductor, estado = 'Pendiente', fecha_entrega_estimada, observaciones, precio, nro_guia,}) {
    const query = `
      INSERT INTO Pedido ( id_cliente, id_ruta, id_camion, id_conductor, estado, fecha_entrega_estimada, observaciones, precio, nro_guia)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const values = [id_cliente, id_ruta, id_camion, id_conductor, estado, fecha_entrega_estimada, observaciones, precio, nro_guia];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  /**
   * Obtiene todos los pedidos de la base de datos.
   * @returns {Array} - Lista de pedidos.
   */
  async obtenerTodos() {
    const result = await db.query('SELECT * FROM Pedido');
    return result.rows;
  },

  /**
   * Obtiene un pedido por su ID.
   * @param {number} id_pedido - ID del pedido.
   * @returns {Object|null} - Pedido encontrado o null.
   */
  async obtenerPorId(id_pedido) {
    const result = await db.query('SELECT * FROM Pedido WHERE id_pedido = $1', [id_pedido]);
    return result.rows[0];
  },

  /**
   * Actualiza un pedido existente.
   * Combina los campos nuevos con los existentes si no se envían.
   * @param {number} id_pedido - ID del pedido.
   * @param {Object} camposActualizados - Campos a actualizar.
   * @returns {Object} - Pedido actualizado.
   */
  async actualizar(id_pedido, camposActualizados) {
    // Obtener datos actuales
    const { rows } = await db.query('SELECT * FROM Pedido WHERE id_pedido = $1', [id_pedido]);
    if (rows.length === 0) throw new Error(`Pedido con ID ${id_pedido} no encontrado`);

    const actual = rows[0];

    // Combinar datos actuales con actualizaciones
    const id_cliente = camposActualizados.id_cliente ?? actual.id_cliente;
    const id_ruta = camposActualizados.id_ruta ?? actual.id_ruta;
    const id_camion = camposActualizados.id_camion ?? actual.id_camion;
    const id_conductor = camposActualizados.id_conductor ?? actual.id_conductor;
    const estado = camposActualizados.estado ?? actual.estado;
    const fecha_entrega_estimada = camposActualizados.fecha_entrega_estimada ?? actual.fecha_entrega_estimada;
    const fecha_entrega_real = camposActualizados.fecha_entrega_real ?? actual.fecha_entrega_real;
    const observaciones = camposActualizados.observaciones ?? actual.observaciones;
    const precio = camposActualizados.precio ?? actual.precio;
    const nro_guia = camposActualizados.nro_guia ?? actual.nro_guia;

    // Ejecutar la actualización
    const query = `
      UPDATE Pedido
      SET id_cliente = $1,
          id_ruta = $2,
          id_camion = $3,
          id_conductor = $4,
          estado = $5,
          fecha_entrega_estimada = $6,
          fecha_entrega_real = $7,
          observaciones = $8,
          precio = $9,
          nro_guia = $10
      WHERE id_pedido = $11
      RETURNING *;
    `;

    const values = [id_cliente, id_ruta, id_camion, id_conductor, estado, fecha_entrega_estimada, observaciones, precio, nro_guia];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  /**
   * Elimina un pedido por su ID.
   * @param {number} id_pedido - ID del pedido.
   * @returns {boolean} - true si se eliminó.
   */
  async eliminar(id_pedido) {
    await db.query('DELETE FROM Pedido WHERE id_pedido = $1', [id_pedido]);
    return true;
  },
};

module.exports = Pedido;
