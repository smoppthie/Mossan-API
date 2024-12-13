const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dgoy1pqte',
  api_key: '426653498416451',    
  api_secret: 'LSpUvHb7V0nnpxAzxaBg0XtX7gM',
});

module.exports = cloudinary;
