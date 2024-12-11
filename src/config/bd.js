const { MongoClient } = require('mongodb');

// URL de conexión y configuración de la base de datos
const url = 'mongodb://localhost:27017'; // Dirección del servidor de MongoDB
const dbName = 'mossan_nosql'; // Nombre de la base de datos que quieres usar

// Crear un nuevo cliente MongoClient (sin useNewUrlParser y useUnifiedTopology)
const client = new MongoClient(url); // No se necesitan las opciones

async function connectToDatabase() {
  try {
    // Conectarse al servidor de MongoDB
    await client.connect();
    console.log('Conexión exitosa a la base de datos MongoDB');

    // Selecciona la base de datos (si no existe, se crea automáticamente cuando se usa)
    const db = client.db(dbName);
    
    // Retorna la base de datos para su uso en otras partes del código
    return db;
  } catch (err) {
    console.error('Error conectando a la base de datos:', err);
    throw err; // Lanza el error para que pueda manejarse en otros lugares
  }
}

// Exporta la función de conexión
module.exports = { connectToDatabase };
