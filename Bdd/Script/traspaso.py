import pymysql
from pymongo import MongoClient
from decimal import Decimal

# Configuración de conexión a MySQL
mysql_host = 'localhost'  # Cambia esto según tu configuración
mysql_user = 'root'  # Cambia esto según tu usuario
mysql_password = 'contra'  # Cambia esto según tu contraseña
mysql_db_name = 'mossan'  # Cambia esto a tu base de datos de origen

# Configuración de conexión a MongoDB
mongo_uri = 'mongodb://localhost:27017'  # Cambia esto según tu configuración
mongo_db_name = 'mossan_nosql'  # Cambia esto al nombre deseado para la base de datos de destino

# Conexión a MySQL
mysql_conn = pymysql.connect(host=mysql_host, user=mysql_user, password=mysql_password, database=mysql_db_name)
mysql_cursor = mysql_conn.cursor()

# Conexión a MongoDB
mongo_client = MongoClient(mongo_uri)
mongo_db = mongo_client[mongo_db_name]

print("Iniciando la clonación...")

# Obtener nombres de tablas de MySQL
mysql_cursor.execute("SHOW TABLES")
tablas = mysql_cursor.fetchall()

for (nombre_tabla,) in tablas:
    print(f"Clonando la tabla: {nombre_tabla}")

    # Obtener todos los registros de la tabla actual
    mysql_cursor.execute(f"SELECT * FROM {nombre_tabla}")
    registros = mysql_cursor.fetchall()

    # Obtener los nombres de las columnas
    columnas = [desc[0] for desc in mysql_cursor.description]

    if registros:
        # Convertir registros a diccionarios y manejar Decimal
        documentos = []
        for registro in registros:
            documento = {}
            for i, valor in enumerate(registro):
                if isinstance(valor, Decimal):
                    documento[columnas[i]] = float(valor)  # Convertir Decimal a float
                else:
                    documento[columnas[i]] = valor
            documentos.append(documento)

        # Insertar documentos en MongoDB
        mongo_db[nombre_tabla].insert_many(documentos)
        print(f"Se clonaron {len(documentos)} documentos en la colección '{nombre_tabla}'.")
    else:
        print(f"No se encontraron documentos en la tabla '{nombre_tabla}' para clonar.")

# Cerrar conexiones
mysql_cursor.close()
mysql_conn.close()
mongo_client.close()

print("Clonación completada.")

