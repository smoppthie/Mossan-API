const { MongoClient } = require('mongodb'); // Importar MongoClient

// Configuración de la URL de conexión y el nombre de la base de datos
const url = 'mongodb://localhost:27017';
const dbName = 'mossan_nosql';

let dbInstance; // Usamos esta variable para reutilizar la conexión

async function connectToDatabase() {
  if (!dbInstance) {
    const client = new MongoClient(url); // Crear cliente de MongoDB
    await client.connect(); // Conectar a MongoDB
    console.log('Conexión exitosa a la base de datos MongoDB');
    dbInstance = client.db(dbName); // Guardar la instancia de la base de datos para reutilizarla
  }
  return dbInstance; // Retornar la base de datos
}

module.exports = connectToDatabase; // ✅ Exportar la función
