module.exports = {
  validateProduct: (product) => {
    const requiredFields = ['id_producto', 'nombre', 'material', 'tipo', 'color', 'precio', 'cantidad'];

    // Validar campos obligatorios
    requiredFields.forEach(field => {
      if (!product[field]) {
        throw new Error(`El campo ${field} es obligatorio`);
      }
    });

    // Validar tipos de datos
    if (typeof product.precio !== 'number' || product.precio <= 0) {
      throw new Error('El precio debe ser un número positivo');
    }

    if (typeof product.cantidad !== 'number' || product.cantidad < 0) {
      throw new Error('La cantidad debe ser un número mayor o igual a 0');
    }
  }
};
