-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-11-2025 a las 04:29:31
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecoseedsdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donadores`
--

CREATE TABLE `donadores` (
  `id_donador` int(11) NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `telefono` varchar(20) NOT NULL CHECK (`telefono` like '+%'),
  `tipo_donacion` enum('Tierra','Herramienta','Planta') NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `donadores`
--

INSERT INTO `donadores` (`id_donador`, `nombre_completo`, `direccion`, `telefono`, `tipo_donacion`, `fecha_registro`) VALUES
(46, 'Ivi De Jesús', 'Juan Vega Hernandez No.19', '+522721932858', 'Herramienta', '2025-11-09 06:43:42'),
(49, 'Janith Ramos', 'sur 5 # 20', '+522721783259', 'Herramienta', '2025-11-18 03:27:21'),
(50, 'Elias Sanchez', 'Norte 2 #23', '+522721088280', 'Planta', '2025-11-18 03:28:14');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `donadores`
--
ALTER TABLE `donadores`
  ADD PRIMARY KEY (`id_donador`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `donadores`
--
ALTER TABLE `donadores`
  MODIFY `id_donador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
