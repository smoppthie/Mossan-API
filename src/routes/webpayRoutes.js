const express = require('express');
const { initTransaction, confirmTransaction } = require('../controllers/webpayController');
const router = express.Router();

// Ruta para iniciar una transacción
router.post('/init', initTransaction);

// Ruta para confirmar una transacción
router.post('/confirm', confirmTransaction);

module.exports = router;
