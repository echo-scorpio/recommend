   <template>
  <div id="vueVideoPlayer">
      
    <video-player id="videoPlayer"  class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions" @play="playerPlay($event)"></video-player>
   <input type="hidden" id="cStatus" value="">
  <div class="courseBox">
      <!--<div class="courseName">{{courseName}}</div>-->
      <ul class="cTitle">
          <li>类型</li>
          <li>时长</li>
          <li>收藏</li>
      </ul>
      <ul class="cInfo">
          <li>{{courseType}}</li>
          <li>{{courseTime}}分钟</li>
          <li> 
           <x-icon type="ios-heart" size="30" @click="favorite" id="fav"></x-icon>
          </li>
      </ul>
          
  </div>

  <div class="courseDetail">
       <ul class="cDetailTitle">
          <li>课程介绍
              <ul class="cDetailIntro">
                  <li>{{courseIntro}}</li>
              </ul>
             
          </li>
           <li>课前准备
               <ul class="cDetailIntro">
                  <li>{{cPrepares}}</li>
              </ul>
           </li>       
          <li>步骤
              <ul v-for="(item,index) in stepList" :key="index" class="cDetailIntro">
                  <li>{{item}}</li>
              </ul>
          </li>
          <li>常见错误
              <ul v-for="(item,index) in errorList" :key="index" class="cDetailIntro">
                  <li>{{item}}</li>
              </ul>
          </li>
          <li>课程建议
              <ul v-for="(item,index) in suggestList" :key="index" class="cDetailIntro">
                  <li>{{item}}</li>
              </ul>
          </li>
      </ul>  
     
  </div>
  
  </div>
 
