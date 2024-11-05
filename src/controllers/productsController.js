// controllers/productsController.js
const { ObjectId } = require('mongodb');

module.exports = (db) => {
  return {
    // Obtener todos los productos
    getAllProducts: async (req, res) => {
      try {
        const products = await db.collection('productos').find({}).toArray();
        res.json(products);
      } catch (err) {
        console.error('Error al obtener los productos:', err);
        res.status(500).send('Error al obtener los productos');
      }
    },

    // Obtener un producto por id_producto
    getProductById: async (req, res) => {
      const { id_producto } = req.params; // Ahora tomamos id_producto de la URL
      try {
        const product = await db.collection('productos').findOne({ id_producto: parseInt(id_producto) }); // Buscamos usando id_producto
        if (!product) {
          return res.status(404).send('Producto no encontrado');
        }
        res.json(product);
      } catch (err) {
        console.error('Error al obtener el producto:', err);
        res.status(500).send('Error al obtener el producto');
      }
    },

    // Crear un nuevo producto
    createProduct: async (req, res) => {
      const newProduct = req.body;
      try {
        const result = await db.collection('productos').insertOne(newProduct);
        res.status(201).json({ message: 'Producto creado exitosamente', productId: result.insertedId });
      } catch (err) {
        console.error('Error al crear el producto:', err);
        res.status(500).send('Error al crear el producto');
      }
    },

    // Actualizar un producto
    updateProduct: async (req, res) => {
      const { id_producto } = req.params;
      const updateData = req.body;
      try {
        const result = await db.collection('productos').updateOne(
          { id_producto: parseInt(id_producto) }, // Buscamos usando id_producto
          { $set: updateData }
        );
        if (result.matchedCount === 0) {
          return res.status(404).send('Producto no encontrado');
        }
        res.json({ message: 'Producto actualizado exitosamente' });
      } catch (err) {
        console.error('Error al actualizar el producto:', err);
        res.status(500).send('Error al actualizar el producto');
      }
    },

    // Eliminar un producto
    deleteProduct: async (req, res) => {
      const { id_producto } = req.params;
      try {
        const result = await db.collection('productos').deleteOne({ id_producto: parseInt(id_producto) }); // Buscamos usando id_producto
        if (result.deletedCount === 0) {
          return res.status(404).send('Producto no encontrado');
        }
        res.json({ message: 'Producto eliminado exitosamente' });
      } catch (err) {
        console.error('Error al eliminar el producto:', err);
        res.status(500).send('Error al eliminar el producto');
      }
    },
  };
};
