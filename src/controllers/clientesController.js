// controllers/clientesController.js

const db = require('../bd'); // Importar la conexión a la base de datos

// Obtener todos los clientes
exports.getAllClients = (req, res) => {
  const query = 'SELECT * FROM clientes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta', err);
      res.status(500).send('Error al obtener los clientes');
    } else {
      res.json(results);
    }
  });
};

// Obtener un cliente por id_cliente
exports.getClientById = (req, res) => {
  const { id_cliente } = req.params;
  db.query('SELECT * FROM clientes WHERE id_cliente = ?', [id_cliente], (err, results) => {
    if (err) {
      console.error('Error al obtener el cliente:', err);
      return res.status(500).json({ error: 'Error al obtener el cliente' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(results[0]);
  });
};

// Crear un nuevo cliente
exports.createClient = (req, res) => {
  const { nombre, rut, direccion, comuna, region, apellido, correo, numero_cliente } = req.body;

  db.query(
    'INSERT INTO clientes (nombre, rut, direccion, comuna, region, apellido, correo, numero_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre, rut, direccion, comuna, region, apellido, correo, numero_cliente],
    (err, result) => {
      if (err) {
        console.error('Error al crear el cliente:', err);
        return res.status(500).json({ error: 'Error al crear el cliente' });
      }
      res.status(201).json({ message: 'Cliente creado exitosamente', id_cliente: result.insertId });
    }
  );
};

// Actualizar un cliente
exports.updateClient = (req, res) => {
  const { id_cliente } = req.params;
  const { nombre, rut, direccion, comuna, region, apellido, correo, numero_cliente } = req.body;

  db.query(
    'UPDATE clientes SET nombre = ?, rut = ?, direccion = ?, comuna = ?, region = ?, apellido = ?, correo = ?, numero_cliente = ? WHERE id_cliente = ?',
    [nombre, rut, direccion, comuna, region, apellido, correo, numero_cliente, id_cliente],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar el cliente:', err);
        return res.status(500).json({ error: 'Error al actualizar el cliente' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.json({ message: 'Cliente actualizado exitosamente' });
    }
  );
};

// Eliminar un cliente
exports.deleteClient = (req, res) => {
  const { id_cliente } = req.params;
  db.query('DELETE FROM clientes WHERE id_cliente = ?', [id_cliente], (err, result) => {
    if (err) {
      console.error('Error al eliminar el cliente:', err);
      return res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente eliminado exitosamente' });
  });
};
