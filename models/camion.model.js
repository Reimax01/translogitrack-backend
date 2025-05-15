const db = require("../config/db");

/**
 * Modelo de datos para la entidad Camión.
 * Se encarga de interactuar con la tabla `Camion` en la base de datos.
 */
const Camion = {
  /**
   * Crea un nuevo camión en la base de datos.
   * @param {Object} datos - Datos del camión.
   * @returns {Object} Camión recién creado.
   */
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

  /**
   * Obtiene todos los camiones activos del sistema.
   * @returns {Array} Lista de camiones.
   */
  async obtenerTodos() {
    const result = await db.query("SELECT * FROM Camion WHERE activo = TRUE");
    return result.rows;
  },

  /**
   * Actualiza los datos de un camión existente.
   * Combina los campos nuevos con los actuales para evitar sobrescribir información no enviada.
   * @param {number} id_camion - ID del camión a actualizar.
   * @param {Object} camposActualizados - Campos a actualizar.
   * @returns {Object} Camión actualizado.
   */
  async actualizar(id_camion, camposActualizados) {
    // 1. Obtener el camión actual
    const { rows } = await db.query(`SELECT * FROM Camion WHERE id_camion = $1`, [id_camion]);
    if (rows.length === 0) throw new Error(`Camión con ID ${id_camion} no encontrado`);

    const actual = rows[0]; // Datos actuales del camión

    // 2. Mezclar campos actualizados con los actuales
    const placa = camposActualizados.placa ?? actual.placa;
    const capacidad_kg = camposActualizados.capacidad_kg ?? actual.capacidad_kg;
    const estado_operativo = camposActualizados.estado_operativo ?? actual.estado_operativo;
    const ubicacion_actual = camposActualizados.ubicacion_actual ?? actual.ubicacion_actual;
    const km_actual = camposActualizados.km_actual ?? actual.km_actual;

    // 3. Validar que la nueva placa no esté duplicada
    const existe = await db.query(
      `SELECT 1 FROM Camion WHERE placa = $1 AND id_camion != $2`,
      [placa, id_camion]
    );
    if (existe.rows.length > 0) throw new Error(`Ya existe un camión con la placa '${placa}'`);

    // 4. Ejecutar actualización
    const query = `
      UPDATE Camion
      SET placa = $1,
          capacidad_kg = $2,
          estado_operativo = $3,
          ubicacion_actual = $4,
          km_actual = $5
      WHERE id_camion = $6
      RETURNING *;
    `;
    const values = [placa, capacidad_kg, estado_operativo, ubicacion_actual, km_actual, id_camion];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  /**
   * Elimina lógicamente un camión marcándolo como inactivo.
   * @param {number} id_camion - ID del camión a eliminar.
   * @returns {boolean} Verdadero si la operación fue exitosa.
   */
  async eliminar(id_camion) {
    const query = `
      UPDATE Camion
      SET activo = FALSE
      WHERE id_camion = $1;
    `;
    await db.query(query, [id_camion]);
    return true;
  }
};

module.exports = Camion;
