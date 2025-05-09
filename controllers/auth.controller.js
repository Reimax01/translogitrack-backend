const bcrypt = require("bcrypt");              // Para encriptar passwords
const jwt = require("jsonwebtoken");           // Para generar tokens JWT
const pool = require("../config/db");          // Conexión a la base de datos
require("dotenv").config();                    // Cargar variables del archivo .env

/**
 * Controlador para registrar un nuevo usuario.
 * Recibe: nombre, email, password, rol.
 * Encripta la password antes de guardar.
 */
exports.register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  // Validación de rol
  const rolesPermitidos = ['Administrador', 'Operador', 'Cliente'];
  if (!rolesPermitidos.includes(rol)) {
    return res.status(400).json({ error: "Rol no válido" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptar password con 10 saltos
    const result = await pool.query(
      "INSERT INTO Usuario (nombre_completo, correo_electronico, contrasena_hash, rol) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, email, hashedPassword, rol]
    );
    res.status(201).json({ mensaje: "Usuario registrado", usuario: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Error en el registro", detalle: error.message });
  }
};

/**
 * Controlador para inicio de sesión.
 * Verifica email y password, y genera un token JWT.
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM Usuario WHERE correo_electronico = $1", [email]);
    const usuario = result.rows[0];

    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    const passwordMatch = await bcrypt.compare(password, usuario.contrasena_hash);
    if (!passwordMatch)
      return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario.id_usuario, rol: usuario.rol }, // Asegúrate de usar el nombre correcto del campo
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expira en 1 hora
    );

    res.json({ mensaje: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ error: "Error en el login", detalle: error.message });
  }
};
