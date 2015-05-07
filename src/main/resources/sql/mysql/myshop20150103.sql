CREATE DATABASE  IF NOT EXISTS `myshop` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `myshop`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: myshop
-- ------------------------------------------------------
-- Server version	5.6.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acct_authority`
--

DROP TABLE IF EXISTS `acct_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acct_authority` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acct_authority`
--

LOCK TABLES `acct_authority` WRITE;
/*!40000 ALTER TABLE `acct_authority` DISABLE KEYS */;
INSERT INTO `acct_authority` VALUES (2,'修改用户'),(4,'修改角色'),(1,'浏览用户'),(3,'浏览角色');
/*!40000 ALTER TABLE `acct_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acct_role`
--

DROP TABLE IF EXISTS `acct_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acct_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acct_role`
--

LOCK TABLES `acct_role` WRITE;
/*!40000 ALTER TABLE `acct_role` DISABLE KEYS */;
INSERT INTO `acct_role` VALUES (2,'用户'),(1,'管理员');
/*!40000 ALTER TABLE `acct_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acct_role_authority`
--

DROP TABLE IF EXISTS `acct_role_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acct_role_authority` (
  `role_id` bigint(20) NOT NULL,
  `authority_id` bigint(20) NOT NULL,
  KEY `FKAE243466DE3FB930` (`role_id`),
  KEY `FKAE2434663FE97564` (`authority_id`),
  CONSTRAINT `FKAE2434663FE97564` FOREIGN KEY (`authority_id`) REFERENCES `acct_authority` (`id`),
  CONSTRAINT `FKAE243466DE3FB930` FOREIGN KEY (`role_id`) REFERENCES `acct_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acct_role_authority`
--

LOCK TABLES `acct_role_authority` WRITE;
/*!40000 ALTER TABLE `acct_role_authority` DISABLE KEYS */;
INSERT INTO `acct_role_authority` VALUES (1,1),(1,2),(1,3),(1,4),(2,1),(2,3);
/*!40000 ALTER TABLE `acct_role_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acct_user`
--

DROP TABLE IF EXISTS `acct_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acct_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `login_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rank` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '等级ID',
  `score` float DEFAULT '0' COMMENT '积分',
  `tel` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '联系方式',
  `address` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '送货地址',
  `member_off` float DEFAULT '1' COMMENT '会员折扣',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_name` (`login_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acct_user`
--

LOCK TABLES `acct_user` WRITE;
/*!40000 ALTER TABLE `acct_user` DISABLE KEYS */;
INSERT INTO `acct_user` VALUES (1,'admin@springside.org.cn','admin','Admin','admin','钻石会员',1880,'1234545','12',0.8),(2,'user@springside.org.cn','user','User','user',NULL,0,NULL,NULL,1),(5,'123@qq.com','user2','user2','123456','金牌会员',1312,NULL,NULL,0.85);
/*!40000 ALTER TABLE `acct_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acct_user_role`
--

DROP TABLE IF EXISTS `acct_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acct_user_role` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  KEY `FKFE85CB3EDE3FB930` (`role_id`),
  KEY `FKFE85CB3E836A7D10` (`user_id`),
  CONSTRAINT `FKFE85CB3E836A7D10` FOREIGN KEY (`user_id`) REFERENCES `acct_user` (`id`),
  CONSTRAINT `FKFE85CB3EDE3FB930` FOREIGN KEY (`role_id`) REFERENCES `acct_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acct_user_role`
--

LOCK TABLES `acct_user_role` WRITE;
/*!40000 ALTER TABLE `acct_user_role` DISABLE KEYS */;
INSERT INTO `acct_user_role` VALUES (2,2);
/*!40000 ALTER TABLE `acct_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_account_rank`
--

DROP TABLE IF EXISTS `t_account_rank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_account_rank` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '等级名称',
  `minSocre` int(4) DEFAULT NULL COMMENT '最低积分',
  `maxScore` int(4) DEFAULT NULL COMMENT '最高积分',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='会员等级';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_account_rank`
--

LOCK TABLES `t_account_rank` WRITE;
/*!40000 ALTER TABLE `t_account_rank` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_account_rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_cart`
--

DROP TABLE IF EXISTS `t_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_cart` (
  `id` bigint(20) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL COMMENT '产品id',
  `product_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '名称',
  `product_num` int(1) DEFAULT NULL COMMENT '数量',
  `product_price` float DEFAULT NULL COMMENT '单价',
  `product_total` float DEFAULT NULL COMMENT '总价',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='购物车';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_cart`
--

LOCK TABLES `t_cart` WRITE;
/*!40000 ALTER TABLE `t_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_comment`
--

DROP TABLE IF EXISTS `t_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_comment` (
  `id` bigint(20) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `content` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT=' 产品评价';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_comment`
--

LOCK TABLES `t_comment` WRITE;
/*!40000 ALTER TABLE `t_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_order`
--

DROP TABLE IF EXISTS `t_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `amount` float DEFAULT NULL COMMENT '总价',
  `create_date` date DEFAULT NULL COMMENT '创建日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='订单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_order`
--

LOCK TABLES `t_order` WRITE;
/*!40000 ALTER TABLE `t_order` DISABLE KEYS */;
INSERT INTO `t_order` VALUES (3,'123',200,NULL),(4,'123',200,NULL),(5,'123',200,NULL),(6,'123',200,NULL),(8,'1',NULL,NULL),(22,'admin',1000,'2015-01-03'),(25,'admin',200,'2015-01-03'),(26,'admin',190,'2015-01-03'),(27,'admin',380,'2015-01-03'),(28,'admin',950,'2015-01-03'),(29,'admin',160,'2015-01-03'),(30,'user2',600,'2015-01-03'),(31,'user2',180,'2015-01-03'),(32,'user2',180,'2015-01-03'),(33,'user2',352,'2015-01-03');
/*!40000 ALTER TABLE `t_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_order_detail`
--

DROP TABLE IF EXISTS `t_order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_order_detail` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) DEFAULT NULL COMMENT '订单ID',
  `product_id` bigint(20) DEFAULT NULL COMMENT '产品ID',
  `product_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '购买数量',
  `product_price` float DEFAULT NULL,
  `product_num` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='订单详细';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_order_detail`
--

LOCK TABLES `t_order_detail` WRITE;
/*!40000 ALTER TABLE `t_order_detail` DISABLE KEYS */;
INSERT INTO `t_order_detail` VALUES (1,NULL,1,NULL,NULL,NULL),(2,NULL,1,NULL,NULL,NULL),(3,NULL,1,NULL,NULL,NULL),(4,6,1,NULL,NULL,NULL),(5,8,1,NULL,NULL,NULL),(20,22,1,'Wyeth惠氏金幼罐3 S-26 900g',200,5),(23,25,1,'Wyeth惠氏金幼罐3 S-26 900g',200,1),(24,26,1,'Wyeth惠氏金幼罐3 S-26 900g',200,1),(25,27,1,'Wyeth惠氏金幼罐3 S-26 900g',200,2),(26,28,1,'Wyeth惠氏金幼罐3 S-26 900g',200,5),(27,29,1,'Wyeth惠氏金幼罐3 S-26 900g',200,1),(28,30,2,'进口Abbott雅培金装小安素全营养幼儿配方粉(适用于1岁以上幼儿)900g',200,3),(29,31,2,'进口Abbott雅培金装小安素全营养幼儿配方粉(适用于1岁以上幼儿)900g',200,1),(30,32,2,'进口Abbott雅培金装小安素全营养幼儿配方粉(适用于1岁以上幼儿)900g',200,1),(31,33,2,'进口Abbott雅培金装小安素全营养幼儿配方粉(适用于1岁以上幼儿)900g',200,2);
/*!40000 ALTER TABLE `t_order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_product`
--

DROP TABLE IF EXISTS `t_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '产品名称',
  `description` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '产品描述',
  `introduce` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '产品介绍',
  `price` float DEFAULT NULL COMMENT '原件',
  `nowprice` float DEFAULT NULL COMMENT '现价',
  `picture` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '产品图片',
  `catalog_id` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '产品类别',
  `sellcount` int(4) DEFAULT NULL COMMENT '已售数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='产品信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_product`
--

LOCK TABLES `t_product` WRITE;
/*!40000 ALTER TABLE `t_product` DISABLE KEYS */;
INSERT INTO `t_product` VALUES (1,'Wyeth惠氏金幼罐3 S-26 900g','全面均衡的营养支持环环相扣','遵循前沿科学，多重营养新突破。',200,192,'/img/product/0101001001.jpg','0101001',100),(2,'进口Abbott雅培金装小安素全营养幼儿配方粉(适用于1岁以上幼儿)900g','买6罐立减150元 优质奶源 清新香草口味','新西兰、美国优质奶源，新加坡生产',200,198,'/img/product/0101001002.jpg','0101001',90),(3,'PRO-LOVE谷之爱婴幼儿营养小米米粉1段25gx9袋','优质产地 环境优越 精选绿色沁州黄小米','优质产地，环境优越',36,34,'/img/product/0101002001.jpg','0101002',80),(4,'美国进口plum谷百西梅果泥99gx2袋','100%纯天然水果 配方全面丰富 多级研磨 质地细腻幼滑','100%纯天然水果，配方全面丰富',52,50,'/img/product/0101003001.jpg','0101003',70),(5,'HUGGIES好奇金装纸尿裤贴身大号100片X1箱','棉柔般亲肤 柔软呵护 波纹透气槽 自由呼吸','棉柔般亲肤，柔软呵护',215,213,'/img/product/0102001001.jpg','0102001',60),(6,'HUGGIES好奇金装成长裤15片X2包','透气超弹护边 减少敏感红印 魔术侧腰贴 一套一拉方便穿','透气超弹护边，减少敏感红印',100,98,'/img/product/0102002001.jpg','0102002',50),(7,'雅培金装喜康力婴儿配方奶粉2段900gx1罐','DHA+叶黄素配方 100%进口奶源 安心智锁罐','安心智锁罐，6-12个月较大婴儿专用',200,192,'/img/product/0101001003.jpg','0101001',40),(8,'MeadJohnson美赞臣安婴儿A+1段婴儿配方奶粉(0-1岁婴儿适用)900g','100%进口奶源 添加维生素和矿物质','特别强化偏食宝宝易缺的7种营养素，支持偏食宝宝身高、体格及头脑的发育。三大营养素（优质蛋白、脂肪和碳水化合物）功能配比合理，有助更健康体格发育。特有乳清蛋白和五种核苷酸组合，有助消化吸收。口味香浓不甜腻，经测试9成偏食宝宝都喜爱。',200,190,'/img/product/0101001004.jpg','0101001',30),(9,'嗳呵婴儿草本抑菌洗衣液2升X1瓶','进口原料 温和配方 快速祛污 强效抑菌','品名：嗳呵婴儿草本抑菌洗衣液',40,35,'/img/product/0103001001.jpg','0103001',20),(10,'PIGEON贝亲婴儿抗菌洗衣皂120克X6块','无磷,有效去除大肠杆菌和金黄色葡萄球菌','品名：贝亲婴儿抗菌洗衣皂',40,35,'/img/product/0103001002.jpg','0103001',10),(11,'迪士尼米奇地垫60x60x2cmx6片','高密度发泡 超强的弹性 不含重金属 没有刺鼻味','适用于幼儿园、家庭、淘气堡、游乐场、舞蹈室、跆拳道馆等场所',100,98,'/img/product/0104001001.jpg','0104001001',100),(12,'进口FisherPrice费雪小小探索家单面包边地垫BMF14','原价238元,特价198元! 网站购买1个再减20元;买2个减50元;买3个减100元! 超值促销仅限网购','独立闭孔结构，紧密有效的阻止水分子渗透，使吸水率超级底（几乎为零），同时，因电子的照射改性，表面抗菌处理，让细菌无生存环境。保障孩子的健康，也能防止孩子的衣服受',198,195,'/img/product/0104001002.jpg','0104001001',90),(13,'GERBER嘉宝女婴童袜14-16cmx5双','精致工艺 设计新颖 平整抗皱 柔软亲肤 轻松透气','精致工艺，设计新颖，颜色鲜亮',60,58,'/img/product/0105001001.jpg','0105001001',80),(14,'GERBER嘉宝男婴童袜14-16cmx5双','精致工艺 设计新颖 平整抗皱 柔软亲肤 轻松透气','精致工艺，设计新颖，颜色鲜亮',60,58,'/img/product/0105001002.jpg','0105001001',70);
/*!40000 ALTER TABLE `t_product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-01-03  2:26:39
