-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 05 Des 2018 pada 02.30
-- Versi Server: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `exchanges_rate_currency`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `exchange_rates`
--

CREATE TABLE `exchange_rates` (
  `id` int(11) NOT NULL,
  `currency_from` varchar(3) DEFAULT NULL,
  `currency_to` varchar(3) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `exchange_rates`
--

INSERT INTO `exchange_rates` (`id`, `currency_from`, `currency_to`, `createdAt`, `updatedAt`) VALUES
(1, 'USD', 'EUR', '2018-12-05 01:15:47', '2018-12-05 01:15:47'),
(2, 'USD', 'AUD', '2018-12-05 01:15:47', '2018-12-05 01:15:47'),
(3, 'GBP', 'USD', '2018-12-05 01:15:47', '2018-12-05 01:15:47'),
(4, 'USD', 'GBP', '2018-12-05 01:15:47', '2018-12-05 01:15:47'),
(5, 'USD', 'IDR', '2018-12-05 01:15:47', '2018-12-05 01:15:47'),
(6, 'JPY', 'IDR', '2018-12-05 01:15:47', '2018-12-05 01:15:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `rate` float DEFAULT NULL,
  `date` date DEFAULT NULL,
  `fk_exchange_rate` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `histories`
--

INSERT INTO `histories` (`id`, `rate`, `date`, `fk_exchange_rate`, `createdAt`, `updatedAt`) VALUES
(1, 1.102, '2018-07-07', 1, '2018-12-05 01:17:08', '2018-12-05 01:17:08'),
(2, 1.122, '2018-07-08', 1, '2018-12-05 01:17:54', '2018-12-05 01:17:54'),
(3, 1.001, '2018-07-09', 1, '2018-12-05 01:18:04', '2018-12-05 01:18:04'),
(4, 1.123, '2018-07-10', 1, '2018-12-05 01:18:11', '2018-12-05 01:18:11'),
(5, 1.221, '2018-07-11', 1, '2018-12-05 01:18:22', '2018-12-05 01:18:22'),
(6, 1.001, '2018-07-12', 1, '2018-12-05 01:18:36', '2018-12-05 01:18:36'),
(7, 1.111, '2018-07-13', 1, '2018-12-05 01:18:59', '2018-12-05 01:18:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exchange_rates`
--
ALTER TABLE `exchange_rates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_exchange_rate` (`fk_exchange_rate`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exchange_rates`
--
ALTER TABLE `exchange_rates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`fk_exchange_rate`) REFERENCES `exchange_rates` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
