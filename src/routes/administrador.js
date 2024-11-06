// routes/administrador.js
const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administradorController');

module.exports = (db) => {
  // Obtener todos los administradores
  router.get('/administrador', administradorController(db).getAllAdministrators);

  // Obtener un administrador por rut
  router.get('/administrador/:rut', administradorController(db).getAdministratorByRut);

  // Crear un nuevo administrador
  router.post('/administrador', administradorController(db).createAdministrator);

  // Actualizar un administrador por rut
  router.put('/administrador/:rut', administradorController(db).updateAdministrator);

  // Eliminar un administrador por rut
  router.delete('/administrador/:rut', administradorController(db).deleteAdministrator);

  return router;
};
