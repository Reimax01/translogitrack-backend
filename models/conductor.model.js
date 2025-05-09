const db = require("../config/db");

/**
 * Modelo para la gestión de conductores.
 * Usa la tabla `Conductor`.
 */
const Conductor = {
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

  async obtenerTodos() {
    const result = await db.query("SELECT * FROM Conductor WHERE activo = TRUE");
    return result.rows;
  },

  async actualizar(id_conductor, { nombre_completo, numero_licencia, fecha_vencimiento_licencia }) {
    const query = `
      UPDATE Conductor
      SET nombre_completo = $1, numero_licencia = $2, fecha_vencimiento_licencia = $3
      WHERE id_conductor = $4
      RETURNING *;
    `;
    const values = [nombre_completo, numero_licencia, fecha_vencimiento_licencia, id_conductor];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async eliminar(id_conductor) {
    const query = `
      UPDATE Conductor SET activo = FALSE WHERE id_conductor = $1;
    `;
    await db.query(query, [id_conductor]);
    return true;
  }
};

module.exports = Conductor;
