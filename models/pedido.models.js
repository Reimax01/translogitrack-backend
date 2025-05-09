// Importamos la conexión a la base de datos
const db = require('../config/db');

// Creamos la tabla 'Pedido' si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS Pedido (
    id_pedido SERIAL PRIMARY KEY,  -- Identificador único del pedido
    id_cliente INTEGER REFERENCES Usuario(id_usuario) ON DELETE SET NULL,  -- Relación con Usuario (id_usuario)
    id_ruta INTEGER REFERENCES Ruta(id_ruta),  -- Relación con Ruta (id_ruta)
    id_camion INTEGER REFERENCES Camion(id_camion),  -- Relación con Camion (id_camion)
    id_conductor INTEGER REFERENCES Conductor(id_conductor),  -- Relación con Conductor (id_conductor)
    estado estado_pedido NOT NULL DEFAULT 'Pendiente',  -- Estado del pedido
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    fecha_entrega_estimada TIMESTAMP,  -- Fecha estimada de entrega
    fecha_entrega_real TIMESTAMP,  -- Fecha real de entrega
    observaciones TEXT,  -- Observaciones adicionales
    precio NUMERIC(10,2),  -- Precio del pedido
    nro_guia TEXT  -- Número de guía
  );
`)
.then(() => {
  console.log('✅ Tabla Pedido creada o verificada correctamente');
})
.catch((err) => {
  console.error('❌ Error al crear/verificar la tabla Pedido:', err);
});
