-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2020-04-04 07:35:20
-- 服务器版本： 5.5.19
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recomend`
--

-- --------------------------------------------------------

--
-- 表的结构 `t_admin`
--

CREATE TABLE `t_admin` (
  `adminID` varchar(50) COLLATE utf8_bin NOT NULL,
  `adminPass` varchar(100) COLLATE utf8_bin NOT NULL,
  `role` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `t_admin`
--

INSERT INTO `t_admin` (`adminID`, `adminPass`, `role`) VALUES
('044290', '044290', 1),
('111471', '111471', 1),
('269060', '269060', 1),
('495224', '495224', 1),
('572260', '572260', 1),
('696404', '696404', 1),
('777', '777', 1),
('888', '888', 1),
('admin', 'admin', 0);

-- --------------------------------------------------------

--
-- 表的结构 `t_admin_info`
--

CREATE TABLE `t_admin_info` (
  `id` varchar(100) COLLATE utf8_bin NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `t_admin_info`
--

INSERT INTO `t_admin_info` (`id`, `name`) VALUES
('044290', '李羊'),
('111471', '宋雪'),
('269060', '杨洋'),
('495224', '马东'),
('572260', '赵佳佳'),
('696404', '赵晴'),
('777', '李明'),
('888', '张宁'),
('admin', '聪聪聪');

-- --------------------------------------------------------

--
-- 表的结构 `t_admin_right`
--

CREATE TABLE `t_admin_right` (
  `id` varchar(100) COLLATE utf8_bin NOT NULL,
  `admin_right` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `t_admin_right`
--

INSERT INTO `t_admin_right` (`id`, `admin_right`) VALUES
('044290', '1'),
('044290', '2'),
('111471', '4'),
('269060', '1'),
('495224', '2'),
('572260', '3'),
('696404', '0'),
('777', '3'),
('777', '4'),
('888', '2'),
('888', '3'),
('888', '4'),
('admin', '1'),
('admin', '2'),
('admin', '3'),
('admin', '4');

-- --------------------------------------------------------

--
-- 表的结构 `t_course`
--

CREATE TABLE `t_course` (
  `courseID` int(11) NOT NULL,
  `cName` varchar(100) COLLATE utf8_bin NOT NULL,
  `cImg` varchar(100) COLLATE utf8_bin NOT NULL,
  `cVideo` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `t_course`
--

INSERT INTO `t_course` (`courseID`, `cName`, `cImg`, `cVideo`) VALUES
(100020, '课程16', '/service/upload/images/cover-1581585026126.jpg', '/service/upload\\videos\\video-1584582629335.mp4'),
(100040, '宿舍瘦腿训练', '/service/upload/images/cover-1584604323919.jpg', '/service/upload\\videos\\video-1584604337942.mp4');

--
-- 触发器 `t_course`
--
DELIMITER $$
CREATE TRIGGER `tri_del_course` AFTER DELETE ON `t_course` FOR EACH ROW DELETE  FROM t_user_seecourse WHERE t_user_seecourse.cID=OLD.courseID
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- 表的结构 `t_course_details`
--

CREATE TABLE `t_course_details` (
  `cID` int(100) NOT NULL,
  `cIntro` varchar(200) COLLATE utf8_bin NOT NULL,
  `cType` varchar(100) COLLATE utf8_bin NOT NULL,
  `cPrepare` varchar(1000) COLLATE utf8_bin NOT NULL,
  `cSteps` varchar(1000) COLLATE utf8_bin NOT NULL,
  `cErrors` varchar(1000) COLLATE utf8_bin NOT NULL,
  `cSuggests` varchar(1000) COLLATE utf8_bin NOT NULL,
  `videoTime` varchar(100) COLLATE utf8_bin NOT NULL,
  `addTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `t_course_details`
--

INSERT INTO `t_course_details` (`cID`, `cIntro`, `cType`, `cPrepare`, `cSteps`, `cErrors`, `cSuggests`, `videoTime`, `addTime`) VALUES
(100020, '介绍16', '腿部训练', '准备16', '步骤16', '错误16', '建议16', '1', '2020-02-13 17:10:45'),
(100040, '适合学生党在宿舍练习的一门课程', '腰部训练', '不要吃太多', '1、平躺在地上@2、腿部向上抬起', '不要因为追求速度而导致动作不到位', '一周建议做1-4次@如有腿部酸痛属于正常现象', '1', '2020-03-19 15:52:23');

