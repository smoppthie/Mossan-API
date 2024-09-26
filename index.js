const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Cambia al puerto que desees
app.use(cors());

// Configuración avanzada para controlar qué orígenes, métodos y headers se permiten
const corsOptions = {
  origin: 'http://example.com/', // Reemplaza con el origen permitido
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
};

app.use(cors(corsOptions));

// Tu configuración de rutas
app.get('/', (req, res) => {
  res.send('CORS configurado correctamente');
});

app.listen(4000, () => {
  console.log('Servidor corriendo en el puerto 4000');
});

// Ruta de ejemplo
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

// Middleware para procesar JSON
app.use(express.json());

// Importar y utilizar las rutas
const productsRoutes = require('./routes/products');
app.use('/api', productsRoutes);

