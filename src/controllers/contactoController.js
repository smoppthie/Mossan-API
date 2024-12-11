const {
  obtenerContactos,
  obtenerContactoPorId,
  crearContacto,
  actualizarContacto,
  eliminarContacto
} = require('../models/contact');

module.exports = {
  // Obtener todos los contactos
  obtenerContactos: async (req, res) => {
    try {
      const contactos = await obtenerContactos();
      res.status(200).json(contactos);
    } catch (err) {
      console.error('Error al obtener contactos:', err);
      res.status(500).json({ error: err.message });
    }
  },

  // Obtener un contacto por id
  obtenerContactoPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const contacto = await obtenerContactoPorId(id);
      if (!contacto) {
        return res.status(404).json({ message: 'Contacto no encontrado' });
      }
      res.status(200).json(contacto);
    } catch (err) {
      console.error('Error al obtener contacto por id:', err);
      res.status(500).json({ error: err.message });
    }
  },

  // Crear un nuevo contacto
  crearContacto: async (req, res) => {
    const { nombre, email, tipo, mensaje } = req.body;
    try {
      const nuevoContacto = await crearContacto({ nombre, email, tipo, mensaje });
      res.status(201).json(nuevoContacto);
    } catch (err) {
      console.error('Error al crear contacto:', err);
      res.status(500).json({ error: err.message });
    }
  },

  // Actualizar un contacto
  actualizarContacto: async (req, res) => {
    const { id } = req.params;
    const { nombre, email, tipo, mensaje } = req.body;
    try {
      const actualizado = await actualizarContacto(id, { nombre, email, tipo, mensaje });
      if (!actualizado) {
        return res.status(404).json({ message: 'Contacto no encontrado' });
      }
      res.status(200).json({ message: 'Contacto actualizado con éxito' });
    } catch (err) {
      console.error('Error al actualizar contacto:', err);
      res.status(500).json({ error: err.message });
    }
  },

  // Eliminar un contacto
  eliminarContacto: async (req, res) => {
    const { id } = req.params;
    try {
      const eliminado = await eliminarContacto(id);
      if (!eliminado) {
        return res.status(404).json({ message: 'Contacto no encontrado' });
      }
      res.status(204).send();
    } catch (err) {
      console.error('Error al eliminar contacto:', err);
      res.status(500).json({ error: err.message });
    }
  }
};
