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

  async actualizar(id_camion, camposActualizados) {
    // 1. Obtener datos actuales del camión
    const { rows } = await db.query(`SELECT * FROM Camion WHERE id_camion = $1`, [id_camion]);
    if (rows.length === 0) throw new Error(`Camión con ID ${id_camion} no encontrado`);
    
    const actual = rows[0]; // datos actuales desde la BD
  
    // 2. Mezclar los datos: si un campo no viene en la petición, se mantiene el actual
    const placa = camposActualizados.placa ?? actual.placa;
    const capacidad_kg = camposActualizados.capacidad_kg ?? actual.capacidad_kg;
    const estado_operativo = camposActualizados.estado_operativo ?? actual.estado_operativo;
    const ubicacion_actual = camposActualizados.ubicacion_actual ?? actual.ubicacion_actual;
    const km_actual = camposActualizados.km_actual ?? actual.km_actual;
  
    // 3. Validar que no se duplique la placa
    const existe = await db.query(
      `SELECT 1 FROM Camion WHERE placa = $1 AND id_camion != $2`,
      [placa, id_camion]
    );
    if (existe.rows.length > 0) throw new Error(`Ya existe un camión con la placa '${placa}'`);
  
    // 4. Ejecutar la actualización
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
