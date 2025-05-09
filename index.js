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
const adminRoutes = require("./routes/admin.routes"); // Rutas de administración

// Rutas principales
app.use("/api/auth", authRoutes);      // Rutas de autenticación
app.use("/api/pedidos", pedidoRoutes); // Rutas de pedidos
app.use("/api/admin", adminRoutes);    // Rutas de administración protegidas

// Ruta raíz para comprobar que la API está funcionando
app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente");
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err); // Log del error para debug
  res.status(500).json({ error: "Algo salió mal, por favor intente nuevamente." }); // Respuesta genérica de error
});

// Configuramos el puerto de la aplicación (si no hay valor en las variables de entorno, usamos el puerto 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
