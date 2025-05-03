// Importamos la conexión a la base de datos
const db = require('../config/db');

// Creamos la tabla 'pedidos' si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS pedidos (
    id SERIAL PRIMARY KEY, -- Identificador único del pedido
    id_usuario INTEGER REFERENCES usuarios(id) ON DELETE SET NULL, -- Relación con usuario cliente
    id_conductor INTEGER REFERENCES conductores(id), -- Relacion con conductor
    id_vehiculo INTEGER REFERENCES vehiculos(id), -- Relacion con el vehiculo que lleva el envio
    id_ruta INTEGER REFERENCES rutas(id), -- Relacion con la ruta
    estado VARCHAR(20) DEFAULT 'Pendiente', -- Estado actual del pedido pendiente, en_transito, entregado, cancelado
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    descripcion TEXT NOT NULL -- Detalles del pedido
  );
`)
.then(() => {
  console.log('✅ Tabla pedidos creada o verificada correctamente');
})
.catch((err) => {
  console.error('❌ Error al crear/verificar la tabla pedidos:', err);
});
