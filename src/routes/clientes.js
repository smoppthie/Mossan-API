// routes/clientes.js
const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientesController');

// Pasar la conexión a la base de datos al controlador
module.exports = (db) => {
  // Obtener todos los clientes
  router.get('/clientes', clientsController(db).getAllClients);

  // Obtener un cliente por id_cliente
  router.get('/clientes/:id_cliente', clientsController(db).getClientById); // Aquí usamos id_cliente

  // Crear un nuevo cliente
  router.post('/clientes', clientsController(db).createClient);

  // Actualizar un cliente
  router.put('/clientes/:id_cliente', clientsController(db).updateClient);

  // Eliminar un cliente
  router.delete('/clientes/:id_cliente', clientsController(db).deleteClient);

  return router;
};
