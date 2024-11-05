// routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Pasar la conexión a la base de datos al controlador
module.exports = (db) => {
  // Obtener todos los productos
  router.get('/productos', productsController(db).getAllProducts);

  // Obtener un producto por id_producto
  router.get('/productos/:id_producto', productsController(db).getProductById); // Aquí usamos id_producto

  // Crear un nuevo producto
  router.post('/productos', productsController(db).createProduct);

  // Actualizar un producto
  router.put('/productos/:id_producto', productsController(db).updateProduct);

  // Eliminar un producto
  router.delete('/productos/:id_producto', productsController(db).deleteProduct);

  return router;
};
