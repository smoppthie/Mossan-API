// routes/contacto.js
const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

// Pasar la conexión a la base de datos al controlador
module.exports = (db) => {
  // Crear un nuevo contacto
  router.post('/contacto', contactoController(db).crearContacto);

  // Obtener el contacto
  router.get('/contacto', contactoController(db).obtenerContactos);

  // Obtener un contacto por id
  router.get('/contacto/:id', contactoController(db).obtenerContactoPorId);

  // Actualizar un contacto
  router.put('/contacto/:id', contactoController(db).actualizarContacto);

  // Eliminar un contacto
  router.delete('/contacto/:id', contactoController(db).eliminarContacto);

  return router;
};
