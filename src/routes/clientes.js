// routes/clientes.js
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rutas para los clientes
router.get('/clientes', clientesController.getAllClients); // Obtener todos los clientes
router.get('/clientes/:id_cliente', clientesController.getClientById); // Obtener un cliente por id_cliente
router.post('/clientes', clientesController.createClient); // Crear un nuevo cliente
router.put('/clientes/:id_cliente', clientesController.updateClient); // Actualizar un cliente existente
router.delete('/clientes/:id_cliente', clientesController.deleteClient); // Eliminar un cliente

module.exports = router;
