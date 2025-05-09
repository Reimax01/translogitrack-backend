const db = require('../config/db');

// Obtener todos los conductores activos
const getAllConductores = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Conductor WHERE activo = TRUE');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener conductores:', error);
    res.status(500).json({ message: 'Error al obtener conductores' });
  }
};

// Crear nuevo conductor
const createConductor = async (req, res) => {
  const { nombre_completo, numero_licencia, fecha_vencimiento_licencia } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO Conductor (nombre_completo, numero_licencia, fecha_vencimiento_licencia)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre_completo, numero_licencia, fecha_vencimiento_licencia]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al crear conductor:', error);
    res.status(500).json({ message: 'Error al crear conductor' });
  }
};

// Actualizar conductor
const updateConductor = async (req, res) => {
  const { id_conductor } = req.params;
  const { nombre_completo, numero_licencia, fecha_vencimiento_licencia } = req.body;

  try {
    const result = await db.query(
      `UPDATE Conductor
       SET nombre_completo = $1, numero_licencia = $2, fecha_vencimiento_licencia = $3
       WHERE id_conductor = $4
       RETURNING *`,
      [nombre_completo, numero_licencia, fecha_vencimiento_licencia, id_conductor]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al actualizar conductor:', error);
    res.status(500).json({ message: 'Error al actualizar conductor' });
  }
};

// Eliminar (desactivar) conductor
const deleteConductor = async (req, res) => {
  const { id_conductor } = req.params;

  try {
    await db.query('UPDATE Conductor SET activo = FALSE WHERE id_conductor = $1', [id_conductor]);
    res.json({ message: 'Conductor desactivado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar conductor:', error);
    res.status(500).json({ message: 'Error al eliminar conductor' });
  }
};

module.exports = {
  getAllConductores,
  createConductor,
  updateConductor,
  deleteConductor,
};
