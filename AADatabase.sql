-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 01, 2025 at 01:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carplace`
--
CREATE DATABASE IF NOT EXISTS `carplace` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `carplace`;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int(9) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(1, 'Volkswagen'),
(2, 'BMW'),
(3, 'Mercedes-Benz'),
(4, 'Audi'),
(5, 'Renault'),
(6, 'Peugeot'),
(7, 'Opel'),
(8, 'Ford'),
(9, 'Toyota'),
(10, 'Skoda'),
(11, 'Fiat'),
(12, 'Citroën'),
(13, 'Hyundai'),
(14, 'Kia'),
(15, 'Nissan'),
(16, 'Volvo'),
(17, 'Seat'),
(18, 'Dacia'),
(19, 'Mazda'),
(20, 'Suzuki'),
(21, 'Honda'),
(22, 'Mitsubishi'),
(23, 'Jeep'),
(24, 'Land Rover'),
(25, 'Mini'),
(26, 'Jaguar'),
(27, 'Porsche'),
(28, 'Lexus'),
(29, 'Alfa Romeo'),
(30, 'Chevrolet'),
(31, 'Tesla'),
(32, 'Smart'),
(33, 'Subaru'),
(34, 'DS Automobiles'),
(35, 'Infiniti'),
(36, 'SsangYong'),
(37, 'Lancia'),
(38, 'Lada'),
(39, 'Dodge'),
(40, 'Chrysler'),
(41, 'Abarth'),
(42, 'MG'),
(43, 'Cupra'),
(44, 'Aston Martin'),
(45, 'Bentley'),
(46, 'Ferrari'),
(47, 'Lamborghini'),
(48, 'Maserati'),
(49, 'McLaren'),
(50, 'Rolls-Royce'),
(51, 'Bugatti'),
(52, 'Lotus'),
(53, 'Alpine'),
(54, 'Tata'),
(55, 'Mahindra'),
(56, 'Great Wall'),
(57, 'BYD'),
(58, 'Geely'),
(59, 'Haval'),
(60, 'Chery'),
(61, 'Daihatsu'),
(62, 'Isuzu'),
(63, 'Proton'),
(64, 'Perodua'),
(65, 'Saab'),
(66, 'Trabant'),
(67, 'Wartburg'),
(68, 'Moskvich'),
(69, 'Zastava'),
(70, 'GAZ'),
(71, 'UAZ'),
(72, 'Datsun'),
(73, 'Hummer'),
(74, 'Maybach'),
(75, 'Rover'),
(76, 'Austin'),
(77, 'Morris'),
(78, 'TVR'),
(79, 'Noble'),
(80, 'Koenigsegg');

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(9) NOT NULL,
  `brand_id` int(9) NOT NULL,
  `type_id` int(9) NOT NULL,
  `description` text DEFAULT NULL,
  `km_clock` int(11) NOT NULL,
  `color_id` int(9) NOT NULL,
  `price` int(11) NOT NULL,
  `seller_id` int(9) NOT NULL,
  `upload_date` datetime NOT NULL,
  `sold` tinyint(1) NOT NULL,
  `body_type` varchar(32) NOT NULL,
  `num_of_cyl` int(11) NOT NULL,
  `horsepower` int(11) NOT NULL,
  `cc` int(11) NOT NULL,
  `engine_type` varchar(12) NOT NULL,
  `fuel_type` varchar(32) NOT NULL,
  `drive` varchar(50) NOT NULL,
  `trans_type` varchar(50) NOT NULL,
  `Year` int(9) NOT NULL,
  `k_weight` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `brand_id`, `type_id`, `description`, `km_clock`, `color_id`, `price`, `seller_id`, `upload_date`, `sold`, `body_type`, `num_of_cyl`, `horsepower`, `cc`, `engine_type`, `fuel_type`, `drive`, `trans_type`, `Year`, `k_weight`) VALUES
(1, 1, 1, 'Fuel-efficient and reliable.', 40000, 3, 18000, 1, '2024-01-10 10:00:00', 0, 'Sedan', 4, 139, 1798, 'Inline', 'Petrol', 'FWD', 'Automatic', 2022, 1400),
(2, 2, 2, 'Comfortable and spacious.', 25000, 2, 25000, 1, '2024-02-05 14:30:00', 0, 'Sedan', 4, 192, 1996, 'Inline', 'Petrol', 'FWD', 'CVT', 2021, 1500),
(3, 3, 3, 'Strong and powerful SUV.', 60000, 5, 32000, 1, '2023-12-01 09:45:00', 1, 'SUV', 6, 400, 3000, 'V', 'Petrol', 'AWD', 'Automatic', 2023, 2100),
(4, 4, 4, 'Eladó sorba került BMW 320i autóm!', 20000, 1, 42000, 1, '2024-03-15 16:20:00', 0, 'Coupe', 6, 382, 2998, 'Inline', 'Petrol', 'RWD', 'Automatic', 2022, 1700),
(5, 5, 5, 'Luxury and performance.', 18000, 4, 48000, 1, '2023-11-20 08:10:00', 1, 'Sedan', 4, 255, 1991, 'Inline', 'Petrol', 'RWD', 'Automatic', 2023, 1800),
(6, 6, 6, 'Large family-friendly SUV.', 55000, 6, 35000, 1, '2024-01-25 12:50:00', 0, 'SUV', 8, 420, 5300, 'V', 'Petrol', 'AWD', 'Automatic', 2021, 2500),
(7, 7, 7, 'Efficient and compact.', 30000, 7, 19000, 1, '2024-02-20 11:15:00', 0, 'Sedan', 4, 149, 1997, 'Inline', 'Petrol', 'FWD', 'CVT', 2020, 1300),
(8, 8, 8, 'Reliable mid-size sedan.', 75000, 8, 22000, 1, '2023-10-10 07:35:00', 1, 'Sedan', 4, 174, 1984, 'Inline', 'Petrol', 'FWD', 'Manual', 2019, 1400),
(13, 9, 9, 'A nice car', 50000, 1, 15000, 1, '2025-02-24 11:43:38', 0, 'Sedan', 4, 150, 2000, 'Inline', 'Petrol', 'FWD', 'Automatic', 2020, 1500);

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(9) NOT NULL,
  `name` varchar(255) NOT NULL,
  `hexcode` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`, `hexcode`) VALUES
