const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Cargar variables de entorno

// Inicializamos la aplicación de Express
const app = express();

// Middleware
app.use(cors()); // Habilitar CORS (opcional, si usas un frontend separado)
app.use(express.json()); // Procesar JSON de las solicitudes entrantes

// Importación de rutas
const authRoutes = require("./routes/auth.routes");
const pedidoRoutes = require("./routes/pedido.routes");
const adminRoutes = require("./routes/admin.routes"); 
const conductorRoutes = require("./routes/conductor.routes");
const camionRoutes = require("./routes/camion.routes");

// Importar middleware global de manejo de errores
const errorHandler = require("./middleware/errorHandler");

// Rutas principales
app.use("/api/auth", authRoutes);            // Rutas de autenticación
app.use("/api/pedidos", pedidoRoutes);       // Rutas de pedidos
app.use("/api/admin", adminRoutes);          // Rutas de administración protegidas
app.use("/api/conductores", conductorRoutes); // Rutas de gestión de conductores
app.use("/api/camiones", camionRoutes);       // Rutas de gestión de camiones

// Ruta raíz para comprobar que la API está funcionando
app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente");
});

// Middleware de manejo de errores global (al final, después de las rutas)
app.use(errorHandler);

// Configuramos el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
