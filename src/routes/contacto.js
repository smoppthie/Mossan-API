const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

// Crear un nuevo contacto
router.post('/contacto', contactoController.crearContacto);

// Obtener todos los contactos
router.get('/contacto', contactoController.obtenerContactos);

// Obtener un contacto por id
router.get('/contacto/:id', contactoController.obtenerContactoPorId);

// Actualizar un contacto
router.put('/contacto/:id', contactoController.actualizarContacto);

// Eliminar un contacto
router.delete('/contacto/:id', contactoController.eliminarContacto);

module.exports = router;
