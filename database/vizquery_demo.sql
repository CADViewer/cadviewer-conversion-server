-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql.vizquery.com
-- Generation Time: Mar 11, 2024 at 11:25 AM
-- Server version: 8.0.32-0ubuntu0.22.04.2
-- PHP Version: 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vizquery_demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` int UNSIGNED NOT NULL,
  `room_id` int DEFAULT NULL,
  `tag` varchar(25) DEFAULT NULL,
  `name` varchar(25) DEFAULT NULL,
  `asset_type_id` int DEFAULT NULL,
  `status` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `room_id`, `tag`, `name`, `asset_type_id`, `status`) VALUES
(1, 17, 'addsf', 'LP101', 2, NULL),
(2, 156, 'AXS', 'LP101', 2, NULL),
(3, 1, 'adf', 'adf', 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `asset_types`
--

CREATE TABLE `asset_types` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `image_file_name` varchar(255) DEFAULT NULL,
  `image_content_type` varchar(255) DEFAULT NULL,
  `image_file_size` int DEFAULT NULL,
  `image_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `asset_types`
--

INSERT INTO `asset_types` (`id`, `name`, `description`, `image_file_name`, `image_content_type`, `image_file_size`, `image_updated_at`) VALUES
(1, 'Laser Printer', 'HP LaserJet P4014n Printer', 'hp_p4014_bwl.jpg', 'image/jpeg', 9867, '2010-03-14 19:27:02'),
(2, 'Color Printer', 'HP Color LaserJet CP1215 Printer', 'hp_color_laser.jpg', 'image/jpeg', 11972, '2010-03-14 19:27:15'),
(3, 'Fax', 'Brother IntelliFax 4100e Laser Fax', 'brother_fax.jpg', 'image/jpeg', 9224, '2010-03-14 19:27:34'),
(4, 'Fax/Copier', 'Brother MFC-7340 Laser Multi-Function Printer', 'brother_mfc.jpg', 'image/jpeg', 16393, '2010-03-14 19:27:48'),
(5, 'Production Copier', 'Xerox 4595 System', 'xerox_4595.png', 'image/png', 70055, '2010-03-14 19:26:39');

-- --------------------------------------------------------

--
-- Table structure for table `buildings`
--

CREATE TABLE `buildings` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `state_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `buildings`
--

INSERT INTO `buildings` (`id`, `name`, `address`, `city_id`, `state_id`) VALUES
(1, 'AH_001', 'Abbot House, Everard Close', 3, 2),
(2, '77QVS', '55 Broadway', 2, 1),
(3, 'BH', '39 Island Centre Way', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `calendars`
--

CREATE TABLE `calendars` (
  `id` int NOT NULL,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `check_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `calendars`
--

INSERT INTO `calendars` (`id`, `account`, `password`, `check_at`, `created_at`, `updated_at`) VALUES
(1, 'calendar@vizquery.com', 'cascade01', '2010-04-08 12:00:00', NULL, '2010-04-09 16:49:01');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'OFFICE'),
(2, 'PROD'),
(3, 'SERV'),
(4, 'CONFERENCE'),
(5, 'VERT'),
(6, 'STORAGE'),
(7, ''),
(8, 'LAB'),
(9, 'SUPPORT');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `state_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `state_id`) VALUES
(1, 'Enfield', 3),
(2, 'London', 1),
(3, 'St Albans ', 2);

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int UNSIGNED NOT NULL,
  `hex` char(8) DEFAULT NULL,
  `r` int DEFAULT NULL,
  `g` int DEFAULT NULL,
  `b` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `hex`, `r`, `g`, `b`) VALUES
(1, 'FF0000', 255, 0, 0),
(2, '00FF00', 0, 255, 0),
(3, '008000', 0, 128, 0),
(4, '0000FF', 0, 0, 255),
(5, '00FFFF', 0, 255, 255),
(6, 'FF00FF', 255, 0, 255),
(7, 'FFFF00', 255, 255, 0),
(8, '323270', 50, 50, 112),
(9, '8A2BE2', 138, 43, 226),
(10, 'DEB887', 222, 184, 135),
(11, '5F9EA0', 95, 158, 160),
(12, '7FFF00', 127, 255, 0),
(13, 'D2691E', 210, 105, 30),
(14, 'FF7F50', 255, 127, 80),
(15, '6495ED', 100, 149, 237),
(16, 'FFE4C4', 255, 228, 196),
(17, 'DC143C', 220, 20, 60),
(18, '00008B', 0, 0, 141),
(19, 'B8860B', 184, 134, 11),
(20, '006400', 0, 100, 0),
(21, 'BDB76B', 189, 183, 107),
(22, '556B2F', 85, 107, 47),
(23, 'FF8C00', 255, 140, 0),
(24, '8B0000', 141, 0, 0),
(25, 'E9967A', 233, 150, 122),
(26, '8FBC8F', 143, 188, 143),
(27, '483D8B', 72, 21, 141),
(28, '2F4F4F', 47, 79, 79),
(29, 'FF1493', 255, 20, 147),
(30, '00BFFF', 0, 191, 255),
(31, 'B22222', 178, 34, 34),
(32, '228B22', 34, 141, 34),
(33, 'FFD700', 255, 215, 0),
(34, '4B0082', 75, 0, 130),
(35, 'F0E68C', 240, 230, 142),
(36, 'E6E6FA', 230, 230, 250),
(37, 'FFF0F5', 255, 240, 245),
(38, '7CFC00', 125, 253, 0),
(39, 'FFFACD', 255, 250, 205),
(40, 'ADD8E6', 173, 216, 230),
(41, 'F08080', 240, 128, 128),
(42, 'E0FFFF', 224, 255, 255),
(43, '90EE90', 144, 238, 144),
(44, '66CDAA', 102, 205, 170),
(45, '0000CD', 0, 0, 205),
(46, 'BA55D3', 186, 85, 211),
(47, '3CB371', 60, 179, 113),
(48, '7B68EE', 123, 104, 238),
(49, 'C71585', 199, 21, 133),
(50, '191970', 25, 25, 112),
(51, '000080', 0, 0, 128),
(52, '808000', 128, 128, 0),
(53, 'FF4500', 255, 69, 0),
(54, 'DB7093', 219, 112, 147),
(55, 'CD853F', 205, 133, 63),
(56, 'FFC0CB', 255, 192, 203),
(57, 'B0E0E6', 176, 224, 230),
(58, '800080', 128, 0, 128),
(59, 'BC8F8F', 188, 143, 143),
(60, '4169E1', 65, 105, 225),
(61, '8B4513', 139, 69, 19),
(62, '2E8B57', 46, 139, 87),
(63, 'C0C0C0', 192, 192, 192),
(64, '9ACD32', 154, 205, 50);

-- --------------------------------------------------------

--
-- Table structure for table `defusers`
--

CREATE TABLE `defusers` (
  `id` int NOT NULL,
  `first` varchar(255) DEFAULT NULL,
  `last` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `empid` varchar(255) DEFAULT NULL,
  `empname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `defusers`
--

