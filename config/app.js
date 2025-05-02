const pool = require('./config/db');

pool.query('SELECT NOW()',(err, res) => {
    if (err) {
        console.error('Error de conexión con la base de datos:', err);
      } else {
        console.log('Conexión exitosa:', res.rows[0]);
      }
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

