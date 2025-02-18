-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2025 at 11:21 AM
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
(1, 'Toyota'),
(2, 'Honda'),
(3, 'Ford'),
(4, 'BMW'),
(5, 'Mercedes'),
(6, 'Chevrolet'),
(7, 'Nissan'),
(8, 'Volkswagen');

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(9) NOT NULL,
  `brand_id` int(9) NOT NULL,
  `pic_id` int(8) NOT NULL,
  `type_id` int(9) NOT NULL,
  `description` text DEFAULT NULL,
  `km_clock` int(11) NOT NULL,
  `color_id` int(9) NOT NULL,
  `price` int(11) NOT NULL,
  `seller_id` int(9) NOT NULL,
  `upload_date` datetime NOT NULL,
  `sold` tinyint(1) NOT NULL,
  `body_type` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `brand_id`, `pic_id`, `type_id`, `description`, `km_clock`, `color_id`, `price`, `seller_id`, `upload_date`, `sold`, `body_type`) VALUES
(1, 1, 1, 1, 'Fuel-efficient and reliable.', 40000, 3, 18000, 1, '2024-01-10 10:00:00', 0, 'Sedan'),
(2, 2, 1, 2, 'Comfortable and spacious.', 25000, 2, 25000, 1, '2024-02-05 14:30:00', 0, 'Sedan'),
(3, 3, 1, 3, 'Strong and powerful SUV.', 60000, 5, 32000, 1, '2023-12-01 09:45:00', 1, 'SUV'),
(4, 4, 1, 4, 'Eladó sorba került BMW 320i autóm!\r\nAmit tudni kell róla:\r\n2006 év\r\nPopsnBangs\r\nSzakadás mentes beltér.\r\nM lökhárítók, M felni, M kormány.\r\nAngel Eyes.\r\nM3 visszapillantók.\r\nMűködő Klíma.\r\nVétel ár: 1,800,000ft\r\nCsere érdekelhet, kisebb-nagyobb \r\nautóra!', 20000, 1, 42000, 1, '2024-03-15 16:20:00', 0, 'Coupe'),
(5, 5, 1, 5, 'Luxury and performance.', 18000, 4, 48000, 1, '2023-11-20 08:10:00', 1, 'Sedan'),
(6, 6, 1, 6, 'Large family-friendly SUV.', 55000, 6, 35000, 1, '2024-01-25 12:50:00', 0, 'SUV'),
(7, 7, 1, 7, 'Efficient and compact.', 30000, 7, 19000, 1, '2024-02-20 11:15:00', 0, 'Sedan'),
(8, 8, 1, 8, 'Reliable mid-size sedan.', 75000, 8, 22000, 1, '2023-10-10 07:35:00', 1, 'Sedan');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(9) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`) VALUES
(1, 'Red'),
(2, 'Blue'),
(3, 'Black'),
(4, 'White'),
(5, 'Gray'),
(6, 'Silver'),
(7, 'Green'),
(8, 'Yellow');

-- --------------------------------------------------------

--
-- Table structure for table `motors`
--

CREATE TABLE `motors` (
  `id` int(9) NOT NULL,
  `num_of_cyl` int(11) NOT NULL,
  `horsepower` int(11) NOT NULL,
  `cc` int(11) NOT NULL,
  `engine_type` varchar(12) NOT NULL,
  `fuel_type` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `motors`
--

INSERT INTO `motors` (`id`, `num_of_cyl`, `horsepower`, `cc`, `engine_type`, `fuel_type`) VALUES
(1, 4, 139, 1798, 'Inline', 'Petrol'),
(2, 4, 192, 1996, 'Inline', 'Petrol'),
(3, 6, 400, 3000, 'V', 'Petrol'),
(4, 6, 382, 2998, 'Inline', 'Petrol'),
(5, 4, 255, 1991, 'Inline', 'Petrol'),
(6, 8, 420, 5300, 'V', 'Petrol'),
(7, 4, 149, 1997, 'Inline', 'Petrol'),
(8, 4, 174, 1984, 'Inline', 'Petrol');

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
  `type_name` varchar(255) NOT NULL,
  `motor_id` int(9) NOT NULL,
  `drive` varchar(50) NOT NULL,
  `trans_type` varchar(50) NOT NULL,
  `Year` int(9) NOT NULL,
  `k_weight` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `brand_id`, `type_name`, `motor_id`, `drive`, `trans_type`, `Year`, `k_weight`) VALUES
(1, 1, 'Toyota Corolla', 1, 'FWD', 'Automatic', 2022, 1400),
(2, 2, 'Honda Accord', 2, 'FWD', 'CVT', 2021, 1500),
(3, 3, 'Ford Explorer', 3, 'AWD', 'Automatic', 2023, 2100),
(4, 4, 'BMW 3 Series', 4, 'RWD', 'Automatic', 2022, 1700),
(5, 5, 'Mercedes C-Class', 5, 'RWD', 'Automatic', 2023, 1800),
(6, 6, 'Chevrolet Tahoe', 6, 'AWD', 'Automatic', 2021, 2500),
(7, 7, 'Nissan Sentra', 7, 'FWD', 'CVT', 2020, 1300),
(8, 8, 'Volkswagen Passat', 8, 'FWD', 'Manual', 2019, 1400);

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
  `IsActive` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `phone_num`, `HASH`, `created`, `is_admin`, `SALT`, `IsActive`) VALUES
(1, 'admin', 'tulakm@kkszki.hu', '123123123', 'admin', '2025-02-04 11:05:38', 1, 'ads', 0);

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
  ADD KEY `seller_id` (`seller_id`),
  ADD KEY `pic_id` (`pic_id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `motors`
--
ALTER TABLE `motors`
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
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `motor_id` (`motor_id`);

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
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `motors`
--
ALTER TABLE `motors`
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
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  ADD CONSTRAINT `cars_ibfk_4` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cars_ibfk_5` FOREIGN KEY (`pic_id`) REFERENCES `pictues` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `types`
--
ALTER TABLE `types`
  ADD CONSTRAINT `types_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `types_ibfk_2` FOREIGN KEY (`motor_id`) REFERENCES `motors` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
