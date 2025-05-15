const Camion = require('../models/camion.model');

/**
 * Obtiene todos los camiones registrados en el sistema.
 */
const getAllCamiones = async (req, res) => {
  try {
    const camiones = await Camion.obtenerTodos();
    res.json(camiones);
  } catch (error) {
    console.error('❌ Error al obtener camiones:', error);
    res.status(500).json({ message: 'Error al obtener camiones' });
  }
};

/**
 * Crea un nuevo camión con los datos proporcionados en el cuerpo de la solicitud.
 */
const createCamion = async (req, res) => {
  const {
    placa,
    capacidad_kg,
    estado_operativo,
    ubicacion_actual,
    km_actual
  } = req.body;

  try {
    const nuevoCamion = await Camion.crear({
      placa,
      capacidad_kg,
      estado_operativo,
      ubicacion_actual,
      km_actual
    });

    res.status(201).json(nuevoCamion);
  } catch (error) {
    console.error('❌ Error al crear camión:', error);
    res.status(500).json({ message: 'Error al crear camión' });
  }
};

/**
 * Actualiza los datos de un camión existente a partir de su ID.
 */
const updateCamion = async (req, res) => {
  const { id_camion } = req.params;
  const data = req.body;

  // Verifica si se enviaron campos
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ message: 'No se enviaron campos para actualizar' });
  }

  try {
    const camionActualizado = await Camion.actualizar(id_camion, data);
    res.json(camionActualizado);
  } catch (error) {
    console.error('❌ Error al actualizar camión:', error);
    res.status(500).json({ message: 'Error al actualizar camión' });
  }
};

/**
 * Elimina un camión existente a partir de su ID.
 */
const deleteCamion = async (req, res) => {
  const { id_camion } = req.params;

  try {
    await Camion.eliminar(id_camion);
    res.json({ message: 'Camión eliminado correctamente' });
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

