const Camion = require('../models/camion.model');

const getAllCamiones = async (req, res) => {
  try {
    const camiones = await Camion.obtenerTodos();
    res.json(camiones);
  } catch (error) {
    console.error('❌ Error al obtener camiones:', error);
    res.status(500).json({ message: 'Error al obtener camiones' });
  }
};

const createCamion = async (req, res) => {
  const { placa, capacidad_kg, estado_operativo, ubicacion_actual, km_actual } = req.body;

  try {
    const nuevoCamion = await Camion.crear({ placa, capacidad_kg, estado_operativo, ubicacion_actual, km_actual });
    res.status(201).json(nuevoCamion);
  } catch (error) {
    console.error('❌ Error al crear camión:', error);
    res.status(500).json({ message: 'Error al crear camión' });
  }
};


const updateCamion = async (req, res) => {
  const { id_camion } = req.params;
  const data = req.body; // ⚠️ Verifica si llega vacío
  //log para ver los datos que llegan
  console.log('📦 Datos recibidos para actualizar:', req.body);


  try {
    const camionActualizado = await Camion.actualizar(id_camion, data);
    res.json(camionActualizado);
  } catch (error) {
    console.error('❌ Error al actualizar camión:', error);
    res.status(500).json({ message: 'Error al actualizar camión' });
  }
};


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
