// models/product.js
module.exports = {
    validateProduct: (product) => {
      // Validar que todos los campos necesarios estén presentes
      const requiredFields = ['id_producto', 'nombre', 'material', 'tipo', 'altura', 'ancho', 'profundidad', 'color', 'descripcion', 'precio', 'imagen', 'cantidad'];
      for (let field of requiredFields) {
        if (!product[field]) {
          throw new Error(`El campo ${field} es obligatorio`);
        }
      }
  
      // Validación adicional de tipo de datos
      if (typeof product.id_producto !== 'number' || product.id_producto <= 0) {
        throw new Error('El id_producto debe ser un número positivo');
      }
      if (typeof product.precio !== 'number' || product.precio <= 0) {
        throw new Error('El precio debe ser un valor numérico positivo');
      }
      if (typeof product.cantidad !== 'number' || product.cantidad < 0) {
        throw new Error('La cantidad debe ser un número entero no negativo');
      }
      if (typeof product.imagen !== 'string' || !product.imagen.match(/\.(jpg|jpeg|png)$/)) {
        throw new Error('La imagen debe ser una cadena de texto con formato válido (jpg, jpeg, png)');
      }
    }
  };
  