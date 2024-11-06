const { ObjectId } = require('mongodb'); 

module.exports = (db) => {
  return {
    // Obtener todos los administradores
    getAllAdministrators: async (req, res) => {
      try {
        const administrators = await db.collection('administrador').find({}).toArray();
        res.json(administrators);
      } catch (err) {
        console.error('Error al obtener los administradores:', err);
        res.status(500).send('Error al obtener los administradores');
      }
    },

    // Obtener un administrador por rut
    getAdministratorByRut: async (req, res) => {
      const { rut } = req.params;
      try {
        // Busca el administrador usando el campo `rut`
        const administrator = await db.collection('administrador').findOne({ rut: parseInt(rut) });
        
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
      const { nombre, apellido, rut, numero_telefonico, correo } = req.body;
      const newAdministrator = {
        nombre,
        apellido,
        rut: parseInt(rut),
        numero_telefonico: parseInt(numero_telefonico),
        correo,
      };
      
      try {
        const result = await db.collection('administrador').insertOne(newAdministrator);
        res.status(201).json({ message: 'Administrador creado exitosamente', administratorId: result.insertedId });
      } catch (err) {
        console.error('Error al crear el administrador:', err);
        res.status(500).send('Error al crear el administrador');
      }
    },

    // Actualizar un administrador por su rut
    updateAdministrator: async (req, res) => {
      const { rut } = req.params;
      const { nombre, apellido, numero_telefonico, correo } = req.body;
      const updateData = {
        ...(nombre && { nombre }),
        ...(apellido && { apellido }),
        ...(numero_telefonico && { numero_telefonico: parseInt(numero_telefonico) }),
        ...(correo && { correo })
      };
      
      try {
        const result = await db.collection('administrador').updateOne(
          { rut: parseInt(rut) },
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

    // Eliminar un administrador por su rut
    deleteAdministrator: async (req, res) => {
      const { rut } = req.params;
      try {
        const result = await db.collection('administrador').deleteOne({ rut: parseInt(rut) });
        
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
