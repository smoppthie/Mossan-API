// controllers/clientesController.js
const { ObjectId } = require('mongodb'); // Importa ObjectId si aún lo necesitas para otras operaciones

module.exports = (db) => {
  return {
    // Obtener todos los clientes
    getAllClients: async (req, res) => {
      try {
        const clients = await db.collection('clientes').find({}).toArray(); // Obtiene todos los clientes
        res.json(clients);
      } catch (err) {
        console.error('Error al obtener los clientes:', err);
        res.status(500).send('Error al obtener los clientes');
      }
    },

    // Obtener un cliente por id_cliente
    getClientById: async (req, res) => {
      const { id_cliente } = req.params; // Ahora tomamos id_cliente de la URL
      try {
        const client = await db.collection('clientes').findOne({ id_cliente: parseInt(id_cliente) }); // Busca usando id_cliente
        if (!client) {
          return res.status(404).send('Cliente no encontrado');
        }
        res.json(client);
      } catch (err) {
        console.error('Error al obtener el cliente:', err);
        res.status(500).send('Error al obtener el cliente');
      }
    },

    // Crear un nuevo cliente
    createClient: async (req, res) => {
      const newClient = req.body;
      try {
        const result = await db.collection('clientes').insertOne(newClient);
        res.status(201).json({ message: 'Cliente creado exitosamente', clientId: result.insertedId });
      } catch (err) {
        console.error('Error al crear el cliente:', err);
        res.status(500).send('Error al crear el cliente');
      }
    },

    // Actualizar un cliente
    updateClient: async (req, res) => {
      const { id_cliente } = req.params;
      const updateData = req.body;
      try {
        const result = await db.collection('clientes').updateOne(
          { id_cliente: parseInt(id_cliente) }, // Busca usando id_cliente
          { $set: updateData }
        );
        if (result.matchedCount === 0) {
          return res.status(404).send('Cliente no encontrado');
        }
        res.json({ message: 'Cliente actualizado exitosamente' });
      } catch (err) {
        console.error('Error al actualizar el cliente:', err);
        res.status(500).send('Error al actualizar el cliente');
      }
    },

    // Eliminar un cliente
    deleteClient: async (req, res) => {
      const { id_cliente } = req.params;
      try {
        const result = await db.collection('clientes').deleteOne({ id_cliente: parseInt(id_cliente) }); // Busca usando id_cliente
        if (result.deletedCount === 0) {
          return res.status(404).send('Cliente no encontrado');
        }
        res.json({ message: 'Cliente eliminado exitosamente' });
      } catch (err) {
        console.error('Error al eliminar el cliente:', err);
        res.status(500).send('Error al eliminar el cliente');
      }
    },
  };
};
