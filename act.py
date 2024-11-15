from pymongo import MongoClient
import random

# Configuración para conectarse a MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Cambia la URI si tu base de datos está en otro servidor
db = client["mossan_nosql"]  # Nombre de la base de datos
collection = db["productos"]  # Nombre de la colección

# Actualizar cada documento en la colección
try:
    # Obtener todos los documentos en la colección
    for producto in collection.find():
        # Generar un número aleatorio entre 1 y 20
        cantidad = random.randint(1, 20)
        
        # Actualizar el documento agregando el campo "cantidad"
        collection.update_one(
            {"_id": producto["_id"]},  # Filtrar por ID del documento
            {"$set": {"cantidad": cantidad}}  # Agregar/actualizar el campo "cantidad"
        )
    
    print("Campo 'cantidad' agregado a todos los documentos exitosamente.")
except Exception as e:
    print(f"Error al actualizar los documentos: {e}")