-- --------------------------------------------------------

--
-- 表的结构 `t_course_favseetimes`
--

CREATE TABLE `t_course_favseetimes` (
  `cID` int(11) NOT NULL,
  `favTimes` int(11) NOT NULL DEFAULT '0',
  `seeTimes` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `t_course_favseetimes`
--

INSERT INTO `t_course_favseetimes` (`cID`, `favTimes`, `seeTimes`) VALUES
(100020, 5, 8),
(100040, 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `t_course_type`
--

CREATE TABLE `t_course_type` (
  `cID` int(11) NOT NULL,
  `cType` varchar(100) COLLATE utf8_bin NOT NULL,
  `cTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `t_course_type`
--

INSERT INTO `t_course_type` (`cID`, `cType`, `cTime`) VALUES
(3, '腿部训练', '2020-02-12 16:28:23'),
(4, '肩部训练', '2020-02-12 16:38:17'),
(5, '腰部训练', '2020-02-12 17:27:25'),
(6, '手部训练', '2020-02-12 17:48:31'),
(8, '腹部训练', '2020-02-24 15:29:52'),
(10, '瘦腿训练', '2020-02-29 11:00:53');

-- --------------------------------------------------------

--
-- 表的结构 `t_right`
--

CREATE TABLE `t_right` (
  `right_id` int(11) NOT NULL,
  `right_name` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `t_right`
--

INSERT INTO `t_right` (`right_id`, `right_name`) VALUES
(1, '课程管理'),
(2, '课程类型管理'),
(3, '用户管理'),
(4, '数据统计');

-- --------------------------------------------------------

--
-- 表的结构 `t_user`
--

CREATE TABLE `t_user` (
  `userName` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  `userStatus` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '1',
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `t_user`
--

INSERT INTO `t_user` (`userName`, `password`, `userStatus`, `time`) VALUES
('111', '111', '1', '0000-00-00 00:00:00'),
('123', '123', '1', '0000-00-00 00:00:00'),
('1234', '111111', '1', '2020-02-18 17:46:08'),
('222', '222', '1', '0000-00-00 00:00:00'),
('333', '333', '1', '0000-00-00 00:00:00'),
('444', '444', '1', '0000-00-00 00:00:00'),
('ccc', '222222', '1', '2020-02-18 17:47:44'),
('ccc_c', '111111', '1', '2020-02-24 15:27:38'),
('聪聪聪158', '111111', '1', '2020-03-01 15:23:12');

-- --------------------------------------------------------

--
-- 表的结构 `t_user_ctype`
--

CREATE TABLE `t_user_ctype` (
  `uID` varchar(100) COLLATE utf8_bin NOT NULL,
  `cType` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `t_user_ctype`
--

INSERT INTO `t_user_ctype` (`uID`, `cType`) VALUES
('1234', '3, 4'),
('ccc', '3, 4, 5'),
('ccc_c', '3, 4, 8'),
('聪聪聪158', '10, 5');

-- --------------------------------------------------------

--
-- 表的结构 `t_user_details`
--

CREATE TABLE `t_user_details` (
  `userID` varchar(100) COLLATE utf8_bin NOT NULL,
  `uIntro` varchar(100) COLLATE utf8_bin NOT NULL,
  `uSex` varchar(10) COLLATE utf8_bin DEFAULT '女',
  `uSlogan` varchar(100) COLLATE utf8_bin NOT NULL DEFAULT '立个小目标！'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `t_user_details`
--

INSERT INTO `t_user_details` (`userID`, `uIntro`, `uSex`, `uSlogan`) VALUES
('1234', '哈哈哈哈', '女', '来来来'),
('aa', '', '女', '立个小目标！'),
('ccc', '从心', '女', '又是新的一天'),
('ccc_c', '生活不止眼前的苟且', '女', '立个小目标！'),
('cccc', '', '女', '立个小目标！'),
('聪聪聪158', '向前走', '女', '立个小目标！');

-- --------------------------------------------------------

--
-- 表的结构 `t_user_favcourse`
--

CREATE TABLE `t_user_favcourse` (
  `uID` varchar(100) COLLATE utf8_bin NOT NULL,
  `cID` int(11) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `t_user_favcourse`
--

INSERT INTO `t_user_favcourse` (`uID`, `cID`, `time`) VALUES
('111', 100020, '2020-03-01 14:45:04'),
('123', 100020, '2020-03-02 10:45:35'),
('1234', 100020, '2020-03-03 16:41:50'),
('444', 100020, '2020-03-05 16:43:30'),
('444', 100040, '2020-03-19 15:54:58'),
('ccc', 100020, '2020-03-05 11:10:47'),
('ccc_c', 100020, '2020-03-19 11:30:54');

-- --------------------------------------------------------

--
-- 表的结构 `t_user_seecourse`
--

CREATE TABLE `t_user_seecourse` (
  `uID` varchar(100) COLLATE utf8_bin NOT NULL,
  `cID` int(11) NOT NULL,
  `seeTime` datetime NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `t_user_seecourse`
--

INSERT INTO `t_user_seecourse` (`uID`, `cID`, `seeTime`, `status`) VALUES
('111', 100020, '2020-03-01 17:18:21', 1),
('123', 100020, '2020-03-02 15:21:03', 1),
('1234', 100020, '2020-03-03 10:13:58', 1),
('222', 100020, '2020-03-04 16:41:08', 1),
('333', 100020, '2020-03-05 09:52:40', 1),
('444', 100020, '2020-03-19 11:32:46', 1),
('ccc', 100020, '2020-03-28 17:23:21', 1),
('ccc_c', 100020, '2020-03-01 09:51:40', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_admin`
--
ALTER TABLE `t_admin`
  ADD PRIMARY KEY (`adminID`);

--
-- Indexes for table `t_admin_info`
--
ALTER TABLE `t_admin_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_admin_right`
--
ALTER TABLE `t_admin_right`
  ADD PRIMARY KEY (`id`,`admin_right`);

--
-- Indexes for table `t_course`
--
ALTER TABLE `t_course`
  ADD PRIMARY KEY (`courseID`);

--
-- Indexes for table `t_course_details`
--
ALTER TABLE `t_course_details`
  ADD PRIMARY KEY (`cID`);

--
-- Indexes for table `t_course_favseetimes`
--
ALTER TABLE `t_course_favseetimes`
  ADD PRIMARY KEY (`cID`);

--
-- Indexes for table `t_course_type`
--
ALTER TABLE `t_course_type`
  ADD PRIMARY KEY (`cID`);

--
-- Indexes for table `t_right`
--
ALTER TABLE `t_right`
  ADD PRIMARY KEY (`right_id`);

--
-- Indexes for table `t_user`
--
ALTER TABLE `t_user`
  ADD PRIMARY KEY (`userName`);

--
-- Indexes for table `t_user_ctype`
--
ALTER TABLE `t_user_ctype`
  ADD PRIMARY KEY (`uID`);

--
-- Indexes for table `t_user_details`
--
ALTER TABLE `t_user_details`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `t_user_favcourse`
--
ALTER TABLE `t_user_favcourse`
  ADD PRIMARY KEY (`uID`,`cID`);

--
-- Indexes for table `t_user_seecourse`
--
ALTER TABLE `t_user_seecourse`
  ADD PRIMARY KEY (`uID`,`cID`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `t_course`
--
ALTER TABLE `t_course`
  MODIFY `courseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100041;
--
-- 使用表AUTO_INCREMENT `t_course_details`
--
ALTER TABLE `t_course_details`
  MODIFY `cID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100041;
--
-- 使用表AUTO_INCREMENT `t_course_favseetimes`
--
ALTER TABLE `t_course_favseetimes`
  MODIFY `cID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100041;
--
-- 使用表AUTO_INCREMENT `t_course_type`
--
ALTER TABLE `t_course_type`
  MODIFY `cID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
