-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: mossan
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `rut` int NOT NULL,
  `numero_telefonico` int NOT NULL,
  `correo` varchar(20) NOT NULL,
  PRIMARY KEY (`rut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES ('Daniel','Belozo',201234567,959234567,'daniel.b@gmail.com'),('Yoselin','Cornejo',210639624,953114596,'yoselin.cr@gmail.com');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atiende`
--

DROP TABLE IF EXISTS `atiende`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atiende` (
  `fecha_atencion` date NOT NULL,
  `id_atencion` int NOT NULL AUTO_INCREMENT,
  `id_admin` int NOT NULL,
  `id_cotizacion` int NOT NULL,
  PRIMARY KEY (`id_atencion`),
  KEY `id_admin` (`id_admin`),
  KEY `id_cotizacion` (`id_cotizacion`),
  CONSTRAINT `atiende_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `administrador` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `atiende_ibfk_2` FOREIGN KEY (`id_cotizacion`) REFERENCES `cotizaciones` (`id_cotizacion`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atiende`
--

LOCK TABLES `atiende` WRITE;
/*!40000 ALTER TABLE `atiende` DISABLE KEYS */;
/*!40000 ALTER TABLE `atiende` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `comuna` varchar(50) NOT NULL,
  `region` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `numero_cliente` int NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Juan','Calle 1 #123','Santiago','Metropolitana','Pérez','juan.perez@example.com',987654321),(2,'María','Calle 2 #456','Providencia','Metropolitana','González','maria.gonzalez@example.com',987123456),(3,'Pedro','Calle 3 #789','Viña del Mar','Valparaíso','Ramírez','pedro.ramirez@example.com',987111222),(4,'Ana','Avenida Siempreviva #123','Quilpué','Valparaíso','Fernández','ana.fernandez@example.com',987333444),(5,'Carlos','Calle 4 #101','Rancagua','O\'Higgins','Sánchez','carlos.sanchez@example.com',987555666),(6,'Camila','Pasaje A #202','Antofagasta','Antofagasta','Muñoz','camila.munoz@example.com',987777888),(7,'Diego','Calle B #303','La Serena','Coquimbo','Torres','diego.torres@example.com',987999000),(8,'Paula','Avenida B #404','Temuco','Araucanía','Morales','paula.morales@example.com',987112233),(9,'Andrés','Pasaje C #505','Concepción','Bío Bío','Reyes','andres.reyes@example.com',987223344),(10,'Sofía','Calle D #606','Puerto Montt','Los Lagos','Vera','sofia.vera@example.com',987334455);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compran`
--

DROP TABLE IF EXISTS `compran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compran` (
  `id_venta` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `fecha` date NOT NULL,
  `metodo_pago` varchar(10) DEFAULT NULL,
  `id_producto` int NOT NULL,
  PRIMARY KEY (`id_venta`),
  KEY `id_cliente` (`id_cliente`),
  KEY `fk_id_producto` (`id_producto`),
  CONSTRAINT `compran_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_id_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compran`
--

LOCK TABLES `compran` WRITE;
/*!40000 ALTER TABLE `compran` DISABLE KEYS */;
/*!40000 ALTER TABLE `compran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cotizaciones`
--

DROP TABLE IF EXISTS `cotizaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cotizaciones` (
  `id_cotizacion` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `descripcion` varchar(400) DEFAULT NULL,
  `fecha_cotizacion` date NOT NULL,
  PRIMARY KEY (`id_cotizacion`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `cotizaciones_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cotizaciones`
--

LOCK TABLES `cotizaciones` WRITE;
/*!40000 ALTER TABLE `cotizaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `cotizaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envia`
--

DROP TABLE IF EXISTS `envia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envia` (
  `fecha_envio` date NOT NULL,
  `id_envio` int NOT NULL AUTO_INCREMENT,
  `id_venta` int NOT NULL,
  `id_admin` int NOT NULL,
  PRIMARY KEY (`id_envio`),
  KEY `id_compra` (`id_venta`),
  KEY `id_admin` (`id_admin`),
  CONSTRAINT `envia_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `compran` (`id_venta`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `envia_ibfk_2` FOREIGN KEY (`id_admin`) REFERENCES `administrador` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envia`
--

LOCK TABLES `envia` WRITE;
/*!40000 ALTER TABLE `envia` DISABLE KEYS */;
/*!40000 ALTER TABLE `envia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `material` varchar(20) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `altura` decimal(5,2) NOT NULL,
  `ancho` decimal(5,2) NOT NULL,
  `profundidad` decimal(5,2) NOT NULL,
  `color` varchar(20) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `precio` int NOT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (2,'Silla de oficina','Plástico','Silla',110.00,60.00,60.00,'Negro','Silla ergonómica con ruedas',75000),(3,'Estante','Metal','Estantería',180.00,80.00,30.00,'Gris','Estante de metal para libros',120000),(4,'Sofá','Cuero','Sofá',85.00,200.00,90.00,'Marrón','Sofá de 3 plazas',320000),(5,'Cama matrimonial','Madera','Cama',50.00,150.00,200.00,'Blanco','Cama matrimonial con cabecera',450000),(6,'Mesa de centro','Vidrio','Mesa',45.00,90.00,60.00,'Transparente','Mesa de centro de vidrio',140000),(7,'Silla de comedor','Madera','Silla',100.00,45.00,45.00,'Rojo','Silla de comedor acolchada',50000),(8,'Escritorio','Madera','Escritorio',75.00,140.00,60.00,'Nogal','Escritorio con 3 cajones',180000),(9,'Sillón reclinable','Cuero','Sillón',90.00,90.00,80.00,'Negro','Sillón reclinable',250000),(10,'Estantería de pared','Metal','Estantería',120.00,60.00,20.00,'Gris','Estantería para pared',90000),(11,'Mesa auxiliar','Madera','Mesa',55.00,40.00,40.00,'Caoba','Mesa auxiliar para sala',60000),(12,'Cómoda','Madera','Cómoda',90.00,100.00,45.00,'Blanco','Cómoda con 5 cajones',160000),(13,'Butaca','Tela','Sillón',80.00,70.00,70.00,'Azul','Butaca tapizada',130000),(14,'Mesa plegable','Metal','Mesa',75.00,80.00,80.00,'Negro','Mesa plegable para camping',45000),(15,'Cama individual','Madera','Cama',50.00,90.00,190.00,'Pino','Cama individual para niños',280000),(16,'Banco','Madera','Banco',45.00,100.00,30.00,'Nogal','Banco para cocina',40000),(17,'Estantería baja','Metal','Estantería',90.00,100.00,30.00,'Blanco','Estantería baja con 3 niveles',70000),(18,'Silla plegable','Plástico','Silla',80.00,45.00,45.00,'Azul','Silla plegable de plástico',20000),(19,'Sofá cama','Tela','Sofá',90.00,200.00,90.00,'Gris','Sofá que se convierte en cama',350000),(20,'Perchero','Metal','Perchero',170.00,50.00,50.00,'Negro','Perchero de pie con 6 ganchos',45000),(21,'Mesa de TV','Madera','Mesa',55.00,120.00,40.00,'Blanco','Mesa para TV de hasta 60 pulgadas',110000),(22,'Cama king','Madera','Cama',50.00,180.00,210.00,'Marrón','Cama king size con cabecera',650000),(23,'Silla gamer','Cuero','Silla',130.00,60.00,60.00,'Negro','Silla gamer con reposabrazos',150000),(24,'Silla de jardín','Plástico','Silla',90.00,60.00,60.00,'Verde','Silla de jardín apilable',25000),(25,'Mesa de noche','Madera','Mesa',50.00,45.00,35.00,'Negro','Mesa de noche con 2 cajones',70000),(26,'Librero','Madera','Estantería',200.00,100.00,30.00,'Café','Librero con 5 niveles',180000),(27,'Mesa de bar','Metal','Mesa',105.00,70.00,70.00,'Negro','Mesa alta de bar',85000),(28,'Sillón con otomana','Tela','Sillón',90.00,90.00,80.00,'Rojo','Sillón con otomana a juego',220000),(29,'Cama nido','Madera','Cama',50.00,100.00,200.00,'Blanco','Cama nido con cama adicional',400000),(30,'Tocador','Madera','Tocador',90.00,120.00,50.00,'Blanco','Tocador con espejo y 4 cajones',190000),(31,'Taburete','Metal','Banco',75.00,40.00,40.00,'Negro','Taburete de bar ajustable',60000),(32,'Puff','Tela','Sillón',40.00,50.00,50.00,'Naranja','Puff relleno de microperlas',35000),(33,'Cama alta','Metal','Cama',150.00,90.00,200.00,'Negro','Cama alta con espacio inferior',280000),(34,'Silla de visitas','Madera','Silla',90.00,45.00,45.00,'Marrón','Silla elegante para visitas',65000),(35,'Silla mecedora','Madera','Silla',100.00,60.00,80.00,'Nogal','Silla mecedora de madera',120000),(36,'Consola de entrada','Madera','Mesa',75.00,100.00,35.00,'Blanco','Consola para entrada o pasillo',150000),(37,'Estante de baño','Metal','Estantería',70.00,60.00,20.00,'Blanco','Estante de baño ajustable',50000),(38,'Sofá esquinero','Tela','Sofá',90.00,220.00,220.00,'Gris','Sofá esquinero en forma de L',550000),(39,'Banco de bar','Metal','Banco',75.00,45.00,45.00,'Cromado','Banco de bar con respaldo',80000),(40,'Cama con cajones','Madera','Cama',50.00,140.00,200.00,'Blanco','Cama con 4 cajones integrados',480000),(41,'Mesa','','',0.00,0.00,0.00,'','Mesa de madera',25000);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-26 22:50:55