INSERT INTO `defusers` (`id`, `first`, `last`, `created_at`, `updated_at`, `empid`, `empname`) VALUES
(1, 'Althea', 'Kerschner', NULL, NULL, 'KERSCHNER_ALTHEA', 'Althea Kerschner'),
(2, 'Lilia', 'Marchi', NULL, NULL, 'MARCHI_LILIA', 'Lilia Marchi'),
(3, 'Selena', 'Troutt', NULL, NULL, 'TROUTT_SELENA', 'Selena Troutt'),
(4, 'Kurt', 'Gatica', NULL, NULL, 'GATICA_KURT', 'Kurt Gatica'),
(5, 'Lenore', 'Minott', NULL, NULL, 'MINOTT_LENORE', 'Lenore Minott'),
(6, 'Emilia', 'Dewoody', NULL, NULL, 'DEWOODY_EMILIA', 'Emilia Dewoody'),
(7, 'Jerri', 'Arden', NULL, NULL, 'ARDEN_JERRI', 'Jerri Arden'),
(8, 'Katy', 'Mcgonigle', NULL, NULL, 'MCGONIGLE_KATY', 'Katy Mcgonigle'),
(9, 'Emilia', 'Oyama', NULL, NULL, 'OYAMA_EMILIA', 'Emilia Oyama'),
(10, 'Allie', 'Buttery', NULL, NULL, 'BUTTERY_ALLIE', 'Allie Buttery'),
(11, 'Louisa', 'Reels', NULL, NULL, 'REELS_LOUISA', 'Louisa Reels'),
(12, 'Edwina', 'Buscemi', NULL, NULL, 'BUSCEMI_EDWINA', 'Edwina Buscemi'),
(13, 'Neil', 'Bradsher', NULL, NULL, 'BRADSHER_NEIL', 'Neil Bradsher'),
(14, 'Ashlee', 'Faz', NULL, NULL, 'FAZ_ASHLEE', 'Ashlee Faz'),
(15, 'Amie', 'Mabery', NULL, NULL, 'MABERY_AMIE', 'Amie Mabery'),
(16, 'Hillary', 'Mullarkey', NULL, NULL, 'MULLARKEY_HILLARY', 'Hillary Mullarkey'),
(17, 'Tyrone', 'Larimer', NULL, NULL, 'LARIMER_TYRONE', 'Tyrone Larimer'),
(18, 'Darren', 'Dority', NULL, NULL, 'DORITY_DARREN', 'Darren Dority'),
(19, 'Tyrone', 'Pon', NULL, NULL, 'PON_TYRONE', 'Tyrone Pon'),
(20, 'Guy', 'Santigo', NULL, NULL, 'SANTIGO_GUY', 'Guy Santigo'),
(21, 'Allan', 'Howdyshell', NULL, NULL, 'HOWDYSHELL_ALLAN', 'Allan Howdyshell'),
(22, 'Fernando', 'Shiba', NULL, NULL, 'SHIBA_FERNANDO', 'Fernando Shiba'),
(23, 'Max', 'Metro', NULL, NULL, 'METRO_MAX', 'Max Metro'),
(24, 'Noreen', 'Henze', NULL, NULL, 'HENZE_NOREEN', 'Noreen Henze'),
(25, 'Roslyn', 'Bouknight', NULL, NULL, 'BOUKNIGHT_ROSLYN', 'Roslyn Bouknight'),
(26, 'Dona', 'Maine', NULL, NULL, 'MAINE_DONA', 'Dona Maine'),
(27, 'Margery', 'Macha', NULL, NULL, 'MACHA_MARGERY', 'Margery Macha'),
(28, 'Lorrie', 'Kula', NULL, NULL, 'KULA_LORRIE', 'Lorrie Kula'),
(29, 'Nelson', 'Brayton', NULL, NULL, 'BRAYTON_NELSON', 'Nelson Brayton'),
(30, 'Margery', 'Latson', NULL, NULL, 'LATSON_MARGERY', 'Margery Latson'),
(31, 'Marylou', 'Mulford', NULL, NULL, 'MULFORD_MARYLOU', 'Marylou Mulford'),
(32, 'Loraine', 'Konrad', NULL, NULL, 'KONRAD_LORAINE', 'Loraine Konrad'),
(33, 'Cody', 'Harton', NULL, NULL, 'HARTON_CODY', 'Cody Harton'),
(34, 'Ted', 'Bae', NULL, NULL, 'BAE_TED', 'Ted Bae'),
(35, 'Lenore', 'Goo', NULL, NULL, 'GOO_LENORE', 'Lenore Goo'),
(36, 'Spenser', 'Tilman', NULL, NULL, 'TILMAN_SPENSER', 'Spenser Tilman'),
(37, 'Julio', 'Robidoux', NULL, NULL, 'ROBIDOUX_JULIO', 'Julio Robidoux'),
(38, 'George', 'Boyers', NULL, NULL, 'BOYERS_GEORGE', 'George Boyers'),
(39, 'Tyrone', 'Penhollow', NULL, NULL, 'PENHOLLOW_TYRONE', 'Tyrone Penhollow'),
(40, 'Allyson', 'Loew', NULL, NULL, 'LOEW_ALLYSON', 'Allyson Loew'),
(41, 'Ted', 'Winegarden', NULL, NULL, 'WINEGARDEN_TED', 'Ted Winegarden'),
(42, 'Nannie', 'Neis', NULL, NULL, 'NEIS_NANNIE', 'Nannie Neis'),
(43, 'Hugh', 'Habib', NULL, NULL, 'HABIB_HUGH', 'Hugh Habib'),
(44, 'Tia', 'Farone', NULL, NULL, 'FARONE_TIA', 'Tia Farone'),
(45, 'Loraine', 'Asbill', NULL, NULL, 'ASBILL_LORAINE', 'Loraine Asbill'),
(46, 'Elinor', 'Keenum', NULL, NULL, 'KEENUM_ELINOR', 'Elinor Keenum'),
(47, 'Guy', 'Cuccia', NULL, NULL, 'CUCCIA_GUY', 'Guy Cuccia'),
(48, 'Lance', 'Torrance', NULL, NULL, 'TORRANCE_LANCE', 'Lance Torrance'),
(49, 'Neil', 'Dipiazza', NULL, NULL, 'DIPIAZZA_NEIL', 'Neil Dipiazza'),
(50, 'Max', 'Babineau', NULL, NULL, 'BABINEAU_MAX', 'Max Babineau'),
(51, 'Lenore', 'Linderman', NULL, NULL, 'LINDERMAN_LENORE', 'Lenore Linderman'),
(52, 'Fernando', 'Aylesworth', NULL, NULL, 'AYLESWORTH_FERNANDO', 'Fernando Aylesworth'),
(53, 'Rosalinda', 'Kleffman', NULL, NULL, 'KLEFFMAN_ROSALINDA', 'Rosalinda Kleffman'),
(54, 'Ted', 'Roman', NULL, NULL, 'ROMAN_TED', 'Ted Roman'),
(55, 'Tameka', 'Gualtieri', NULL, NULL, 'GUALTIERI_TAMEKA', 'Tameka Gualtieri'),
(56, 'Rae', 'Fiala', NULL, NULL, 'FIALA_RAE', 'Rae Fiala'),
(57, 'Malinda', 'Emmanuel', NULL, NULL, 'EMMANUEL_MALINDA', 'Malinda Emmanuel'),
(58, 'Ted', 'Blakeman', NULL, NULL, 'BLAKEMAN_TED', 'Ted Blakeman'),
(59, 'Liza', 'Balfour', NULL, NULL, 'BALFOUR_LIZA', 'Liza Balfour'),
(60, 'Ella', 'Colangelo', NULL, NULL, 'COLANGELO_ELLA', 'Ella Colangelo'),
(61, 'Amelia', 'Andress', NULL, NULL, 'ANDRESS_AMELIA', 'Amelia Andress'),
(62, 'Chris', 'Narvaez', NULL, NULL, 'NARVAEZ_CHRIS', 'Chris Narvaez'),
(63, 'Marjorie', 'Cave', NULL, NULL, 'CAVE_MARJORIE', 'Marjorie Cave'),
(64, 'Deborah', 'Storms', NULL, NULL, 'STORMS_DEBORAH', 'Deborah Storms'),
(65, 'George', 'Wysocki', NULL, NULL, 'WYSOCKI_GEORGE', 'George Wysocki'),
(66, 'Travis', 'Cruz', NULL, NULL, 'CRUZ_TRAVIS', 'Travis Cruz'),
(67, 'Mark', 'Gillam', NULL, NULL, 'GILLAM_MARK', 'Mark Gillam'),
(68, 'Danielle', 'Berryhill', NULL, NULL, 'BERRYHILL_DANIELLE', 'Danielle Berryhill'),
(69, 'Randy', 'Chisolm', NULL, NULL, 'CHISOLM_RANDY', 'Randy Chisolm'),
(70, 'Bridget', 'Hahn', NULL, NULL, 'HAHN_BRIDGET', 'Bridget Hahn'),
(71, 'Todd', 'Boehm', NULL, NULL, 'BOEHM_TODD', 'Todd Boehm'),
(72, 'Antonio', 'Howes', NULL, NULL, 'HOWES_ANTONIO', 'Antonio Howes'),
(73, 'Diana', 'Herrmann', NULL, NULL, 'HERRMANN_DIANA', 'Diana Herrmann'),
(74, 'Krista', 'Kavanagh', NULL, NULL, 'KAVANAGH_KRISTA', 'Krista Kavanagh'),
(75, 'Becky', 'Gainer', NULL, NULL, 'GAINER_BECKY', 'Becky Gainer'),
(76, 'Marvin', 'Dowdy', NULL, NULL, 'DOWDY_MARVIN', 'Marvin Dowdy'),
(77, 'Claudia', 'Biggs', NULL, NULL, 'BIGGS_CLAUDIA', 'Claudia Biggs'),
(78, 'Bryan', 'Dunton', NULL, NULL, 'DUNTON_BRYAN', 'Bryan Dunton'),
(79, 'Amanda', 'Dearborn', NULL, NULL, 'DEARBORN_AMANDA', 'Amanda Dearborn'),
(80, 'Ellen', 'Raney', NULL, NULL, 'RANEY_ELLEN', 'Ellen Raney'),
(81, 'Patrick', 'Peralta', NULL, NULL, 'PERALTA_PATRICK', 'Patrick Peralta'),
(82, 'Roy', 'Rolfe', NULL, NULL, 'ROLFE_ROY', 'Roy Rolfe'),
(83, 'Stanley', 'Salinas', NULL, NULL, 'SALINAS_STANLEY', 'Stanley Salinas'),
(84, 'Kevin', 'Bruns', NULL, NULL, 'BRUNS_KEVIN', 'Kevin Bruns'),
(85, 'Vincent', 'Ivey', NULL, NULL, 'IVEY_VINCENT', 'Vincent Ivey'),
(86, 'Holly', 'Reel', NULL, NULL, 'REEL_HOLLY', 'Holly Reel'),
(87, 'Charlene', 'Braud', NULL, NULL, 'BRAUD_CHARLENE', 'Charlene Braud'),
(88, 'Terry', 'Ruffner', NULL, NULL, 'RUFFNER_TERRY', 'Terry Ruffner'),
(89, 'Lorraine', 'Hauck', NULL, NULL, 'HAUCK_LORRAINE', 'Lorraine Hauck'),
(90, 'Ida', 'Noll', NULL, NULL, 'NOLL_IDA', 'Ida Noll'),
(91, 'Melinda', 'Timmons', NULL, NULL, 'TIMMONS_MELINDA', 'Melinda Timmons'),
(92, 'Ralph', 'Zachary', NULL, NULL, 'ZACHARY_RALPH', 'Ralph Zachary'),
(93, 'Alice', 'Roby', NULL, NULL, 'ROBY_ALICE', 'Alice Roby'),
(94, 'Natasha', 'Staples', NULL, NULL, 'STAPLES_NATASHA', 'Natasha Staples'),
(95, 'Donald', 'Pass', NULL, NULL, 'PASS_DONALD', 'Donald Pass'),
(96, 'Nathan', 'Collin', NULL, NULL, 'COLLIN_NATHAN', 'Nathan Collin'),
(97, 'Monique', 'Stonge', NULL, NULL, 'STONGE_MONIQUE', 'Monique Stonge'),
(98, 'Monica', 'Paxton', NULL, NULL, 'PAXTON_MONICA', 'Monica Paxton'),
(99, 'Georgia', 'Bonnell', NULL, NULL, 'BONNELL_GEORGIA', 'Georgia Bonnell'),
(100, 'Anthony', 'Millen', NULL, NULL, 'MILLEN_ANTHONY', 'Anthony Millen'),
(101, 'Valerie', 'Aldridge', NULL, NULL, 'ALDRIDGE_VALERIE', 'Valerie Aldridge'),
(102, 'Lola', 'Mantooth', NULL, NULL, 'MANTOOTH_LOLA', 'Lola Mantooth'),
(103, 'Joe', 'Merriman', NULL, NULL, 'MERRIMAN_JOE', 'Joe Merriman'),
(104, 'Dale', 'Henriques', NULL, NULL, 'HENRIQUES_DALE', 'Dale Henriques'),
(105, 'Elsie', 'Broome', NULL, NULL, 'BROOME_ELSIE', 'Elsie Broome'),
(106, 'Douglas', 'Audette', NULL, NULL, 'AUDETTE_DOUGLAS', 'Douglas Audette'),
(107, 'Willie', 'Sikes', NULL, NULL, 'SIKES_WILLIE', 'Willie Sikes'),
(108, 'Natalie', 'Whittier', NULL, NULL, 'WHITTIER_NATALIE', 'Natalie Whittier'),
(109, 'Nicole', 'Wasserman', NULL, NULL, 'WASSERMAN_NICOLE', 'Nicole Wasserman'),
(110, 'Benjamin', 'Marler', NULL, NULL, 'MARLER_BENJAMIN', 'Benjamin Marler'),
(111, 'Jeff', 'Zimmer', NULL, NULL, 'ZIMMER_JEFF', 'Jeff Zimmer'),
(112, 'Kara', 'Ovalle', NULL, NULL, 'OVALLE_KARA', 'Kara Ovalle'),
(113, 'Candice', 'Parr', NULL, NULL, 'PARR_CANDICE', 'Candice Parr'),
(114, 'Kristin', 'Espinosa', NULL, NULL, 'ESPINOSA_KRISTIN', 'Kristin Espinosa'),
(115, 'Jacquelyn', 'Meador', NULL, NULL, 'MEADOR_JACQUELYN', 'Jacquelyn Meador'),
(116, 'Catherine', 'Heck', NULL, NULL, 'HECK_CATHERINE', 'Catherine Heck'),
(117, 'Bruce', 'Pardo', NULL, NULL, 'PARDO_BRUCE', 'Bruce Pardo'),
(118, 'Belinda', 'Card', NULL, NULL, 'CARD_BELINDA', 'Belinda Card'),
(119, 'Martin', 'Lesko', NULL, NULL, 'LESKO_MARTIN', 'Martin Lesko'),
(120, 'Phillip', 'Cutler', NULL, NULL, 'CUTLER_PHILLIP', 'Phillip Cutler'),
(121, 'Matthew', 'Cool', NULL, NULL, 'COOL_MATTHEW', 'Matthew Cool'),
(122, 'Verna', 'Veach', NULL, NULL, 'VEACH_VERNA', 'Verna Veach'),
(123, 'Monica', 'Scarborough', NULL, NULL, 'SCARBOROUGH_MONICA', 'Monica Scarborough'),
(124, 'Sally', 'Gailey', NULL, NULL, 'GAILEY_SALLY', 'Sally Gailey'),
(125, 'Helen', 'Harley', NULL, NULL, 'HARLEY_HELEN', 'Helen Harley'),
(126, 'Sean', 'Tolbert', NULL, NULL, 'TOLBERT_SEAN', 'Sean Tolbert'),
(127, 'Bruce', 'Westover', NULL, NULL, 'WESTOVER_BRUCE', 'Bruce Westover'),
(128, 'Nicholas', 'Caswell', NULL, NULL, 'CASWELL_NICHOLAS', 'Nicholas Caswell'),
(129, 'Mamie', 'Jolley', NULL, NULL, 'JOLLEY_MAMIE', 'Mamie Jolley'),
(130, 'Gary', 'Kendall', NULL, NULL, 'KENDALL_GARY', 'Gary Kendall'),
(131, 'Jason', 'Brand', NULL, NULL, 'BRAND_JASON', 'Jason Brand'),
(132, 'Lula', 'Smythe', NULL, NULL, 'SMYTHE_LULA', 'Lula Smythe'),
(133, 'Dianne', 'Vera', NULL, NULL, 'VERA_DIANNE', 'Dianne Vera'),
(134, 'Charles', 'Addis', NULL, NULL, 'ADDIS_CHARLES', 'Charles Addis'),
(135, 'Vera', 'Conlin', NULL, NULL, 'CONLIN_VERA', 'Vera Conlin'),
(136, 'Matthew', 'Ludwig', NULL, NULL, 'LUDWIG_MATTHEW', 'Matthew Ludwig'),
(137, 'Randy', 'Simard', NULL, NULL, 'SIMARD_RANDY', 'Randy Simard'),
(138, 'Douglas', 'Lacroix', NULL, NULL, 'LACROIX_DOUGLAS', 'Douglas Lacroix'),
(139, 'Rodney', 'Saari', NULL, NULL, 'SAARI_RODNEY', 'Rodney Saari'),
(140, 'Samuel', 'Alcala', NULL, NULL, 'ALCALA_SAMUEL', 'Samuel Alcala'),
(141, 'Matthew', 'Pedraza', NULL, NULL, 'PEDRAZA_MATTHEW', 'Matthew Pedraza'),
(142, 'Amanda', 'Fredette', NULL, NULL, 'FREDETTE_AMANDA', 'Amanda Fredette'),
(143, 'Jeffrey', 'Scheller', NULL, NULL, 'SCHELLER_JEFFREY', 'Jeffrey Scheller'),
(144, 'Thomas', 'Bridge', NULL, NULL, 'BRIDGE_THOMAS', 'Thomas Bridge'),
(145, 'Brandon', 'Bullard', NULL, NULL, 'BULLARD_BRANDON', 'Brandon Bullard'),
(146, 'Norma', 'Nobles', NULL, NULL, 'NOBLES_NORMA', 'Norma Nobles'),
(147, 'Emma', 'Poor', NULL, NULL, 'POOR_EMMA', 'Emma Poor'),
(148, 'Sandra', 'Carrero', NULL, NULL, 'CARRERO_SANDRA', 'Sandra Carrero'),
(149, 'Tamara', 'Shankle', NULL, NULL, 'SHANKLE_TAMARA', 'Tamara Shankle'),
(150, 'Victor', 'Becerra', NULL, NULL, 'BECERRA_VICTOR', 'Victor Becerra'),
(151, 'Daniel', 'Peyton', NULL, NULL, 'PEYTON_DANIEL', 'Daniel Peyton'),
(152, 'Roger', 'Lett', NULL, NULL, 'LETT_ROGER', 'Roger Lett'),
(153, 'Gary', 'Mars', NULL, NULL, 'MARS_GARY', 'Gary Mars'),
(154, 'Carla', 'Newby', NULL, NULL, 'NEWBY_CARLA', 'Carla Newby'),
(155, 'Marianne', 'Weatherly', NULL, NULL, 'WEATHERLY_MARIANNE', 'Marianne Weatherly'),
(156, 'Travis', 'Nickel', NULL, NULL, 'NICKEL_TRAVIS', 'Travis Nickel'),
(157, 'Kenneth', 'Senn', NULL, NULL, 'SENN_KENNETH', 'Kenneth Senn'),
(158, 'Wanda', 'Sutherland', NULL, NULL, 'SUTHERLAND_WANDA', 'Wanda Sutherland'),
(159, 'Kristin', 'Searcy', NULL, NULL, 'SEARCY_KRISTIN', 'Kristin Searcy'),
(160, 'Timothy', 'Haygood', NULL, NULL, 'HAYGOOD_TIMOTHY', 'Timothy Haygood'),
(161, 'Charles', 'Ley', NULL, NULL, 'LEY_CHARLES', 'Charles Ley'),
(162, 'Benjamin', 'Vidrine', NULL, NULL, 'VIDRINE_BENJAMIN', 'Benjamin Vidrine'),
(163, 'Cass', 'Elliott', NULL, NULL, 'ELLIOTT_CASS', 'Cass Elliott'),
(164, 'Constance', 'Culp', NULL, NULL, 'CULP_CONSTANCE', 'Constance Culp'),
(165, 'Jeffery', 'Poff', NULL, NULL, 'POFF_JEFFERY', 'Jeffery Poff'),
(166, 'Anthony', 'Lamb', NULL, NULL, 'LAMB_ANTHONY', 'Anthony Lamb'),
(167, 'Toni', 'Mackenzie', NULL, NULL, 'MACKENZIE_TONI', 'Toni Mackenzie'),
(168, 'Sarah', 'Wimer', NULL, NULL, 'WIMER_SARAH', 'Sarah Wimer'),
(169, 'Christy', 'Lent', NULL, NULL, 'LENT_CHRISTY', 'Christy Lent'),
(170, 'Jose', 'Durrett', NULL, NULL, 'DURRETT_JOSE', 'Jose Durrett'),
(171, 'Bobby', 'Sandlin', NULL, NULL, 'SANDLIN_BOBBY', 'Bobby Sandlin'),
(172, 'James', 'Alleyne', NULL, NULL, 'ALLEYNE_JAMES', 'James Alleyne'),
(173, 'Nancy', 'Mayes', NULL, NULL, 'MAYES_NANCY', 'Nancy Mayes'),
(174, 'Jacqueline', 'Simas', NULL, NULL, 'SIMAS_JACQUELINE', 'Jacqueline Simas'),
(175, 'Kenneth', 'Beyer', NULL, NULL, 'BEYER_KENNETH', 'Kenneth Beyer'),
(176, 'Nancy', 'Lindley', NULL, NULL, 'LINDLEY_NANCY', 'Nancy Lindley'),
(177, 'Luis', 'Thurber', NULL, NULL, 'THURBER_LUIS', 'Luis Thurber'),
(178, 'Scott', 'Richie', NULL, NULL, 'RICHIE_SCOTT', 'Scott Richie'),
(179, 'Vicki', 'Bohannon', NULL, NULL, 'BOHANNON_VICKI', 'Vicki Bohannon'),
(180, 'Andreas', 'Fehn', NULL, NULL, 'FEHN_ANDREAS', 'Andreas Fehn'),
(181, 'Jacinto', 'Alcine', NULL, NULL, 'ALCINE_JACINTO', 'Jacinto Alcine'),
(182, 'Jina', 'Milwee', NULL, NULL, 'MILWEE_JINA', 'Jina Milwee'),
(183, 'Nathanael', 'Dubonnet', NULL, NULL, 'DUBONNET_NATHANAEL', 'Nathanael Dubonnet'),
(184, 'Shanice', 'Doiel', NULL, NULL, 'DOIEL_SHANICE', 'Shanice Doiel'),
(185, 'Benedict', 'Colyott', NULL, NULL, 'COLYOTT_BENEDICT', 'Benedict Colyott'),
(186, 'Waylon', 'Mildenstein', NULL, NULL, 'MILDENSTEIN_WAYLON', 'Waylon Mildenstein'),
(187, 'Letty', 'Bambace', NULL, NULL, 'BAMBACE_LETTY', 'Letty Bambace'),
(188, 'Jonelle', 'Flueck', NULL, NULL, 'FLUECK_JONELLE', 'Jonelle Flueck'),
(189, 'Manual', 'Clesen', NULL, NULL, 'CLESEN_MANUAL', 'Manual Clesen'),
(190, 'Heidi', 'Marcks', NULL, NULL, 'MARCKS_HEIDI', 'Heidi Marcks'),
(191, 'Madalyn', 'Hohlstein', NULL, NULL, 'HOHLSTEIN_MADALYN', 'Madalyn Hohlstein'),
(192, 'Tamala', 'Lovisone', NULL, NULL, 'LOVISONE_TAMALA', 'Tamala Lovisone'),
(193, 'Jenise', 'Kraichely', NULL, NULL, 'KRAICHELY_JENISE', 'Jenise Kraichely'),
(194, 'Manual', 'Chenevey', NULL, NULL, 'CHENEVEY_MANUAL', 'Manual Chenevey'),
(195, 'Sarah', 'Bonnlander', NULL, NULL, 'BONNLANDER_SARAH', 'Sarah Bonnlander'),
(196, 'Arlie', 'Fasbender', NULL, NULL, 'FASBENDER_ARLIE', 'Arlie Fasbender'),
(197, 'Santana', 'Eiesland', NULL, NULL, 'EIESLAND_SANTANA', 'Santana Eiesland'),
(198, 'Dot', 'Arquelles', NULL, NULL, 'ARQUELLES_DOT', 'Dot Arquelles'),
(199, 'Yolande', 'Laneaux', NULL, NULL, 'LANEAUX_YOLANDE', 'Yolande Laneaux'),
(200, 'Winford', 'Fixari', NULL, NULL, 'FIXARI_WINFORD', 'Winford Fixari'),
(201, 'Benton', 'Buttino', NULL, NULL, 'BUTTINO_BENTON', 'Benton Buttino'),
(202, 'Ronni', 'Luikart', NULL, NULL, 'LUIKART_RONNI', 'Ronni Luikart'),
(203, 'Ellyn', 'Darrup', NULL, NULL, 'DARRUP_ELLYN', 'Ellyn Darrup'),
(204, 'Letty', 'Oras', NULL, NULL, 'ORAS_LETTY', 'Letty Oras'),
(205, 'Hai', 'Klinnert', NULL, NULL, 'KLINNERT_HAI', 'Hai Klinnert'),
(206, 'Willia', 'Macclellan', NULL, NULL, 'MACCLELLAN_WILLIA', 'Willia Macclellan'),
(207, 'Conchita', 'Braye', NULL, NULL, 'BRAYE_CONCHITA', 'Conchita Braye'),
(208, 'Jere', 'Lungwitz', NULL, NULL, 'LUNGWITZ_JERE', 'Jere Lungwitz'),
(209, 'Erlene', 'Broccolo', NULL, NULL, 'BROCCOLO_ERLENE', 'Erlene Broccolo'),
(210, 'Ryan', 'Dowden', NULL, NULL, 'DOWDEN_RYAN', 'Ryan Dowden'),
(211, 'Martin', 'Arthur', NULL, NULL, 'ARTHUR_MARTIN', 'Martin Arthur'),
(212, 'Emily', 'Darnell', NULL, NULL, 'DARNELL_EMILY', 'Emily Darnell'),
(213, 'Emma', 'Kornegay', NULL, NULL, 'KORNEGAY_EMMA', 'Emma Kornegay'),
(214, 'Ryan', 'Forest', NULL, NULL, 'FOREST_RYAN', 'Ryan Forest'),
(215, 'James', 'Nesmith', NULL, NULL, 'NESMITH_JAMES', 'James Nesmith'),
(216, 'Richard', 'Appleton', NULL, NULL, 'APPLETON_RICHARD', 'Richard Appleton'),
(217, 'Kenneth', 'Neale', NULL, NULL, 'NEALE_KENNETH', 'Kenneth Neale'),
(218, 'Ana', 'Wickham', NULL, NULL, 'WICKHAM_ANA', 'Ana Wickham'),
(219, 'Agnes', 'Parris', NULL, NULL, 'PARRIS_AGNES', 'Agnes Parris'),
(220, 'Jonathan', 'Suggs', NULL, NULL, 'SUGGS_JONATHAN', 'Jonathan Suggs'),
(221, 'Stanley', 'Tillis', NULL, NULL, 'TILLIS_STANLEY', 'Stanley Tillis'),
(222, 'Molly', 'Almonte', NULL, NULL, 'ALMONTE_MOLLY', 'Molly Almonte'),
(223, 'Kristin', 'Courtney', NULL, NULL, 'COURTNEY_KRISTIN', 'Kristin Courtney'),
(224, 'Carolyn', 'Gilligan', NULL, NULL, 'GILLIGAN_CAROLYN', 'Carolyn Gilligan'),
(225, 'Emma', 'Poling', NULL, NULL, 'POLING_EMMA', 'Emma Poling'),
(226, 'Thomas', 'Mize', NULL, NULL, 'MIZE_THOMAS', 'Thomas Mize'),
(227, 'Antoinette', 'Thomason', NULL, NULL, 'THOMASON_ANTOINETTE', 'Antoinette Thomason'),
(228, 'Eileen', 'Goolsby', NULL, NULL, 'GOOLSBY_EILEEN', 'Eileen Goolsby'),
(229, 'Elsie', 'Macarthur', NULL, NULL, 'MACARTHUR_ELSIE', 'Elsie Macarthur'),
(230, 'Henry', 'Jaffe', NULL, NULL, 'JAFFE_HENRY', 'Henry Jaffe'),
(231, 'Lillian', 'Lovell', NULL, NULL, 'LOVELL_LILLIAN', 'Lillian Lovell'),
(232, 'Barbara', 'Weisman', NULL, NULL, 'WEISMAN_BARBARA', 'Barbara Weisman'),
(233, 'Barbara', 'Hampton', NULL, NULL, 'HAMPTON_BARBARA', 'Barbara Hampton'),
(234, 'Darlene', 'Handley', NULL, NULL, 'HANDLEY_DARLENE', 'Darlene Handley'),
(235, 'Penny', 'Keenan', NULL, NULL, 'KEENAN_PENNY', 'Penny Keenan'),
(236, 'Gregory', 'Nunley', NULL, NULL, 'NUNLEY_GREGORY', 'Gregory Nunley'),
(237, 'Alicia', 'Schulman', NULL, NULL, 'SCHULMAN_ALICIA', 'Alicia Schulman'),
(238, 'Walter', 'Paxton', NULL, NULL, 'PAXTON_WALTER', 'Walter Paxton'),
(239, 'Lisa', 'Hoffmann', NULL, NULL, 'HOFFMANN_LISA', 'Lisa Hoffmann'),
(240, 'Dale', 'Shay', NULL, NULL, 'SHAY_DALE', 'Dale Shay'),
(241, 'Eric', 'Lovato', NULL, NULL, 'LOVATO_ERIC', 'Eric Lovato'),
(242, 'Viola', 'Hance', NULL, NULL, 'HANCE_VIOLA', 'Viola Hance'),
(243, 'Latoya', 'Rhea', NULL, NULL, 'RHEA_LATOYA', 'Latoya Rhea'),
(244, 'Veronica', 'Mckinley', NULL, NULL, 'MCKINLEY_VERONICA', 'Veronica Mckinley'),
(245, 'Dora', 'Layne', NULL, NULL, 'LAYNE_DORA', 'Dora Layne'),
(246, 'Sabrina', 'Graff', NULL, NULL, 'GRAFF_SABRINA', 'Sabrina Graff'),
(247, 'Rachel', 'Kunkel', NULL, NULL, 'KUNKEL_RACHEL', 'Rachel Kunkel'),
(248, 'Robert', 'Tyson', NULL, NULL, 'TYSON_ROBERT', 'Robert Tyson'),
(249, 'Samuel', 'Violette', NULL, NULL, 'VIOLETTE_SAMUEL', 'Samuel Violette'),
(250, 'Cindy', 'Wyatt', NULL, NULL, 'WYATT_CINDY', 'Cindy Wyatt'),
(251, 'Richard', 'Carpenter', NULL, NULL, 'CARPENTER_RICHARD', 'Richard Carpenter'),
(252, 'Arthur', 'Neace', NULL, NULL, 'NEACE_ARTHUR', 'Arthur Neace'),
(253, 'Mark', 'Derose', NULL, NULL, 'DEROSE_MARK', 'Mark Derose'),
(254, 'Brian', 'Binion', NULL, NULL, 'BINION_BRIAN', 'Brian Binion'),
(255, 'Charles', 'Lindsay', NULL, NULL, 'LINDSAY_CHARLES', 'Charles Lindsay'),
(256, 'Judith', 'Stover', NULL, NULL, 'STOVER_JUDITH', 'Judith Stover'),
(257, 'Kenneth', 'Rives', NULL, NULL, 'RIVES_KENNETH', 'Kenneth Rives'),
(258, 'Vickie', 'Mccue', NULL, NULL, 'MCCUE_VICKIE', 'Vickie Mccue'),
(259, 'Walter', 'Frisch', NULL, NULL, 'FRISCH_WALTER', 'Walter Frisch'),
(260, 'Myrtle', 'Olivo', NULL, NULL, 'OLIVO_MYRTLE', 'Myrtle Olivo'),
(261, 'Verna', 'Mcloughlin', NULL, NULL, 'MCLOUGHLIN_VERNA', 'Verna Mcloughlin'),
(262, 'Sheri', 'Harbin', NULL, NULL, 'HARBIN_SHERI', 'Sheri Harbin'),
(263, 'Marian', 'Haines', NULL, NULL, 'HAINES_MARIAN', 'Marian Haines'),
(264, 'James', 'Holder', NULL, NULL, 'HOLDER_JAMES', 'James Holder'),
(265, 'Ella', 'Conti', NULL, NULL, 'CONTI_ELLA', 'Ella Conti'),
(266, 'David', 'Hang', NULL, NULL, 'HANG_DAVID', 'David Hang'),
(267, 'Jack', 'Nicholas', NULL, NULL, 'NICHOLAS_JACK', 'Jack Nicholas'),
(268, 'Albert', 'Fall', NULL, NULL, 'FALL_ALBERT', 'Albert Fall'),
(269, 'Jessica', 'Rubio', NULL, NULL, 'RUBIO_JESSICA', 'Jessica Rubio'),
(270, 'Roger', 'Walcott', NULL, NULL, 'WALCOTT_ROGER', 'Roger Walcott'),
(271, 'Vickie', 'Gottlieb', NULL, NULL, 'GOTTLIEB_VICKIE', 'Vickie Gottlieb'),
(272, 'Eugene', 'Wachter', NULL, NULL, 'WACHTER_EUGENE', 'Eugene Wachter'),
(273, 'Gerald', 'Warrick', NULL, NULL, 'WARRICK_GERALD', 'Gerald Warrick'),
(274, 'Gregory', 'Goodson', NULL, NULL, 'GOODSON_GREGORY', 'Gregory Goodson'),
(275, 'Marcia', 'Hovis', NULL, NULL, 'HOVIS_MARCIA', 'Marcia Hovis'),
(276, 'Jeffery', 'Claiborne', NULL, NULL, 'CLAIBORNE_JEFFERY', 'Jeffery Claiborne'),
(277, 'Kelli', 'Gary', NULL, NULL, 'GARY_KELLI', 'Kelli Gary'),
(278, 'Gary', 'Whitford', NULL, NULL, 'WHITFORD_GARY', 'Gary Whitford'),
(279, 'Thelma', 'Beckner', NULL, NULL, 'BECKNER_THELMA', 'Thelma Beckner'),
(280, 'Sean', 'Cagle', NULL, NULL, 'CAGLE_SEAN', 'Sean Cagle'),
(281, 'Krista', 'Wimberly', NULL, NULL, 'WIMBERLY_KRISTA', 'Krista Wimberly'),
(282, 'Aaron', 'Cantrell', NULL, NULL, 'CANTRELL_AARON', 'Aaron Cantrell'),
(283, 'Jimmy', 'Tramel', NULL, NULL, 'TRAMEL_JIMMY', 'Jimmy Tramel'),
(284, 'Blanche', 'Crespo', NULL, NULL, 'CRESPO_BLANCHE', 'Blanche Crespo'),
(285, 'Robert', 'Hardwick', NULL, NULL, 'HARDWICK_ROBERT', 'Robert Hardwick'),
(286, 'Russell', 'Bowman', NULL, NULL, 'BOWMAN_RUSSELL', 'Russell Bowman'),
(287, 'Nellie', 'Hinshaw', NULL, NULL, 'HINSHAW_NELLIE', 'Nellie Hinshaw'),
(288, 'Iris', 'Coffee', NULL, NULL, 'COFFEE_IRIS', 'Iris Coffee'),
(289, 'Brittany', 'Fults', NULL, NULL, 'FULTS_BRITTANY', 'Brittany Fults'),
(290, 'Joshua', 'Eller', NULL, NULL, 'ELLER_JOSHUA', 'Joshua Eller'),
(291, 'George', 'Campbell', NULL, NULL, 'CAMPBELL_GEORGE', 'George Campbell'),
(292, 'Arthur', 'Wexler', NULL, NULL, 'WEXLER_ARTHUR', 'Arthur Wexler'),
(293, 'Albert', 'Montgomery', NULL, NULL, 'MONTGOMERY_ALBERT', 'Albert Montgomery'),
(294, 'Angela', 'Beltz', NULL, NULL, 'BELTZ_ANGELA', 'Angela Beltz'),
(295, 'Martin', 'Justus', NULL, NULL, 'JUSTUS_MARTIN', 'Martin Justus'),
(296, 'Beth', 'Pettiford', NULL, NULL, 'PETTIFORD_BETH', 'Beth Pettiford'),
(297, 'Paul', 'Lankford', NULL, NULL, 'LANKFORD_PAUL', 'Paul Lankford'),
(298, 'Roy', 'Hang', NULL, NULL, 'HANG_ROY', 'Roy Hang'),
(299, 'Bernice', 'Blythe', NULL, NULL, 'BLYTHE_BERNICE', 'Bernice Blythe'),
(300, 'Aaron', 'Bradshaw', NULL, NULL, 'BRADSHAW_AARON', 'Aaron Bradshaw'),
(301, 'Ralph', 'Charley', NULL, NULL, 'CHARLEY_RALPH', 'Ralph Charley'),
(302, 'Claire', 'Chamness', NULL, NULL, 'CHAMNESS_CLAIRE', 'Claire Chamness'),
(303, 'Jane', 'Perryman', NULL, NULL, 'PERRYMAN_JANE', 'Jane Perryman'),
(304, 'Megan', 'Mohr', NULL, NULL, 'MOHR_MEGAN', 'Megan Mohr'),
(305, 'Brittany', 'Carlo', NULL, NULL, 'CARLO_BRITTANY', 'Brittany Carlo'),
(306, 'Arthur', 'Palacio', NULL, NULL, 'PALACIO_ARTHUR', 'Arthur Palacio'),
(307, 'Vanessa', 'Soliz', NULL, NULL, 'SOLIZ_VANESSA', 'Vanessa Soliz'),
(308, 'Luis', 'Hastings', NULL, NULL, 'HASTINGS_LUIS', 'Luis Hastings'),
(309, 'Natasha', 'Horne', NULL, NULL, 'HORNE_NATASHA', 'Natasha Horne'),
(310, 'Harold', 'Dickinson', NULL, NULL, 'DICKINSON_HAROLD', 'Harold Dickinson'),
(311, 'Ella', 'Neighbors', NULL, NULL, 'NEIGHBORS_ELLA', 'Ella Neighbors'),
(312, 'Danny', 'Gerard', NULL, NULL, 'GERARD_DANNY', 'Danny Gerard'),
(313, 'Pamela', 'Nadeau', NULL, NULL, 'NADEAU_PAMELA', 'Pamela Nadeau'),
(314, 'Martin', 'Savage', NULL, NULL, 'SAVAGE_MARTIN', 'Martin Savage'),
(315, 'Jonathan', 'Seaman', NULL, NULL, 'SEAMAN_JONATHAN', 'Jonathan Seaman'),
(316, 'Shelly', 'Whitcomb', NULL, NULL, 'WHITCOMB_SHELLY', 'Shelly Whitcomb'),
(317, 'Walter', 'Luster', NULL, NULL, 'LUSTER_WALTER', 'Walter Luster'),
(318, 'Donald', 'Pape', NULL, NULL, 'PAPE_DONALD', 'Donald Pape'),
(319, 'Annie', 'Binns', NULL, NULL, 'BINNS_ANNIE', 'Annie Binns'),
(320, 'Rachel', 'Killian', NULL, NULL, 'KILLIAN_RACHEL', 'Rachel Killian'),
(321, 'Ernest', 'Despain', NULL, NULL, 'DESPAIN_ERNEST', 'Ernest Despain'),
(322, 'Jerry', 'Freitag', NULL, NULL, 'FREITAG_JERRY', 'Jerry Freitag'),
(323, 'Andrew', 'Steinberg', NULL, NULL, 'STEINBERG_ANDREW', 'Andrew Steinberg'),
(324, 'Aaron', 'Voorhees', NULL, NULL, 'VOORHEES_AARON', 'Aaron Voorhees'),
(325, 'Carl', 'Carden', NULL, NULL, 'CARDEN_CARL', 'Carl Carden'),
(326, 'Bruce', 'Dombrowski', NULL, NULL, 'DOMBROWSKI_BRUCE', 'Bruce Dombrowski'),
(327, 'Chris', 'Mcmahon', NULL, NULL, 'MCMAHON_CHRIS', 'Chris Mcmahon'),
(328, 'Gertrude', 'Ousley', NULL, NULL, 'OUSLEY_GERTRUDE', 'Gertrude Ousley'),
(329, 'Arthur', 'Smythe', NULL, NULL, 'SMYTHE_ARTHUR', 'Arthur Smythe'),
(330, 'Stanley', 'Wojcik', NULL, NULL, 'WOJCIK_STANLEY', 'Stanley Wojcik'),
(331, 'Tamara', 'Gower', NULL, NULL, 'GOWER_TAMARA', 'Tamara Gower'),
(332, 'Wilma', 'Holmgren', NULL, NULL, 'HOLMGREN_WILMA', 'Wilma Holmgren'),
(333, 'Jorge', 'Gonzalez', NULL, NULL, 'GONZALEZ_JORGE', 'Jorge Gonzalez'),
(334, 'Yvette', 'Hochstetler', NULL, NULL, 'HOCHSTETLER_YVETTE', 'Yvette Hochstetler'),
(335, 'Richard', 'Hollenbeck', NULL, NULL, 'HOLLENBECK_RICHARD', 'Richard Hollenbeck'),
(336, 'Elizabeth', 'Hatley', NULL, NULL, 'HATLEY_ELIZABETH', 'Elizabeth Hatley'),
(337, 'Harold', 'Bullington', NULL, NULL, 'BULLINGTON_HAROLD', 'Harold Bullington'),
(338, 'Mattie', 'Mcclung', NULL, NULL, 'MCCLUNG_MATTIE', 'Mattie Mcclung'),
(339, 'Benjamin', 'Mchale', NULL, NULL, 'MCHALE_BENJAMIN', 'Benjamin Mchale'),
(340, 'Sherri', 'Shupe', NULL, NULL, 'SHUPE_SHERRI', 'Sherri Shupe'),
(341, 'Steven', 'Aho', NULL, NULL, 'AHO_STEVEN', 'Steven Aho'),
(342, 'Jonathan', 'Waldon', NULL, NULL, 'WALDON_JONATHAN', 'Jonathan Waldon'),
(343, 'Juan', 'Bui', NULL, NULL, 'BUI_JUAN', 'Juan Bui'),
(344, 'Jodi', 'Li', NULL, NULL, 'LI_JODI', 'Jodi Li'),
(345, 'Geneva', 'Kong', NULL, NULL, 'KONG_GENEVA', 'Geneva Kong'),
(346, 'Justin', 'Lizotte', NULL, NULL, 'LIZOTTE_JUSTIN', 'Justin Lizotte'),
(347, 'Esther', 'Brush', NULL, NULL, 'BRUSH_ESTHER', 'Esther Brush'),
(348, 'Jack', 'Olmstead', NULL, NULL, 'OLMSTEAD_JACK', 'Jack Olmstead'),
(349, 'Melanie', 'Woolfolk', NULL, NULL, 'WOOLFOLK_MELANIE', 'Melanie Woolfolk'),
(350, 'Randy', 'Horst', NULL, NULL, 'HORST_RANDY', 'Randy Horst'),
(351, 'Maryann', 'Swaney', NULL, NULL, 'SWANEY_MARYANN', 'Maryann Swaney'),
(352, 'Jack', 'Glaser', NULL, NULL, 'GLASER_JACK', 'Jack Glaser'),
(353, 'Charlene', 'Leary', NULL, NULL, 'LEARY_CHARLENE', 'Charlene Leary'),
(354, 'Eileen', 'Lohr', NULL, NULL, 'LOHR_EILEEN', 'Eileen Lohr'),
(355, 'Larry', 'Dunaway', NULL, NULL, 'DUNAWAY_LARRY', 'Larry Dunaway'),
(356, 'Arthur', 'Mallette', NULL, NULL, 'MALLETTE_ARTHUR', 'Arthur Mallette'),
(357, 'Adam', 'Steverson', NULL, NULL, 'STEVERSON_ADAM', 'Adam Steverson'),
(358, 'Judith', 'Angel', NULL, NULL, 'ANGEL_JUDITH', 'Judith Angel'),
(359, 'Tina', 'Weese', NULL, NULL, 'WEESE_TINA', 'Tina Weese'),
(360, 'Gregory', 'Rivera', NULL, NULL, 'RIVERA_GREGORY', 'Gregory Rivera'),
(361, 'Marvin', 'Ring', NULL, NULL, 'RING_MARVIN', 'Marvin Ring'),
(362, 'Karl', 'Cottingham', NULL, NULL, 'COTTINGHAM_KARL', 'Karl Cottingham'),
(363, 'Carl', 'Kunz', NULL, NULL, 'KUNZ_CARL', 'Carl Kunz'),
(364, 'Brittany', 'Lofton', NULL, NULL, 'LOFTON_BRITTANY', 'Brittany Lofton'),
(365, 'Jerry', 'Cotter', NULL, NULL, 'COTTER_JERRY', 'Jerry Cotter'),
(366, 'Albert', 'Morrow', NULL, NULL, 'MORROW_ALBERT', 'Albert Morrow'),
(367, 'Terry', 'Perez', NULL, NULL, 'PEREZ_TERRY', 'Terry Perez'),
(368, 'Luis', 'Willingham', NULL, NULL, 'WILLINGHAM_LUIS', 'Luis Willingham'),
(369, 'Stephen', 'Daily', NULL, NULL, 'DAILY_STEPHEN', 'Stephen Daily'),
(370, 'William', 'Hagen', NULL, NULL, 'HAGEN_WILLIAM', 'William Hagen'),
(371, 'Terri', 'Patel', NULL, NULL, 'PATEL_TERRI', 'Terri Patel'),
(372, 'Irma', 'Proulx', NULL, NULL, 'PROULX_IRMA', 'Irma Proulx'),
(373, 'Andrew', 'Blazer', NULL, NULL, 'BLAZER_ANDREW', 'Andrew Blazer'),
(374, 'Victoria', 'Broadus', NULL, NULL, 'BROADUS_VICTORIA', 'Victoria Broadus'),
(375, 'Tony', 'Cairns', NULL, NULL, 'CAIRNS_TONY', 'Tony Cairns'),
(376, 'Maryann', 'Welter', NULL, NULL, 'WELTER_MARYANN', 'Maryann Welter'),
(377, 'Rachel', 'Smallwood', NULL, NULL, 'SMALLWOOD_RACHEL', 'Rachel Smallwood'),
(378, 'George', 'Nickel', NULL, NULL, 'NICKEL_GEORGE', 'George Nickel'),
(379, 'Jerry', 'Chacon', NULL, NULL, 'CHACON_JERRY', 'Jerry Chacon'),
(380, 'Johnny', 'Burrow', NULL, NULL, 'BURROW_JOHNNY', 'Johnny Burrow'),
(381, 'Tina', 'Bastian', NULL, NULL, 'BASTIAN_TINA', 'Tina Bastian'),
(382, 'Billy', 'Baily', NULL, NULL, 'BAILY_BILLY', 'Billy Baily'),
(383, 'Marian', 'Portillo', NULL, NULL, 'PORTILLO_MARIAN', 'Marian Portillo'),
(384, 'Margarita', 'Wesson', NULL, NULL, 'WESSON_MARGARITA', 'Margarita Wesson'),
(385, 'Ralph', 'Samuel', NULL, NULL, 'SAMUEL_RALPH', 'Ralph Samuel'),
(386, 'William', 'Hundley', NULL, NULL, 'HUNDLEY_WILLIAM', 'William Hundley'),
(387, 'Janice', 'Graff', NULL, NULL, 'GRAFF_JANICE', 'Janice Graff'),
(388, 'Marianne', 'Hafer', NULL, NULL, 'HAFER_MARIANNE', 'Marianne Hafer'),
(389, 'Vanessa', 'Kelso', NULL, NULL, 'KELSO_VANESSA', 'Vanessa Kelso'),
(390, 'Robert', 'Strasser', NULL, NULL, 'STRASSER_ROBERT', 'Robert Strasser'),
(391, 'Alicia', 'Fairchild', NULL, NULL, 'FAIRCHILD_ALICIA', 'Alicia Fairchild'),
(392, 'Josephine', 'Gish', NULL, NULL, 'GISH_JOSEPHINE', 'Josephine Gish'),
(393, 'Clara', 'Seitz', NULL, NULL, 'SEITZ_CLARA', 'Clara Seitz'),
(394, 'Roger', 'Ketcham', NULL, NULL, 'KETCHAM_ROGER', 'Roger Ketcham'),
(395, 'Jo', 'Hathaway', NULL, NULL, 'HATHAWAY_JO', 'Jo Hathaway'),
(396, 'Tanya', 'Delrosario', NULL, NULL, 'DELROSARIO_TANYA', 'Tanya Delrosario'),
(397, 'Christina', 'Regan', NULL, NULL, 'REGAN_CHRISTINA', 'Christina Regan'),
(398, 'Diane', 'Claussen', NULL, NULL, 'CLAUSSEN_DIANE', 'Diane Claussen'),
(399, 'June', 'Marston', NULL, NULL, 'MARSTON_JUNE', 'June Marston'),
(400, 'Lorraine', 'Dupree', NULL, NULL, 'DUPREE_LORRAINE', 'Lorraine Dupree'),
(401, 'Gladys', 'Ash', NULL, NULL, 'ASH_GLADYS', 'Gladys Ash'),
(402, 'Rosa', 'Guthrie', NULL, NULL, 'GUTHRIE_ROSA', 'Rosa Guthrie'),
(403, 'Sean', 'Culp', NULL, NULL, 'CULP_SEAN', 'Sean Culp'),
(404, 'Martha', 'Jaynes', NULL, NULL, 'JAYNES_MARTHA', 'Martha Jaynes'),
(405, 'Norma', 'Loy', NULL, NULL, 'LOY_NORMA', 'Norma Loy'),
(406, 'Bernice', 'Cordova', NULL, NULL, 'CORDOVA_BERNICE', 'Bernice Cordova'),
(407, 'Martin', 'Burgin', NULL, NULL, 'BURGIN_MARTIN', 'Martin Burgin'),
(408, 'Johnny', 'Wilde', NULL, NULL, 'WILDE_JOHNNY', 'Johnny Wilde'),
(409, 'Carlos', 'Lenard', NULL, NULL, 'LENARD_CARLOS', 'Carlos Lenard'),
(410, 'Scott', 'Unruh', NULL, NULL, 'UNRUH_SCOTT', 'Scott Unruh'),
(411, 'Nellie', 'Sussman', NULL, NULL, 'SUSSMAN_NELLIE', 'Nellie Sussman'),
(412, 'Jerry', 'Markowitz', NULL, NULL, 'MARKOWITZ_JERRY', 'Jerry Markowitz'),
(413, 'Carlos', 'Randolph', NULL, NULL, 'RANDOLPH_CARLOS', 'Carlos Randolph'),
(414, 'Luciano', 'Sorento', NULL, NULL, 'SORENTO_LUCIANO', 'Luciano Sorento'),
(415, 'Glenn', 'Sharpe', NULL, NULL, 'SHARPE_GLENN', 'Glenn Sharpe'),
(416, 'Jason', 'Jasso', NULL, NULL, 'JASSO_JASON', 'Jason Jasso'),
(417, 'Terry', 'Herod', NULL, NULL, 'HEROD_TERRY', 'Terry Herod'),
(418, 'Terry', 'Hackworth', NULL, NULL, 'HACKWORTH_TERRY', 'Terry Hackworth'),
(419, 'Anthony', 'Curley', NULL, NULL, 'CURLEY_ANTHONY', 'Anthony Curley'),
(420, 'Chandra', 'Hansley', NULL, NULL, 'HANSLEY_CHANDRA', 'Chandra Hansley');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int UNSIGNED NOT NULL,
  `room_id` int DEFAULT NULL,
  `floor_id` int DEFAULT NULL,
  `org2_id` int DEFAULT NULL,
  `employee_id` varchar(25) DEFAULT NULL,
  `employeeName` varchar(50) DEFAULT NULL,
  `extension` char(10) DEFAULT NULL,
  `phone` char(10) DEFAULT NULL,
  `hotel` tinyint DEFAULT NULL,
  `security_card` int DEFAULT NULL,
  `employee_number` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `room_id`, `floor_id`, `org2_id`, `employee_id`, `employeeName`, `extension`, `phone`, `hotel`, `security_card`, `employee_number`) VALUES