(1, 'Piros', '#FF0000'),
(2, 'Kék', '#0000FF'),
(3, 'Fekete', '#000000'),
(4, 'Fehér', '#FFFFFF'),
(5, 'Szürke', '#808080'),
(6, 'Ezüst', '#C0C0C0'),
(7, 'Zöld', '#008000'),
(8, 'Sárga', '#FFFF00'),
(9, 'Okker', '#CC7722'),
(10, 'Bordó', '#800000'),
(11, 'Lila', '#800080'),
(12, 'Rózsaszín', '#FFC0CB'),
(13, 'Narancssárga', '#FFA500'),
(14, 'Türkiz', '#40E0D0'),
(15, 'Barna', '#A52A2A'),
(16, 'Krémszín', '#FFFDD0'),
(17, 'Arany', '#FFD700'),
(18, 'Bronz', '#CD7F32'),
(19, 'Olívazöld', '#6B8E23'),
(20, 'Tengerkék', '#008080'),
(21, 'Indigókék', '#4B0082'),
(22, 'Korall', '#FF7F50'),
(23, 'Lazac', '#FA8072'),
(24, 'Világoskék', '#ADD8E6'),
(25, 'Sötétkék', '#00008B'),
(26, 'Füstszürke', '#848884'),
(27, 'Antracit', '#383E42'),
(28, 'Mályvaszín', '#993366'),
(29, 'Tejeskávé', '#6F4E37'),
(30, 'Khaki', '#C3B091'),
(31, 'Bézs', '#F5F5DC'),
(32, 'Padlizsán', '#614051'),
(33, 'Cián', '#00FFFF'),
(34, 'Lime', '#00FF00'),
(35, 'Burgundi', '#900020'),
(36, 'Téglavörös', '#B22222'),
(37, 'Kobalt', '#0047AB'),
(38, 'Sötétzöld', '#013220'),
(39, 'Menta', '#98FF98'),
(40, 'Lavanda', '#E6E6FA');

-- --------------------------------------------------------

--
-- Table structure for table `pictues`
--

