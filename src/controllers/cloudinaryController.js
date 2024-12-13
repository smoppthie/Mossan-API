const cloudinary = require('../config/cloudinary');

const listarImagenes = async (req, res) => {
  try {
    const resultado = await cloudinary.api.resources({
      type: 'upload', // No usar "prefix" para listar todas las imágenes
    });

    console.log(resultado); // Imprime el resultado para verificar qué devuelve Cloudinary

    const urls = resultado.resources.map((img) => img.secure_url); // Extraer URLs
    res.status(200).json(urls);
  } catch (error) {
    console.error('Error al listar imágenes:', error);
    res.status(500).json({ error: 'Error al listar imágenes' });
  }
};

module.exports = { listarImagenes }; // Exporta la función de forma adecuada

