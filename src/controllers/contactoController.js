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
        const { nombre, email, tipo, mensaje } = req.body;
        const contactoCollection = db.collection('contacto'); // Referencia a la colección 'contacto'
        
        const nuevoContacto = { nombre, email, tipo, mensaje };
  
        try {
          // Insertar el nuevo contacto
          const result = await contactoCollection.insertOne(nuevoContacto);
  
          // Verificamos si se insertó correctamente
          if (result.insertedId) {
            // Buscar el documento insertado usando el insertedId
            const contactoCreado = await contactoCollection.findOne({ _id: result.insertedId });
  
            // Devolver el contacto recién creado
            res.status(201).json(contactoCreado);
          } else {
            // Si no se insertó correctamente, retornar un error
            res.status(400).json({ message: 'No se pudo crear el contacto' });
          }
  
        } catch (err) {
          console.error('Error al crear contacto:', err);
          res.status(500).json({ error: err.message });
        }
      },
  
      // Actualizar un contacto
      actualizarContacto: async (req, res) => {
        const { id } = req.params;
        const { nombre, email, tipo, mensaje } = req.body;
        const contactoCollection = db.collection('contacto');
        
        const updatedData = { nombre, email, tipo, mensaje };
  
        try {
          // Realizamos la actualización en la base de datos
          const result = await contactoCollection.updateOne(
            { _id: new db.ObjectId(id) },
            { $set: updatedData }
          );
  
          // Si no se encontró el contacto, retornar error
          if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
          }
  
          // Después de la actualización, podemos devolver el contacto actualizado
          const updatedContacto = await contactoCollection.findOne({ _id: new db.ObjectId(id) });
  
          // Responder con el contacto actualizado
          res.status(200).json(updatedContacto);
  
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
  
          // Si no se eliminó nada, retornamos un error
          if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
          }
  
          // Respuesta de éxito (sin contenido)
          res.status(204).send();
        } catch (err) {
          console.error('Error al eliminar contacto:', err);
          res.status(500).json({ error: err.message });
        }
      },
    };
  };
  