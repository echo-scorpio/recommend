// sql语句
var sql = {
    // 用户
    user: {
        login: 'select userStatus from t_user where userName = ? and password = ?',
        adminLogin:'select * from t_admin where adminID = ? and adminPass = ?',
        queryUserList: 'select * from t_user where userName=?',
        createUser: 'INSERT INTO `t_user` (`userName`, `password`, `time`) VALUES (?, ?,now())',
        addUserCourseType:'INSERT INTO `t_user_ctype` (`uID`, `cType`) VALUES (?,"?")',
        addUserDetails:'INSERT INTO `t_user_details` (`userID`,`uIntro`) VALUES (?,"")',
        uInfo:'select userName,password,time,uIntro,uSex from t_user,t_user_details where t_user.userName=t_user_details.userID and t_user.userName=?',
        editInfo:'update t_user_details set uIntro=? , uSex=? where userID=?',
        editSelType:'update t_user_ctype set cType="?"where uID=?',
        editPassword:'update t_user set password =? where userName=?',
        showSlogan:'select uSlogan from t_user_details where userID=?',
        updateSlogan:'update t_user_details set uSlogan=? where userID=?',
    },
    course:{/*添加课程后，t_course_favseetimes中自动添加上该课程，并将收藏数、
              观看数置零，当用户收藏某视频后，将信息添加到t_user_favcourse表,t_course_favseetimes表中的收藏数+1*/
        query:'select t_course.courseID cID,cName,seeTimes,t_course_details.cIntro,cImg,videoTime from t_course,t_course_favseetimes,t_course_details where t_course_details.cID=t_course.courseID and t_course.courseID=t_course_favseetimes.cID',
        queryPopularCourse:'select t_course.courseID cID,cName,seeTimes,t_course_details.cIntro,cImg,videoTime from t_course,t_course_favseetimes,t_course_details where t_course_details.cID=t_course.courseID and t_course.courseID=t_course_favseetimes.cID ORDER BY seeTimes DESC LIMIT 10',
        querySeeStatus:'select * from t_user_seecourse where uID=? and cID=?',
        courseDetail:'select cName,t_course_details.cType,t_course_details.cIntro cIntro,cImg,cVideo,t_course_details.cPrepare cPrepare,t_course_details.cSteps cSteps,t_course_details.cErrors cErrors,t_course_details.cSuggests cSuggests from t_course,t_course_details where courseID=?   and t_course.courseID=t_course_details.cID',
        queryFavState:'select * from  t_user_favcourse where uID=? and cID=?',//查询是否已收藏
        favorite:'insert into t_user_favcourse values(?,?,now())',
        addFavTimes:'update  t_course_favseetimes set favTimes=favTimes+1 where cID=?',
        see:'insert into t_user_seecourse values(?,?,now(),1)',
        addSeeTimes:'update t_course_favseetimes set seeTimes=seeTimes+1 where cID=?',
        updateSeeTime:'update t_user_seecourse set seeTime=now() where uID=? and cID=?',
        querySeeCourseList:'select t_course.courseID cID,cName,cImg,seeTime from t_course,t_user_seecourse WHERE t_course.courseID=t_user_seecourse.cID and t_user_seecourse.uID=? order by seeTime desc',
        queryFavCourseList:'select t_course.courseID cID,cName,cImg,time from t_course,t_user_favcourse WHERE t_course.courseID=t_user_favcourse.cID and t_user_favcourse.uID=? order by time desc',
        cancelFav:'delete from t_user_favcourse where uID=? and cID=?',
        totalCourseType:'select * from t_course_type',
        pCourses:'select t_course.courseID cID,cName,seeTimes,t_course_details.cIntro,cImg,videoTime from t_course,t_course_favseetimes,t_course_details where t_course_details.cID=t_course.courseID and t_course.courseID=t_course_favseetimes.cID ORDER BY seeTimes DESC LIMIT 3',
        rCourse:'select t_course.courseID cID,cName,cImg,seeTime from t_course,t_user_seecourse WHERE t_course.courseID=t_user_seecourse.cID and t_user_seecourse.uID=? order by seeTime desc limit 3',
    /*展示图表数据*/
        seeData:'select t_course_type.cType,sum(seeTimes) times from t_course_favseetimes,t_course_details,t_course_type where t_course_favseetimes.cID=t_course_details.cID and t_course_details.cType=t_course_type.cType GROUP by t_course_type.cType HAVING times>0',
        favData:'select t_course_type.cType,sum(favTimes) times from t_course_favseetimes,t_course_details,t_course_type where t_course_favseetimes.cID=t_course_details.cID and t_course_details.cType=t_course_type.cType GROUP by t_course_type.cType HAVING times>0',
        lineSeeNum:'SELECT DATE_FORMAT(seeTime,"%Y-%m-%d") time,COUNT(uID) num from t_user_seecourse WHERE DATE_FORMAT(seeTime,"%Y-%m-%d") like ? and cID=? group by DATE_FORMAT(seeTime,"%Y-%m-%d")',
        lineFavNum:'SELECT DATE_FORMAT(time,"%Y-%m-%d") time,COUNT(uID) num from t_user_favcourse WHERE DATE_FORMAT(time,"%Y-%m-%d") like ? and cID=? group by DATE_FORMAT(time,"%Y-%m-%d")',
    },
    manageCourse:{
        totalType:'select count(cID) total from t_course_type',
        queryCType:'select * from t_course_type order by cTime desc limit ?,? ',
        totalCourses:'select count(courseID) total from t_course',
        show:'select courseID,cName,cType,t_course_details.cIntro cIntro,cImg,cVideo,t_course_details.cPrepare cPrepare,t_course_details.cSteps cSteps,t_course_details.cErrors cErrors,t_course_details.cSuggests cSuggests from t_course,t_course_details where   t_course.courseID=t_course_details.cID order by addTime desc limit ?,?',
        addCourse:'INSERT INTO `t_course` (`courseID`, `cName`, `cImg`, `cVideo`) VALUES (NULL,?,?,?)',
        addCourseDetails:'INSERT INTO `t_course_details` (`cID`, `cIntro`, `cType`, `cPrepare`, `cSteps`, `cErrors`, `cSuggests`,`videoTime`,`addTime`) VALUES (NULL,?,?,?,?,?,?,?,now())',
        addFavSeeRecord:'insert into `t_course_favseetimes` (`cID`,`favTimes`,`seeTimes`) values (NULL,0,0)',
        delCourse:'delete from t_course where courseID=?',
        delCourseDetail:'delete from t_course_details where cID=?',
        delFavSee:'delete from t_course_favseetimes where cID=?',
        editCourse:'update t_course set cName=?,cImg=?,cVideo=? where  courseID=?',
        editCourseDetail:'UPDATE `t_course_details` SET `cIntro` = ?, `cType` = ?, `cPrepare` =?, `cSteps` = ?, `cErrors` = ?, `cSuggests` = ? WHERE `t_course_details`.`cID` = ?',
        queryTypeStatus:'select * from t_course_type where cType=?',
        addType:'INSERT INTO `t_course_type` (`cID`, `cType`, `cTime`) VALUES (NULL,?,now())',
        editType:'update t_course_type set cType=? where cID=?',
        delType:'delete from t_course_type where cID=?'
    },
    recommend:{
        query:'SELECT uID,cID FROM `t_user_seecourse` ORDER BY seeTime DESC',
        showList:'select t_course.courseID cID,cName,seeTimes,cImg,videoTime from t_course,t_course_favseetimes,t_course_details where t_course_details.cID=t_course.courseID and t_course.courseID=t_course_favseetimes.cID and t_course.courseID in (?)',
        queryCid:'SELECT cType FROM t_user_ctype WHERE uID=?',
        showCourses:'select t_course.courseID cID,cName,seeTimes,cImg,videoTime from t_course,t_course_favseetimes,t_course_details where t_course_details.cID=t_course.courseID and t_course.courseID=t_course_favseetimes.cID and t_course.courseID in (SELECT cID FROM `t_course_details` WHERE cType in(select cType from t_course_type WHERE cID in(?)))',
        queryUserFavCType:'select cType,cID from t_course_type where cID in(?)'//查询用户之前选择的课程类型名

    },
    manageUser:{
        userInfo:'select userName,time,userStatus,uIntro,uSex from t_user,t_user_details where t_user.userName=t_user_details.userID',
        forbid:'update t_user set userStatus="0" where userName=?',
        allow:'update t_user set userStatus="1" where userName=?',
        seeHistory:'select t_user_seecourse.cID,seeTime,t_course.cName,t_course_details.cType from t_user_seecourse,t_course,t_course_details where t_course.courseID=t_user_seecourse.cID and t_user_seecourse.cID=t_course_details.cID and t_user_seecourse.uID=?',
        favHistory:'select t_user_favcourse.cID,time,t_course.cName,t_course_details.cType from t_user_favcourse,t_course,t_course_details where t_course.courseID=t_user_favcourse.cID and t_user_favcourse.cID=t_course_details.cID and t_user_favcourse.uID=?',
        adminList:'select t_admin_info.id,name,GROUP_CONCAT(admin_right) admin_right from t_admin_info,t_admin_right,t_admin where t_admin.adminID=t_admin_info.id and t_admin_info.id=t_admin_right.id GROUP by t_admin.adminID',
        delRight:'delete from t_admin_right where id=?',
        addRight:'insert into t_admin_right values(?,?)',
        addAdmin:'insert into t_admin values(?,?,1)',
        addAdminInfo:'insert into t_admin_info values(?,?)',
        showAdminInfo:'SELECT name,GROUP_CONCAT(admin_right) rights,role FROM `t_admin_right`,t_admin_info,t_admin WHERE t_admin_info.id=t_admin_right.id and t_admin.adminID=t_admin_info.id and t_admin_info.id=?',
        editAdminName:'update t_admin_info set name=? where id=?',
    }
    
}
    
module.exports = sql;