(1, 1, 1, 1, 'PARTRIDGE_ALAN', 'Alan Partridge', '4629', '377-4629', 0, 1, 9998),
(2, 2, 1, 1, 'AGUILERA_CHRISTINA', 'Christina Aguilera', '5770', '377-5770', 0, 2, 9997),
(3, 4, 1, 3, 'BLOOGS_JOE', 'Joe Bloogs', '4962', '377-4962', 0, 3, 9996),
(4, 5, 1, 3, 'ABBOT_ALAN', 'Alan Abbot', '6502', '377-6502', 0, 4, 9995),
(5, 6, 1, 4, 'ABRAHAM_ALAN', 'Alan Abraham', '7622', '377-7622', 0, 5, 9994),
(6, 8, 1, 5, 'Washington_Denzel', 'Denzil Washington', '8603', '377-8603', 0, 6, 9993),
(7, 9, 1, 4, 'ANDERSEN_MIKE', 'Mike Andersen', '1151', '377-1151', 0, 7, 9992),
(8, 10, 1, 6, 'MCLEOD_ANDREW', 'Andrew McLoed', '5944', '377-5944', 0, 8, 9991),
(9, 12, 1, 7, 'BAKER_TIM', 'Tim Baker', '7266', '377-7266', 0, 9, 9990),
(10, 13, 1, 8, 'WILLIAMS_ANDY', 'Andy Williams', '8500', '377-8500', 0, 10, 9989),
(11, 18, 1, 1, 'PHILLIPS_TERRY', 'Terry Phillips', '1703', '377-1703', 0, 11, 9988),
(12, 19, 1, 5, 'BUDWIESER_BARRY', 'Bary Budwieser', '9014', '377-9014', 0, 12, 9987),
(13, 20, 1, 9, 'CORR_ANDREA', 'Andrea Corr', '2959', '377-2959', 0, 13, 9986),
(14, 21, 1, 10, 'EDWARDS_MICHAEL', 'MICHAEL EDWARDS', '4756', '377-4756', 0, 14, 9985),
(15, 23, 1, 4, 'BEER_STELLA', 'Stella Beer', '4900', '377-4900', 0, 15, 9984),
(16, 24, 1, 10, 'EISENBERG_NEVILLE', 'NEVILLE EISENBERG', '9235', '377-9235', 0, 16, 9983),
(17, 25, 1, 10, 'EK_MARI', 'MARI EK', '3472', '377-3472', 0, 17, 9982),
(18, 26, 1, 10, 'ELIA_STELIOS', 'STELIOS ELIA', '6655', '377-6655', 0, 18, 9981),
(19, 27, 1, 10, 'ELIASOV_AVITAL', 'AVITAL ELIASOV', '3861', '377-3861', 0, 19, 9980),
(20, 28, 1, 10, 'ELWELL_SELINA', 'SELINA ELWELL', '7339', '377-7339', 0, 20, 9979),
(21, 29, 1, 10, 'EPISSINA_NATASHA', 'NATASHA EPISSINA', '6114', '377-6114', 0, 21, 9978),
(22, 30, 1, 8, 'BROWNE_JACK', 'Jack Browne', '7550', '377-7550', 0, 22, 9977),
(23, 31, 1, 11, 'DE NOBLET_GILLES', 'GILLES DE NOBLET', '9408', '377-9408', 0, 23, 9976),
(24, 32, 1, 10, 'ERHAHON_JACKY', 'JACKY ERHAHON', '5392', '377-5392', 0, 24, 9975),
(25, 34, 1, 10, 'ESCOBAR_JOHNY', 'JOHNY ESCOBAR', '6736', '377-6736', 0, 25, 9974),
(26, 36, 1, 6, 'CLARKSON_BOB', 'Bob Clarkson', '7505', '377-7505', 0, 26, 9973),
(27, 37, 1, 7, 'MONTALO_CONNEY', 'Conney Montalo', '7314', '377-7314', 0, 27, 9972),
(28, 40, 1, 12, 'EDDY_JAMES', 'JAMES EDDY', '4058', '377-4058', 0, 28, 9971),
(29, 41, 1, 12, 'DE SILVA_MARC', 'MARC DE SILVA', '6347', '377-6347', 0, 29, 9970),
(30, 42, 1, 12, 'FOLLEY_LAURA', 'LAURA FOLLEY', '9563', '377-9563', 0, 30, 9969),
(31, 43, 1, 13, 'CRUICKSHANK_CAROLINE', 'Caroline Cruickshank', '9772', '377-9772', 0, 31, 9968),
(32, 45, 1, 12, 'FORD_JODY', 'JODY FORD', '1170', '377-1170', 0, 32, 9967),
(33, 47, 1, 14, 'CHATER_DAVID', 'David Chater', '2533', '377-2533', 0, 33, 9966),
(34, 48, 1, 3, 'DE VILLERS_JUSTIN', 'JUSTIN DE VILLERS', '8157', '377-8157', 0, 34, 9965),
(35, 49, 1, 12, 'EDWARDS_LOUISE', 'LOUISE EDWARDS', '5184', '377-5184', 0, 35, 9964),
(36, 50, 1, 12, 'COLLINS_JOAN', 'Collins Joan', '9448', '377-9448', 0, 36, 9963),
(37, 51, 1, 12, 'COLLIMORE_SARAH', 'Sarah Collimore', '3689', '377-3689', 0, 37, 9962),
(38, 52, 1, 15, 'DONOVAN_JUDE', 'Jude Donavan', '7102', '377-7102', 0, 38, 9961),
(39, 53, 1, 16, 'DYLAN_BARRY', 'Barry Dylan', '5444', '377-5444', 0, 39, 9960),
(40, 55, 1, 12, 'CORMACK_YVONNE', 'Yvonne Cormack', '4914', '377-4914', 0, 40, 9959),
(41, 56, 1, 12, 'FAGAN_ANTHONY', 'ANTHONY FAGAN', '7239', '377-7239', 0, 41, 9958),
(42, 57, 1, 12, 'CURRY_CATHY', 'Cathy Curry', '2450', '377-2450', 0, 42, 9957),
(43, 58, 1, 12, 'FARIA_CARLA', 'CARLA FARIA', '7534', '377-7534', 0, 43, 9956),
(44, 59, 1, 12, 'COULTHARD_DEREK', 'Derek Coulthard', '2318', '377-2318', 0, 44, 9955),
(45, 60, 1, 17, 'DRAYFUS_LEE', 'Lee Drayfuss', '5991', '377-5991', 0, 45, 9954),
(46, 61, 1, 18, 'DIFFORD_CHRIS', 'Chris Difford', '4000', '377-4000', 0, 46, 9953),
(47, 62, 1, 12, 'COULTHARD_MICHAEL', 'Micheal Coluthard', '1025', '377-1025', 0, 47, 9952),
(48, 63, 1, 12, 'COURAGE_KAREN', 'Karen Courage', '1127', '377-1127', 0, 48, 9951),
(49, 64, 1, 12, 'CROWE_BOB', 'Bob Crowe', '1558', '377-1558', 0, 49, 9950),
(50, 65, 1, 17, 'EVANS_RICHARD', 'Richard Evans', '3410', '377-3410', 0, 50, 9949),
(51, 66, 1, 17, 'E_MCARTHY', 'Ellen McCarthy', '2377', '377-2377', 0, 51, 9948),
(52, 67, 1, 12, 'D_ELLIOTT', 'Dermot Elliott', '9654', '377-9654', 0, 52, 9947),
(53, 68, 1, 12, 'FRANCIS_MICHELLE', 'Michelle Francis', '4138', '377-4138', 0, 53, 9946),
(54, 69, 1, 12, 'DEDICOTE_ALAN', 'A Dedicote', '8728', '377-8728', 0, 54, 9945),
(55, 70, 1, 17, 'ENFIELD_HAROLD', 'Harold Enfield', '3225', '377-3225', 0, 55, 9944),
(56, 71, 1, 17, 'EVANS_CHRIS', 'Chris Evans', '6941', '377-6941', 0, 56, 9943),
(57, 72, 1, 19, 'FOSTER_FRED', 'Fred Foster', '6030', '377-6030', 0, 57, 9942),
(58, 73, 1, 16, 'CHEUNG_KATIE', 'Katie Cheung', '8328', '377-8328', 0, 58, 9941),
(59, 74, 1, 12, 'GELDOLF_JEREMEY', 'Jeremey Geldolf', '4550', '377-4550', 0, 59, 9940),
(60, 75, 1, 17, 'FORRESTER_PHIL', 'Phil Forrreter', '5767', '377-5767', 0, 60, 9939),
(61, 77, 1, 12, 'FOSTER_JULIA', 'Julia Foster', '5186', '377-5186', 0, 61, 9938),
(62, 78, 1, 6, 'SMITH_ADAM', 'A Smith', '7626', '377-7626', 0, 62, 9937),
(63, 79, 1, 18, 'GAY_LISA', 'Lisa Gay', '3574', '377-3574', 0, 63, 9936),
(64, 80, 1, 18, 'FRANKLIN_JIM', 'Jim Franklin', '2991', '377-2991', 0, 64, 9935),
(65, 81, 1, 20, 'FEIGELMAN_MASHA', 'MASHA FEIGELMAN', '3235', '377-3235', 0, 65, 9934),
(66, 82, 1, 21, 'FIANAPIRI_VERA', 'VERA FIANAPIRI', '6202', '377-6202', 0, 66, 9933),
(67, 83, 1, 22, 'FIGUEROA_ROBERTO', 'ROBERTO FIGUEROA', '2305', '377-2305', 0, 67, 9932),
(68, 84, 1, 23, 'HUDD_TERRY', 'Terry Hud', '9918', '377-9918', 0, 68, 9931),
(69, 85, 1, 22, 'FLURIO RUBES_ERIKA', 'ERIKA FLURIO RUBES', '5677', '377-5677', 0, 69, 9930),
(70, 86, 1, 24, 'FORDE_HALEY', 'HALEY FORDE', '6630', '377-6630', 0, 70, 9929),
(71, 87, 1, 17, 'GILL_ALEC_ALAN', 'Alec Alan Gill', '6118', '377-6118', 0, 71, 9928),
(72, 88, 1, 10, 'FRANCIS_JIMMY', 'JIMMY FRANCIS', '9701', '377-9701', 0, 72, 9927),
(73, 91, 1, 11, 'DELUCE_JILL', 'JILL DELUCE', '2149', '377-2149', 0, 73, 9926),
(74, 92, 1, 18, 'HOPKINS_ANTHONY', 'Anthony Hopkins', '7644', '377-7644', 0, 74, 9925),
(75, 93, 1, 25, 'GRIFFITH_NANCY', 'Nancy Griffith', '3774', '377-3774', 0, 75, 9924),
(76, 94, 1, 4, 'FRASER_NESSA', 'NESSA FRASER', '3937', '377-3937', 0, 76, 9923),
(77, 95, 1, 18, 'IAIN CLARK', 'Iain Clark', '7363', '377-7363', 0, 77, 9922),
(78, 96, 1, 2, 'SMITH_ALAN', 'Alan Smith', '6005', '377-6005', 0, 78, 9921),
(79, 97, 1, 12, 'HENMAN_TERRY', 'Terry Henman', '6934', '377-6934', 0, 79, 9920),
(80, 98, 1, 25, 'GUINESS_GUY', 'Guy Guy', '6657', '377-6657', 0, 80, 9919),
(81, 100, 1, 4, 'JACKIE RODGERS', 'Jackie Rodgers', '2480', '377-2480', 0, 81, 9918),
(82, 101, 1, 23, 'J_MATELOT', 'John Matelot', '9432', '377-9432', 0, 82, 9917),
(83, 102, 1, 23, 'JONES_BRIAN', 'Brain Jones', '2718', '377-2718', 0, 83, 9916),
(84, 103, 1, 6, 'H_NELSON', 'Horatio Nelson', '2297', '377-2297', 0, 84, 9915),
(85, 104, 1, 26, 'HANCOCK_TONY', 'Tony Hancock', '2327', '377-2327', 0, 85, 9914),
(86, 105, 1, 26, 'HUGHES_B', 'Billy Hughes', '3747', '377-3747', 0, 86, 9913),
(87, 106, 1, 18, 'JHAWKINS@EXCITECH.COM', 'Jack Hawkins', '1753', '377-1753', 0, 87, 9912),
(88, 107, 1, 18, 'HENDRIX_JIMMY', 'Jimmy Hendrix', '5524', '377-5524', 0, 88, 9911),
(89, 108, 1, 23, 'HACKETT_STEVE', 'Steve Hackett', '3361', '377-3361', 0, 89, 9910),
(90, 111, 1, 18, 'JACKIE GEISEN', 'Jackie Geisen', '8231', '377-8231', 0, 90, 9909),
(91, 112, 1, 14, 'HEARST, GARY', 'GARY HEARST', '3075', '377-3075', 0, 91, 9908),
(92, 113, 1, 11, 'DERBYSHIRE_TERENCE', 'TERENCE DERBYSHIRE', '7681', '377-7681', 0, 92, 9907),
(93, 114, 1, 11, 'DESAI_HEMAL', 'HEMAL DESAI', '1179', '377-1179', 0, 93, 9906),
(94, 115, 1, 23, 'JOHNSON_AMY', 'Amy Johnson', '8853', '377-8853', 0, 94, 9905),
(95, 116, 1, 18, 'JONES_ADAM', 'Adam Jones', '3729', '377-3729', 0, 95, 9904),
(96, 117, 1, 6, 'HARRY_HARP', 'Harry Harp', '9087', '377-9087', 0, 96, 9903),
(97, 118, 1, 11, 'DEVANI_MEENAL', 'MEENAL DEVANI', '6246', '377-6246', 0, 97, 9902),
(98, 119, 1, 12, 'HARKIN_EMMA', 'Emma Harkin', '2970', '377-2970', 0, 98, 9901),
(99, 120, 1, 23, 'JONES_ALAN', 'Alan Jones', '4114', '377-4114', 0, 99, 9900),
(100, 121, 1, 17, 'HARRIS_RON', 'Ron Harris', '1657', '377-1657', 0, 100, 9899),
(101, 122, 1, 27, 'DEVINE_BETH', 'BETH DEVINE', '3943', '377-3943', 0, 101, 9898),
(102, 123, 1, 28, 'DEWHURST_MARTIN', 'MARTIN DEWHURST', '4746', '377-4746', 0, 102, 9897),
(103, 124, 1, 11, 'DICHIARA_STEPHANIE', 'STEPHANIE DICHIARA', '1898', '377-1898', 0, 103, 9896),
(104, 125, 1, 27, 'DICKS_SARAH', 'SARAH DICKS', '3255', '377-3255', 0, 104, 9895),
(105, 126, 1, 27, 'DICKSON_TIM', 'TIM DICKSON', '9580', '377-9580', 0, 105, 9894),
(106, 127, 1, 28, 'DIETES_SANDRA', 'SANDRA DIETES', '1134', '377-1134', 0, 106, 9893),
(107, 128, 1, 28, 'DIGNAM_TRACEY', 'TRACEY DIGNAM', '2932', '377-2932', 0, 107, 9892),
(108, 129, 1, 11, 'DIMSON_JOHNATHAN', 'JOHNATHAN DIMSON', '1258', '377-1258', 0, 108, 9891),
(109, 131, 1, 10, 'DIXIT_VISHAL', 'VISHAL DIXIT', '5494', '377-5494', 0, 109, 9890),
(110, 135, 1, 23, 'LACEY_GINGER', 'Ginger Lacey', '4695', '377-4695', 0, 110, 9889),
(111, 136, 1, 4, 'JONES_PETER', 'Peter Jones', '5993', '377-5993', 0, 111, 9888),
(112, 137, 1, 23, 'QUEEN_BOB', 'Bob Queen', '5880', '377-5880', 0, 112, 9887),
(113, 138, 1, 29, 'DJEDDOUR_TARIK', 'TARIK DJEDDOUR', '1421', '377-1421', 0, 113, 9886),
(114, 139, 1, 4, 'DROBEK_MARIA', 'Maria Drobek', '6466', '377-6466', 0, 114, 9885),
(115, 144, 1, 23, 'JONES_BEN', 'Ben Jones', '9065', '377-9065', 0, 115, 9884),
(116, 145, 1, 12, 'JONES_BARRY', 'Barry Jones', '6928', '377-6928', 0, 116, 9883),
(117, 146, 1, 4, 'BRANSON_RICHARD', 'Richard Branson', '6447', '377-6447', 0, 117, 9882),
(118, 147, 1, 23, 'JONES_BERNADETTE', 'Benie Jones', '1449', '377-1449', 0, 118, 9881),
(119, 148, 1, 23, 'JONES_APPLE', 'Apple Jones', '4905', '377-4905', 0, 119, 9880),
(120, 149, 1, 23, 'ROSS_PHIL', 'Phil Ross', '1177', '377-1177', 0, 120, 9879),
(121, 150, 1, 23, 'SEGAL_STEVEN', 'Steve Segal', '8170', '377-8170', 0, 121, 9878),
(122, 151, 1, 23, 'JONES_ANTHEA', 'Anthea Jones', '9320', '377-9320', 0, 122, 9877),
(123, 152, 1, 13, 'JONES_ANDREW', 'Andrew Jones', '3089', '377-3089', 0, 123, 9876),
(124, 153, 1, 23, 'JONES_ANITA', 'Anita Jones', '4483', '377-4483', 0, 124, 9875),
(125, 154, 1, 12, 'JONES_ANNABEL', 'Annabel Jones', '3151', '377-3151', 0, 125, 9874),
(126, 155, 1, 30, 'SHRUB_GEORGE', 'George Shrub', '1303', '377-1303', 0, 126, 9873),
(127, 156, 1, 30, 'SLIM_FATBOY', 'Slim Fatboy', '5065', '377-5065', 0, 127, 9872),
(128, 157, 1, 1, 'FRALEY_DOUG', 'DOUG FRALEY', '2413', '377-2413', 0, 128, 9871),
(129, 272, 3, 39, 'JOLLEY_MAMIE', 'Mamie Jolley', '4872', '377-4872', 0, 129, 9870),
(130, 273, 3, 40, 'KENDALL_GARY', 'Gary Kendall', '7118', '377-7118', 0, 130, 9869),
(131, 274, 3, 40, 'BRAND_JASON', 'Jason Brand', '1977', '377-1977', 0, 131, 9868),
(132, 275, 3, 40, 'SMYTHE_LULA', 'Lula Smythe', '5532', '377-5532', 0, 132, 9867),
(133, 276, 3, 3, 'VERA_DIANNE', 'Dianne Vera', '2728', '377-2728', 0, 133, 9866),
(134, 277, 3, 3, 'ADDIS_CHARLES', 'Charles Addis', '5044', '377-5044', 0, 134, 9865),
(135, 278, 3, 3, 'CONLIN_VERA', 'Vera Conlin', '7034', '377-7034', 0, 135, 9864),
(136, 279, 3, 3, 'LUDWIG_MATTHEW', 'Matthew Ludwig', '1039', '377-1039', 0, 136, 9863),
(137, 280, 3, 3, 'SIMARD_RANDY', 'Randy Simard', '1095', '377-1095', 0, 137, 9862),
(138, 281, 3, 3, 'LACROIX_DOUGLAS', 'Douglas Lacroix', '1356', '377-1356', 0, 138, 9861),
(139, 283, 3, 41, 'SAARI_RODNEY', 'Rodney Saari', '2494', '377-2494', 0, 139, 9860),
(140, 285, 3, 18, 'ALCALA_SAMUEL', 'Samuel Alcala', '7402', '377-7402', 0, 140, 9859),
(141, 286, 3, 43, 'PEDRAZA_MATTHEW', 'Matthew Pedraza', '1527', '377-1527', 0, 141, 9858),
(142, 287, 3, 43, 'FREDETTE_AMANDA', 'Amanda Fredette', '2429', '377-2429', 0, 142, 9857),
(143, 288, 3, 44, 'SCHELLER_JEFFREY', 'Jeffrey Scheller', '6567', '377-6567', 0, 143, 9856),
(144, 289, 3, 45, 'BRIDGE_THOMAS', 'Thomas Bridge', '6544', '377-6544', 0, 144, 9855),
(145, 290, 3, 46, 'BULLARD_BRANDON', 'Brandon Bullard', '3022', '377-3022', 0, 145, 9854),
(146, 291, 3, 47, 'NOBLES_NORMA', 'Norma Nobles', '3479', '377-3479', 0, 146, 9853),
(147, 292, 3, 42, 'POOR_EMMA', 'Emma Poor', '7328', '377-7328', 0, 147, 9852),
(148, 293, 3, 18, 'CARRERO_SANDRA', 'Sandra Carrero', '7204', '377-7204', 0, 148, 9851),
(149, 294, 3, 2, 'SHANKLE_TAMARA', 'Tamara Shankle', '4037', '377-4037', 0, 149, 9850),
(150, 295, 3, 2, 'BECERRA_VICTOR', 'Victor Becerra', '6572', '377-6572', 0, 150, 9849),
(151, 296, 3, 18, 'PEYTON_DANIEL', 'Daniel Peyton', '1749', '377-1749', 0, 151, 9848),
(152, 297, 3, 18, 'LETT_ROGER', 'Roger Lett', '6030', '377-6030', 0, 152, 9847),
(153, 298, 3, 18, 'MARS_GARY', 'Gary Mars', '5903', '377-5903', 0, 153, 9846),
(154, 299, 3, 18, 'NEWBY_CARLA', 'Carla Newby', '1424', '377-1424', 0, 154, 9845),
(155, 300, 3, 2, 'WEATHERLY_MARIANNE', 'Marianne Weatherly', '6413', '377-6413', 0, 155, 9844),
(156, 301, 3, 2, 'NICKEL_TRAVIS', 'Travis Nickel', '8792', '377-8792', 0, 156, 9843),
(157, 302, 3, 18, 'SENN_KENNETH', 'Kenneth Senn', '5721', '377-5721', 0, 157, 9842),
(158, 303, 3, 18, 'SUTHERLAND_WANDA', 'Wanda Sutherland', '1230', '377-1230', 0, 158, 9841),
(159, 304, 3, 21, 'SEARCY_KRISTIN', 'Kristin Searcy', '5986', '377-5986', 0, 159, 9840),
(160, 305, 3, 1, 'HAYGOOD_TIMOTHY', 'Timothy Haygood', '7239', '377-7239', 0, 160, 9839),
(161, 306, 3, 4, 'LEY_CHARLES', 'Charles Ley', '8239', '377-8239', 0, 161, 9838),
(162, 307, 3, 21, 'VIDRINE_BENJAMIN', 'Benjamin Vidrine', '9477', '377-9477', 0, 162, 9837),
(163, 308, 3, 1, 'ELLIOTT_CASS', 'Cass Elliott', '3668', '377-3668', 0, 163, 9836),
(164, 309, 3, 4, 'CULP_CONSTANCE', 'Constance Culp', '6908', '377-6908', 0, 164, 9835),
(165, 310, 3, 21, 'POFF_JEFFERY', 'Jeffery Poff', '4537', '377-4537', 0, 165, 9834),
(166, 311, 3, 1, 'LAMB_ANTHONY', 'Anthony Lamb', '9960', '377-9960', 0, 166, 9833),
(167, 312, 3, 4, 'MACKENZIE_TONI', 'Toni Mackenzie', '8189', '377-8189', 0, 167, 9832),
(168, 313, 3, 41, 'WIMER_SARAH', 'Sarah Wimer', '1064', '377-1064', 0, 168, 9831),
(169, 314, 3, 41, 'LENT_CHRISTY', 'Christy Lent', '6755', '377-6755', 0, 169, 9830),
(170, 315, 3, 41, 'DURRETT_JOSE', 'Jose Durrett', '2583', '377-2583', 0, 170, 9829),
(171, 316, 3, 21, 'SANDLIN_BOBBY', 'Bobby Sandlin', '9651', '377-9651', 0, 171, 9828),
(172, 317, 3, 43, 'ALLEYNE_JAMES', 'James Alleyne', '3504', '377-3504', 0, 172, 9827),
(173, 319, 3, 44, 'MAYES_NANCY', 'Nancy Mayes', '5566', '377-5566', 0, 173, 9826),
(174, 320, 3, 45, 'SIMAS_JACQUELINE', 'Jacqueline Simas', '7317', '377-7317', 0, 174, 9825),
(175, 321, 3, 46, 'BEYER_KENNETH', 'Kenneth Beyer', '9889', '377-9889', 0, 175, 9824),
(176, 322, 3, 47, 'LINDLEY_NANCY', 'Nancy Lindley', '8494', '377-8494', 0, 176, 9823),
(177, 323, 3, 11, 'THURBER_LUIS', 'Luis Thurber', '2804', '377-2804', 0, 177, 9822),
(178, 324, 3, 27, 'RICHIE_SCOTT', 'Scott Richie', '5538', '377-5538', 0, 178, 9821),
(179, 325, 3, 28, 'BOHANNON_VICKI', 'Vicki Bohannon', '9277', '377-9277', 0, 179, 9820),
(180, 326, 3, 11, 'FEHN_ANDREAS', 'Andreas Fehn', '1772', '377-1772', 0, 180, 9819),
(181, 327, 3, 27, 'ALCINE_JACINTO', 'Jacinto Alcine', '7028', '377-7028', 0, 181, 9818),
(182, 328, 3, 28, 'MILWEE_JINA', 'Jina Milwee', '1823', '377-1823', 0, 182, 9817),
(183, 329, 3, 11, 'DUBONNET_NATHANAEL', 'Nathanael Dubonnet', '5034', '377-5034', 0, 183, 9816),
(184, 332, 3, 33, 'DOIEL_SHANICE', 'Shanice Doiel', '9700', '377-9700', 0, 184, 9815),
(185, 333, 3, 32, 'COLYOTT_BENEDICT', 'Benedict Colyott', '5396', '377-5396', 0, 185, 9814),
(186, 334, 3, 48, 'MILDENSTEIN_WAYLON', 'Waylon Mildenstein', '5883', '377-5883', 0, 186, 9813),
(187, 337, 3, 33, 'BAMBACE_LETTY', 'Letty Bambace', '3224', '377-3224', 0, 187, 9812),
(188, 338, 3, 32, 'FLUECK_JONELLE', 'Jonelle Flueck', '6471', '377-6471', 0, 188, 9811),
(189, 339, 3, 33, 'CLESEN_MANUAL', 'Manual Clesen', '3684', '377-3684', 0, 189, 9810),
(190, 340, 3, 32, 'MARCKS_HEIDI', 'Heidi Marcks', '7008', '377-7008', 0, 190, 9809),
(191, 341, 3, 25, 'HOHLSTEIN_MADALYN', 'Madalyn Hohlstein', '4988', '377-4988', 0, 191, 9808),
(192, 342, 3, 25, 'LOVISONE_TAMALA', 'Tamala Lovisone', '2915', '377-2915', 0, 192, 9807),
(193, 343, 3, 25, 'KRAICHELY_JENISE', 'Jenise Kraichely', '7611', '377-7611', 0, 193, 9806),
(194, 344, 3, 25, 'CHENEVEY_MANUAL', 'Manual Chenevey', '1310', '377-1310', 0, 194, 9805),
(195, 345, 3, 25, 'BONNLANDER_SARAH', 'Sarah Bonnlander', '9717', '377-9717', 0, 195, 9804),
(196, 346, 3, 25, 'FASBENDER_ARLIE', 'Arlie Fasbender', '7657', '377-7657', 0, 196, 9803),
(197, 348, 3, 25, 'EIESLAND_SANTANA', 'Santana Eiesland', '8133', '377-8133', 0, 197, 9802),
(198, 349, 3, 25, 'ARQUELLES_DOT', 'Dot Arquelles', '7693', '377-7693', 0, 198, 9801),
(199, 350, 3, 11, 'LANEAUX_YOLANDE', 'Yolande Laneaux', '4067', '377-4067', 0, 199, 9800),
(200, 351, 3, 27, 'FIXARI_WINFORD', 'Winford Fixari', '5257', '377-5257', 0, 200, 9799),
(201, 352, 3, 28, 'BUTTINO_BENTON', 'Benton Buttino', '4083', '377-4083', 0, 201, 9798),
(202, 353, 3, 25, 'LUIKART_RONNI', 'Ronni Luikart', '3643', '377-3643', 0, 202, 9797),
(203, 354, 3, 49, 'DARRUP_ELLYN', 'Ellyn Darrup', '4967', '377-4967', 0, 203, 9796),
(204, 355, 3, 25, 'ORAS_LETTY', 'Letty Oras', '3904', '377-3904', 0, 204, 9795),
(205, 356, 3, 49, 'KLINNERT_HAI', 'Hai Klinnert', '3621', '377-3621', 0, 205, 9794),
(206, 357, 3, 49, 'MACCLELLAN_WILLIA', 'Willia Macclellan', '5393', '377-5393', 0, 206, 9793),
(207, 358, 3, 49, 'BRAYE_CONCHITA', 'Conchita Braye', '6101', '377-6101', 0, 207, 9792),
(208, 359, 3, 49, 'LUNGWITZ_JERE', 'Jere Lungwitz', '4325', '377-4325', 0, 208, 9791),
(209, 360, 3, 2, 'BROCCOLO_ERLENE', 'Erlene Broccolo', '2321', '377-2321', 0, 209, 9790),
(210, 361, 3, 2, 'DOWDEN_RYAN', 'Ryan Dowden', '6632', '377-6632', 0, 210, 9789),
(211, 362, 3, 2, 'ARTHUR_MARTIN', 'Martin Arthur', '7196', '377-7196', 0, 211, 9788),
(212, 363, 3, 2, 'DARNELL_EMILY', 'Emily Darnell', '6083', '377-6083', 0, 212, 9787),
(213, 364, 3, 2, 'KORNEGAY_EMMA', 'Emma Kornegay', '7828', '377-7828', 0, 213, 9786),
(214, 365, 3, 2, 'FOREST_RYAN', 'Ryan Forest', '1892', '377-1892', 0, 214, 9785),
(215, 366, 3, 2, 'NESMITH_JAMES', 'James Nesmith', '2973', '377-2973', 0, 215, 9784),
(216, 367, 3, 49, 'APPLETON_RICHARD', 'Richard Appleton', '8192', '377-8192', 0, 216, 9783),
(217, 368, 3, 49, 'NEALE_KENNETH', 'Kenneth Neale', '4039', '377-4039', 0, 217, 9782),
(218, 369, 3, 49, 'WICKHAM_ANA', 'Ana Wickham', '3620', '377-3620', 0, 218, 9781),
(219, 370, 3, 2, 'PARRIS_AGNES', 'Agnes Parris', '4983', '377-4983', 0, 219, 9780),
(220, 371, 3, 2, 'SUGGS_JONATHAN', 'Jonathan Suggs', '4054', '377-4054', 0, 220, 9779),
(221, 372, 3, 2, 'TILLIS_STANLEY', 'Stanley Tillis', '4320', '377-4320', 0, 221, 9778),
(222, 373, 3, 2, 'ALMONTE_MOLLY', 'Molly Almonte', '8440', '377-8440', 0, 222, 9777),
(223, 375, 3, 23, 'COURTNEY_KRISTIN', 'Kristin Courtney', '1241', '377-1241', 0, 223, 9776),
(224, 376, 3, 23, 'GILLIGAN_CAROLYN', 'Carolyn Gilligan', '6883', '377-6883', 0, 224, 9775),
(225, 377, 3, 23, 'POLING_EMMA', 'Emma Poling', '2694', '377-2694', 0, 225, 9774),
(226, 378, 3, 23, 'MIZE_THOMAS', 'Thomas Mize', '9822', '377-9822', 0, 226, 9773),
(227, 379, 3, 23, 'THOMASON_ANTOINETTE', 'Antoinette Thomason', '4025', '377-4025', 0, 227, 9772),
(228, 380, 3, 50, 'GOOLSBY_EILEEN', 'Eileen Goolsby', '7660', '377-7660', 0, 228, 9771),
(229, 381, 3, 50, 'MACARTHUR_ELSIE', 'Elsie Macarthur', '7225', '377-7225', 0, 229, 9770),
(230, 382, 3, 50, 'JAFFE_HENRY', 'Henry Jaffe', '3146', '377-3146', 0, 230, 9769),
(231, 383, 3, 50, 'LOVELL_LILLIAN', 'Lillian Lovell', '2056', '377-2056', 0, 231, 9768),
(232, 384, 3, 42, 'WEISMAN_BARBARA', 'Barbara Weisman', '8840', '377-8840', 0, 232, 9767),
(233, 385, 3, 51, 'HAMPTON_BARBARA', 'Barbara Hampton', '1034', '377-1034', 0, 233, 9766),
(234, 386, 3, 51, 'HANDLEY_DARLENE', 'Darlene Handley', '4651', '377-4651', 0, 234, 9765),
(235, 387, 3, 25, 'KEENAN_PENNY', 'Penny Keenan', '1152', '377-1152', 0, 235, 9764),
(236, 388, 3, 49, 'NUNLEY_GREGORY', 'Gregory Nunley', '8805', '377-8805', 0, 236, 9763),
(237, 389, 3, 25, 'SCHULMAN_ALICIA', 'Alicia Schulman', '3571', '377-3571', 0, 237, 9762),
(238, 390, 3, 49, 'PAXTON_WALTER', 'Walter Paxton', '8442', '377-8442', 0, 238, 9761),
(239, 391, 3, 25, 'HOFFMANN_LISA', 'Lisa Hoffmann', '3493', '377-3493', 0, 239, 9760),
(240, 392, 3, 49, 'SHAY_DALE', 'Dale Shay', '9143', '377-9143', 0, 240, 9759),
(241, 393, 3, 25, 'LOVATO_ERIC', 'Eric Lovato', '7232', '377-7232', 0, 241, 9758),
(242, 394, 3, 49, 'HANCE_VIOLA', 'Viola Hance', '7734', '377-7734', 0, 242, 9757),
(243, 395, 3, 49, 'RHEA_LATOYA', 'Latoya Rhea', '6971', '377-6971', 0, 243, 9756),
(244, 396, 3, 25, 'MCKINLEY_VERONICA', 'Veronica Mckinley', '1655', '377-1655', 0, 244, 9755),
(245, 397, 3, 25, 'LAYNE_DORA', 'Dora Layne', '4360', '377-4360', 0, 245, 9754),
(246, 398, 3, 49, 'GRAFF_SABRINA', 'Sabrina Graff', '6836', '377-6836', 0, 246, 9753),
(247, 399, 3, 49, 'KUNKEL_RACHEL', 'Rachel Kunkel', '2098', '377-2098', 0, 247, 9752),
(248, 400, 3, 49, 'TYSON_ROBERT', 'Robert Tyson', '6983', '377-6983', 0, 248, 9751),
(249, 401, 3, 49, 'VIOLETTE_SAMUEL', 'Samuel Violette', '9623', '377-9623', 0, 249, 9750),
(250, 402, 3, 49, 'WYATT_CINDY', 'Cindy Wyatt', '8164', '377-8164', 0, 250, 9749),
(251, 403, 3, 23, 'CARPENTER_RICHARD', 'Richard Carpenter', '1954', '377-1954', 0, 251, 9748),
(252, 404, 3, 23, 'NEACE_ARTHUR', 'Arthur Neace', '2275', '377-2275', 0, 252, 9747),
(253, 405, 3, 23, 'DEROSE_MARK', 'Mark Derose', '4514', '377-4514', 0, 253, 9746),
(254, 406, 3, 23, 'BINION_BRIAN', 'Brian Binion', '5744', '377-5744', 0, 254, 9745),
(255, 407, 3, 23, 'LINDSAY_CHARLES', 'Charles Lindsay', '5179', '377-5179', 0, 255, 9744),
(256, 408, 3, 2, 'STOVER_JUDITH', 'Judith Stover', '7663', '377-7663', 0, 256, 9743),
(257, 410, 3, 2, 'RIVES_KENNETH', 'Kenneth Rives', '3778', '377-3778', 0, 257, 9742),
(258, 411, 3, 2, 'MCCUE_VICKIE', 'Vickie Mccue', '3899', '377-3899', 0, 258, 9741),
(259, 416, 3, 49, 'FRISCH_WALTER', 'Walter Frisch', '7162', '377-7162', 0, 259, 9740),
(260, 421, 3, 49, 'OLIVO_MYRTLE', 'Myrtle Olivo', '5113', '377-5113', 0, 260, 9739),
(261, 422, 3, 49, 'MCLOUGHLIN_VERNA', 'Verna Mcloughlin', '3078', '377-3078', 0, 261, 9738),
(262, 429, 3, 49, 'HARBIN_SHERI', 'Sheri Harbin', '8053', '377-8053', 0, 262, 9737),
(263, 431, 3, 2, 'HAINES_MARIAN', 'Marian Haines', '3031', '377-3031', 0, 263, 9736),
(264, 202, 2, 21, 'HOLDER_JAMES', 'James Holder', '7996', '377-7996', 0, 264, 9735),
(265, 203, 2, 1, 'CONTI_ELLA', 'Ella Conti', '2886', '377-2886', 0, 265, 9734),
(266, 204, 2, 4, 'HANG_DAVID', 'David Hang', '7441', '377-7441', 0, 266, 9733),
(267, 205, 2, 31, 'NICHOLAS_JACK', 'Jack Nicholas', '9546', '377-9546', 0, 267, 9732),
(268, 206, 2, 31, 'FALL_ALBERT', 'Albert Fall', '6408', '377-6408', 0, 268, 9731),
(269, 207, 2, 31, 'RUBIO_JESSICA', 'Jessica Rubio', '2403', '377-2403', 0, 269, 9730),
(270, 208, 2, 31, 'WALCOTT_ROGER', 'Roger Walcott', '9791', '377-9791', 0, 270, 9729),
(271, 209, 2, 31, 'GOTTLIEB_VICKIE', 'Vickie Gottlieb', '4744', '377-4744', 0, 271, 9728),
(272, 210, 2, 31, 'WACHTER_EUGENE', 'Eugene Wachter', '2347', '377-2347', 0, 272, 9727),
(273, 211, 2, 31, 'WARRICK_GERALD', 'Gerald Warrick', '5503', '377-5503', 0, 273, 9726),
(274, 212, 2, 21, 'GOODSON_GREGORY', 'Gregory Goodson', '1474', '377-1474', 0, 274, 9725),
(275, 213, 2, 21, 'HOVIS_MARCIA', 'Marcia Hovis', '7860', '377-7860', 0, 275, 9724),
(276, 214, 2, 21, 'CLAIBORNE_JEFFERY', 'Jeffery Claiborne', '6879', '377-6879', 0, 276, 9723),
(277, 215, 2, 21, 'GARY_KELLI', 'Kelli Gary', '9815', '377-9815', 0, 277, 9722),
(278, 216, 2, 32, 'WHITFORD_GARY', 'Gary Whitford', '9438', '377-9438', 0, 278, 9721),
(279, 217, 2, 1, 'BECKNER_THELMA', 'Thelma Beckner', '7744', '377-7744', 0, 279, 9720),
(280, 218, 2, 33, 'CAGLE_SEAN', 'Sean Cagle', '9409', '377-9409', 0, 280, 9719),
(281, 219, 2, 32, 'WIMBERLY_KRISTA', 'Krista Wimberly', '4810', '377-4810', 0, 281, 9718),
(282, 220, 2, 11, 'CANTRELL_AARON', 'Aaron Cantrell', '3823', '377-3823', 0, 282, 9717),
(283, 221, 2, 2, 'TRAMEL_JIMMY', 'Jimmy Tramel', '3684', '377-3684', 0, 283, 9716),
(284, 222, 2, 2, 'CRESPO_BLANCHE', 'Blanche Crespo', '5950', '377-5950', 0, 284, 9715),
(285, 223, 2, 2, 'HARDWICK_ROBERT', 'Robert Hardwick', '8700', '377-8700', 0, 285, 9714),
(286, 224, 2, 2, 'BOWMAN_RUSSELL', 'Russell Bowman', '6650', '377-6650', 0, 286, 9713),
(287, 225, 2, 34, 'HINSHAW_NELLIE', 'Nellie Hinshaw', '6151', '377-6151', 0, 287, 9712),
(288, 237, 2, 2, 'COFFEE_IRIS', 'Iris Coffee', '9805', '377-9805', 0, 288, 9711),
(289, 238, 2, 23, 'FULTS_BRITTANY', 'Brittany Fults', '2573', '377-2573', 0, 289, 9710),
(290, 239, 2, 23, 'ELLER_JOSHUA', 'Joshua Eller', '9449', '377-9449', 0, 290, 9709),
(291, 240, 2, 23, 'CAMPBELL_GEORGE', 'George Campbell', '2524', '377-2524', 0, 291, 9708),
(292, 241, 2, 23, 'WEXLER_ARTHUR', 'Arthur Wexler', '1276', '377-1276', 0, 292, 9707),
(293, 242, 2, 23, 'MONTGOMERY_ALBERT', 'Albert Montgomery', '6805', '377-6805', 0, 293, 9706),
(294, 243, 2, 23, 'BELTZ_ANGELA', 'Angela Beltz', '2197', '377-2197', 0, 294, 9705),
(295, 244, 2, 2, 'JUSTUS_MARTIN', 'Martin Justus', '7571', '377-7571', 0, 295, 9704),
(296, 245, 2, 11, 'PETTIFORD_BETH', 'Beth Pettiford', '3264', '377-3264', 0, 296, 9703),
(297, 246, 2, 11, 'LANKFORD_PAUL', 'Paul Lankford', '1607', '377-1607', 0, 297, 9702),
(298, 247, 2, 11, 'HANG_ROY', 'Roy Hang', '6241', '377-6241', 0, 298, 9701),
(299, 248, 2, 11, 'BLYTHE_BERNICE', 'Bernice Blythe', '7385', '377-7385', 0, 299, 9700),
(300, 249, 2, 21, 'BRADSHAW_AARON', 'Aaron Bradshaw', '8202', '377-8202', 0, 300, 9699),
(301, 250, 2, 21, 'CHARLEY_RALPH', 'Ralph Charley', '8856', '377-8856', 0, 301, 9698),
(302, 251, 2, 21, 'CHAMNESS_CLAIRE', 'Claire Chamness', '9675', '377-9675', 0, 302, 9697),
(303, 252, 2, 21, 'PERRYMAN_JANE', 'Jane Perryman', '2807', '377-2807', 0, 303, 9696),
(304, 253, 2, 35, 'MOHR_MEGAN', 'Megan Mohr', '2010', '377-2010', 0, 304, 9695),
(305, 254, 2, 9, 'CARLO_BRITTANY', 'Brittany Carlo', '9629', '377-9629', 0, 305, 9694),
(306, 255, 2, 36, 'PALACIO_ARTHUR', 'Arthur Palacio', '5113', '377-5113', 0, 306, 9693),
(307, 256, 2, 1, 'SOLIZ_VANESSA', 'Vanessa Soliz', '4680', '377-4680', 0, 307, 9692),
(308, 257, 2, 23, 'HASTINGS_LUIS', 'Luis Hastings', '7061', '377-7061', 0, 308, 9691),
(309, 258, 2, 23, 'HORNE_NATASHA', 'Natasha Horne', '2265', '377-2265', 0, 309, 9690),
(310, 259, 2, 23, 'DICKINSON_HAROLD', 'Harold Dickinson', '7142', '377-7142', 0, 310, 9689),
(311, 260, 2, 23, 'NEIGHBORS_ELLA', 'Ella Neighbors', '9916', '377-9916', 0, 311, 9688),
(312, 261, 2, 23, 'GERARD_DANNY', 'Danny Gerard', '9155', '377-9155', 0, 312, 9687),
(313, 262, 2, 23, 'NADEAU_PAMELA', 'Pamela Nadeau', '6025', '377-6025', 0, 313, 9686),
(314, 263, 2, 23, 'SAVAGE_MARTIN', 'Martin Savage', '1660', '377-1660', 0, 314, 9685),
(315, 264, 2, 23, 'SEAMAN_JONATHAN', 'Jonathan Seaman', '7225', '377-7225', 0, 315, 9684),
(316, 265, 2, 23, 'WHITCOMB_SHELLY', 'Shelly Whitcomb', '3146', '377-3146', 0, 316, 9683),
(317, 266, 2, 23, 'LUSTER_WALTER', 'Walter Luster', '2056', '377-2056', 0, 317, 9682),
(318, 267, 2, 23, 'PAPE_DONALD', 'Donald Pape', '8840', '377-8840', 0, 318, 9681),
(319, 268, 2, 23, 'BINNS_ANNIE', 'Annie Binns', '1031', '377-1031', 0, 319, 9680),
(320, 269, 2, 37, 'KILLIAN_RACHEL', 'Rachel Killian', '4636', '377-4636', 0, 320, 9679),
(321, 270, 2, 38, 'DESPAIN_ERNEST', 'Ernest Despain', '1086', '377-1086', 0, 321, 9678),
(322, 271, 2, 23, 'FREITAG_JERRY', 'Jerry Freitag', '8522', '377-8522', 0, 322, 9677);

