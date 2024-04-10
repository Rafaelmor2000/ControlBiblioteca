-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-04-2024 a las 09:28:15
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistemacontroldocumentos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autoridad`
--

CREATE TABLE `autoridad` (
  `idautoridad` int(11) NOT NULL,
  `nombre` varchar(90) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clasificacion`
--

CREATE TABLE `clasificacion` (
  `idClasificacion` int(11) NOT NULL,
  `nombreClasificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clasificacion`
--

INSERT INTO `clasificacion` (`idClasificacion`, `nombreClasificacion`) VALUES
(1, 'default'),
(2, 'documento_tecnico'),
(3, 'documento_auditoria'),
(4, 'documento_contrato'),
(5, 'documento_correspondencia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento`
--

CREATE TABLE `documento` (
  `idDocumento` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(140) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tipo` int(11) NOT NULL,
  `direccion_fisica` int(11) DEFAULT NULL,
  `direccion_virtual` varchar(140) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento_auditoria`
--

CREATE TABLE `documento_auditoria` (
  `idDocumento` int(11) NOT NULL,
  `norma` int(11) DEFAULT NULL,
  `sistema` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento_contrato`
--

CREATE TABLE `documento_contrato` (
  `idDocumento_Contrato` int(11) NOT NULL,
  `referente` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento_correspondencia`
--

CREATE TABLE `documento_correspondencia` (
  `idDocumento_Correspondencia` int(11) NOT NULL,
  `remitente` varchar(45) DEFAULT NULL,
  `destinatario` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documento_tecnico`
--

CREATE TABLE `documento_tecnico` (
  `idDocumento` int(11) NOT NULL,
  `equipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edificio`
--

CREATE TABLE `edificio` (
  `idEdificio` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `planta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `idequipo` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `marca_fabricante` int(11) DEFAULT NULL,
  `sistema` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca_fabricante`
--

CREATE TABLE `marca_fabricante` (
  `idmarca_fabricante` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mueble`
--

CREATE TABLE `mueble` (
  `idMueble` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `zona` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `norma`
--

CREATE TABLE `norma` (
  `idnorma` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `autoridad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planta`
--

CREATE TABLE `planta` (
  `idPlanta` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `planta`
--

INSERT INTO `planta` (`idPlanta`, `nombre`, `ciudad`, `estado`) VALUES
(1, 'CGV', 'Valladolid', 'Yucatán');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seccion`
--

CREATE TABLE `seccion` (
  `idSeccion` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `idMueble` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sistema`
--

CREATE TABLE `sistema` (
  `idsistema` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipodocumento`
--

CREATE TABLE `tipodocumento` (
  `idTipo` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `clasificacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zona`
--

CREATE TABLE `zona` (
  `idZona` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `edificio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autoridad`
--
ALTER TABLE `autoridad`
  ADD PRIMARY KEY (`idautoridad`);

--
-- Indices de la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  ADD PRIMARY KEY (`idClasificacion`);

--
-- Indices de la tabla `documento`
--
ALTER TABLE `documento`
  ADD PRIMARY KEY (`idDocumento`),
  ADD KEY `tipo_idx` (`tipo`),
  ADD KEY `fk_Documento_Seccion1_idx` (`direccion_fisica`);

--
-- Indices de la tabla `documento_auditoria`
--
ALTER TABLE `documento_auditoria`
  ADD PRIMARY KEY (`idDocumento`),
  ADD KEY `norma_idx` (`norma`),
  ADD KEY `sistema_idx` (`sistema`);

--
-- Indices de la tabla `documento_contrato`
--
ALTER TABLE `documento_contrato`
  ADD PRIMARY KEY (`idDocumento_Contrato`);

--
-- Indices de la tabla `documento_correspondencia`
--
ALTER TABLE `documento_correspondencia`
  ADD PRIMARY KEY (`idDocumento_Correspondencia`);

--
-- Indices de la tabla `documento_tecnico`
--
ALTER TABLE `documento_tecnico`
  ADD PRIMARY KEY (`idDocumento`,`equipo`),
  ADD KEY `equipo_idx` (`equipo`);

--
-- Indices de la tabla `edificio`
--
ALTER TABLE `edificio`
  ADD PRIMARY KEY (`idEdificio`),
  ADD KEY `planta_idx` (`planta`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`idequipo`),
  ADD KEY `marca_fabricante_idx` (`marca_fabricante`),
  ADD KEY `sistema_idx` (`sistema`);

--
-- Indices de la tabla `marca_fabricante`
--
ALTER TABLE `marca_fabricante`
  ADD PRIMARY KEY (`idmarca_fabricante`);

--
-- Indices de la tabla `mueble`
--
ALTER TABLE `mueble`
  ADD PRIMARY KEY (`idMueble`),
  ADD KEY `zona_idx` (`zona`);

--
-- Indices de la tabla `norma`
--
ALTER TABLE `norma`
  ADD PRIMARY KEY (`idnorma`),
  ADD KEY `autoridad_idx` (`autoridad`);

--
-- Indices de la tabla `planta`
--
ALTER TABLE `planta`
  ADD PRIMARY KEY (`idPlanta`);

--
-- Indices de la tabla `seccion`
--
ALTER TABLE `seccion`
  ADD PRIMARY KEY (`idSeccion`),
  ADD KEY `idMueble_idx` (`idMueble`);

--
-- Indices de la tabla `sistema`
--
ALTER TABLE `sistema`
  ADD PRIMARY KEY (`idsistema`);

--
-- Indices de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  ADD PRIMARY KEY (`idTipo`),
  ADD KEY `clasificacion_idx` (`clasificacion`);

--
-- Indices de la tabla `zona`
--
ALTER TABLE `zona`
  ADD PRIMARY KEY (`idZona`),
  ADD KEY `edificio_idx` (`edificio`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autoridad`
--
ALTER TABLE `autoridad`
  MODIFY `idautoridad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clasificacion`
--
ALTER TABLE `clasificacion`
  MODIFY `idClasificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `documento`
--
ALTER TABLE `documento`
  MODIFY `idDocumento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `edificio`
--
ALTER TABLE `edificio`
  MODIFY `idEdificio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `idequipo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `marca_fabricante`
--
ALTER TABLE `marca_fabricante`
  MODIFY `idmarca_fabricante` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mueble`
--
ALTER TABLE `mueble`
  MODIFY `idMueble` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `norma`
--
ALTER TABLE `norma`
  MODIFY `idnorma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `planta`
--
ALTER TABLE `planta`
  MODIFY `idPlanta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `seccion`
--
ALTER TABLE `seccion`
  MODIFY `idSeccion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sistema`
--
ALTER TABLE `sistema`
  MODIFY `idsistema` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  MODIFY `idTipo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `zona`
--
ALTER TABLE `zona`
  MODIFY `idZona` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `documento`
--
ALTER TABLE `documento`
  ADD CONSTRAINT `tipo` FOREIGN KEY (`tipo`) REFERENCES `tipodocumento` (`idTipo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ubicacion_fisica` FOREIGN KEY (`direccion_fisica`) REFERENCES `seccion` (`idSeccion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `documento_auditoria`
--
ALTER TABLE `documento_auditoria`
  ADD CONSTRAINT `idDocumento1` FOREIGN KEY (`idDocumento`) REFERENCES `documento` (`idDocumento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `norma` FOREIGN KEY (`norma`) REFERENCES `norma` (`idnorma`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `sistema1` FOREIGN KEY (`sistema`) REFERENCES `sistema` (`idsistema`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `documento_contrato`
--
ALTER TABLE `documento_contrato`
  ADD CONSTRAINT `idDocumento_Contrato` FOREIGN KEY (`idDocumento_Contrato`) REFERENCES `documento` (`idDocumento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `documento_correspondencia`
--
ALTER TABLE `documento_correspondencia`
  ADD CONSTRAINT `idDocumento_Correspondencia` FOREIGN KEY (`idDocumento_Correspondencia`) REFERENCES `documento` (`idDocumento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `documento_tecnico`
--
ALTER TABLE `documento_tecnico`
  ADD CONSTRAINT `equipo` FOREIGN KEY (`equipo`) REFERENCES `equipo` (`idequipo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idDocumento` FOREIGN KEY (`idDocumento`) REFERENCES `documento` (`idDocumento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `edificio`
--
ALTER TABLE `edificio`
  ADD CONSTRAINT `planta` FOREIGN KEY (`planta`) REFERENCES `planta` (`idPlanta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD CONSTRAINT `marca_fabricante` FOREIGN KEY (`marca_fabricante`) REFERENCES `marca_fabricante` (`idmarca_fabricante`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `sistema` FOREIGN KEY (`sistema`) REFERENCES `sistema` (`idsistema`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `mueble`
--
ALTER TABLE `mueble`
  ADD CONSTRAINT `zona` FOREIGN KEY (`zona`) REFERENCES `zona` (`idZona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `norma`
--
ALTER TABLE `norma`
  ADD CONSTRAINT `autoridad` FOREIGN KEY (`autoridad`) REFERENCES `autoridad` (`idautoridad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `seccion`
--
ALTER TABLE `seccion`
  ADD CONSTRAINT `idMueble` FOREIGN KEY (`idMueble`) REFERENCES `mueble` (`idMueble`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  ADD CONSTRAINT `clasificacion` FOREIGN KEY (`clasificacion`) REFERENCES `clasificacion` (`idClasificacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `zona`
--
ALTER TABLE `zona`
  ADD CONSTRAINT `edificio` FOREIGN KEY (`edificio`) REFERENCES `edificio` (`idEdificio`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
