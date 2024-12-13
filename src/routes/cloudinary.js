const express = require('express');
const router = express.Router();
const { listarImagenes } = require('../controllers/cloudinaryController'); // Importa la función correctamente

// Ruta para listar imágenes
router.get('/imagenes', listarImagenes); // Usa la función exportada como callback

module.exports = router;
 
console.log(listarImagenes); // Debería mostrar la función. Si es "undefined", hay un problema en la exportación/importación
