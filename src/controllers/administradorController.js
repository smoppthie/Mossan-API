// controllers/administradoresController.js
const { ObjectId } = require('mongodb'); 

module.exports = (db) => {
  return {
    // Obtener todos los administradores
    getAllAdministrators: async (req, res) => {
      try {
        const administrators = await db.collection('administradores').find({}).toArray();
        res.json(administrators);
      } catch (err) {
        console.error('Error al obtener los administradores:', err);
        res.status(500).send('Error al obtener los administradores');
      }
    },

    // Obtener un administrador por ID
    getAdministratorById: async (req, res) => {
      const { id_administrador } = req.params;
      try {
        const administrator = await db.collection('administradores').findOne({ _id: ObjectId(id_administrador) });
        if (!administrator) {
          return res.status(404).send('Administrador no encontrado');
        }
        res.json(administrator);
      } catch (err) {
        console.error('Error al obtener el administrador:', err);
        res.status(500).send('Error al obtener el administrador');
      }
    },

    // Crear un nuevo administrador
    createAdministrator: async (req, res) => {
      const newAdministrator = req.body;
      try {
        const result = await db.collection('administradores').insertOne(newAdministrator);
        res.status(201).json({ message: 'Administrador creado exitosamente', administratorId: result.insertedId });
      } catch (err) {
        console.error('Error al crear el administrador:', err);
        res.status(500).send('Error al crear el administrador');
      }
    },

    // Actualizar un administrador
    updateAdministrator: async (req, res) => {
      const { id_administrador } = req.params;
      const updateData = req.body;
      try {
        const result = await db.collection('administradores').updateOne(
          { _id: ObjectId(id_administrador) },
          { $set: updateData }
        );
        if (result.matchedCount === 0) {
          return res.status(404).send('Administrador no encontrado');
        }
        res.json({ message: 'Administrador actualizado exitosamente' });
      } catch (err) {
        console.error('Error al actualizar el administrador:', err);
        res.status(500).send('Error al actualizar el administrador');
      }
    },

    // Eliminar un administrador
    deleteAdministrator: async (req, res) => {
      const { id_administrador } = req.params;
      try {
        const result = await db.collection('administradores').deleteOne({ _id: ObjectId(id_administrador) });
        if (result.deletedCount === 0) {
          return res.status(404).send('Administrador no encontrado');
        }
        res.json({ message: 'Administrador eliminado exitosamente' });
      } catch (err) {
        console.error('Error al eliminar el administrador:', err);
        res.status(500).send('Error al eliminar el administrador');
      }
    },
  };
};
