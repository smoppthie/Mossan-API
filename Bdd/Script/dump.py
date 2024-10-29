import json
from pymongo import MongoClient

# Conexión al servidor MongoDB
client = MongoClient('mongodb://localhost:27017/')

# Selecciona la base de datos
db = client['mossan_nosql']

# Obtener la lista de colecciones
colecciones = db.list_collection_names()

# Exporta cada colección a un archivo JSON
for coleccion in colecciones:
    datos = list(db[coleccion].find({}))
    
    # Elimina el campo "_id" (opcional)
    for doc in datos:
        if '_id' in doc:
            del doc['_id']

    # Exportar a un archivo JSON con el nombre de la colección
    with open(f'{coleccion}.json', 'w', encoding='utf-8') as file:
        json.dump(datos, file, ensure_ascii=False, indent=4)

    print(f"Exportación de {coleccion} completada.")
