// routes/clientes.js
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rutas para los clientes
router.get('/clientes', clientesController.getAllClients); // Obtener todos los clientes
router.get('/clientes/:id', clientesController.getClientById); // Obtener un cliente por ID
router.post('/clientes', clientesController.createClient); // Crear un nuevo cliente
router.put('/clientes/:id', clientesController.updateClient); // Actualizar un cliente existente
router.delete('/clientes/:id', clientesController.deleteClient); // Eliminar un cliente

module.exports = router;
