const Conductor = require('../models/conductor.model');

/**
 * GET /conductores
 * Obtiene todos los conductores activos del sistema.
 */
const getAllConductores = async (req, res) => {
  try {
    const conductores = await Conductor.obtenerTodos();
    res.json(conductores);
  } catch (error) {
    console.error('❌ Error al obtener conductores:', error);
    res.status(500).json({ message: 'Error al obtener conductores' });
  }
};

/**
 * POST /conductores
 * Crea un nuevo conductor.
 */
const createConductor = async (req, res) => {
  const { nombre_completo, numero_licencia, fecha_vencimiento_licencia } = req.body;
  try {
    const nuevoConductor = await Conductor.crear({
      nombre_completo,
      numero_licencia,
      fecha_vencimiento_licencia
    });
    res.status(201).json(nuevoConductor);
  } catch (error) {
    console.error('❌ Error al crear conductor:', error);
    res.status(500).json({ message: 'Error al crear conductor' });
  }
};

/**
 * PUT /conductores/:id_conductor
 * Actualiza los datos de un conductor existente.
 */
const updateConductor = async (req, res) => {
  const { id_conductor } = req.params;
  const { nombre_completo, numero_licencia, fecha_vencimiento_licencia } = req.body;

  try {
    const conductorActualizado = await Conductor.actualizar(id_conductor, {
      nombre_completo,
      numero_licencia,
      fecha_vencimiento_licencia
    });
    res.json(conductorActualizado);
  } catch (error) {
    console.error('❌ Error al actualizar conductor:', error);
    res.status(500).json({ message: 'Error al actualizar conductor' });
  }
};

/**
 * DELETE /conductores/:id_conductor
 * Elimina lógicamente un conductor (marca como inactivo).
 */
const deleteConductor = async (req, res) => {
  const { id_conductor } = req.params;
  try {
    await Conductor.eliminar(id_conductor);
    res.json({ message: 'Conductor eliminado correctamente' });
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
