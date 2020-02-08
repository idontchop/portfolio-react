-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: localhost    Database: portfolioChat
-- ------------------------------------------------------
-- Server version	8.0.19-0ubuntu0.19.10.3

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
-- Table structure for table `chat_user`
--

DROP TABLE IF EXISTS `chat_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_user`
--

LOCK TABLES `chat_user` WRITE;
/*!40000 ALTER TABLE `chat_user` DISABLE KEYS */;
INSERT INTO `chat_user` VALUES (1,'17'),(2,'3'),(3,'16'),(4,'3'),(5,'13'),(6,'3'),(7,'1'),(8,'3'),(10,'21'),(11,'51'),(12,'20'),(13,'21'),(14,'22'),(15,'21'),(16,'22'),(17,'43');
/*!40000 ALTER TABLE `chat_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `seen` datetime DEFAULT NULL,
  `type` int DEFAULT NULL,
  `message_thread_id` bigint DEFAULT NULL,
  `sender_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK34fio3ckeu9d8o6nhgk8k3kxq` (`message_thread_id`),
  KEY `FK66wmv4noy06ovj0aytlx3wqs3` (`sender_id`),
  CONSTRAINT `FK34fio3ckeu9d8o6nhgk8k3kxq` FOREIGN KEY (`message_thread_id`) REFERENCES `message_thread` (`id`),
  CONSTRAINT `FK66wmv4noy06ovj0aytlx3wqs3` FOREIGN KEY (`sender_id`) REFERENCES `chat_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (3,'New Message 1','2020-02-04 11:58:23',NULL,0,26,17),(5,'New Message 2','2020-02-04 16:16:31',NULL,0,26,1),(6,'New Message 3','2020-02-04 16:16:42',NULL,0,26,1),(7,'New Message 4','2020-02-04 16:16:47',NULL,0,26,1),(8,'New Message 5','2020-02-04 17:50:22',NULL,0,26,1),(9,'New Message 6','2020-02-04 17:52:01',NULL,0,26,17),(12,'New Message 8','2020-02-04 18:20:09',NULL,0,21,1),(13,'New Message 8','2020-02-04 18:20:40',NULL,0,21,1),(17,'New Message 10','2020-02-04 18:48:26',NULL,0,21,1),(18,'New Message From Postman','2020-02-06 16:58:36',NULL,0,26,1),(19,'New Message From Postman 2','2020-02-06 21:00:54',NULL,0,26,1),(20,'New Message From Postman 3','2020-02-06 21:02:43',NULL,0,26,1),(21,'New Message From Postman 4','2020-02-06 21:32:11',NULL,0,26,1),(22,'New Message From Postman 5','2020-02-06 21:38:34',NULL,0,26,1);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_thread`
--

DROP TABLE IF EXISTS `message_thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_thread` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_thread`
--

LOCK TABLES `message_thread` WRITE;
/*!40000 ALTER TABLE `message_thread` DISABLE KEYS */;
INSERT INTO `message_thread` VALUES (1,'2020-02-02 10:10:30'),(3,'2020-02-02 10:13:47'),(11,'2020-02-04 12:43:33'),(12,'2020-02-04 16:07:32'),(13,'2020-02-04 16:09:27'),(21,'2020-02-04 18:20:09'),(26,'2020-02-05 14:35:08');
/*!40000 ALTER TABLE `message_thread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_thread_members`
--

DROP TABLE IF EXISTS `message_thread_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_thread_members` (
  `message_threads_id` bigint NOT NULL,
  `members_id` bigint NOT NULL,
  KEY `FKhquknrc63qix01tj5cv7qpsf0` (`members_id`),
  KEY `FKpnyuhd87j3cebxvuhrj3e1xr2` (`message_threads_id`),
  CONSTRAINT `FKhquknrc63qix01tj5cv7qpsf0` FOREIGN KEY (`members_id`) REFERENCES `chat_user` (`id`),
  CONSTRAINT `FKpnyuhd87j3cebxvuhrj3e1xr2` FOREIGN KEY (`message_threads_id`) REFERENCES `message_thread` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_thread_members`
--

LOCK TABLES `message_thread_members` WRITE;
/*!40000 ALTER TABLE `message_thread_members` DISABLE KEYS */;
INSERT INTO `message_thread_members` VALUES (1,14),(1,15),(3,11),(3,12),(11,2),(11,11),(12,11),(12,12),(13,11),(13,12),(21,1),(21,12),(26,17),(26,1);
/*!40000 ALTER TABLE `message_thread_members` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-07 21:14:43
