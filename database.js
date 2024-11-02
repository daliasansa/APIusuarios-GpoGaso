const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./usuarios.db', (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');

    // Crear la tabla de usuarios si no existe
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      direccion TEXT,
      telefono TEXT,
      genero TEXT,
      ocupacion TEXT
    )`, (err) => {
      if (err) {
        console.error('Error al crear la tabla:', err.message);
      }
    });
  }
});

module.exports = db;