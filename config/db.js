// config/db.js
// Importamos el módulo pg para manejar la conexión a PostgreSQL
const { Pool } = require("pg");

// Importamos dotenv para usar las variables de entorno desde el archivo .env
require("dotenv").config();

/**
 * Se crea una instancia de Pool, que maneja múltiples conexiones
 * de forma eficiente. Los parámetros de conexión se leen desde el archivo .env
 */
const pool = new Pool({
  user: process.env.DB_USER,       // Usuario de la base de datos (ej. postgres)
  host: process.env.DB_HOST,       // Dirección del servidor (ej. localhost)
  database: process.env.DB_NAME,   // Nombre de la base de datos (ej. translogitrack)
  password: process.env.DB_PASS,   // Password del usuario
  port: process.env.DB_PORT        // Puerto por defecto: 5432
});

// Exportamos el pool para utilizarlo en otras partes del proyecto
module.exports = pool;