</template>


    <script>
    /* eslint-disable */
    import request from '@/utils/request'
    import {getUserName} from '@/utils/auth'
    import {splitList} from 'src/assets/js/sprate.js'
    import {videoPlayer} from 'vue-video-player'
    import {Toast} from 'vux'
    export default {
    name: "TestTwo",
    data() {
        return {
            itemList:[],
            playerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
                autoplay: false, //如果true,则自动播放
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 循环播放
                preload: 'auto',  // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                controls: true,
                sources: [{ // 播放资源和资源格式
                  type: "video/mp4",
                  src: '' //你的视频地址（先为空，之后动态赋值）
                }],
                poster:'', //视频封面图
                width: document.documentElement.clientWidth, // 默认视频全屏时的最大宽度
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                PictureInPictureToggle: false,//隐藏画中画
                controlBar: {
                   currentTimeDisplay: true, // 当前时间

                    timeDivider: true, // 时间分割线

                    durationDisplay: true, // 总时间

                    progressControl: true, // 进度条

                    remainingTimeDisplay: true, //

                    customControlSpacer: true, //
                }

             },
              courseName:'',
              courseType:'',
              courseTime:'',
              courseIntro:'',
              cPrepares:'',
              cSteps:'',
              cSuggests:'',
              cErrors:'',
              stepList:[],
              errorList:[],
              suggestList:[],
              status:'',
             
            
            
             
        };
    },
    components(){
        videoPlayer,
        Toast
    },
    mounted() {       
        this.showCourse();
    },
    methods: {
        playerPlay(play){
            let uID=getUserName();
            let cid=this.$route.query.id;
            let cValue=document.getElementById('cStatus');
       
            if(cValue.value=='1'){
                //console.log('未观看过，插入观看记录，并增加观看次数');
                 request({
                url:'/api/course/seeCourse',
                method:'post',
                data:{
                    uid:uID,
                    cid:cid
                }
            }).then(res=>{
               // console.log(res.msg);
                if(res.msg=='success'){
                 console.log('观看记录插入成功');
                
                }
                else{
                    console.log('观看记录插入失败');
                }
            })
            }
            else{
               // console.log('已观看过，直接更新观看时间');
                request({
                    url:'/api/course/updateSeeTime',
                    method:'post',
                    data:{
                        uid:uID,
                        cid:cid
                    }
                }).then(res=>{
                   // console.log(res.msg);
                    if(res.msg=='success'){
                        console.log('观看时间记录更新成功');
                    }
                    else{
                        console.log('观看时间记录更新失败');
                    }
                })
              
            }
         
        },
      
        showCourse(){           
            let uID=getUserName();
            let cid=this.$route.query.id;
            let status=document.getElementById('cStatus');
            request({
                url:'/api/course/queryStatus',
                method:'post',
                data:{cid:cid,uid:uID}

            }).then(res=>{
                 if(res.msg=='1'){//未观看过
                    
                    status.value='1';
                   // console.log(res.msg);
                   // console.log(status.value);
                  
                }

                if(res.msg=='0'){
                                //console.log('观看过')
                                status.value='0';

                                //console.log(res.msg);
                                //.log(status.value);
                                
                            }
                        })
                        
           request({
                url:'/api/course/courseInfo',
                method:'post',
                data:{courseId:cid,uid:uID}
            }).then(res=>{
               
                if(res.msg=='查询成功'){
                    res.list.forEach(item => {                     
                      this.playerOptions['sources'][0]['src']=item.cVideo;
                      this.playerOptions['poster']=item.cImg;
                      this.courseName=item.cName;
                      this.courseType=item.cType;   
                      this.courseIntro=item.cIntro;  
                      this.cPrepares=item.cPrepare;   
                      this.cSteps=item.cSteps;
                      this.cSuggests=item.cSuggests;
                      this.cErrors=item.cErrors;
                      this.cStuausValue=item.status; 
                     // console.log('status: '+this.cStuausValue);
                      this.stepList=splitList(this.cSteps,this.stepList);
                      this.errorList=splitList(this.cErrors,this.errorList)
                      this.suggestList=splitList(this.cSuggests,this.suggestList)
                              
                      let audioElement = new Audio(item.cVideo);
                      let duration;
                      let temp='';
                       duration = audioElement.duration;
                      audioElement.addEventListener("loadedmetadata", function (_event) {                  
                        temp =(this.duration/60.0).toString().split('.')[0];//秒钟转为分钟
                     }) 
                         if(temp==0){
                          temp=1;
                      }
                      this.courseTime=temp;
         
                    }
         )
            request({//如果已收藏该课程，则图标显示为红色
                url:'/api/course/queryFavStatus',
                method:'post',
                data:{cid:cid,uid:uID}

            }).then(res=>{
               // console.log(res.msg);
                if(res.msg=='0'){
                    let favButton = document.getElementById('fav');          
                     favButton.style.fill="#F70968";
     
                }
              
            });
                     }
                else{
                    console.log('query error');
                }
            })
        },
        favorite(){//要先查询是否已经收藏，如果已经收藏了就不能再收藏了
            let cID=this.$route.query.id;
            let uID=getUserName();
            //console.log(uID);
            request({
                url:'/api/course/queryFavStatus',
                method:'post',
                data:{cid:cID,uid:uID}

            }).then(res=>{
                //console.log(res.msg);
                if(res.msg=='1'){
                    request({
                        url:'/api/course/favCourse',
                        method:'post',
                        data:{cid:cID,uid:uID}
                    }).then(res=>{
                        if(res.msg=='success'){
                            this.$message.success('收藏成功~');
                            let favButton = document.getElementById('fav');          
                            favButton.style.fill="#F70968";
                           
                        }
                        
                    })
                   
                }
                else{
                    this.$message.error('不能重复收藏哦~');
                    console.log('不能重复收藏哦~');
                }
              
            });
            
            
           
            
        }
   
    }
    };
    </script>

    <style>
    
        /*.video-js .vjs-time-control{//分割线
            display: block;
             padding-left: 0; 
        padding-right: 0.5em;
            min-width: 0.5em;
        }*/
        .video-js .vjs-current-time{
            display: block;
        }
       /* .video-js .vjs-duration{//总时长
            min-width: 0.5em;
            /* padding-left: 1em; 
            padding-right: 0.5em;
            display:block;
        }*/
        .vjs-remaining-time{display: block;}/**剩余时间 */
    .vux-x-icon-ios-heart{
        fill: rgb(45, 44, 44)
    }
  .aaa{
        width:100%;
    }
 
.vjs-poster{/**视频背景封面 */
    background-size: 100% 100%;
}
.video-js .vjs-big-play-button{
  /*
  播放按钮换成圆形
  */
    height: 2em;
    width: 2em;
    line-height: 2em;
    border-radius: 1em;
    top: 45%;
    left: 40%;
    opacity: 0.8;
    border: none;
 }

.cTitle ul,.cInfo ul{
    width:100%;
}
.courseBox{
    width: 100%;
    margin-top: 10px;
    height: 65px;
}
.courseDetail{
    width: 99%;
    margin-left: 8px;
}  
.cTitle li,.cInfo li{
    float: left;
    list-style: none;
    width: 30%;
    text-align: center
}
.cTitle li{
    font-family: "微软雅黑";
    font-size: 13px;
    color: rgb(90, 89, 89);
}
.cInfo li{
    font-family: "微软雅黑";
    font-size: 15px;
    color:rgb(45, 44, 44);
}
.cDetailTitle ul{
    list-style: none;
    width: 99%;
    
}
.cDetailTitle  li{
    list-style: none;
    margin-bottom:10px;
    width: 99%;
    height: auto;
    
}
.courseName{
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: left; 
    font-size: 20px;
    font-family: "微软雅黑";
    color: #383636;
    margin-top: 5px;
}


.cDetailIntro{
    font-family: "微软雅黑";
    font-size:12px;
    color: #494949;
    margin-left: 10px;
}

    </style>