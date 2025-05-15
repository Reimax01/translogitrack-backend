const bcrypt = require("bcrypt");              // Librería para encriptar contraseñas
const jwt = require("jsonwebtoken");           // Para generar y verificar tokens JWT
const pool = require("../config/db");          // Conexión al pool de PostgreSQL
require("dotenv").config();                    // Cargar variables del entorno (.env)

// Roles válidos permitidos para registro
const rolesPermitidos = ["Administrador", "Operador", "Cliente"];

/**
 * Controlador para registrar un nuevo usuario.
 * - Verifica que todos los campos estén presentes
 * - Valida que el rol sea permitido
 * - Verifica que el correo no esté ya registrado
 * - Encripta la contraseña
 * - Guarda el usuario en la base de datos
 */
exports.register = async (req, res, next) => {
  const { nombre, email, password, rol } = req.body;

  // Validación de campos obligatorios
  if (!nombre || !email || !password || !rol) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Validación del rol
  if (!rolesPermitidos.includes(rol)) {
    return res.status(400).json({ error: "Rol no válido" });
  }

  try {
    // Verificar si el correo ya existe
    const existe = await pool.query(
      "SELECT 1 FROM Usuario WHERE correo_electronico = $1",
      [email]
    );

    if (existe.rowCount > 0) {
      return res.status(409).json({ error: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    const result = await pool.query(
      `INSERT INTO Usuario (nombre_completo, correo_electronico, contrasena_hash, rol)
       VALUES ($1, $2, $3, $4)
       RETURNING id_usuario, nombre_completo, correo_electronico, rol`,
      [nombre, email, hashedPassword, rol]
    );

    // Responder con éxito
    res.status(201).json({
      mensaje: "Usuario registrado",
      usuario: result.rows[0],
    });

  } catch (error) {
    next(error); // Delegar el error al middleware global
  }
};

/**
 * Controlador para el inicio de sesión.
 * - Verifica que email y password estén presentes
 * - Busca al usuario por email
 * - Compara la contraseña ingresada con la encriptada
 * - Si es correcta, genera y devuelve un token JWT
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validar campos
  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  try {
    // Buscar usuario por email
    const result = await pool.query(
      "SELECT * FROM Usuario WHERE correo_electronico = $1",
      [email]
    );
    const usuario = result.rows[0];

    // Si no existe
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Comparar contraseñas
    const coincide = await bcrypt.compare(password, usuario.contrasena_hash);
    if (!coincide) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id_usuario, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respuesta de éxito
    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre_completo,
        correo: usuario.correo_electronico,
        rol: usuario.rol,
      },
    });

  } catch (error) {
    next(error); // Manejar error globalmente
  }
};
