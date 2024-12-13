// Importaciones
require('dotenv').config(); // Carga las variables de entorno desde .env
const express = require('express');
const cors = require('cors');
const path = require('path');
const mysqlPool = require('./config/bdSQL'); // Conexión a MySQL con mysql2
const connectToDatabase = require('./config/bd'); // Conexión a MongoDB
const cloudinaryRoutes = require('./routes/cloudinary'); // Ruta correcta al archivo de rutas de Cloudinary
const webpayRoutes = require('./routes/webpayRoutes'); // Rutas de Webpay

// Inicialización del servidor
const app = express();
const port = process.env.PORT || 4000;

// Rutas (Importar las rutas como router u objeto función)
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

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Conectar a MongoDB usando bd.js
    const mongoDb = await connectToDatabase();

    // Probar la conexión a MySQL
    const connection = await mysqlPool.getConnection();
    console.log('Conexión exitosa a MySQL');
    connection.release();

    // Rutas de la aplicación
    app.use('/api', clientsRoutes(mongoDb)); // Rutas de clientes (MongoDB)
    app.use('/api', productsRoutes); // Rutas de productos
    app.use('/api', administradorRoutes(mongoDb)); // Rutas de administrador (MongoDB)
    app.use('/api', contactoRoutes); // Rutas de contacto (MySQL con Sequelize)
    app.use('/api/cloudinary', cloudinaryRoutes); // Rutas para Cloudinary
    app.use('/api/webpay', webpayRoutes); // Rutas de Webpay

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
    console.error('Error al iniciar el servidor:', err);
  }
};

// Iniciar el servidor
startServer();
