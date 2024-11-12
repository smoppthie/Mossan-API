// Importaciones
const cors = require('cors');
const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb'); // Importa el cliente de MongoDB
const app = express();
const port = process.env.PORT || 4000;

// Rutas
const clientsRoutes = require('./routes/clientes');
const productsRoutes = require('./routes/products');
const administradorRoutes = require('./routes/administrador');
const contactoRoutes = require('./routes/contacto'); 

// Configuración avanzada de CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Aplicar CORS con opciones configuradas
app.use(cors(corsOptions));

// Middleware para procesar JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/uploads/test', (req, res) => {
  res.send('Ruta de archivos estáticos funciona');
});

// Conexión a MongoDB
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017'; // Cambia a tu URL de MongoDB si es necesario
const dbName = process.env.DB_NAME || 'mossan_nosql'; // Nombre de la base de datos

let db;

// Función para iniciar el servidor
const startServer = async () => {
  try {
    const client = await MongoClient.connect(url); // sin useNewUrlParser y useUnifiedTopology
    console.log('Conexión exitosa a MongoDB');
    db = client.db(dbName);

    // Pasar la conexión de la base de datos a las rutas
    app.use('/api', clientsRoutes(db)); // Rutas de clientes
    app.use('/api', productsRoutes(db)); // Rutas de productos
    app.use('/api', administradorRoutes(db)); // Rutas de administrador
    app.use('/api', contactoRoutes(db)); // Rutas de contacto (singular)

    // Ruta de bienvenida en el servidor
    app.get('/', (req, res) => {
      res.send('¡Bienvenido a la tienda de muebles Mossan!');
    });

    // Iniciar el servidor
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
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
  }
};

// Iniciar el servidor
startServer();