-- --------------------------------------------------------

--
-- Table structure for table `employee_photos`
--

CREATE TABLE `employee_photos` (
  `id` int NOT NULL,
  `employee_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `image_file_name` varchar(255) DEFAULT NULL,
  `image_content_type` varchar(255) DEFAULT NULL,
  `image_file_size` int DEFAULT NULL,
  `image_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_photos`
--

INSERT INTO `employee_photos` (`id`, `employee_id`, `created_at`, `updated_at`, `image_file_name`, `image_content_type`, `image_file_size`, `image_updated_at`) VALUES
(1, 1, '2010-04-02 20:42:26', '2010-04-02 20:42:26', 'ALAN_PARTRIDGE.jpg', 'image/jpeg', 2835, '2010-04-02 20:42:24'),
(2, 4, '2010-04-02 20:47:49', '2010-04-02 20:47:49', 'alan_abbott.jpg', 'image/jpeg', 2068, '2010-04-02 20:47:49'),
(3, 5, '2010-04-02 20:50:33', '2010-04-02 20:50:33', 'alan_abraham.jpg', 'image/jpeg', 2014, '2010-04-02 20:50:33'),
(4, 6, '2010-04-02 20:50:43', '2010-04-02 20:50:43', 'DENZIL_WASHINGTON.jpg', 'image/jpeg', 2451, '2010-04-02 20:50:42'),
(5, 7, '2010-04-02 20:50:55', '2010-04-02 20:50:55', 'mike_andersen.jpg', 'image/jpeg', 2495, '2010-04-02 20:50:55'),
(6, 8, '2010-04-02 20:51:06', '2010-04-02 20:51:06', 'andrew_mcleod.jpg', 'image/jpeg', 2490, '2010-04-02 20:51:05'),
(7, 9, '2010-04-02 20:51:15', '2010-04-02 20:51:15', 'tim_baker.jpg', 'image/jpeg', 3762, '2010-04-02 20:51:15'),
(8, 10, '2010-04-02 20:51:25', '2010-04-02 20:51:25', 'andy_williams.jpg', 'image/jpeg', 3216, '2010-04-02 20:51:25'),
(10, 12, '2010-04-02 20:51:55', '2010-04-02 20:51:55', 'generic.jpg', 'image/jpeg', 1260, '2010-04-02 20:51:55'),
(11, 13, '2010-04-02 20:52:03', '2010-04-02 20:52:03', 'andrea_corr.jpg', 'image/jpeg', 2358, '2010-04-02 20:52:03'),
(12, 14, '2010-04-02 20:52:24', '2010-04-02 20:52:24', 'generic.jpg', 'image/jpeg', 1260, '2010-04-02 20:52:24'),
(13, 15, '2010-04-02 20:52:41', '2010-04-02 20:52:41', 'generic.jpg', 'image/jpeg', 1260, '2010-04-02 20:52:41'),
(14, 16, '2010-04-02 20:52:59', '2010-04-02 20:52:59', 'generic.jpg', 'image/jpeg', 1260, '2010-04-02 20:52:59'),
(15, 17, '2010-04-02 20:53:15', '2010-04-02 20:53:15', 'generic.jpg', 'image/jpeg', 1260, '2010-04-02 20:53:14'),
(16, 18, '2010-04-02 20:53:32', '2010-04-02 20:53:32', 'stellios_elia.jpg', 'image/jpeg', 2160, '2010-04-02 20:53:27'),
(17, 19, '2010-04-02 20:53:47', '2010-04-02 20:53:47', 'ELIASOV_AVITAL.jpg', 'image/jpeg', 2268, '2010-04-02 20:53:47'),
(18, 20, '2010-04-02 20:54:10', '2010-04-02 20:54:10', 'generic.jpg', 'image/jpeg', 1260, '2010-04-02 20:54:10'),
(19, 21, '2010-04-02 20:54:36', '2010-04-02 20:54:36', 'Epissina.lrg.jpg', 'image/jpeg', 41403, '2010-04-02 20:54:34'),
(20, 22, '2010-04-02 20:54:53', '2010-04-02 20:54:53', 'jackson_browne.jpg', 'image/jpeg', 2129, '2010-04-02 20:54:52'),
(21, 23, '2010-04-02 20:55:02', '2010-04-02 20:55:02', 'gilles_denoblet.jpg', 'image/jpeg', 2452, '2010-04-02 20:55:02'),
(22, 24, '2010-04-02 20:55:14', '2010-04-02 20:55:14', 'ERHAHON.jpg', 'image/jpeg', 3082, '2010-04-02 20:55:13'),
(23, 25, '2010-04-02 20:55:22', '2010-04-02 20:55:22', 'ESCOBAR_JOHNY.jpg', 'image/jpeg', 3114, '2010-04-02 20:55:22'),
(24, 26, '2010-04-02 20:55:31', '2010-04-02 20:55:31', 'clarkson_b.jpg', 'image/jpeg', 3003, '2010-04-02 20:55:31'),
(25, 27, '2010-04-02 20:55:42', '2010-04-02 20:55:42', 'conney_montalo.jpg', 'image/jpeg', 3204, '2010-04-02 20:55:42'),
(26, 28, '2010-04-02 20:55:51', '2010-04-02 20:55:51', 'EDDY_JAMES.jpg', 'image/jpeg', 2339, '2010-04-02 20:55:51'),
(27, 29, '2010-04-02 20:56:06', '2010-04-02 20:56:06', 'marc_desilva.jpg', 'image/jpeg', 2405, '2010-04-02 20:56:06'),
(28, 30, '2010-04-02 20:56:24', '2010-04-02 20:56:24', 'generic.jpg', 'image/jpeg', 1260, '2010-04-02 20:56:24'),
(29, 31, '2010-04-02 20:56:34', '2010-04-02 20:56:34', 'Cruickshank.jpg', 'image/jpeg', 1973, '2010-04-02 20:56:34'),
(30, 32, '2010-04-02 20:56:48', '2010-04-02 20:56:48', 'jody_ford.jpg', 'image/jpeg', 2017, '2010-04-02 20:56:48'),
(31, 33, '2010-04-02 20:56:58', '2010-04-02 20:56:58', 'david_chater.jpg', 'image/jpeg', 2696, '2010-04-02 20:56:58'),
(32, 34, '2010-04-02 20:57:13', '2010-04-02 20:57:13', 'justin_devillers.jpg', 'image/jpeg', 3966, '2010-04-02 20:57:12'),
(33, 35, '2010-04-02 20:57:29', '2010-04-02 20:57:29', 'EDWARDS_LOUISE.jpg', 'image/jpeg', 2300, '2010-04-02 20:57:29'),
(34, 36, '2010-04-02 20:57:46', '2010-04-02 20:57:46', 'joan_collins.jpg', 'image/jpeg', 4281, '2010-04-02 20:57:45'),
(35, 37, '2010-04-02 20:57:58', '2010-04-02 20:57:58', 'sarah_collimore.jpg', 'image/jpeg', 3108, '2010-04-02 20:57:57'),
(36, 38, '2010-04-02 20:58:08', '2010-04-02 20:58:08', 'DONOVAN_JUDE.jpg', 'image/jpeg', 2191, '2010-04-02 20:58:07');

-- --------------------------------------------------------

--
-- Table structure for table `floors`
--

CREATE TABLE `floors` (
  `id` int UNSIGNED NOT NULL,
  `building_id` int DEFAULT NULL,
  `floor_number` int DEFAULT NULL,
  `drawing_name` varchar(50) DEFAULT NULL,
  `dwf_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `floors`
--

INSERT INTO `floors` (`id`, `building_id`, `floor_number`, `drawing_name`, `dwf_name`) VALUES
(1, 1, 1, 'AH001', 'ah_01.dwf'),
(2, 2, 3, '77QVS_3_CAFM', '77qvs_3_cafm.dwf'),
(3, 3, 1, 'BH_01_CAFM', 'bh_01_cafm.dwf');

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` int UNSIGNED NOT NULL,
  `check_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `my_defaults`
--

CREATE TABLE `my_defaults` (
  `id` int NOT NULL,
  `org1_name` varchar(255) DEFAULT NULL,
  `org2_name` varchar(255) DEFAULT NULL,
  `interface_level` int DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `my_defaults`
--

INSERT INTO `my_defaults` (`id`, `org1_name`, `org2_name`, `interface_level`, `created_at`, `updated_at`) VALUES
(1, 'Divison', 'Department', 0, NULL, '2010-04-07 15:37:15');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int UNSIGNED NOT NULL,
  `room_id` int DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `room_id`, `capacity`, `comments`) VALUES
(1, 141, 50, 'Large conference room. No actual hot tub.'),
(2, 150, 15, 'Small conference room.'),
(3, 141, 0, 'Needs repainting'),
(11, 1, NULL, 'Projector is broken'),
(12, 150, NULL, 'Please work'),
(13, 149, 20, 'Fairly small. Nice table'),
(14, 214, NULL, 'Wash tables and put away equiptment');

-- --------------------------------------------------------

--
-- Table structure for table `org1s`
--

CREATE TABLE `org1s` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `color_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `org1s`
--

INSERT INTO `org1s` (`id`, `name`, `color_id`) VALUES
(1, 'CORPORATE', 1),
(2, '', 2),
(3, 'FINANCE', 3),
(4, 'I.T.', 4),
(5, 'PRODUCTION', 5),
(6, 'UK IT', 6),
(7, 'POS', 7),
(8, 'ATM', 8),
(9, 'CONSULT_SERVICES', 9),
(10, 'SALES', 10),
(11, 'SUPPORT_PARTNERS', 11),
(12, 'SUPPORT', 12),
(13, 'MARKETING', 13),
(14, 'NETWORKS', 14),
(15, 'MERCHANT_SERV', 15),
(16, 'ACCESSORIES', 16),
(17, 'CONTACT CENTRE', 17),
(18, 'ELECTRONIC SYS.', 18),
(19, 'MANAGEMENT CONS.', 19),
(20, 'EXECUTIVE', 20),
(21, 'HUMAN RESOURCES', 21),
(22, 'FACILITIES', 22),
(23, 'SOFTWARE APP.', 23);

-- --------------------------------------------------------

--
-- Table structure for table `org2s`
--

CREATE TABLE `org2s` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `color_id` int DEFAULT NULL,
  `org1_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `org2s`
--

INSERT INTO `org2s` (`id`, `name`, `color_id`, `org1_id`) VALUES
(1, 'CORP_EXECUTIVES', 1, 1),
(2, 'NONE', 2, 2),
(3, 'FINANCE SYSTEMS', 3, 3),
(4, 'CORP_LEGAL', 4, 1),
(5, 'I.T. ENG', 5, 4),
(6, 'PROD_LOGISTICS', 6, 5),
(7, 'I.T. TECH', 7, 4),
(8, 'I.T. TRAINING', 8, 4),
(9, 'UK IT', 9, 6),
(10, 'POS_DEPT', 10, 7),
(11, 'ATM_DEPT_001', 11, 8),
(12, 'PROD_ENGINEERING', 12, 5),
(13, 'CONSULT_TRAINING', 13, 9),
(14, 'SALES_J', 14, 10),
(15, 'SALES_D', 15, 10),
(16, 'SUPPORT_SERVICES', 16, 11),
(17, 'SALES_AFRICA', 17, 10),
(18, 'CONSULT_SERVICES', 18, 9),
(19, 'SALES_F', 19, 10),
(20, 'SUPPORT_FM', 20, 12),
(21, 'CORP_ACCOUNTS', 21, 1),
(22, 'I.T.', 22, 4),
(23, 'MARKETING', 23, 13),
(24, 'FINANCE', 24, 14),
(25, 'PROD_DEV', 25, 5),
(26, 'CONSULT_SUPPORT', 26, 9),
(27, 'ATM_DEPT_002', 27, 8),
(28, 'ATM_DEPT_003', 28, 8),
(29, 'MERCH_SERV_001', 29, 15),
(30, 'SALES_SK', 30, 10),
(31, 'SALES', 31, 16),
(32, 'CONTACT_DEPT_002', 32, 17),
(33, 'CONTACT_DEPT_001', 33, 17),
(34, 'ADMINISTRATION', 34, 18),
(35, 'PURCHASING', 35, 12),
(36, 'SUPPORT_TECH', 36, 12),
(37, 'OPERATIONS-MAINT', 37, 18),
(38, 'PRODUCTION', 38, 18),
(39, 'MANAGEMENT', 39, 20),
(40, 'DOMESTIC', 40, 3),
(41, 'MID ATLANTIC', 41, 21),
(42, 'MANAGER', 42, 10),
(43, 'REAL ESTATE MGMT', 43, 22),
(44, 'PLANNING', 44, 22),
(45, 'ENVIRON-SAFETY', 45, 22),
(46, 'REGIONAL', 46, 22),
(47, 'CONSTRUCTION', 47, 22),
(48, 'NEW ENGLAND', 48, 21),
(49, 'ACCOUNTS', 49, 12),
(50, 'FIELD', 50, 10),
(51, 'INTERNAL', 51, 10);

-- --------------------------------------------------------

--
-- Table structure for table `pdfs`
--

CREATE TABLE `pdfs` (
  `id` int NOT NULL,
  `room_id` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `image_file_name` varchar(255) DEFAULT NULL,
  `image_content_type` varchar(255) DEFAULT NULL,
  `image_file_size` int DEFAULT NULL,
  `image_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pdfs`
--

INSERT INTO `pdfs` (`id`, `room_id`, `description`, `created_at`, `updated_at`, `image_file_name`, `image_content_type`, `image_file_size`, `image_updated_at`) VALUES
(2, 1, 'All Kills', '2010-04-01 23:54:06', '2010-04-01 23:54:06', 'allskillslist.pdf', 'download/attachment', 42333, '2010-04-01 23:54:05'),
(3, 1, 'Volleyball stats', '2010-04-02 00:05:27', '2010-04-02 00:05:27', 'kj14_detail_ytd.pdf', 'download/attachment', 28011, '2010-04-02 00:05:26'),
(4, 1, 'PL 1', '2010-04-02 00:08:20', '2010-04-02 00:08:20', 'kj14_pl1.pdf', 'download/attachment', 33033, '2010-04-02 00:08:19'),
(5, 1, 'Process Flow', '2010-04-02 00:08:44', '2010-04-02 00:08:44', 'Process_Flow.pdf', 'download/attachment', 86437, '2010-04-02 00:08:43'),
(6, 16, '', '2010-04-02 03:33:49', '2010-04-02 03:33:49', 'advcamplist.pdf', 'download/attachment', 49012, '2010-04-02 03:33:48');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int NOT NULL,
  `room_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `image_file_name` varchar(255) DEFAULT NULL,
  `image_content_type` varchar(255) DEFAULT NULL,
  `image_file_size` int DEFAULT NULL,
  `image_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `room_id`, `created_at`, `updated_at`, `image_file_name`, `image_content_type`, `image_file_size`, `image_updated_at`) VALUES
(17, 8, '2010-03-31 16:26:27', '2010-03-31 16:26:27', 'cubicles_2097_83586.gif', 'image/gif', 15753, '2010-03-31 16:26:25'),
(18, 16, '2010-04-02 03:13:32', '2010-04-02 03:13:32', 'compare1.gif', 'image/gif', 103248, '2010-04-02 03:13:30'),
(19, 16, '2010-04-02 03:32:12', '2010-04-02 03:32:12', 'compare1.gif', 'image/gif', 103248, '2010-04-02 03:32:12'),
(20, 214, '2010-04-02 03:32:37', '2010-04-02 03:32:37', 'cbergstrom.gif', 'image/gif', 10332, '2010-04-02 03:32:36');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int UNSIGNED NOT NULL,
  `floor_id` int DEFAULT NULL,
  `name` varchar(25) DEFAULT NULL,
  `real_name` varchar(25) DEFAULT NULL,
  `area` float DEFAULT NULL,
  `org1_id` int DEFAULT NULL,
  `org2_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `room_type_id` int DEFAULT NULL,
  `standard_id` int DEFAULT NULL,
  `purpose` varchar(25) DEFAULT NULL,
  `meeting` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `floor_id`, `name`, `real_name`, `area`, `org1_id`, `org2_id`, `category_id`, `room_type_id`, `standard_id`, `purpose`, `meeting`) VALUES
(1, 1, '300', '001', 25.92, 1, 1, 1, 1, 1, '', 0),
(2, 1, '002', '002', 13.24, 1, 1, 1, 1, 1, '', 0),
(3, 1, '003', '003', 19.93, 2, 2, 1, 1, 1, '', 0),
(4, 1, '004', '004', 3.23, 3, 3, 1, 2, 2, '', 0),
(5, 1, '005', '005', 3.23, 3, 3, 1, 2, 3, '', 0),
(6, 1, '006', '006', 3.23, 1, 4, 1, 2, 2, '', 0),
(7, 1, '007', '007', 3.23, 2, 2, 1, 2, 2, '', 0),
(8, 1, '008', '008', 3.23, 4, 5, 1, 2, 3, '', 0),
(9, 1, '009', '009', 3.23, 1, 4, 1, 2, 2, '', 0),
(10, 1, '010', '010', 3.23, 5, 6, 1, 2, 2, '', 0),
(11, 1, '011', '011', 3.23, 2, 2, 1, 2, 2, '', 0),
(12, 1, '012', '012', 3.23, 4, 7, 1, 2, 2, '', 0),
(13, 1, '013', '013', 3.23, 4, 8, 1, 2, 2, '', 0),
(14, 1, '014', '014', 3.23, 2, 2, 1, 2, 2, '', 0),
(15, 1, '015', '015', 3.23, 2, 2, 1, 2, 2, '', 0),
(16, 1, '016', '016', 3.23, 2, 2, 1, 2, 2, '', 0),
(17, 1, '017', '017', 3.23, 2, 2, 1, 2, 2, '', 0),
(18, 1, '018', '018', 3.23, 1, 1, 1, 2, 2, '', 0),
(19, 1, '019', '019', 3.23, 4, 5, 1, 2, 2, '', 0),
(20, 1, '020', '020', 3.23, 6, 9, 1, 2, 2, '', 0),
(21, 1, '021', '021', 3.23, 7, 10, 1, 2, 2, '', 0),
(22, 1, '022', '022', 3.23, 2, 2, 1, 2, 2, '', 0),
(23, 1, '023', '023', 3.23, 1, 4, 1, 2, 2, '', 0),
(24, 1, '024', '024', 3.23, 7, 10, 1, 2, 2, '', 0),
(25, 1, '025', '025', 3.23, 7, 10, 1, 2, 2, '', 0),
(26, 1, '026', '026', 3.23, 7, 10, 1, 2, 2, '', 0),
(27, 1, '027', '027', 3.23, 7, 10, 1, 2, 2, '', 0),
(28, 1, '028', '028', 3.23, 7, 10, 1, 2, 2, '', 0),
(29, 1, '029', '029', 3.23, 7, 10, 1, 2, 2, '', 0),
(30, 1, '030', '030', 3.23, 4, 8, 1, 2, 2, '', 0),
(31, 1, '031', '031', 3.23, 8, 11, 1, 2, 2, '', 0),
(32, 1, '032', '032', 3.23, 7, 10, 1, 2, 2, '', 0),
(33, 1, '033', '033', 4.89, 2, 2, 1, 2, 2, '', 0),
(34, 1, '033-A', '033-A', 3.23, 7, 10, 1, 2, 2, '', 0),
(35, 1, '034', '034', 4.4, 2, 2, 1, 2, 4, '', 0),
(36, 1, '035', '035', 4.62, 5, 6, 1, 2, 4, '', 0),
(37, 1, '036', '036', 3.23, 4, 7, 1, 2, 2, '', 0),
(38, 1, '037', '037', 3.18, 2, 2, 1, 2, 2, '', 0),
(39, 1, '038', '038', 3.02, 2, 2, 1, 2, 3, '', 0),
(40, 1, '039', '039', 3.23, 5, 12, 1, 2, 3, '', 0),
(41, 1, '040', '040', 3.23, 5, 12, 1, 2, 3, '', 0),
(42, 1, '041', '041', 3.23, 5, 12, 1, 2, 2, '', 0),
(43, 1, '042', '042', 3.18, 9, 13, 1, 2, 2, '', 0),
(44, 1, '043', '043', 3.02, 2, 2, 1, 2, 3, '', 0),
(45, 1, '044', '044', 3.23, 5, 12, 1, 2, 3, '', 0),
(46, 1, '045', '045', 3.23, 2, 2, 1, 2, 3, '', 0),
(47, 1, '046', '046', 3.19, 10, 14, 1, 2, 2, '', 0),
(48, 1, '047', '047', 3.15, 3, 3, 1, 2, 2, '', 0),
(49, 1, '048', '048', 3.41, 5, 12, 1, 2, 2, '', 0),
(50, 1, '049', '049', 3.52, 5, 12, 1, 2, 2, '', 0),
(51, 1, '050', '050', 3.52, 5, 12, 1, 2, 2, '', 0),
(52, 1, '051', '051', 3.19, 10, 15, 1, 2, 2, '', 0),
(53, 1, '052', '052', 3.15, 11, 16, 1, 2, 2, '', 0),
(54, 1, '053', '053', 3.23, 2, 2, 1, 2, 2, '', 0),
(55, 1, '054', '054', 3.23, 5, 12, 1, 2, 2, '', 0),
(56, 1, '055', '055', 3.23, 5, 12, 1, 2, 2, '', 0),
(57, 1, '056', '056', 3.71, 5, 12, 1, 2, 5, '', 0),
(58, 1, '057', '057', 3.69, 5, 12, 1, 2, 5, '', 0),
(59, 1, '058', '058', 3.95, 5, 12, 1, 2, 5, '', 0),
(60, 1, '059', '059', 8.98, 10, 17, 1, 2, 6, '', 0),
(61, 1, '060', '060', 5.43, 9, 18, 1, 2, 2, '', 0),
(62, 1, '061', '061', 3.82, 5, 12, 2, 3, 7, '', 0),
(63, 1, '062', '062', 3.8, 5, 12, 1, 2, 2, '', 0),
(64, 1, '063', '063', 5.8, 5, 12, 2, 3, 7, '', 0),
(65, 1, '064', '064', 6, 10, 17, 1, 2, 6, '', 0),
(66, 1, '065', '065', 3.52, 10, 17, 1, 2, 2, '', 0),
(67, 1, '066', '066', 4.26, 5, 12, 2, 3, 7, '', 0),
(68, 1, '067', '067', 4.24, 5, 12, 1, 2, 2, '', 0),
(69, 1, '068', '068', 6.46, 5, 12, 2, 3, 7, '', 0),
(70, 1, '069', '069', 6.43, 10, 17, 1, 2, 6, '', 0),
(71, 1, '070', '070', 3.81, 10, 17, 1, 2, 2, '', 0),
(72, 1, '071', '071', 3.81, 10, 19, 2, 3, 7, '', 0),
(73, 1, '072', '072', 3.8, 11, 16, 1, 2, 2, '', 0),
(74, 1, '073', '073', 5.79, 5, 12, 2, 3, 7, '', 0),
(75, 1, '074', '074', 7.1, 10, 17, 1, 2, 6, '', 0),
(76, 1, '075', '075', 4.18, 2, 2, 1, 2, 3, '', 0),
(77, 1, '076', '076', 4.2, 5, 12, 2, 3, 7, '', 0),
(78, 1, '077', '077', 3.38, 5, 6, 2, 3, 7, '', 0),
(79, 1, '078', '078', 4.18, 9, 18, 1, 2, 2, '', 0),
(80, 1, '079', '079', 6.38, 9, 18, 2, 3, 7, '', 0),
(81, 1, '080', '080', 5.71, 12, 20, 1, 2, 6, '', 0),
(82, 1, '081', '081', 3.36, 1, 21, 1, 2, 3, '', 0),
(83, 1, '082', '082', 3.6, 4, 22, 2, 3, 7, '', 0),
(84, 1, '083', '083', 3.37, 13, 23, 1, 2, 2, '', 0),
(85, 1, '084', '084', 3.59, 4, 22, 1, 2, 2, '', 0),
(86, 1, '085', '085', 16.04, 14, 24, 2, 3, 7, '', 0),
(87, 1, '086', '086', 6.08, 10, 17, 1, 2, 6, '', 0),
(88, 1, '087', '087', 3.58, 7, 10, 1, 2, 3, '', 0),
(89, 1, '088', '088', 6.04, 10, 17, 1, 2, 6, '', 0),
(90, 1, '089', '089', 3.56, 2, 2, 1, 2, 3, '', 0),
(91, 1, '090', '090', 3.58, 8, 11, 1, 2, 2, '', 0),
(92, 1, '091', '091', 3.57, 9, 18, 1, 2, 2, '', 0),
(93, 1, '092', '092', 5.64, 5, 25, 1, 2, 6, '', 0),
(94, 1, '093', '093', 3.33, 1, 4, 1, 2, 3, '', 0),
(95, 1, '094', '094', 3.23, 9, 18, 1, 2, 2, '', 0),
(96, 1, '095', '095', 3.33, 2, 2, 1, 2, 2, '', 0),
(97, 1, '096', '096', 5.08, 5, 12, 2, 3, 7, '', 0),
(98, 1, '097', '097', 6.67, 5, 25, 1, 2, 6, '', 0),
(99, 1, '098', '098', 3.9, 2, 2, 1, 2, 3, '', 0),
(100, 1, '099', '099', 3.8, 1, 4, 1, 2, 2, '', 0),
(101, 1, '100', '100', 3.92, 13, 23, 1, 2, 2, '', 0),
(102, 1, '101', '101', 5.99, 13, 23, 2, 3, 7, '', 0),
(103, 1, '102', '102', 6.97, 5, 6, 1, 2, 6, '', 0),
(104, 1, '103', '103', 4.04, 9, 26, 1, 2, 3, '', 0),
(105, 1, '104', '104', 3.96, 9, 26, 1, 2, 2, '', 0),
(106, 1, '105', '105', 4.07, 9, 18, 1, 2, 2, '', 0),
(107, 1, '106', '106', 6.25, 9, 18, 1, 2, 6, '', 0),
(108, 1, '107', '107', 7.07, 13, 23, 1, 2, 7, '', 0),
(109, 1, '108', '108', 4.12, 2, 2, 1, 2, 3, '', 0),
(110, 1, '109', '109', 4.02, 2, 2, 1, 2, 2, '', 0),
(111, 1, '110', '110', 4.13, 9, 18, 1, 2, 2, '', 0),
(112, 1, '111', '111', 6.36, 10, 14, 1, 2, 6, '', 0),
(113, 1, '112', '112', 6.64, 8, 11, 1, 2, 6, '', 0),
(114, 1, '113', '113', 3.89, 8, 11, 1, 2, 2, '', 0),
(115, 1, '114', '114', 3.79, 13, 23, 1, 2, 2, '', 0),
(116, 1, '115', '115', 3.88, 9, 18, 1, 2, 2, '', 0),
(117, 1, '116', '116', 6, 5, 6, 2, 3, 7, '', 0),
(118, 1, '117', '117', 18.42, 8, 11, 1, 2, 8, '', 0),
(119, 1, '119', '119', 3.31, 5, 12, 1, 2, 2, '', 0),
(120, 1, '120', '120', 3.38, 13, 23, 1, 2, 2, '', 0),
(121, 1, '121', '121', 5.24, 10, 17, 2, 3, 7, '', 0),
(122, 1, '124', '124', 3.32, 8, 27, 1, 2, 2, '', 0),
(123, 1, '125', '125', 3.39, 8, 28, 1, 2, 2, '', 0),
(124, 1, '126', '126', 5.27, 8, 11, 2, 3, 7, '', 0),
(125, 1, '127', '127', 8.54, 8, 27, 1, 2, 6, '', 0),
(126, 1, '128', '128', 5.17, 8, 27, 1, 2, 6, '', 0),
(127, 1, '129', '129', 4.94, 8, 28, 2, 3, 7, '', 0),
(128, 1, '130', '130', 5.03, 8, 28, 2, 3, 7, '', 0),
(129, 1, '131', '131', 7.85, 8, 11, 2, 3, 7, '', 0),
(130, 1, '134', '134', 21.5, 2, 2, 1, 1, 1, '', 0),
(131, 1, '135', '135', 2.95, 7, 10, 1, 2, 2, '', 0),
(132, 1, '136', '136', 2.95, 2, 2, 1, 2, 2, '', 0),
(133, 1, '137', '137', 2.95, 2, 2, 1, 2, 2, '', 0),
(134, 1, '138', '138', 2.95, 2, 2, 1, 2, 9, '', 0),
(135, 1, '139', '139', 2.95, 13, 23, 1, 2, 2, '', 0),
(136, 1, '140', '140', 2.95, 1, 4, 1, 2, 2, '', 0),
(137, 1, '141', '141', 2.95, 13, 23, 1, 2, 3, '', 0),
(138, 1, '142', '142', 2.95, 15, 29, 1, 2, 3, '', 0),
(139, 1, '143', '143', 2.95, 1, 4, 1, 2, 3, '', 0),
(140, 1, '144', '144', 2.95, 2, 2, 1, 2, 3, '', 0),
(141, 1, '145', '145', 2.95, 2, 2, 1, 2, 3, '', 0),
(142, 1, '146', '146', 2.95, 2, 2, 1, 2, 3, '', 0),
(143, 1, '147', '147', 2.95, 2, 2, 1, 2, 2, '', 0),
(144, 1, '148', '148', 2.95, 13, 23, 1, 2, 2, '', 0),
(145, 1, '149', '149', 2.95, 5, 12, 1, 2, 2, '', 0),
(146, 1, '150', '150', 2.95, 1, 4, 1, 2, 2, '', 0),
(147, 1, '151', '151', 2.95, 13, 23, 1, 2, 2, '', 0),
(148, 1, '152', '152', 2.95, 13, 23, 1, 2, 2, '', 0),
(149, 1, '153', '153', 2.95, 13, 23, 1, 2, 2, '', 0),
(150, 1, '154', '154', 2.95, 13, 23, 1, 2, 2, '', 0),
(151, 1, '155', '155', 2.95, 13, 23, 1, 2, 2, '', 0),
(152, 1, '156', '156', 2.95, 9, 13, 1, 2, 2, '', 0),
(153, 1, '157', '157', 2.95, 13, 23, 1, 2, 2, '', 0),
(154, 1, '157-A', '157-A', 2.95, 5, 12, 1, 2, 2, '', 0),
(155, 1, '158', '158', 2.95, 10, 30, 1, 2, 3, '', 0),
(156, 1, '159', '159', 2.95, 10, 30, 1, 2, 4, '', 0),
(157, 1, '160', '160', 39.89, 1, 1, 1, 1, 1, '', 0),
(158, 1, 'C008', 'C008', 22.75, 2, 2, 3, 4, 10, '', 0),
(159, 1, 'C014', 'C014', 20.34, 2, 2, 3, 4, 10, '', 0),
(160, 1, 'C020', 'C020', 16.54, 9, 26, 3, 4, 10, '', 0),
(161, 1, 'C021', 'C021', 3.1, 2, 2, 3, 5, 10, '', 0),
(162, 1, 'C028', 'C028', 10.94, 2, 2, 3, 4, 10, '', 0),
(163, 1, 'EQ_001', 'EQ_001', 29.96, 2, 2, 3, 6, 11, '', 0),
(164, 1, 'F001', 'F001', 7.27, 2, 2, 3, 5, 10, '', 0),
(165, 1, 'M_004', 'M_004', 15.02, 9, 26, 4, 7, 12, '', 1),
(166, 1, 'M_005', 'M_005', 15, 9, 26, 4, 8, 12, '', 1),
(167, 1, 'M_006', 'M_006', 29.98, 9, 26, 4, 9, 13, '', 1),
(168, 1, 'S003', 'S003', 18, 2, 2, 3, 4, 10, '', 0),
(169, 1, 'S005', 'S005', 29.18, 2, 2, 3, 4, 10, '', 0),
(170, 1, 'S006', 'S006', 68.88, 2, 2, 3, 4, 10, '', 0),
(171, 1, 'S010', 'S010', 7.83, 2, 2, 3, 5, 10, '', 0),
(172, 1, 'S016', 'S016', 22.85, 2, 2, 5, 10, 10, '', 0),
(173, 1, 'S017', 'S017', 19.59, 2, 2, 5, 10, 10, '', 0),
(174, 1, 'S022', 'S022', 27.27, 2, 2, 3, 6, 3, '', 0),
(175, 1, 'S023', 'S023', 46.23, 2, 2, 3, 4, 10, '', 0),
(176, 1, 'S024', 'S024', 24.95, 2, 2, 3, 4, 10, '', 0),
(177, 1, 'S025', 'S025', 51.53, 2, 2, 3, 4, 10, '', 0),
(178, 1, 'S026', 'S026', 26.11, 2, 2, 3, 4, 10, '', 0),
(179, 1, 'S032', 'S032', 18.01, 2, 2, 3, 4, 10, '', 0),
(180, 1, 'S24', 'S24', 33.87, 2, 2, 3, 4, 10, '', 0),
(181, 1, 'V001', 'V001', 15.99, 2, 2, 5, 10, 10, '', 0),
(182, 1, 'V002', 'V002', 37.5, 2, 2, 5, 10, 10, '', 0),
(183, 1, 'V003', 'V003', 3.05, 2, 2, 5, 11, 10, '', 0),
(184, 1, 'V004', 'V004', 2.29, 2, 2, 5, 11, 10, '', 0),
(185, 1, 'V005', 'V005', 4.89, 2, 2, 5, 10, 10, '', 0),
(186, 1, 'V006', 'V006', 6.96, 2, 2, 5, 12, 10, '', 0),
(187, 1, 'V007', 'V007', 4.92, 9, 26, 5, 11, 10, '', 0),
(188, 1, 'V008', 'V008', 3.84, 9, 26, 5, 12, 10, '', 0),
(189, 1, 'V011', 'V011', 13.15, 2, 2, 5, 10, 10, '', 0),
(190, 1, 'V012', 'V012', 7.91, 2, 2, 5, 12, 10, '', 0),
(191, 1, 'V013', 'V013', 7.91, 2, 2, 5, 12, 10, '', 0),
(192, 1, 'V015', 'V015', 7.91, 2, 2, 5, 12, 10, '', 0),
(193, 1, 'V017', 'V017', 7.91, 2, 2, 5, 12, 10, '', 0),
(194, 1, 'V019', 'V019', 3.38, 2, 2, 5, 10, 10, '', 0),
(195, 1, 'V029', 'V029', 21.2, 2, 2, 5, 13, 10, '', 0),
(196, 1, 'V037', 'V037', 86.63, 2, 2, 5, 14, 10, '', 0),
(197, 1, 'V038', 'V038', 20.96, 2, 2, 5, 13, 10, '', 0),
(198, 1, 'X009', 'X009', 19.64, 2, 2, 3, 4, 10, '', 0),
(199, 2, '001', '001', 27.41, 2, 2, 5, 13, 10, '', 0),
(200, 2, '002', '002', 5.08, 2, 2, 6, 15, 10, '', 0),
(201, 2, '003', '003', 1.15, 2, 2, 7, 16, 10, '', 0),
(202, 2, '004', '004', 13.95, 1, 21, 1, 17, 10, '', 0),
(203, 2, '005', '005', 14.16, 1, 1, 1, 17, 10, '', 0),
(204, 2, '006', '006', 19.17, 1, 4, 1, 17, 10, '', 0),
(205, 2, '007', '007', 3.97, 16, 31, 1, 18, 2, '', 0),
(206, 2, '008', '008', 2.88, 16, 31, 1, 18, 2, '', 0),
(207, 2, '009', '009', 2.93, 16, 31, 1, 18, 2, '', 0),
(208, 2, '010', '010', 2.98, 16, 31, 1, 18, 2, '', 0),
(209, 2, '011', '011', 3.8, 16, 31, 1, 18, 2, '', 0),
(210, 2, '012', '012', 3.55, 16, 31, 1, 18, 2, '', 0),
(211, 2, '013', '013', 2.71, 16, 31, 1, 18, 2, '', 0),
(212, 2, '014', '014', 4.18, 1, 21, 1, 18, 2, '', 0),
(213, 2, '015', '015', 3.24, 1, 21, 1, 18, 2, '', 0),
(214, 2, '016', '016', 2.75, 1, 21, 1, 18, 2, '', 0),
(215, 2, '017', '017', 3.52, 1, 21, 1, 18, 2, '', 0),
(216, 2, '018', '018', 6.24, 17, 32, 1, 18, 2, '', 0),
(217, 2, '019', '019', 3.96, 1, 1, 1, 18, 2, '', 0),
(218, 2, '020', '020', 12.6, 17, 33, 1, 17, 10, '', 0),
(219, 2, '021', '021', 12.68, 17, 32, 1, 17, 10, '', 0),
(220, 2, '022', '022', 10.31, 8, 11, 1, 19, 10, '', 0),
(221, 2, '023', '023', 5.62, 2, 2, 1, 20, 10, '', 0),
(222, 2, '024', '024', 5.33, 2, 2, 1, 18, 2, '', 0),
(223, 2, '025', '025', 4.01, 2, 2, 1, 18, 2, '', 0),
(224, 2, '026', '026', 4.37, 2, 2, 1, 18, 2, '', 0),
(225, 2, '027', '027', 12.51, 18, 34, 1, 19, 10, '', 0),
(226, 2, '028', '028', 10.44, 2, 2, 6, 15, 10, '', 0),
(227, 2, '029', '029', 10.18, 2, 2, 3, 21, 10, '', 0),
(228, 2, '030', '030', 14.41, 2, 2, 5, 13, 10, '', 0),
(229, 2, '031', '031', 11.9, 2, 2, 3, 22, 10, '', 0),
(230, 2, '032', '032', 15.97, 2, 2, 7, 16, 10, '', 0),
(231, 2, '033', '033', 15.88, 2, 2, 3, 23, 10, '', 0),
(232, 2, '034', '034', 3.01, 2, 2, 7, 16, 10, '', 0),
(233, 2, '035', '035', 2.96, 2, 2, 7, 16, 10, '', 0),
(234, 2, '036', '036', 10.7, 2, 2, 5, 12, 10, '', 0),
(235, 2, '037', '037', 11.35, 2, 2, 3, 21, 10, '', 0),
(236, 2, '038', '038', 9.77, 2, 2, 5, 12, 10, '', 0),
(237, 2, '039', '039', 2.99, 2, 2, 1, 18, 2, '', 0),
(238, 2, '040', '040', 3.04, 13, 23, 1, 18, 2, '', 0),
(239, 2, '041', '041', 3.17, 13, 23, 1, 18, 2, '', 0),
(240, 2, '042', '042', 3.05, 13, 23, 1, 18, 2, '', 0),
(241, 2, '043', '043', 3.16, 13, 23, 1, 18, 2, '', 0),
(242, 2, '044', '044', 3.27, 13, 23, 1, 18, 2, '', 0),
(243, 2, '045', '045', 3.86, 13, 23, 1, 18, 2, '', 0),
(244, 2, '046', '046', 3.85, 2, 2, 1, 18, 2, '', 0),
(245, 2, '047', '047', 3.95, 8, 11, 1, 18, 2, '', 0),
(246, 2, '048', '048', 3.88, 8, 11, 1, 18, 2, '', 0),
(247, 2, '049', '049', 3.78, 8, 11, 1, 18, 2, '', 0),
(248, 2, '050', '050', 3.84, 8, 11, 1, 18, 2, '', 0),
(249, 2, '051', '051', 3.84, 1, 21, 1, 18, 2, '', 0),
(250, 2, '052', '052', 3.71, 1, 21, 1, 18, 2, '', 0),
(251, 2, '053', '053', 3.61, 1, 21, 1, 18, 2, '', 0),
(252, 2, '054', '054', 3.73, 1, 21, 1, 18, 2, '', 0),
(253, 2, '055', '055', 3.76, 12, 35, 1, 18, 2, '', 0),
(254, 2, '056', '056', 3.64, 6, 9, 1, 18, 2, '', 0),
(255, 2, '057', '057', 3.72, 12, 36, 1, 18, 2, '', 0),
(256, 2, '058', '058', 3.9, 1, 1, 1, 18, 2, '', 0),
(257, 2, '059', '059', 3.42, 13, 23, 1, 18, 2, '', 0),
(258, 2, '060', '060', 4.16, 13, 23, 1, 18, 2, '', 0),
(259, 2, '061', '061', 5.65, 13, 23, 1, 18, 2, '', 0),
(260, 2, '062', '062', 4.25, 13, 23, 1, 18, 2, '', 0),
(261, 2, '063', '063', 4.09, 13, 23, 1, 18, 2, '', 0),
(262, 2, '064', '064', 4.38, 13, 23, 1, 18, 2, '', 0),
(263, 2, '065', '065', 3.11, 13, 23, 1, 18, 2, '', 0),
(264, 2, '066', '066', 2.92, 13, 23, 1, 18, 2, '', 0),
(265, 2, '067', '067', 3.76, 13, 23, 1, 18, 2, '', 0),
(266, 2, '068', '068', 2.81, 13, 23, 1, 18, 2, '', 0),
(267, 2, '069', '069', 2.78, 13, 23, 1, 18, 2, '', 0),
(268, 2, '070', '070', 3.7, 13, 23, 1, 18, 2, '', 0),
(269, 2, '071', '071', 6.89, 18, 37, 1, 20, 10, '', 0),
(270, 2, '072', '072', 5.27, 18, 38, 1, 20, 10, '', 0),
(271, 2, '073', '073', 11.83, 13, 23, 1, 19, 10, '', 0),
(272, 3, '001', '001', 25.47, 20, 39, 1, 18, 2, '', 0),
(273, 3, '002', '002', 15.03, 3, 40, 1, 18, 2, '', 0),
(274, 3, '003', '003', 22.15, 3, 40, 1, 18, 2, '', 0),
(275, 3, '004', '004', 14.75, 3, 40, 1, 18, 2, '', 0),
(276, 3, '005', '005', 14.77, 3, 3, 1, 18, 2, '', 0),
(277, 3, '006', '006', 14.76, 3, 3, 1, 18, 2, '', 0),
(278, 3, '007', '007', 14.75, 3, 3, 1, 18, 2, '', 0),
(279, 3, '008', '008', 14.76, 3, 3, 1, 18, 2, '', 0),
(280, 3, '009', '009', 14.75, 3, 3, 1, 18, 2, '', 0),
(281, 3, '010', '010', 14.75, 3, 3, 1, 18, 2, '', 0),
(282, 3, '011', '011', 22.12, 21, 41, 1, 18, 2, '', 0),
(283, 3, '012', '012', 22.25, 21, 41, 1, 18, 2, '', 0),
(284, 3, '013', '013', 22.19, 10, 42, 1, 18, 2, '', 0),
(285, 3, '014', '014', 14.8, 9, 18, 1, 18, 2, '', 0),
(286, 3, '015', '015', 14.79, 22, 43, 1, 18, 2, '', 0),
(287, 3, '016', '016', 14.79, 22, 43, 1, 18, 2, '', 0),
(288, 3, '017', '017', 14.79, 22, 44, 1, 18, 2, '', 0),
(289, 3, '018', '018', 14.78, 22, 45, 1, 18, 2, '', 0),
(290, 3, '019', '019', 14.78, 22, 46, 1, 18, 2, '', 0),
(291, 3, '020', '020', 22.16, 22, 47, 1, 18, 2, '', 0),
(292, 3, '021', '021', 21.43, 10, 42, 1, 18, 2, '', 0),
(293, 3, '022', '022', 4.19, 9, 18, 1, 18, 2, '', 0),
(294, 3, '023', '023', 4.19, 2, 2, 1, 18, 2, '', 0),
(295, 3, '024', '024', 4.25, 2, 2, 1, 18, 2, '', 0),
(296, 3, '025', '025', 4.25, 9, 18, 1, 18, 2, '', 0),
(297, 3, '026', '026', 4.19, 9, 18, 1, 18, 2, '', 0),
(298, 3, '027', '027', 4.19, 9, 18, 1, 18, 2, '', 0),
(299, 3, '028', '028', 4.25, 9, 18, 1, 18, 2, '', 0),
(300, 3, '029', '029', 14.29, 2, 2, 1, 18, 2, '', 0),
(301, 3, '030', '030', 14.33, 2, 2, 1, 18, 2, '', 0),
(302, 3, '031', '031', 14.33, 9, 18, 1, 18, 2, '', 0),
(303, 3, '032', '032', 14.38, 9, 18, 1, 18, 2, '', 0),
(304, 3, '033', '033', 14.38, 1, 21, 1, 18, 2, '', 0),
(305, 3, '034', '034', 29.2, 1, 1, 1, 18, 2, '', 0),
(306, 3, '035', '035', 4.19, 1, 4, 1, 18, 2, '', 0),
(307, 3, '036', '036', 4.19, 1, 21, 1, 18, 2, '', 0),
(308, 3, '037', '037', 4.25, 1, 1, 1, 18, 2, '', 0),
(309, 3, '038', '038', 4.17, 1, 4, 1, 18, 2, '', 0),
(310, 3, '039', '039', 4.18, 1, 21, 1, 18, 2, '', 0),
(311, 3, '040', '040', 14.49, 1, 1, 1, 18, 2, '', 0),
(312, 3, '041', '041', 14.28, 1, 4, 1, 18, 2, '', 0),
(313, 3, '042', '042', 4.25, 21, 41, 1, 18, 2, '', 0),
(314, 3, '043', '043', 4.19, 21, 41, 1, 18, 2, '', 0),
(315, 3, '044', '044', 4.19, 21, 41, 1, 18, 2, '', 0),
(316, 3, '045', '045', 21.72, 1, 21, 1, 18, 2, '', 0),
(317, 3, '046', '046', 14.68, 22, 43, 1, 18, 2, '', 0),
(318, 3, '047', '047', 22.04, 22, 43, 1, 18, 2, '', 0),
(319, 3, '048', '048', 15.84, 22, 44, 1, 18, 2, '', 0),
(320, 3, '049', '049', 15.41, 22, 45, 1, 18, 2, '', 0),
(321, 3, '050', '050', 15.47, 22, 46, 1, 18, 2, '', 0),
(322, 3, '051', '051', 23.34, 22, 47, 1, 18, 2, '', 0),
(323, 3, '052', '052', 15.12, 8, 11, 1, 18, 2, '', 0),
(324, 3, '053', '053', 15.42, 8, 27, 1, 18, 2, '', 0),
(325, 3, '054', '054', 15.39, 8, 28, 1, 18, 2, '', 0),
(326, 3, '055', '055', 14.04, 8, 11, 1, 18, 2, '', 0),
(327, 3, '056', '056', 23.6, 8, 27, 1, 18, 2, '', 0),
(328, 3, '057', '057', 23.36, 8, 28, 1, 18, 2, '', 0),
(329, 3, '058', '058', 15.82, 8, 11, 1, 18, 2, '', 0),
(330, 3, '059', '059', 18.34, 2, 2, 6, 15, 10, '', 0),
(331, 3, '060', '060', 99.31, 2, 2, 4, 2, 2, '', 0),
(332, 3, '061', '061', 4.25, 17, 33, 1, 18, 2, '', 0),
(333, 3, '062', '062', 4.19, 17, 32, 1, 18, 2, '', 0),
(334, 3, '063', '063', 4.19, 21, 48, 1, 18, 2, '', 0),
(335, 3, '064', '064', 23.19, 2, 2, 8, 25, 10, '', 0),
(336, 3, '065', '065', 22.05, 2, 2, 8, 25, 10, '', 0),
(337, 3, '066', '066', 14.38, 17, 33, 1, 18, 2, '', 0),
(338, 3, '067', '067', 14.57, 17, 32, 1, 18, 2, '', 0),
(339, 3, '068', '068', 14.56, 17, 33, 1, 18, 2, '', 0),
(340, 3, '069', '069', 14.57, 17, 32, 1, 18, 2, '', 0),
(341, 3, '070', '070', 14.58, 5, 25, 1, 18, 2, '', 0),
(342, 3, '071', '071', 14.58, 5, 25, 1, 18, 2, '', 0),
(343, 3, '072', '072', 21.87, 5, 25, 1, 18, 2, '', 0),
(344, 3, '073', '073', 21.89, 5, 25, 1, 18, 2, '', 0),
(345, 3, '074', '074', 17.41, 5, 25, 1, 26, 10, '', 0),
(346, 3, '075', '075', 17.42, 5, 25, 1, 26, 10, '', 0),
(347, 3, '076', '076', 17.41, 5, 25, 9, 27, 10, '', 0),
(348, 3, '077', '077', 15.6, 5, 25, 1, 26, 10, '', 0),
(349, 3, '078', '078', 4.17, 5, 25, 1, 18, 2, '', 0),
(350, 3, '079', '079', 4.19, 8, 11, 1, 18, 2, '', 0),
(351, 3, '080', '080', 4.19, 8, 27, 1, 18, 2, '', 0),
(352, 3, '081', '081', 4.25, 8, 28, 1, 18, 2, '', 0),
(353, 3, '082', '082', 4.17, 5, 25, 1, 18, 2, '', 0),
(354, 3, '083', '083', 2.64, 12, 49, 1, 18, 2, '', 0),
(355, 3, '084', '084', 2.97, 5, 25, 1, 18, 2, '', 0),
(356, 3, '085', '085', 3.14, 12, 49, 1, 18, 2, '', 0),
(357, 3, '086', '086', 4.31, 12, 49, 1, 18, 2, '', 0),
(358, 3, '087', '087', 4.19, 12, 49, 1, 18, 2, '', 0),
(359, 3, '088', '088', 14.45, 12, 49, 1, 18, 2, '', 0),
(360, 3, '089', '089', 15.29, 2, 2, 1, 18, 2, '', 0),
(361, 3, '090', '090', 14.75, 2, 2, 1, 18, 2, '', 0),
(362, 3, '091', '091', 14.7, 2, 2, 1, 18, 2, '', 0),
(363, 3, '092', '092', 14.4, 2, 2, 1, 18, 2, '', 0),
(364, 3, '093', '093', 4.19, 2, 2, 1, 18, 2, '', 0),
(365, 3, '094', '094', 4.19, 2, 2, 1, 18, 2, '', 0),
(366, 3, '095', '095', 4.25, 2, 2, 1, 18, 2, '', 0),
(367, 3, '096', '096', 14.77, 12, 49, 1, 18, 2, '', 0),
(368, 3, '097', '097', 14.29, 12, 49, 1, 18, 2, '', 0),
(369, 3, '098', '098', 14.26, 12, 49, 1, 18, 2, '', 0),
(370, 3, '099', '099', 14.11, 2, 2, 1, 18, 2, '', 0),
(371, 3, '100', '100', 14.4, 2, 2, 1, 18, 2, '', 0),
(372, 3, '101', '101', 14.37, 2, 2, 1, 18, 2, '', 0),
(373, 3, '102', '102', 14.37, 2, 2, 1, 18, 2, '', 0),
(374, 3, '103', '103', 14.34, 2, 2, 6, 15, 10, '', 0),
(375, 3, '104', '104', 21.44, 13, 23, 1, 18, 2, '', 0),
(376, 3, '105', '105', 22.19, 13, 23, 1, 18, 2, '', 0),
(377, 3, '106', '106', 14.79, 13, 23, 1, 18, 2, '', 0),
(378, 3, '107', '107', 14.79, 13, 23, 1, 18, 2, '', 0),
(379, 3, '108', '108', 14.8, 13, 23, 1, 18, 2, '', 0),
(380, 3, '109', '109', 14.79, 10, 50, 1, 18, 2, '', 0),
(381, 3, '110', '110', 14.8, 10, 50, 1, 18, 2, '', 0),
(382, 3, '111', '111', 14.79, 10, 50, 1, 18, 2, '', 0),
(383, 3, '112', '112', 22.17, 10, 50, 1, 18, 2, '', 0),
(384, 3, '113', '113', 22.3, 10, 42, 1, 18, 2, '', 0),
(385, 3, '114', '114', 4.19, 10, 51, 1, 18, 2, '', 0),
(386, 3, '115', '115', 4.19, 10, 51, 1, 18, 2, '', 0),
(387, 3, '116', '116', 14.44, 5, 25, 1, 18, 9, '', 0),
(388, 3, '117', '117', 29, 12, 49, 1, 18, 9, '', 0),
(389, 3, '118', '118', 15.41, 5, 25, 1, 18, 9, '', 0),
(390, 3, '119', '119', 23.21, 12, 49, 1, 18, 9, '', 0),
(391, 3, '120', '120', 23.21, 5, 25, 1, 18, 9, '', 0),
(392, 3, '121', '121', 23.21, 12, 49, 1, 18, 9, '', 0),
(393, 3, '122', '122', 15.47, 5, 25, 1, 18, 9, '', 0),
(394, 3, '123', '123', 15.47, 12, 49, 1, 18, 9, '', 0),
(395, 3, '124', '124', 15.47, 12, 49, 1, 18, 9, '', 0),
(396, 3, '125', '125', 15.47, 5, 25, 1, 18, 9, '', 0),
(397, 3, '126', '126', 15.47, 5, 25, 1, 18, 9, '', 0),
(398, 3, '127', '127', 4.19, 12, 49, 1, 18, 2, '', 0),
(399, 3, '128', '128', 4.19, 12, 49, 1, 18, 2, '', 0),
(400, 3, '129', '129', 4.25, 12, 49, 1, 18, 2, '', 0),
(401, 3, '130', '130', 4.19, 12, 49, 1, 18, 2, '', 0),
(402, 3, '131', '131', 4.19, 12, 49, 1, 18, 2, '', 0),
(403, 3, '132', '132', 4.25, 13, 23, 1, 18, 2, '', 0),
(404, 3, '133', '133', 4.19, 13, 23, 1, 18, 2, '', 0),
(405, 3, '134', '134', 4.19, 13, 23, 1, 18, 2, '', 0),
(406, 3, '135', '135', 4.19, 13, 23, 1, 18, 2, '', 0),
(407, 3, '136', '136', 4.19, 13, 23, 1, 18, 2, '', 0),
(408, 3, 'S001', 'S001', 14.89, 2, 2, 1, 18, 2, '', 0),
(409, 3, 'S002', 'S002', 410.55, 2, 2, 3, 4, 10, '', 0),
(410, 3, 'S003', 'S003', 15.32, 2, 2, 1, 18, 2, '', 0),
(411, 3, 'S004', 'S004', 14.86, 2, 2, 1, 18, 2, '', 0),
(412, 3, 'S005', 'S005', 10.48, 2, 2, 4, 10, 10, '', 0),
(413, 3, 'S006', 'S006', 39.09, 2, 2, 3, 4, 10, '', 0),
(414, 3, 'S007', 'S007', 2.12, 2, 2, 5, 10, 10, '', 0),
(415, 3, 'S008', 'S008', 9.07, 2, 2, 5, 10, 10, '', 0),
(416, 3, 'S009', 'S009', 14.95, 12, 49, 1, 18, 2, '', 0),
(417, 3, 'S010', 'S010', 10.48, 2, 2, 4, 10, 10, '', 0),
(418, 3, 'S011', 'S011', 29.39, 2, 2, 3, 22, 10, '', 0),
(419, 3, 'S012', 'S012', 10.48, 2, 2, 4, 10, 10, '', 0),
(420, 3, 'S013', 'S013', 9.29, 2, 2, 3, 23, 10, '', 0),
(421, 3, 'S014', 'S014', 14.84, 12, 49, 1, 18, 2, '', 0),
(422, 3, 'S015', 'S015', 14.73, 12, 49, 1, 18, 2, '', 0),
(423, 3, 'S016', 'S016', 10.48, 2, 2, 4, 10, 10, '', 0),
(424, 3, 'S017', 'S017', 4.82, 2, 2, 9, 27, 10, '', 0),
(425, 3, 'S018', 'S018', 9.46, 2, 2, 5, 10, 10, '', 0),
(426, 3, 'S019', 'S019', 2.42, 2, 2, 5, 10, 10, '', 0),
(427, 3, 'S020', 'S020', 8.31, 2, 2, 3, 23, 10, '', 0),
(428, 3, 'S021', 'S021', 15.23, 2, 2, 3, 23, 10, '', 0),
(429, 3, 'S022', 'S022', 2.24, 12, 49, 1, 18, 2, '', 0),
(430, 3, 'S023', 'S023', 7.93, 2, 2, 3, 22, 10, '', 0),
(431, 3, 'S024', 'S024', 15.25, 2, 2, 1, 18, 2, '', 0),
(432, 3, 'S025', 'S025', 11.18, 2, 2, 5, 10, 10, '', 0),
(433, 3, 'S026', 'S026', 12.58, 2, 2, 3, 23, 10, '', 0),
(434, 3, 'S027', 'S027', 12.61, 2, 2, 3, 22, 10, '', 0),
(435, 3, 'V001', 'V001', 56.01, 2, 2, 5, 10, 10, '', 0),
(436, 3, 'V002', 'V002', 139.2, 2, 2, 3, 21, 10, '', 0),
(437, 3, 'V003', 'V003', 59.68, 2, 2, 5, 10, 10, '', 0),
(438, 3, 'V004', 'V004', 26.12, 2, 2, 3, 28, 10, '', 0),
(439, 3, 'V005', 'V005', 46.18, 2, 2, 5, 13, 10, '', 0),
(440, 3, 'V006', 'V006', 28.53, 2, 2, 5, 10, 10, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `room_types`
--

CREATE TABLE `room_types` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `office` tinyint(1) DEFAULT '0',
  `vert` tinyint(1) DEFAULT '0',
  `meeting` tinyint(1) DEFAULT '0',
  `mtg` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `room_types`
--

INSERT INTO `room_types` (`id`, `name`, `office`, `vert`, `meeting`, `mtg`) VALUES
(1, 'CELLULAR', 1, 0, 0, 0),
(2, 'OPEN_PLAN', 1, 0, 0, 0),
(3, 'SERV-CENT', 1, 0, 0, 0),
(4, 'CIRC_01', 0, 1, 0, 0),
(5, 'FILING', 0, 0, 0, 0),
(6, 'EQPM ROOM', 0, 0, 0, 0),
(7, 'MEETING_AV', 0, 0, 1, 1),
(8, 'MEETING_BL', 0, 0, 1, 1),
(9, 'DISPLAY_RM', 0, 0, 1, 1),
(10, 'VERT', 0, 1, 0, 0),
(11, 'SHAFT', 0, 1, 0, 0),
(12, 'LIFT', 0, 1, 0, 0),
(13, 'STAIR', 0, 1, 0, 0),
(14, 'ATTRIUM', 0, 1, 0, 0),
(15, 'STORAGE', 0, 0, 0, 0),
(16, '', 0, 0, 0, 0),
(17, 'EXEC-SR', 1, 0, 0, 0),
(18, 'WRKSTATION', 1, 0, 0, 0),
(19, 'EXEC-JR', 1, 0, 0, 0),
(20, 'EXEC-SEC', 1, 0, 0, 0),
(21, 'LOBBY', 0, 0, 0, 0),
(22, 'W/C FEMALE', 0, 1, 0, 0),
(23, 'W/C MALE', 0, 1, 0, 0),
(24, 'CONF_BL', 0, 0, 1, 1),
(25, 'RESEARCH', 0, 0, 0, 0),
(26, 'OFFICE', 1, 0, 0, 0),
(27, 'COPY', 0, 0, 0, 0),
(28, 'W/C', 0, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `schema_migrations`
--

CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `schema_migrations`
--

INSERT INTO `schema_migrations` (`version`) VALUES
('20100314155226'),
('20100328190456'),
('20100401173753'),
('20100401174033'),
('20100402164010'),
('20100402164031'),
('20100408184745');

-- --------------------------------------------------------

--
-- Table structure for table `standards`
--

CREATE TABLE `standards` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `standards`
--

INSERT INTO `standards` (`id`, `name`) VALUES
(1, 'OFF-EXEC'),
(2, 'WKSTA'),
(3, 'HOT_DESK'),
(4, 'WKSTA-SEC'),
(5, 'OFF-PROF'),
(6, 'WKSTA-B'),
(7, 'WKSTA-TECH'),
(8, 'QUITE_RM'),
(9, 'WKSTA-A'),
(10, ''),
(11, 'EQUIP_RM'),
(12, 'MTG_12'),
(13, 'MTG_16');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `name`) VALUES
(1, 'London'),
(2, 'Herts'),
(3, 'Worcs');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `crypted_password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_salt` varchar(255) DEFAULT NULL,
  `persistence_token` varchar(255) DEFAULT NULL,
  `interface_level` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `crypted_password`, `email`, `password_salt`, `persistence_token`, `interface_level`) VALUES
(1, 'Scott', '0cdcf458132687b04b40c832eea4bca4d3ae69221b13cd017c6a16db860b51b97a311feaf2a4c0a4a9be8933538cd97054093adc7b475d785f65c011d6aebefb', 'staylor@tailormade.com', 'EY0q2SL79Wa5TtoRky72', '4f940de19f3269efa7bad440af5f370968ca43c943f55d9535a7f6e71f1bc91334a27931e4cae0786bd48c939af7a10fd4ad2593b795e1c18814ac2015934668', 1),
(3, 'Guest', '286e4058ab77ffd6549404c5cfa070388915ec0f827e0b315f61ec862b10a746fa28223436ea3586ccd2ee0547b55ce9821883b2bc4e314d70309a0e783cdeaa', 'guest@tailormade.com', 'wk6FKUGdwtAtjWp_rIyl', '5ae8eeb4e84d4dff2207b894744493db2777c7020977123babcdbecdeabda98dfd135b9eb7ce0e4e1d190a787a6070921e2f0db3ec7a9fa68ff145279acf8526', 0),
(4, 'Angelo', '768786b144dc4301d4a0876f943a7a982ccea23d7fa36f14aa7d4fce604f49a38a231d04a5d5893abefaa46025d9347e4e00ee70d35d8760c90150560ff487b8', 'Angelo.Marcelo@rci.rogers.com', 'rnmgl1s4ie91bME-Qnaq', '699bfb6724dd3f2e8f3b422827ab786ad87ae66cdf56a7c47fdd4d0e648be2dd197b83a70c1c9e9c42895ec60791f81ac00bb05c6fce37a73840334b57e31a0d', 1),
(5, 'Admin', '2a8fa85da4eb2e989c1de0b31deae5c43211a7045c61952049f394de99b6707c9b31f1738764721d59e155eec555b5c785576f918fd31ca20ffd294671deb1ce', 'sales@tailormade.com', '-ZBWGA82XaSTWwGKpj4e', 'e0eac1c1853b490e47b581b040cdc646e099afc09ba475a9d8f74a21f808056b13396770599044fed992f607c229422872fb5cc02ec40d3ce2a44fd796cd3109', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asset_types`
--
ALTER TABLE `asset_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `buildings`
--
ALTER TABLE `buildings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `calendars`
--
ALTER TABLE `calendars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `defusers`
--
ALTER TABLE `defusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_photos`
--
ALTER TABLE `employee_photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `floors`
--
ALTER TABLE `floors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `my_defaults`
--
ALTER TABLE `my_defaults`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `org1s`
--
ALTER TABLE `org1s`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `org2s`
--
ALTER TABLE `org2s`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pdfs`
--
ALTER TABLE `pdfs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_types`
--
ALTER TABLE `room_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schema_migrations`
--
ALTER TABLE `schema_migrations`
  ADD UNIQUE KEY `unique_schema_migrations` (`version`);

--
-- Indexes for table `standards`
--
ALTER TABLE `standards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `asset_types`
--
ALTER TABLE `asset_types`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `buildings`
--
ALTER TABLE `buildings`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `calendars`
--
ALTER TABLE `calendars`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `defusers`
--
ALTER TABLE `defusers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=421;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=323;

--
-- AUTO_INCREMENT for table `employee_photos`
--
ALTER TABLE `employee_photos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `floors`
--
ALTER TABLE `floors`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `my_defaults`
--
ALTER TABLE `my_defaults`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `org1s`
--
ALTER TABLE `org1s`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `org2s`
--
ALTER TABLE `org2s`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `pdfs`
--
ALTER TABLE `pdfs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=441;

--
-- AUTO_INCREMENT for table `room_types`
--
ALTER TABLE `room_types`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `standards`
--
ALTER TABLE `standards`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
