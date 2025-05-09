const db = require('../config/db');

// Obtener todos los camiones activos
const getAllCamiones = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Camion WHERE activo = TRUE');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener camiones:', error);
    res.status(500).json({ message: 'Error al obtener camiones' });
  }
};

// Crear nuevo camión
const createCamion = async (req, res) => {
  const { placa, capacidad_kg, estado_operativo, ubicacion_actual, km_actual } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO Camion (placa, capacidad_kg, estado_operativo, ubicacion_actual, km_actual)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [placa, capacidad_kg, estado_operativo || 'Disponible', ubicacion_actual || {}, km_actual || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al crear camión:', error);
    res.status(500).json({ message: 'Error al crear camión' });
  }
};

// Actualizar camión
const updateCamion = async (req, res) => {
  const { id_camion } = req.params;
  const { placa, capacidad_kg, estado_operativo, ubicacion_actual, km_actual } = req.body;

  try {
    const result = await db.query(
      `UPDATE Camion
       SET placa = $1, capacidad_kg = $2, estado_operativo = $3, ubicacion_actual = $4, km_actual = $5
       WHERE id_camion = $6
       RETURNING *`,
      [placa, capacidad_kg, estado_operativo, ubicacion_actual, km_actual, id_camion]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al actualizar camión:', error);
    res.status(500).json({ message: 'Error al actualizar camión' });
  }
};

// Eliminar (desactivar) camión
const deleteCamion = async (req, res) => {
  const { id_camion } = req.params;

  try {
    await db.query('UPDATE Camion SET activo = FALSE WHERE id_camion = $1', [id_camion]);
    res.json({ message: 'Camión desactivado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar camión:', error);
    res.status(500).json({ message: 'Error al eliminar camión' });
  }
};

module.exports = {
  getAllCamiones,
  createCamion,
  updateCamion,
  deleteCamion,
};
