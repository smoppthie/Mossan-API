exports.getAllProducts = (req, res) => {
    // Simulación de datos de productos
    const products = [
      { id_producto: 1, name: 'Mesa de comedor', price: 60.000 },
      { id_producto: 2, name: 'Silla de comedor', price: 15.000 }
    ];
    res.json(products);
  };
  
  const db = require('../bd'); // Importar la conexión a la base de datos

exports.getAllProducts = (req, res) => {
  // Ejecutar una consulta SQL para obtener los productos
  const query = 'SELECT * FROM productos';  

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta', err);
      res.status(500).send('Error al obtener los productos');
    } else {
      res.json(results);
    }
  });
};

// Obtener un producto por ID
exports.getProductById = (req, res) => {
  const { id_producto } = req.params;
  db.query('SELECT * FROM productos WHERE id_producto = ?', [id_producto], (err, results) => {
    if (err) {
      console.error('Error al obtener el producto:', err);
      return res.status(500).json({ error: 'Error al obtener el producto' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(results[0]);
  });
};

// Crear un nuevo producto
exports.createProduct = (req, res) => {
  const { nombre, tipo, material, altura, ancho, profundidad, color, precio } = req.body; 
  
  db.query(
    'INSERT INTO productos (nombre, tipo, material, altura, ancho, profundidad, color, precio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', // Solo los tres campos que existen en la tabla
    [nombre, tipo, material, altura, ancho, profundidad, color, precio], // Solo pasamos nombre, precio y descripcion
    (err, result) => {
      if (err) {
        console.error('Error al crear el producto:', err);
        return res.status(500).json({ error: 'Error al crear el producto' });
      }
      res.status(201).json({ message: 'Producto creado exitosamente', id_producto: result.insertId });
    }
  );
};

// Actualizar un producto
exports.updateProduct = (req, res) => {
  const { id_producto } = req.params; // Obtenemos el ID del producto desde la URL
  const { nombre, tipo, material, altura, ancho, profundidad, color, descripcion, precio } = req.body; // Datos que vamos a actualizar

  db.query(
    'UPDATE productos SET nombre = ?, tipo = ?, material = ?, altura = ?, ancho = ?, profundidad = ?, color = ?, descripcion = ?, precio = ? WHERE id_producto = ?',
    [nombre, tipo, material, altura, ancho, profundidad, color, descripcion, precio, id_producto],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar el producto:', err);
        return res.status(500).json({ error: 'Error al actualizar el producto' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto actualizado exitosamente' });
    }
  );
};


// Eliminar un producto
exports.deleteProduct = (req, res) => {
  const { id_producto } = req.params;
  db.query('DELETE FROM productos WHERE id_producto = ?', [id_producto], (err, result) => {
    if (err) {
      console.error('Error al eliminar el producto:', err);
      return res.status(500).json({ error: 'Error al eliminar el producto' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado exitosamente' });
  });
};