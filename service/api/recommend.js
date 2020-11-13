var models = require('../db');
var express = require('express');
const jwt = require('jsonwebtoken');
var uuid = require('node-uuid');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sql');

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();



function divData(arr) {//整理数据格式


  var dic = {};

  for (element in arr) {
      var dd = {};
      var user = arr[element].split('@')[0];
      var score = arr[element].split('@')[1];
      var cid = arr[element].split('@')[2];

      dd[cid] = score;
      if (dic[user]) {
          dd = Object.assign(dic[user], dd)
      }
      dic[user] = dd;
  }
  return dic;
}

//计算相似度矩阵
function cal(dic) {


  c={}//课程-课程之间同时出现的次数
  N={}//课程的观看次数
  for(key in dic){
      for (i in dic[key]){
          if(!c[i]){
              c[i]={}//当有这个记录时不需要重新创建
          }
          if(!N[i]){
              N[i]=0
          }
          N[i]+=1;
          for(j in dic[key]){

              if(i==j){
                  continue
              }
              else{
                  if(!c[i][j]){
                      c[i][j]=0//当存在这个记录时不需要重新创建
                  }

                  //c[i][j]+=1//课程i，j共同出现一次计数就加1
                  c[i][j]+=1/Math.log((1+(Object.keys(dic[key]).length))*1.0)//改进算法，减小活跃用户对课程相似度的影响
              }
          }
      }
  }
  S={}//计算相似度矩阵
  S_max={}//记录每列最大值
  for(i in c){
      a=[]
      item=c[i];
      if(!S[i]){
          S[i]={}
      }
      for(j in item){
          if(!S_max[j]){
              S_max[j]=0.0;
          }
          cij=item[j];
          S[i][j]=cij /(Math.sqrt(N[i] * N[j]))
          if(S[i][j]>S_max[j]){
              S_max[j]=S[i][j]//记录j列的最大值，将相似度矩阵按最大值归一化
          }
      }

  }
  //将矩阵s中的数据进行归一化操作
  for (i in c){
      for(j in c[i]){
          S[i][j]=S[i][j]/S_max[j]
      }
  }
  for(key in S){
      val=S[key]
      //console.log(key+":"+JSON.stringify(val))//计算出各个课程间的相似度
  }
  return S;
}

//排序算法--冒泡排序--将相似度逆序排序
function compare(data){//需要排序的数据
  //=====冒泡排序法排序，效率较低，有时间改为快排序=== key值不能更改，只是改了value的值
  idArr=[];
  valArr=[];
  i=0;
  for(k in data){
      idArr[i]=k;
      valArr[i]=data[k];
      i++;
  }
  for(i=0;i<idArr.length;i++){
      for(j=0;j<idArr.length-i;j++){
          if(valArr[j]<valArr[j+1]){
              tmpid=idArr[j];
              idArr[j]=idArr[j+1];
              idArr[j+1]=tmpid;

              tmpVal=valArr[j];
              valArr[j]=valArr[j+1];
              valArr[j+1]=tmpVal;

          }
      }
  }
  return{
      id:idArr,
      val:valArr
  }

}


//根据各个课程间的相似度，为用户推荐课程

function recommend(arr,user,data) { //data为课程间的相似度矩阵 user为需要为其推荐课程的用户

  K=3,N=10;
  rank={};
  user_item=arr[user]//该用户已经浏览过的课程
  tt=[]
  for (item in user_item){ //data_item为该用户浏览过的课程与其他课程的相似度矩阵，该矩阵中的相似度需要降序排序

    // console.log(data[item])
      idArr=compare(data[item]).id
      rateArr=compare(data[item]).val
      for(i=0;i<idArr.length;i++){
         if(i<K){//推荐相似度前K个的课程

             if(Object.keys(user_item).indexOf(idArr[i])>-1){//如果用户已经看过这个视频，则跳过，不会再将该课程进行推荐
                 continue
             }
             else {
                 if(!rank[idArr[i]]){
                     rank[idArr[i]]=0;
                 }

                 rank[idArr[i]]+=user_item[item]*data[item][idArr[i]]
             }

         }

      }
      }

  //对推荐列表进行排序 推荐前N个课程(根据课程相似度排好序的课程)
      rankId=compare(rank).id;
      randVal=compare(rank).val

      /*for(i=0;i<rankId.length;i++){
          if(i<N){
              //console.log(rankId[i]+"   "+randVal[i]);
              //console.log(randVal);
          }
      }*/

      return {
          recommendId:rankId,
          recommendVal:randVal
      };

}

router.post('/show',(req,res)=>{
    var sql=$sql.recommend.queryCid;
    var params=req.body;
    let cidArr=[]
    conn.query(sql,[params.uid],function(err,result){
        var data=JSON.parse(JSON.stringify(result));
        for(k in data){
            //console.log(k+"---"+data[k])
            for(v in data[k]){
                var str=data[k][v].split(',');
                
                for(i=0;i<str.length;i++){
                    cidArr[i]=str[i] //bug--把查出来的用户感兴趣的课程类型变为数组存储，不然查出来的是string类型，只能查出一个课程
                }
            }
        }
        
        var sql1=$sql.recommend.showCourses;
                conn.query(sql1,[cidArr],function(err,result){
                    var data=JSON.parse(JSON.stringify(result));
                    if(data.length!=0){
                        return res.send({
                            status:1,
                            msg:'success',
                            list:data//喜欢的课程类型可能会与推荐的课程一样，要做筛选
                        })
                    }
                    else{
                        return res.send({
                            status:1,
                            msg:'error'
                        })
                    }
                    
                })
        
    })

})

router.post('/recommend',(req,res)=>{
    var sql=$sql.recommend.query;
    var params=req.body;
    var uid_score_cid=[];
    var i=0;
    var  resultList=[]
    conn.query(sql,[],function(err,result){
      
        //console.log(result);
        var data=JSON.parse(JSON.stringify(result));
        data.forEach(element => {
            uid_score_cid[i]=element.uID+'@'+'1'+'@'+element.cID;
            i++;
        });
        list=divData(uid_score_cid)
        rend=cal(list)
        reIdList=recommend(list,params.uid,rend).recommendId;//为用户推荐的课程号列表
        //console.log(reIdList)
        reValList=recommend(list,params.uid,rend).recommendVal;
        var showSql=$sql.recommend.showList;
        reIdList=recommend(list,params.uid,rend).recommendId;//为用户推荐的课程号列表
        //console.log(reIdList)
        if(reIdList.length!=0){ //----------新注册的用户未解决冷启动问题，为其推荐注册时所选择的感兴趣的课程类型
        conn.query(showSql,[reIdList],function(err,result){
                //console.log(err)
           // console.log(result);
            var cList=JSON.parse(JSON.stringify(result));
            //console.log(cList)
            if(cList.length!=0){
                return res.send({
                    status:1,
                    msg:'success',
                    data:cList
                })
            }
            else{
                return res.send({
                    status:1,
                    msg:'error'
                })
            }
        })
    }
    else{
        return res.send({
            status:1,
            msg:'none'
        })
    }
      
    })
   // console.log('result'+resultList)
       

})

/**
 *  if(resultList.length!=0){
              return res.send({               
                status:1,
                msg:'success',
                data:resultList
              })
            }
            else{
              return res.send({
                status:1,
                msg:'error'
              })
            }
 */


module.exports=router;
