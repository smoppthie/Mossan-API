const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Ruta para obtener productos filtrados
router.get('/productos', productsController.getFilteredProducts);

module.exports = router;
