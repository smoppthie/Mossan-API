// routes/administradores.js
const express = require('express');
const router = express.Router();
const administradoresController = require('../controllers/administradoresController');

module.exports = (db) => {
  // Obtener todos los administradores
  router.get('/administradores', administradoresController(db).getAllAdministrators);

  // Obtener un administrador por ID
  router.get('/administradores/:id_administrador', administradoresController(db).getAdministratorById);

  // Crear un nuevo administrador
  router.post('/administradores', administradoresController(db).createAdministrator);

  // Actualizar un administrador
  router.put('/administradores/:id_administrador', administradoresController(db).updateAdministrator);

  // Eliminar un administrador
  router.delete('/administradores/:id_administrador', administradoresController(db).deleteAdministrator);

  return router;
};
