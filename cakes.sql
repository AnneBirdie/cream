-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 06 2024 г., 13:57
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `cream`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cakes`
--

CREATE TABLE `cakes` (
  `id` int NOT NULL,
  `category` varchar(10) NOT NULL,
  `name` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `price` smallint NOT NULL,
  `composition` mediumtext NOT NULL,
  `img` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `cakes`
--

INSERT INTO `cakes` (`id`, `category`, `name`, `price`, `composition`, `img`) VALUES
(1, 'bisсuit', '\"Молочная девочка\"', 1400, 'Корж на сгущенном молоке, крем чиз, карамелизованные бананы, ягодная начинка', '../images/bento.png'),
(2, 'dessert', 'Десерт \"Павлова\"', 230, 'Меренга, крем чиз, ягодная начинка', '../images/bento.png'),
(3, 'bisсuit', 'Десерт \"Шоколадный\"', 1400, 'images/bento.png', '../images/bento.png'),
(4, 'bisсuit', '\"Шарлотт\"', 1400, 'images/bento.png', '../images/bento.png'),
(5, 'bisсuit', '\"Нежность\"', 1400, 'Яичный бисквит, ягодный мусс на сыре', '../images/bento.png'),
(6, 'bisсuit', '\"Красный бархат\"', 1400, 'Бисквит красный бархат, крем чиз на сливках', '../images/bento.png'),
(7, 'bisсuit', '\"Крокембуш\"', 1400, 'Заварная основа, карамельный крем, шоколадная глазурь', '../images/bento.png'),
(8, 'bisсuit', '\"Сочный персик\"', 1400, 'Ванильный бисквит, творожно-йогуртовый крем, консервированный персик', '../images/bento.png'),
(9, 'bisсuit', '\"Фисташка-малина\"', 1400, 'Фисташковый брауни, хрустящий слой, фисташковый мусс', '../images/bento.png'),
(10, 'bisсuit', '\"Солнечный миндаль\"', 1400, 'Миндальный бисквит, конфи манго-маракуйя, абрикосово-сливочный мусс', '../images/bento.png'),
(11, 'bisсuit', '\"Ириска\"', 1400, 'Ванильный бисквит, крем ириска, сметанный крем-мусс', '../images/bento.png'),
(12, 'bisсuit', '\"Черничный\"', 1400, 'Ванильный бисквит, сырный слой, черничный конфитюр', '../images/bento.png'),
(13, 'bisсuit', '\"Карамельный\"', 1400, 'Карамельный бисквит, карамелизованные бананы, крем-чиз, солёная карамель', '../images/bento.png'),
(14, 'dessert', 'Шоколадное пирожное с вишней', 140, 'песочное тесто, мусс шоколдно-сливочный, крем маракуйя, вишневое \r\n конфи', '../images/bento.png'),
(15, 'dessert', 'Пирожное \"Экзотик\"', 120, 'бисквит с молоком, мусс маракуйя, желе', '../images/bento.png'),
(16, 'dessert', 'Зефир', 85, 'Зефир (любой фруктовый или ягодный вкус)', '../images/bento.png'),
(17, 'dessert', 'Макарон', 80, 'Меренга, шоколадный крем', '../images/bento.png'),
(18, 'dessert', 'Трюфель', 60, 'Трюфель классический, шоколад, кокос', '../images/bento.png'),
(19, 'dessert', 'Панна-котта', 135, 'Сливочная основа, клубничный соус с вишней', '../images/bento.png'),
(20, 'dessert', 'Кекс \"Песочный\"', 1400, 'Нежная песочная основа, сырная начинка, ягодная начинка', '../images/bento.png'),
(21, 'dessert', 'Капкейк \"Черничный\"', 180, 'Ванильный кекс, черничный крем, черничное конфи', '../images/bento.png'),
(22, 'dessert', 'Капкейк \"Черный лес\"', 180, 'Шоколадный кекс, творожный крем, вишневая начинка  ', '../images/bento.png'),
(23, 'mousse', '\"Сердце\"', 1400, 'Бисквит \"Эмануэль\", кокосовый мусс с карамельзованным шоколадом, кремё манго-маракуйя', '../images/bento.png'),
(24, 'mousse', '\"Фисташковый\"', 1500, 'фисташковый бисквит, фисташковый крем, малиновое конфи', '../images/bento.png'),
(25, 'dessert', 'Рулет \"Меренговый\"', 1300, 'Меренга, сливочный крем, ягодная начинка', '../images/bento.png'),
(26, 'bisсuit', '\"Морковный\"', 1500, 'Сочная морковь, тростниковый сахар, изюм, грецкий орех, кокосовое масло, сироп \"Топинамбура\"', '../images/bento.png'),
(27, 'dessert', '\"Трайфл\"', 50, 'Бисквит шоколадный / ванильный, крем чиз, крем пломбир, арахис / карамель / вишня / клубника / малина', '../images/bento.png'),
(28, 'dessert', 'Пирожное \"Картошка\"', 35, 'Шоколадный бисквит, крем со сгущенкой', '../images/bento.png'),
(29, 'bisсuit', '\"Чернично-лимонный\"', 1400, 'Черничный мусс, лимонный курд, лимонный бисквит', '../images/bento.png'),
(30, 'bisсuit', '\"Вупи-пай\"', 1400, 'Шоколадный бисквит, крем на основе творожного сыра и маскарпоне, шоколадная глазурь', '../images/bento.png'),
(31, 'bisсuit', '\"Медовик\"', 1400, 'Сливочно-сметанный крем,\r\nконфи лесные ягоды', '../images/bento.png'),
(32, 'mousse', '\"Осенний\"', 1500, 'Шоколадно-кофейный бисквит, \r\nоблепихово-сырный мусс, облепиховое желе', '../images/bento.png'),
(33, 'dessert', '\"Шоколадный горшочек\"', 120, 'Шоколад, муссовая начинка', '../images/bento.png'),
(34, 'bisсuit', 'Шоколадный чизкейк с вишней', 1400, 'Шоколадный бисквит, шоколадный чизкейк, сырный крем, вишневое конфи', '../images/bento.png'),
(35, 'mousse', '\"Шоколад-клубника\"', 1400, 'Шоколадный бисквит, клубничное конфи, шоколадный мусс', '../images/bento.png'),
(36, 'bisсuit', '\"Райский кокос\"', 1400, 'Кокосовый бисквит, кокосово-сырное суфле, конфи из манго, крем чиз, шоколад , кокосовый трюфель', '../images/bento.png'),
(37, 'mousse', '\"Птичка\"', 1400, 'Ванильный бисквит, птичье молоко на основе сгущенного молока и сливочного масла, шоколадная глазурь', '../images/bento.png'),
(38, 'mousse', '\"Шоколадная груша\"', 1500, 'Шоколадный мусс, грушевое конфи, шоколадная глазурь', '../images/bento.png'),
(39, 'bisсuit', '\"Муравейник\"', 1400, 'Песочная основа, варенное сгущённое молоко, сливочное масло', '../images/bento.png'),
(40, 'dessert', '«Рафаэлло»', 70, 'Кокосовая стружка, белый шоколад, сливки, миндаль', '../images/bento.png');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cakes`
--
ALTER TABLE `cakes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cakes`
--
ALTER TABLE `cakes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;