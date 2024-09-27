const express = require('express');
const router = express.Router();
const db = require('../bd');
const productsController = require('../controllers/productsController');


// Rutas para los productos
router.get('/products', productsController.getAllProducts); // Obtener todos los productos
router.get('/products/:id_producto', productsController.getProductById); // Obtener un producto por ID
router.post('/products', productsController.createProduct); // Crear un nuevo producto
router.put('/products/:id_producto', productsController.updateProduct); // Actualizar un producto existente
router.delete('/products/:id_producto', productsController.deleteProduct); // Eliminar un producto

module.exports = router;