CREATE TABLE `pictues` (
  `id` int(8) NOT NULL,
  `car_id` int(11) NOT NULL,
  `filePath` varchar(124) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pictues`
--

INSERT INTO `pictues` (`id`, `car_id`, `filePath`) VALUES
(1, 1, 'not yet implemented');

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` int(9) NOT NULL,
  `brand_id` int(9) NOT NULL,
  `type_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `brand_id`, `type_name`) VALUES
-- Volkswagen
(1, 1, 'Golf'),
(2, 1, 'Passat'),
(3, 1, 'Tiguan'),
(4, 1, 'Polo'),
(5, 1, 'Arteon'),
(6, 1, 'ID.3'),
(7, 1, 'ID.4'),
(8, 1, 'T-Roc'),
(9, 1, 'Touran'),
(10, 1, 'Egyéb'),

-- BMW
(11, 2, '3 Series'),
(12, 2, '5 Series'),
(13, 2, 'X3'),
(14, 2, 'X5'),
(15, 2, '1 Series'),
(16, 2, 'X1'),
(17, 2, '7 Series'),
(18, 2, 'i4'),
(19, 2, 'iX'),
(20, 2, 'Egyéb'),

-- Mercedes-Benz
(21, 3, 'C-Class'),
(22, 3, 'E-Class'),
(23, 3, 'GLC'),
(24, 3, 'A-Class'),
(25, 3, 'S-Class'),
(26, 3, 'GLA'),
(27, 3, 'EQE'),
(28, 3, 'GLE'),
(29, 3, 'CLA'),
(30, 3, 'Egyéb'),

-- Audi
(31, 4, 'A3'),
(32, 4, 'A4'),
(33, 4, 'A6'),
(34, 4, 'Q3'),
(35, 4, 'Q5'),
(36, 4, 'Q7'),
(37, 4, 'e-tron'),
(38, 4, 'TT'),
(39, 4, 'A5'),
(40, 4, 'Egyéb'),

-- Renault
(41, 5, 'Clio'),
(42, 5, 'Megane'),
(43, 5, 'Captur'),
(44, 5, 'Kadjar'),
(45, 5, 'Twingo'),
(46, 5, 'Zoe'),
(47, 5, 'Arkana'),
(48, 5, 'Austral'),
(49, 5, 'Scenic'),
(50, 5, 'Egyéb'),

-- Peugeot
(51, 6, '208'),
(52, 6, '308'),
(53, 6, '3008'),
(54, 6, '2008'),
(55, 6, '508'),
(56, 6, '5008'),
(57, 6, 'e-208'),
(58, 6, 'e-2008'),
(59, 6, 'Rifter'),
(60, 6, 'Egyéb'),

-- Opel
(61, 7, 'Corsa'),
(62, 7, 'Astra'),
(63, 7, 'Mokka'),
(64, 7, 'Grandland'),
(65, 7, 'Insignia'),
(66, 7, 'Crossland'),
(67, 7, 'Zafira'),
(68, 7, 'Combo'),
(69, 7, 'Vivaro'),
(70, 7, 'Egyéb'),

-- Ford
(71, 8, 'Focus'),
(72, 8, 'Fiesta'),
(73, 8, 'Kuga'),
(74, 8, 'Puma'),
(75, 8, 'Mondeo'),
(76, 8, 'S-Max'),
(77, 8, 'Galaxy'),
(78, 8, 'Mustang'),
(79, 8, 'Explorer'),
(80, 8, 'Egyéb'),

-- Toyota
(81, 9, 'Corolla'),
(82, 9, 'Yaris'),
(83, 9, 'RAV4'),
(84, 9, 'C-HR'),
(85, 9, 'Prius'),
(86, 9, 'Camry'),
(87, 9, 'Aygo'),
(88, 9, 'Highlander'),
(89, 9, 'bZ4X'),
(90, 9, 'Egyéb'),

-- Skoda
(91, 10, 'Octavia'),
(92, 10, 'Fabia'),
(93, 10, 'Kodiaq'),
(94, 10, 'Karoq'),
(95, 10, 'Superb'),
(96, 10, 'Enyaq'),
(97, 10, 'Scala'),
(98, 10, 'Kamiq'),
(99, 10, 'Rapid'),
(100, 10, 'Egyéb'),

-- Fiat
(101, 11, '500'),
(102, 11, 'Panda'),
(103, 11, 'Tipo'),
(104, 11, '500X'),
(105, 11, 'Doblo'),
(106, 11, 'Punto'),
(107, 11, '500L'),
(108, 11, 'Qubo'),
(109, 11, 'Freemont'),
(110, 11, 'Egyéb'),

-- Citroën
(111, 12, 'C3'),
(112, 12, 'C4'),
(113, 12, 'C5 Aircross'),
(114, 12, 'Berlingo'),
(115, 12, 'C1'),
(116, 12, 'Spacetourer'),
(117, 12, 'C4 Cactus'),
(118, 12, 'Jumpy'),
(119, 12, 'Ami'),
(120, 12, 'Egyéb'),

-- Hyundai
(121, 13, 'Tucson'),
(122, 13, 'i30'),
(123, 13, 'Kona'),
(124, 13, 'i20'),
(125, 13, 'Santa Fe'),
(126, 13, 'Bayon'),
(127, 13, 'IONIQ 5'),
(128, 13, 'IONIQ 6'),
(129, 13, 'Porter'),
(130, 13, 'Egyéb'),

-- Kia
(131, 14, 'Sportage'),
(132, 14, 'Ceed'),
(133, 14, 'Niro'),
(134, 14, 'Picanto'),
(135, 14, 'Stonic'),
(136, 14, 'Sorento'),
(137, 14, 'EV6'),
(138, 14, 'Rio'),
(139, 14, 'Carnival'),
(140, 14, 'Egyéb'),

-- Nissan
(141, 15, 'Qashqai'),
(142, 15, 'Juke'),
(143, 15, 'Leaf'),
(144, 15, 'Micra'),
(145, 15, 'X-Trail'),
(146, 15, 'Ariya'),
(147, 15, 'Navara'),
(148, 15, 'Note'),
(149, 15, 'Pathfinder'),
(150, 15, 'Egyéb'),

-- Volvo
(151, 16, 'XC40'),
(152, 16, 'XC60'),
(153, 16, 'XC90'),
(154, 16, 'S60'),
(155, 16, 'V60'),
(156, 16, 'V90'),
(157, 16, 'C40'),
(158, 16, 'EX30'),
(159, 16, 'EX90'),
(160, 16, 'Egyéb'),

-- Seat
(161, 17, 'Leon'),
(162, 17, 'Ibiza'),
(163, 17, 'Arona'),
(164, 17, 'Ateca'),
(165, 17, 'Tarraco'),
(166, 17, 'Cupra Formentor'),
(167, 17, 'Cupra Born'),
(168, 17, 'Alhambra'),
(169, 17, 'Mii'),
(170, 17, 'Egyéb'),

-- Dacia
(171, 18, 'Sandero'),
(172, 18, 'Duster'),
(173, 18, 'Spring'),
(174, 18, 'Logan'),
(175, 18, 'Jogger'),
(176, 18, 'Lodgy'),
(177, 18, 'Dokker'),
(178, 18, '1300'),
(179, 18, '1410'),
(180, 18, 'Egyéb'),

-- Mazda
(181, 19, 'CX-5'),
(182, 19, '3'),
(183, 19, 'CX-30'),
(184, 19, '6'),
(185, 19, '2'),
(186, 19, 'CX-60'),
(187, 19, 'MX-5'),
(188, 19, 'CX-3'),
(189, 19, 'CX-80'),
(190, 19, 'Egyéb'),

-- Suzuki
(191, 20, 'Swift'),
(192, 20, 'Vitara'),
(193, 20, 'S-Cross'),
(194, 20, 'Ignis'),
(195, 20, 'Jimny'),
(196, 20, 'Across'),
(197, 20, 'Baleno'),
(198, 20, 'Swace'),
(199, 20, 'Celerio'),
(200, 20, 'Egyéb'),

-- Honda
(201, 21, 'Civic'),
(202, 21, 'CR-V'),
(203, 21, 'Jazz'),
(204, 21, 'HR-V'),
(205, 21, 'e'),
(206, 21, 'Accord'),
(207, 21, 'NSX'),
(208, 21, 'Legend'),
(209, 21, 'S2000'),
(210, 21, 'Egyéb'),

-- Mitsubishi
(211, 22, 'ASX'),
(212, 22, 'Eclipse Cross'),
(213, 22, 'Outlander'),
(214, 22, 'Space Star'),
(215, 22, 'L200'),
(216, 22, 'i-MiEV'),
(217, 22, 'Pajero'),
(218, 22, 'Colt'),
(219, 22, 'Galant'),
(220, 22, 'Egyéb'),

-- Jeep
(221, 23, 'Renegade'),
(222, 23, 'Compass'),
(223, 23, 'Wrangler'),
(224, 23, 'Grand Cherokee'),
(225, 23, 'Cherokee'),
(226, 23, 'Avenger'),
(227, 23, 'Commander'),
(228, 23, 'Patriot'),
(229, 23, 'Liberty'),
(230, 23, 'Egyéb'),

-- Land Rover
(231, 24, 'Range Rover'),
(232, 24, 'Range Rover Sport'),
(233, 24, 'Discovery'),
(234, 24, 'Defender'),
(235, 24, 'Range Rover Evoque'),
(236, 24, 'Discovery Sport'),
(237, 24, 'Freelander'),
(238, 24, 'Range Rover Velar'),
(239, 24, 'Series'),
(240, 24, 'Egyéb'),

-- Mini
(241, 25, 'Hatch'),
(242, 25, 'Countryman'),
(243, 25, 'Clubman'),
(244, 25, 'Convertible'),
(245, 25, 'Paceman'),
(246, 25, 'Coupe'),
(247, 25, 'Roadster'),
(248, 25, 'Electric'),
(249, 25, 'John Cooper Works'),
(250, 25, 'Egyéb'),

-- Jaguar
(251, 26, 'XE'),
(252, 26, 'XF'),
(253, 26, 'F-Pace'),
(254, 26, 'E-Pace'),
(255, 26, 'I-Pace'),
(256, 26, 'XJ'),
(257, 26, 'F-Type'),
(258, 26, 'S-Type'),
(259, 26, 'X-Type'),
(260, 26, 'Egyéb'),

-- Porsche
(261, 27, '911'),
(262, 27, 'Cayenne'),
(263, 27, 'Macan'),
(264, 27, 'Panamera'),
(265, 27, 'Taycan'),
(266, 27, 'Boxster'),
(267, 27, 'Cayman'),
(268, 27, '918 Spyder'),
(269, 27, 'Carrera GT'),
(270, 27, 'Egyéb'),

-- Lexus
(271, 28, 'NX'),
(272, 28, 'RX'),
(273, 28, 'UX'),
(274, 28, 'ES'),
(275, 28, 'IS'),
(276, 28, 'LS'),
(277, 28, 'LC'),
(278, 28, 'RC'),
(279, 28, 'GX'),
(280, 28, 'Egyéb'),

-- Alfa Romeo
(281, 29, 'Giulia'),
(282, 29, 'Stelvio'),
(283, 29, 'Tonale'),
(284, 29, 'MiTo'),
(285, 29, 'Giulietta'),
(286, 29, '4C'),
(287, 29, 'Spider'),
(288, 29, 'Brera'),
(289, 29, '159'),
(290, 29, 'Egyéb'),

-- Chevrolet
(291, 30, 'Spark'),
(292, 30, 'Aveo'),
(293, 30, 'Cruze'),
(294, 30, 'Camaro'),
(295, 30, 'Corvette'),
(296, 30, 'Trax'),
(297, 30, 'Trailblazer'),
(298, 30, 'Malibu'),
(299, 30, 'Tahoe'),
(300, 30, 'Egyéb'),

-- Tesla
(301, 31, 'Model 3'),
(302, 31, 'Model Y'),
(303, 31, 'Model S'),
(304, 31, 'Model X'),
(305, 31, 'Cybertruck'),
(306, 31, 'Roadster'),
(307, 31, 'Semi'),
(308, 31, 'Model 2'),
(309, 31, 'Model C'),
(310, 31, 'Egyéb'),

-- Smart
(311, 32, 'Fortwo'),
(312, 32, 'Forfour'),
(313, 32, 'EQ Fortwo'),
(314, 32, 'EQ Forfour'),
(315, 32, 'Roadster'),
(316, 32, 'Crossblade'),
(317, 32, 'K'),
(318, 32, 'M'),
(319, 32, 'City Coupe'),
(320, 32, 'Egyéb'),

-- Subaru
(321, 33, 'Forester'),
(322, 33, 'Outback'),
(323, 33, 'XV'),
(324, 33, 'Impreza'),
(325, 33, 'Legacy'),
(326, 33, 'BRZ'),
(327, 33, 'WRX'),
(328, 33, 'Tribeca'),
(329, 33, 'Baja'),
(330, 33, 'Egyéb'),

-- DS Automobiles
(331, 34, 'DS 3'),
(332, 34, 'DS 4'),
(333, 34, 'DS 7'),
(334, 34, 'DS 9'),
(335, 34, 'DS 5'),
(336, 34, 'DS 3 Crossback'),
(337, 34, 'DS 7 Crossback'),
(338, 34, 'DS 4 Crossback'),
(339, 34, 'DS 21'),
(340, 34, 'Egyéb'),

-- Infiniti
(341, 35, 'Q50'),
(342, 35, 'Q60'),
(343, 35, 'QX50'),
(344, 35, 'QX60'),
(345, 35, 'QX30'),
(346, 35, 'QX70'),
(347, 35, 'QX80'),
(348, 35, 'M'),
(349, 35, 'FX'),
(350, 35, 'Egyéb'),

-- SsangYong
(351, 36, 'Tivoli'),
(352, 36, 'Korando'),
(353, 36, 'Rexton'),
(354, 36, 'Musso'),
(355, 36, 'Rodius'),
(356, 36, 'Actyon'),
(357, 36, 'Kyron'),
(358, 36, 'Stavic'),
(359, 36, 'Chairman'),
(360, 36, 'Egyéb'),

-- Lancia
(361, 37, 'Ypsilon'),
(362, 37, 'Delta'),
(363, 37, 'Thema'),
(364, 37, 'Flavia'),
(365, 37, 'Voyager'),
(366, 37, 'Fulvia'),
(367, 37, 'Stratos'),
(368, 37, 'Beta'),
(369, 37, 'Prisma'),
(370, 37, 'Egyéb'),

-- Lada
(371, 38, 'Niva'),
(372, 38, 'Granta'),
(373, 38, 'Vesta'),
(374, 38, 'XRAY'),
(375, 38, 'Largus'),
(376, 38, 'Kalina'),
(377, 38, 'Priora'),
(378, 38, 'Samara'),
(379, 38, '2101'),
(380, 38, 'Egyéb'),

-- Dodge
(381, 39, 'Challenger'),
(382, 39, 'Charger'),
(383, 39, 'Durango'),
(384, 39, 'Journey'),
(385, 39, 'Caliber'),
(386, 39, 'Avenger'),
(387, 39, 'Neon'),
(388, 39, 'Viper'),
(389, 39, 'Dart'),
(390, 39, 'Egyéb'),

-- Chrysler
(391, 40, '300C'),
(392, 40, 'Voyager'),
(393, 40, 'Pacifica'),
(394, 40, 'Grand Voyager'),
(395, 40, 'PT Cruiser'),
(396, 40, 'Sebring'),
(397, 40, 'Crossfire'),
(398, 40, 'Neon'),
(399, 40, 'LeBaron'),
(400, 40, 'Egyéb'),

-- Abarth
(401, 41, '500'),
(402, 41, '595'),
(403, 41, '695'),
(404, 41, '124 Spider'),
(405, 41, 'Punto'),
(406, 41, 'Grande Punto'),
(407, 41, 'Stilo'),
(408, 41, 'Simca'),
(409, 41, '1000'),
(410, 41, 'Egyéb'),

-- MG
(411, 42, 'ZS'),
(412, 42, 'HS'),
(413, 42, '5'),
(414, 42, '3'),
(415, 42, 'TF'),
(416, 42, 'F'),
(417, 42, 'ZR'),
(418, 42, 'ZT'),
(419, 42, 'RV8'),
(420, 42, 'Egyéb'),

-- Cupra
(421, 43, 'Leon'),
(422, 43, 'Ateca'),
(423, 43, 'Formentor'),
(424, 43, 'Born'),
(425, 43, 'Tavascan'),
(426, 43, 'Alhambra'),
(427, 43, 'Mii'),
(428, 43, 'Ronda'),
(429, 43, 'Marbella'),
(430, 43, 'Egyéb'),

-- Aston Martin
(431, 44, 'DB11'),
(432, 44, 'Vantage'),
(433, 44, 'DBS'),
(434, 44, 'DBX'),
(435, 44, 'Valhalla'),
(436, 44, 'Valkyrie'),
(437, 44, 'Rapide'),
(438, 44, 'Vanquish'),
(439, 44, 'Bulldog'),
(440, 44, 'Egyéb'),

-- Bentley
(441, 45, 'Continental'),
(442, 45, 'Flying Spur'),
(443, 45, 'Bentayga'),
(444, 45, 'Mulsanne'),
(445, 45, 'Brooklands'),
(446, 45, 'Arnage'),
(447, 45, 'Turbo R'),
(448, 45, 'Azure'),
(449, 45, 'Eight'),
(450, 45, 'Egyéb'),

-- Ferrari
(451, 46, '488'),
(452, 46, 'F8'),
(453, 46, 'Roma'),
(454, 46, 'Portofino'),
(455, 46, 'SF90'),
(456, 46, '296'),
(457, 46, '812'),
(458, 46, 'Daytona'),
(459, 46, 'Testarossa'),
(460, 46, 'Egyéb'),

-- Lamborghini
(461, 47, 'Huracan'),
(462, 47, 'Aventador'),
(463, 47, 'Urus'),
(464, 47, 'Gallardo'),
(465, 47, 'Countach'),
(466, 47, 'Diablo'),
(467, 47, 'Murcielago'),
(468, 47, 'Reventon'),
(469, 47, 'Sian'),
(470, 47, 'Egyéb'),

-- Maserati
(471, 48, 'Ghibli'),
(472, 48, 'Quattroporte'),
(473, 48, 'Levante'),
(474, 48, 'GranTurismo'),
(475, 48, 'MC20'),
(476, 48, '3200 GT'),
(477, 48, 'Coupe'),
(478, 48, 'Spyder'),
(479, 48, 'Bora'),
(480, 48, 'Egyéb'),

-- McLaren
(481, 49, '720S'),
(482, 49, '570S'),
(483, 49, '600LT'),
(484, 49, 'GT'),
(485, 49, 'Artura'),
(486, 49, 'P1'),
(487, 49, 'F1'),
(488, 49, 'Senna'),
(489, 49, 'Speedtail'),
(490, 49, 'Egyéb'),

-- Rolls-Royce
(491, 50, 'Phantom'),
(492, 50, 'Ghost'),
(493, 50, 'Wraith'),
(494, 50, 'Dawn'),
(495, 50, 'Cullinan'),
(496, 50, 'Silver Shadow'),
(497, 50, 'Corniche'),
(498, 50, 'Silver Spur'),
(499, 50, 'Silver Cloud'),
(500, 50, 'Egyéb'),

-- Bugatti
(501, 51, 'Chiron'),
(502, 51, 'Veyron'),
(503, 51, 'Divo'),
(504, 51, 'Centodieci'),
(505, 51, 'EB110'),
(506, 51, 'Type 35'),
(507, 51, 'Type 57'),
(508, 51, 'Type 41'),
(509, 51, 'Type 55'),
(510, 51, 'Egyéb'),

-- Lotus
(511, 52, 'Emira'),
(512, 52, 'Evora'),
(513, 52, 'Elise'),
(514, 52, 'Exige'),
(515, 52, 'Esprit'),
(516, 52, 'Europa'),
(517, 52, 'Seven'),
(518, 52, 'Carlton'),
(519, 52, 'Eclat'),
(520, 52, 'Egyéb'),

-- Alpine
(521, 53, 'A110'),
(522, 53, 'A310'),
(523, 53, 'A610'),
(524, 53, 'GTA'),
(525, 53, 'A108'),
(526, 53, 'A210'),
(527, 53, 'A440'),
(528, 53, 'A450'),
(529, 53, 'A480'),
(530, 53, 'Egyéb'),

-- Tata
(531, 54, 'Nano'),
(532, 54, 'Safari'),
(533, 54, 'Harrier'),
(534, 54, 'Nexon'),
(535, 54, 'Tiago'),
(536, 54, 'Altroz'),
(537, 54, 'Indica'),
(538, 54, 'Indigo'),
(539, 54, 'Sumo'),
(540, 54, 'Egyéb'),

-- Mahindra
(541, 55, 'Thar'),
(542, 55, 'Scorpio'),
(543, 55, 'XUV500'),
(544, 55, 'Bolero'),
(545, 55, 'KUV100'),
(546, 55, 'TUV300'),
(547, 55, 'Marazzo'),
(548, 55, 'XUV300'),
(549, 55, 'Verito'),
(550, 55, 'Egyéb'),

-- Great Wall
(551, 56, 'Haval H6'),
(552, 56, 'Haval Jolion'),
(553, 56, 'Wingle'),
(554, 56, 'Pegasus'),
(555, 56, 'Coolbear'),
(556, 56, 'Florid'),
(557, 56, 'Deer'),
(558, 56, 'Safe'),
(559, 56, 'Soveran'),
(560, 56, 'Egyéb'),

-- BYD
(561, 57, 'Atto 3'),
(562, 57, 'Han'),
(563, 57, 'Tang'),
(564, 57, 'Dolphin'),
(565, 57, 'Seal'),
(566, 57, 'Song'),
(567, 57, 'Yuan'),
(568, 57, 'Qin'),
(569, 57, 'F3'),
(570, 57, 'Egyéb'),

-- Geely
(571, 58, 'Coolray'),
(572, 58, 'Atlas'),
(573, 58, 'Emgrand'),
(574, 58, 'Tugella'),
(575, 58, 'Geometry C'),
(576, 58, 'Borui'),
(577, 58, 'Vision'),
(578, 58, 'Panda'),
(579, 58, 'MK'),
(580, 58, 'Egyéb'),

-- Haval
(581, 59, 'H6'),
(582, 59, 'Jolion'),
(583, 59, 'Dargo'),
(584, 59, 'F7'),
(585, 59, 'H9'),
(586, 59, 'M6'),
(587, 59, 'H2'),
(588, 59, 'H5'),
(589, 59, 'H8'),
(590, 59, 'Egyéb'),

-- Chery
(591, 60, 'Tiggo'),
(592, 60, 'Arrizo'),
(593, 60, 'QQ'),
(594, 60, 'Fulwin'),
(595, 60, 'OMODA'),
(596, 60, 'Arizzo'),
(597, 60, 'Karry'),
(598, 60, 'Cowin'),
(599, 60, 'Riich'),
(600, 60, 'Egyéb'),

-- Daihatsu
(601, 61, 'Terios'),
(602, 61, 'Sirion'),
(603, 61, 'Materia'),
(604, 61, 'Copen'),
(605, 61, 'Move'),
(606, 61, 'Cuore'),
(607, 61, 'Charade'),
(608, 61, 'Feroza'),
(609, 61, 'Rocky'),
(610, 61, 'Egyéb'),

-- Isuzu
(611, 62, 'D-Max'),
(612, 62, 'MU-X'),
(613, 62, 'Rodeo'),
(614, 62, 'Trooper'),
(615, 62, 'Piazza'),
(616, 62, 'Gemini'),
(617, 62, 'Florian'),
(618, 62, 'Bellett'),
(619, 62, '117'),
(620, 62, 'Egyéb'),

-- Proton
(621, 63, 'Saga'),
(622, 63, 'Persona'),
(623, 63, 'Iriz'),
(624, 63, 'Exora'),
(625, 63, 'Preve'),
(626, 63, 'Inspira'),
(627, 63, 'Perdana'),
(628, 63, 'Wira'),
(629, 63, 'Satria'),
(630, 63, 'Egyéb'),

-- Perodua
(631, 64, 'Myvi'),
(632, 64, 'Axia'),
(633, 64, 'Bezza'),
(634, 64, 'Alza'),
(635, 64, 'Kancil'),
(636, 64, 'Kelisa'),
(637, 64, 'Kenari'),
(638, 64, 'Viva'),
(639, 64, 'Nautica'),
(640, 64, 'Egyéb'),

-- Saab
(641, 65, '9-3'),
(642, 65, '9-5'),
(643, 65, '900'),
(644, 65, '9000'),
(645, 65, '93'),
(646, 65, '95'),
(647, 65, '96'),
(648, 65, '99'),
(649, 65, 'Sonett'),
(650, 65, 'Egyéb'),

-- Trabant
(651, 66, '601'),
(652, 66, '600'),
(653, 66, '1.1'),
(654, 66, 'P50'),
(655, 66, 'P60'),
(656, 66, 'P70'),
(657, 66, 'P1100'),
(658, 66, 'P2400'),
(659, 66, 'P800'),
(660, 66, 'Egyéb'),

-- Wartburg
(661, 67, '353'),
(662, 67, '311'),
(663, 67, '312'),
(664, 67, '1.3'),
(665, 67, 'Tourist'),
(666, 67, 'Knight'),
(667, 67, '311/2'),
(668, 67, '313'),
(669, 67, '355'),
(670, 67, 'Egyéb'),

-- Moskvich
(671, 68, '412'),
(672, 68, '408'),
(673, 68, '2140'),
(674, 68, '2138'),
(675, 68, 'Aleko'),
(676, 68, '2141'),
(677, 68, '2335'),
(678, 68, '400'),
(679, 68, '401'),
(680, 68, 'Egyéb'),

-- Zastava
(681, 69, 'Yugo'),
(682, 69, '101'),
(683, 69, '128'),
(684, 69, '1300'),
(685, 69, '1500'),
(686, 69, '750'),
(687, 69, '600'),
(688, 69, 'Florida'),
(689, 69, 'Skala'),
(690, 69, 'Egyéb'),

-- GAZ
(691, 70, 'Volga'),
(692, 70, 'Chaika'),
(693, 70, 'Pobeda'),
(694, 70, '21'),
(695, 70, '24'),
(696, 70, '3102'),
(697, 70, '3110'),
(698, 70, '3111'),
(699, 70, 'Tiger'),
(700, 70, 'Egyéb'),

-- UAZ
(701, 71, 'Patriot'),
(702, 71, 'Hunter'),
(703, 71, '469'),
(704, 71, '452'),
(705, 71, '2206'),
(706, 71, '3909'),
(707, 71, '3160'),
(708, 71, '3162'),
(709, 71, '3163'),
(710, 71, 'Egyéb'),

-- Datsun
(711, 72, 'Go'),
(712, 72, 'Go+'),
(713, 72, 'redi-GO'),
(714, 72, '240Z'),
(715, 72, '260Z'),
(716, 72, '280Z'),
(717, 72, '510'),
(718, 72, '1200'),
(719, 72, 'Fairlady'),
(720, 72, 'Egyéb'),

-- Hummer
(721, 73, 'H2'),
(722, 73, 'H3'),
(723, 73, 'H1'),
(724, 73, 'HX'),
(725, 73, 'Hummer EV'),
(726, 73, 'Alpha'),
(727, 73, 'Open Top'),
(728, 73, 'SUT'),
(729, 73, 'Pickup'),
(730, 73, 'Egyéb'),

-- Maybach
(731, 74, '57'),
(732, 74, '62'),
(733, 74, 'Zeppelin'),
(734, 74, 'Landaulet'),
(735, 74, 'Exelero'),
(736, 74, 'DS8'),
(737, 74, 'SW38'),
(738, 74, 'W3'),
(739, 74, 'W5'),
(740, 74, 'Egyéb'),

-- Rover
(741, 75, '75'),
(742, 75, '45'),
(743, 75, '25'),
(744, 75, '400'),
(745, 75, '200'),
(746, 75, '100'),
(747, 75, '600'),
(748, 75, '800'),
(749, 75, 'SD1'),
(750, 75, 'Egyéb'),

-- Austin
(751, 76, 'Mini'),
(752, 76, 'Allegro'),
(753, 76, 'Maestro'),
(754, 76, 'Montego'),
(755, 76, 'Metro'),
(756, 76, 'Ambassador'),
(757, 76, 'Princess'),
(758, 76, 'Maxi'),
(759, 76, '1100'),
(760, 76, 'Egyéb'),

-- Morris
(761, 77, 'Minor'),
(762, 77, 'Marina'),
(763, 77, 'Oxford'),
(764, 77, 'Cowley'),
(765, 77, 'Eight'),
(766, 77, 'Ten'),
(767, 77, 'Twelve'),
(768, 77, 'Fourteen'),
(769, 77, 'Six'),
(770, 77, 'Egyéb'),

-- TVR
(771, 78, 'Griffith'),
(772, 78, 'Chimaera'),
(773, 78, 'Cerbera'),
(774, 78, 'Tuscan'),
(775, 78, 'Sagaris'),
(776, 78, 'Tamora'),
(777, 78, 'T350'),
(778, 78, 'Typhon'),
(779, 78, 'Vixen'),
(780, 78, 'Egyéb'),

-- Noble
(781, 79, 'M600'),
(782, 79, 'M12'),
(783, 79, 'M15'),
(784, 79, 'M400'),
(785, 79, 'M500'),
(786, 79, 'M14'),
(787, 79, 'M10'),
(788, 79, 'Rossion'),
(789, 79, 'F1'),
(790, 79, 'Egyéb'),

-- Koenigsegg
(791, 80, 'Jesko'),
(792, 80, 'Regera'),
(793, 80, 'Agera'),
(794, 80, 'CCX'),
(795, 80, 'CCXR'),
(796, 80, 'One:1'),
(797, 80, 'Gemera'),
(798, 80, 'CC8S'),
(799, 80, 'CCR'),
(800, 80, 'Egyéb');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(9) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_num` varchar(50) NOT NULL,
  `HASH` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `SALT` varchar(64) NOT NULL,
  `IsActive` int(1) NOT NULL,
  `ResetPasswordToken` varchar(255) DEFAULT NULL,
  `ResetPasswordTokenExpiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `phone_num`, `HASH`, `created`, `is_admin`, `SALT`, `IsActive`, `ResetPasswordToken`, `ResetPasswordTokenExpiry`) VALUES
(1, 'admin', 'tulakm@kkszki.hu', '123123123', 'admin', '2025-02-04 11:05:38', 1, 'ads', 0, NULL, NULL),
(2, 'string', 'string', 'string', '473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8', '2025-02-18 12:25:08', 0, 'string', 0, NULL, NULL),
(3, 'string1', 'budahazim@kkszki.hu', 'string', '473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8', '2025-02-18 13:10:14', 0, 'string', 0, NULL, NULL),
(5, 'string3', 'gavalan@kkszki.hu', 'string', '473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8', '2025-02-21 08:06:03', 0, 'string', 0, '0f888a02-d5c1-4fb2-95c4-b6dce29e2323', '2025-03-28 10:51:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `color_id` (`color_id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pictues`
--
ALTER TABLE `pictues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pictues`
--
ALTER TABLE `pictues`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=801;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `cars_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`),
  ADD CONSTRAINT `cars_ibfk_3` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`),
  ADD CONSTRAINT `cars_ibfk_4` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `pictues`
--
ALTER TABLE `pictues`
  ADD CONSTRAINT `pictues_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `types`
--
ALTER TABLE `types`
  ADD CONSTRAINT `types_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;