-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 06 2024 г., 13:59
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
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `id` int NOT NULL,
  `reviewText` text NOT NULL,
  `reviewImg` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`id`, `reviewText`, `reviewImg`) VALUES
(1, 'Спасибо большое за ваши сладости каждый раз вы радуйте чем-то новым и орешки пробовали с нежной начинкой, и меренговый рулет (просто оболденный), и разные вкуснейшие торты (как вы готовите это чудо ?), и капкейки с воздушной шапочкой. В общем, помните мультик Рататуй, когда главный критик попробовал одноименное блюдо и получил неземное удовольствие, так здесь то же самое (не из-за мыши, а благодаря умелым ручкам Яны и Лизаветы)', '../images/review_1.png'),
(2, 'Мама дорогая какие вкусные орешки у ЯНОЧКИ! Очень аккуратно сделаны, запах невероятный, а вкус вообще словами не передать! Всем советую, я уже сделала заказ на них, что бы хватило и мне и ребенку', '../images/2jA8Xbw_fbc.jpg'),
(3, 'Яна, спасибо большое за такую красоту и вкусноту! Прям отрыв башки))  Обязательно ещё что-нибудь закажу))', '../images/BOyzArjEwq8.jpg'),
(4, 'Хочу снова с восторгом высказаться о ваших работах! Первый раз вижу кулич с цукатами, и он правда с цукатами! ( обычно пишут в пекарне с цукатами, а на самом деле их там пару штук))кулич без всего это для ребенка) Спасибо за воплощение всех пожеланий, за такие чудесные сладости', '../images/rev.jpg'),
(5, 'Спасибо большое за Оооочень вкусный торт)))) Безумно вкусный и очень красивый акварельный дизайн!', '../images/dGuUyqh39WU.jpg'),
(6, 'Спасибо большое за чудесный вкуснейший тортик )))', '../images/hIhB0twYwxY.jpg');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
