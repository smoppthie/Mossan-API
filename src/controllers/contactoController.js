// controllers/contactoController.js
module.exports = (db) => {
    return {
      // Obtener todos los contactos
      obtenerContactos: async (req, res) => {
        const contactoCollection = db.collection('contacto');
        try {
          const contactos = await contactoCollection.find({}).toArray(); // Obtener todos los contactos
          if (contactos.length === 0) {
            return res.status(404).json({ message: 'No hay contactos disponibles' });
          }
          res.status(200).json(contactos); // Devuelve todos los contactos
        } catch (err) {
          console.error('Error al obtener contactos:', err);
          res.status(500).json({ error: err.message });
        }
      },
  
      // Obtener un contacto por id
      obtenerContactoPorId: async (req, res) => {
        const { id } = req.params;
        const contactoCollection = db.collection('contacto');
        
        try {
          const contacto = await contactoCollection.findOne({ _id: new db.ObjectId(id) });
          if (!contacto) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
          }
          res.status(200).json(contacto); // Devuelve el contacto encontrado
        } catch (err) {
          console.error('Error al obtener contacto por id:', err);
          res.status(500).json({ error: err.message });
        }
      },
  
      // Crear un nuevo contacto
      crearContacto: async (req, res) => {
        const { nombre, telefono, email } = req.body;
        const contactoCollection = db.collection('contacto'); // Referencia a la colección 'contacto'
        
        const nuevoContacto = { nombre, telefono, email };
        try {
          const result = await contactoCollection.insertOne(nuevoContacto);
          res.status(201).json(result.ops[0]); // Devuelve el contacto recién creado
        } catch (err) {
          console.error('Error al crear contacto:', err);
          res.status(500).json({ error: err.message });
        }
      },
  
      // Actualizar un contacto
      actualizarContacto: async (req, res) => {
        const { id } = req.params;
        const { nombre, telefono, email } = req.body;
        const contactoCollection = db.collection('contacto');
        
        const updatedData = { nombre, telefono, email };
        
        try {
          const result = await contactoCollection.updateOne(
            { _id: new db.ObjectId(id) }, 
            { $set: updatedData }
          );
          if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
          }
          res.status(200).json({ message: 'Contacto actualizado' }); // Respuesta de éxito
        } catch (err) {
          console.error('Error al actualizar contacto:', err);
          res.status(500).json({ error: err.message });
        }
      },
    
      // Eliminar un contacto
      eliminarContacto: async (req, res) => {
        const { id } = req.params;
        const contactoCollection = db.collection('contacto');
        
        try {
          const result = await contactoCollection.deleteOne({ _id: new db.ObjectId(id) });
          if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
          }
          res.status(204).send(); // Respuesta de éxito, sin contenido
        } catch (err) {
          console.error('Error al eliminar contacto:', err);
          res.status(500).json({ error: err.message });
        }
      },
    };
  };
  