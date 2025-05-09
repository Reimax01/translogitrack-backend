const db = require("../config/db");

/**
 * Modelo para la gestión de camiones.
 * Utiliza la estructura de la tabla `Camion`.
 */
const Camion = {
  async crear({ placa, capacidad_kg, estado_operativo, ubicacion_actual, km_actual }) {
    const query = `
      INSERT INTO Camion (placa, capacidad_kg, estado_operativo, ubicacion_actual, km_actual)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [placa, capacidad_kg, estado_operativo, ubicacion_actual, km_actual];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async obtenerTodos() {
    const result = await db.query("SELECT * FROM Camion WHERE activo = TRUE");
    return result.rows;
  },

  async actualizar(id_camion, { placa, capacidad_kg, estado_operativo, ubicacion_actual, km_actual }) {
    const query = `
      UPDATE Camion
      SET placa = $1, capacidad_kg = $2, estado_operativo = $3, ubicacion_actual = $4, km_actual = $5
      WHERE id_camion = $6
      RETURNING *;
    `;
    const values = [placa, capacidad_kg, estado_operativo, ubicacion_actual, km_actual, id_camion];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async eliminar(id_camion) {
    const query = `
      UPDATE Camion SET activo = FALSE WHERE id_camion = $1;
    `;
    await db.query(query, [id_camion]);
    return true;
  }
};

module.exports = Camion;
