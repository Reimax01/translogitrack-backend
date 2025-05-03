const express = require("express");
const app = express();

// ✅ Middleware para procesar JSON, debe ir primero
app.use(express.json());

// Rutas de login
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// Rutas de pedidos
const pedidoRoutes = require('./routes/pedido.routes');
app.use('/api/pedidos', pedidoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});