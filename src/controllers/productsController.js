// controllers/productsController.js
const ProductModel = require('../models/product');

module.exports = (db) => {
  return {
    // Obtener todos los productos
    getAllProducts: async (req, res) => {
      const sortOption = req.query.sort === 'asc' ? 1 : -1; // ascendente o descendente
      try {
        const products = await db.collection('productos')
          .find({})
          .sort({ precio: sortOption }) // Ordenar por precio
          .toArray();
        res.json(products);
      } catch (err) {
        console.error('Error al obtener productos:', err);
        res.status(500).send('Error al obtener productos');
      }
    },

    updateQuantity: async (req, res) => {
      const { productUpdates } = req.body; // Array con los productos y la cantidad comprada

      try {
        // Usamos una transacción para asegurar que todas las actualizaciones son atómicas
        const transaction = await db.transaction();

        for (let i = 0; i < productUpdates.length; i++) {
          const { id_producto, quantity } = productUpdates[i];

          // Obtener el producto
          const product = await db('productos').where('id_producto', id_producto).first();

          if (!product) {
            throw new Error(`Producto con ID ${id_producto} no encontrado`);
          }

          // Verificar que haya suficiente stock
          if (product.stock < quantity) {
            throw new Error(`No hay suficiente stock para el producto con ID ${id_producto}`);
          }

          // Actualizar el stock de productos
          await db('productos')
            .where('id_producto', id_producto)
            .update({
              stock: product.stock - quantity, // Restamos la cantidad comprada
            });
        }

        // Confirmar la transacción
        await transaction.commit();
        res.status(200).json({ message: 'Compra procesada correctamente y stock actualizado.' });
      } catch (error) {
        // Si ocurre algún error, revertimos la transacción
        await transaction.rollback();
        res.status(500).json({ error: 'Error al procesar la compra: ' + error.message });
      }
    },
    
    updateProductQuantity: async (req, res) => {
      const { productUpdates } = req.body; // Este es el array de productos con las cantidades compradas

      try {
        // Usamos una transacción para asegurarnos de que las actualizaciones son atómicas
        const transaction = await db.transaction();

        for (let i = 0; i < productUpdates.length; i++) {
          const { id_producto, quantity } = productUpdates[i];

          // Buscamos el producto
          const product = await db('productos').where('id_producto', id_producto).first();

          if (!product) {
            throw new Error(`Producto con ID ${id_producto} no encontrado`);
          }

          // Verificamos que haya suficiente stock
          if (product.stock < quantity) {
            throw new Error(`No hay suficiente stock para el producto con ID ${id_producto}`);
          }

          // Actualizamos el stock
          await db('productos')
            .where('id_producto', id_producto)
            .update({
              stock: product.stock - quantity, // Restamos la cantidad comprada
            });
        }

        // Si todo sale bien, confirmamos la transacción
        await transaction.commit();
        res.status(200).json({ message: 'Productos actualizados correctamente' });
      } catch (error) {
        // Si algo sale mal, revertimos la transacción
        await transaction.rollback();
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar los productos: ' + error.message });
      }
    },
      
    // Obtener un producto por id_producto
    getProductById: async (req, res) => {
      const { id_producto } = req.params;
    
      // Asegúrate de que id_producto sea un entero
      const parsedId = parseInt(id_producto, 10);  // Parseamos el id a entero con base 10
    
      if (isNaN(parsedId)) {
        return res.status(400).send('El id_producto debe ser un número válido');
      }
    
      try {
        const product = await db.collection('productos').findOne({ id_producto: parsedId });
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

      // Validación del producto
      try {
        ProductModel.validateProduct(newProduct);
      } catch (err) {
        return res.status(400).send(err.message); // Si no pasa la validación, enviamos error
      }

      try {
        const result = await db.collection('productos').insertOne(newProduct);
        res.status(201).json({ 
          message: 'Producto creado exitosamente', 
          productId: result.insertedId 
        });
      } catch (err) {
        console.error('Error al crear el producto:', err);
        res.status(500).send('Error al crear el producto');
      }
    },

    // Actualizar un producto
    updateProduct: async (req, res) => {
      const { id_producto } = req.params;
      const updateData = req.body;

      // Validación del producto
      try {
        ProductModel.validateProduct(updateData);
      } catch (err) {
        return res.status(400).send(err.message); // Si no pasa la validación, enviamos error
      }

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
        const result = await db.collection('productos').deleteOne({ id_producto: parseInt(id_producto) });
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
