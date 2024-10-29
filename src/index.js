const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000; // Cambia al puerto que desees
const clientsRoutes = require('../src/routes/clientes.js');
const productsRoutes = require('./routes/products');

// Configuración avanzada de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Cambia al origen de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
};

// Aplicar CORS con opciones configuradas
app.use(cors(corsOptions));

// Middleware para procesar JSON
app.use(express.json());

// Rutas de la API
app.use('/api', clientsRoutes);
app.use('/api', productsRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la tienda de muebles Mossan!');
});

// Iniciar el servidor con manejo de errores
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`El puerto ${port} está en uso. Intenta con otro puerto.`);
  } else {
    console.error(err);
  }
});
