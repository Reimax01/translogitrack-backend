const db = require("../config/db");

/**
 * Modelo para la gestión de conductores.
 * Usa la tabla `Conductor`.
 */
const Conductor = {
  // Crear nuevo conductor
  async crear({ nombre_completo, numero_licencia, fecha_vencimiento_licencia }) {
    const query = `
      INSERT INTO Conductor (nombre_completo, numero_licencia, fecha_vencimiento_licencia)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [nombre_completo, numero_licencia, fecha_vencimiento_licencia];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  // Obtener todos los conductores activos (eliminación lógica)
  async obtenerTodos() {
    const result = await db.query("SELECT * FROM Conductor WHERE activo = TRUE");
    return result.rows;
  },

  // Actualizar datos de un conductor
  async actualizar(id_conductor, camposActualizados) {
    // 1. Obtener datos actuales
    const { rows } = await db.query('SELECT * FROM Conductor WHERE id_conductor = $1', [id_conductor]);
    if (rows.length === 0) throw new Error('Conductor no encontrado');

    const actual = rows[0];

    // 2. Combinar valores nuevos con los existentes
    const {
      nombre_completo = actual.nombre_completo,
      numero_licencia = actual.numero_licencia,
      fecha_vencimiento_licencia = actual.fecha_vencimiento_licencia,
    } = camposActualizados;

    // 3. Ejecutar actualización
    const query = `
      UPDATE Conductor
      SET nombre_completo = $1,
          numero_licencia = $2,
          fecha_vencimiento_licencia = $3
      WHERE id_conductor = $4
      RETURNING *;
    `;
    const values = [nombre_completo, numero_licencia, fecha_vencimiento_licencia, id_conductor];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  // Eliminación lógica: marcar conductor como inactivo
  async eliminar(id_conductor) {
    const query = `
      UPDATE Conductor SET activo = FALSE WHERE id_conductor = $1;
    `;
    await db.query(query, [id_conductor]);
    return true;
  }
};

module.exports = Conductor;
