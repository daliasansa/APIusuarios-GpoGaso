const db = require('../database');
// Variable para contar ejecuciones
let contadorEjecuciones = 0;

// Middleware que incrementa el contador en cada llamada a cualquier endpoint
exports.incrementarContador = (req, res, next) => {
  contadorEjecuciones += 1;
  next();
};

// Función para obtener el valor del contador
exports.contarEjecuciones = (req, res) => {
  res.send(`La API ha sido llamada ${contadorEjecuciones} veces.`);
};

// Crear usuario con validaciones
exports.createUser = (req, res) => {
  const { nombre, email, direccion, telefono, genero, ocupacion } = req.body;

  // Validar campos obligatorios
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y correo son requeridos' });
  }

  // Verificar si el correo ya existe en la base de datos
  const emailQuery = `SELECT * FROM usuarios WHERE email = ?`;
  db.get(emailQuery, [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error al verificar el correo' });
    }
    if (row) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Insertar el nuevo usuario si el correo no existe
    const query = `INSERT INTO usuarios (nombre, email, direccion, telefono, genero, ocupacion)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [nombre, email, direccion, telefono, genero, ocupacion], function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error al crear el usuario' });
      }
      res.status(201).json({
        id: this.lastID,
        nombre,
        email,
        direccion,
        telefono,
        genero,
        ocupacion
      });
    });
  });
};

// Obtener todos los usuarios
exports.getUsers = (req, res) => {
  db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
    res.json(rows);
  });
};

// Obtener usuario por ID
exports.getUserById = (req, res) => {
  const query = `SELECT * FROM usuarios WHERE id = ?`;
  db.get(query, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el usuario' });
    if (!row) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(row);
  });
};

// Actualizar usuario
exports.updateUser = (req, res) => {
  const { nombre, email, direccion, telefono, genero, ocupacion } = req.body;
  const query = `UPDATE usuarios SET nombre = ?, email = ?, direccion = ?, telefono = ?, genero = ?, ocupacion = ? WHERE id = ?`;

  db.run(query, [nombre, email, direccion, telefono, genero, ocupacion, req.params.id], function (err) {
    if (err) return res.status(400).json({ error: 'Error al actualizar el usuario o correo ya registrado' });
    if (this.changes === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ id: req.params.id, nombre, email, direccion, telefono, genero, ocupacion });
  });
};

// Eliminar usuario
exports.deleteUser = (req, res) => {
  const query = `DELETE FROM usuarios WHERE id = ?`;
  db.run(query, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
    if (this.changes === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(204).send();
  });
};
