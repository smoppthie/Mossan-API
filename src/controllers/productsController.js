const connectToDatabase = require('../config/bd');
let db;

// Conectar a la base de datos
(async () => {
  db = await connectToDatabase();
  console.log('Base de datos inicializada correctamente:', db.databaseName);
})();

const getFilteredProducts = async (req, res) => {
  try {
    const { minPrice, maxPrice, material, tipo, color } = req.query;
    const query = {};

    // Filtrar por precio
    if (minPrice !== undefined && maxPrice !== undefined) {
      query.precio = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    }

    // Filtrar por material
    if (material && material.trim() !== '') {
      query.material = { $regex: material, $options: 'i' };
    }

    // Filtrar por tipo
    if (tipo && tipo.trim() !== '') {
      query.tipo = { $regex: tipo, $options: 'i' };
    }

    // Filtrar por color
    if (color && color.trim() !== '') {
      query.color = { $regex: color, $options: 'i' };
    }

    // Verificación de la conexión
    if (!db) {
      throw new Error('La conexión a la base de datos no está inicializada');
    }

    console.log('Consulta ejecutada con el query:', query);

    // Realizar la consulta a la base de datos
    const products = await db.collection('productos').find(query).toArray();

    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

module.exports = {
  getFilteredProducts
};
