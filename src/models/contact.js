const pool = require('../config/bdSQL');

// Obtener todos los contactos
const obtenerContactos = async () => {
  const [result] = await pool.query('SELECT * FROM contactos');
  return result;
};

// Obtener un contacto por id
const obtenerContactoPorId = async (id) => {
  const [result] = await pool.query('SELECT * FROM contactos WHERE id = ?', [id]);
  return result[0]; // Devolver solo el primer resultado
};

// Crear un nuevo contacto
const crearContacto = async ({ nombre, email, tipo, mensaje }) => {
  const [result] = await pool.query(
    'INSERT INTO contactos (nombre, email, tipo, mensaje) VALUES (?, ?, ?, ?)', 
    [nombre, email, tipo, mensaje]
  );
  return { id: result.insertId, nombre, email, tipo, mensaje };
};

// Actualizar un contacto
const actualizarContacto = async (id, { nombre, email, tipo, mensaje }) => {
  const [result] = await pool.query(
    'UPDATE contactos SET nombre = ?, email = ?, tipo = ?, mensaje = ? WHERE id = ?',
    [nombre, email, tipo, mensaje, id]
  );
  return result.affectedRows > 0;
};

// Eliminar un contacto
const eliminarContacto = async (id) => {
  const [result] = await pool.query('DELETE FROM contactos WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  obtenerContactos,
  obtenerContactoPorId,
  crearContacto,
  actualizarContacto,
  eliminarContacto
};
