const db = require('../config/db');

const Pedido = {
  async crear({
    id_cliente,
    id_ruta,
    id_camion,
    id_conductor,
    estado = 'Pendiente',
    fecha_entrega_estimada,
    observaciones,
    precio,
    nro_guia,
  }) {
    const query = `
      INSERT INTO Pedido (
        id_cliente,
        id_ruta,
        id_camion,
        id_conductor,
        estado,
        fecha_entrega_estimada,
        observaciones,
        precio,
        nro_guia
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [
      id_cliente,
      id_ruta,
      id_camion,
      id_conductor,
      estado,
      fecha_entrega_estimada,
      observaciones,
      precio,
      nro_guia,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async obtenerTodos() {
    const result = await db.query('SELECT * FROM Pedido');
    return result.rows;
  },

  async obtenerPorId(id_pedido) {
    const result = await db.query('SELECT * FROM Pedido WHERE id_pedido = $1', [id_pedido]);
    return result.rows[0];
  },

  async actualizar(id_pedido, camposActualizados) {
    // 1. Obtener datos actuales del pedido
    const { rows } = await db.query(`SELECT * FROM Pedido WHERE id_pedido = $1`, [id_pedido]);
    if (rows.length === 0) throw new Error(`Pedido con ID ${id_pedido} no encontrado`);
  
    const actual = rows[0]; // datos actuales desde la BD
  
    // 2. Combinar campos nuevos con los existentes
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
  
    // 3. Ejecutar la actualización
    const query = `
      UPDATE Pedido
      SET id_cliente = $1, id_ruta = $2, id_camion = $3, id_conductor = $4, estado = $5,
          fecha_entrega_estimada = $6, fecha_entrega_real = $7, observaciones = $8,
          precio = $9, nro_guia = $10
      WHERE id_pedido = $11
      RETURNING *;
    `;
    const values = [
      id_cliente,
      id_ruta,
      id_camion,
      id_conductor,
      estado,
      fecha_entrega_estimada,
      fecha_entrega_real,
      observaciones,
      precio,
      nro_guia,
      id_pedido
    ];
  
    const result = await db.query(query, values);
    return result.rows[0];
  },
  

  async eliminar(id_pedido) {
    const query = 'DELETE FROM Pedido WHERE id_pedido = $1';
    await db.query(query, [id_pedido]);
    return true;
  },
};

module.exports = Pedido;
