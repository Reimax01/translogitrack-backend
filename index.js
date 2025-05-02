const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");

app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
