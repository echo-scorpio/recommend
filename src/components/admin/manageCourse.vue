<template>
<!--上传视频-->
<div>
       <el-table
    :data="tableData"
    style="width: 100%;"
     :row-key="getRowKeys"
        :expand-row-keys="expands"
        id="table"
    >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="课程名称">
            <el-input placeholder="请输入内容" v-show="props.row.show" v-model="props.row.cName"></el-input>
            <span v-show="!props.row.show">{{ props.row.cName }}</span>
          </el-form-item>
          <el-form-item label="课程类型">
             <el-select v-model="props.row.cType" placeholder="请选择课程类型" v-show="props.row.show">
            <el-option v-for="item in typeArr" :key="item.cType" :value="item.cType" :label="item.cType"></el-option>        
        </el-select>
            
            <span v-show="!props.row.show">{{ props.row.cType }}</span>
          </el-form-item>
          <el-form-item label="课程介绍">
            <el-input placeholder="请输入内容" v-show="props.row.show" v-model="props.row.cIntro"></el-input>
            <span v-show="!props.row.show">{{ props.row.cIntro }}</span>
          </el-form-item>
          <el-form-item label="课前准备">
            <el-input placeholder="请输入内容" v-show="props.row.show" v-model="props.row.cPrepare"></el-input>
            <span v-show="!props.row.show">{{ props.row.cPrepare }}</span>
          </el-form-item>
          <el-form-item label="步骤">
            <el-input placeholder="如有多条请以@符号分隔" v-show="props.row.show" v-model="props.row.cSteps"></el-input>
            <span v-show="!props.row.show">{{ props.row.cSteps }}</span>
          </el-form-item>
          <el-form-item label="课程建议">
            <el-input placeholder="如有多条请以@符号分隔" v-show="props.row.show" v-model="props.row.cSuggests"></el-input>
            <span v-show="!props.row.show">{{ props.row.cSuggests }}</span>
          </el-form-item>
          <el-form-item label="常见错误">
            <el-input placeholder="如有多条请以@符号分隔" v-show="props.row.show" v-model="props.row.cErrors"></el-input>
            <span v-show="!props.row.show">{{ props.row.cErrors }}</span>
          </el-form-item>
           <el-form-item label="课程封面">
             <img  v-if="props.row.cImg" :src="props.row.cImg" style="float:left;margin-right:20px" class="avatarImg">
              
          <el-upload
            class="avatar-uploader"
            action="/api/manageCourse/addImg"
            name="cover"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            v-show="props.row.show"
            style="float: left;"
            >


            
            <img  v-if="imageUrl" :src="imageUrl" class="avatarImg">
            <i v-else class="el-icon-plus tt"></i>
        </el-upload>
          </el-form-item>

           <el-form-item label="视频地址">
             <video  v-if="props.row.cVideo" :src="props.row.cVideo" class="avatar" controls="control" style="float: left; margin-right: 20px;"></video>
            
             <el-upload class="avatar-uploader"
                           action="/api/manageCourse/addVideo"
                           v-bind:data="{FoldPath:'上传目录',SecretKey:'安全验证'}"
                           v-bind:on-progress="uploadVideoProcess"
                           v-bind:on-success="handleVideoSuccess"
                           v-bind:before-upload="beforeUploadVideo"
                           v-bind:show-file-list="false"
                           name="video"
                           v-show="props.row.show"
                           style="float: left;"
                           >
                    <video v-if="videoForm.showVideoPath !='' && !videoFlag"
                           v-bind:src="videoForm.showVideoPath"
                           class="avatar"
                           controls="control">
                        您的浏览器不支持视频播放
                    </video>
                    <i v-else-if="videoForm.showVideoPath =='' && !videoFlag"
                       class="el-icon-plus tt"></i>
                    <el-progress v-if="videoFlag == true"
                                 type="circle"
                                 v-bind:percentage="videoUploadPercent"
                                style="height: 80px;width: 80px;"
                                 ></el-progress>
                </el-upload>

          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="课程 ID"
      prop="courseID">
    
    </el-table-column>
    <el-table-column
      label="课程名称"
      prop="cName">
    
    </el-table-column>
    <el-table-column
      label="课程类型"
      prop="cType">
      
    </el-table-column>
       <el-table-column
         label="操作"
       >
    <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row,scope.column)" v-show="!scope.row.show">编辑</el-button>

          <el-button
          size="mini"
          @click="handleSave(scope.row,scope.column)" v-show="scope.row.show">保存</el-button>
          
        <el-button       
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
       </el-table-column>
   
  </el-table>
 
  <el-drawer
  title="添加课程"
 :with-header="false"
 :before-close="handleClose"
  :visible.sync="dialog"
  direction="rtl"
  custom-class="demo-drawer"
  ref="drawer"
 
  >
  <div class="demo-drawer__content">
    <el-form :model="form"  action="/api/manageCourse/add" method="post" enctype="multipart/form-data">
      <el-form-item label="课程名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="课程介绍" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="课程类型" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择课程类型">
            <el-option v-for="item in typeArr" :key="item.cType" :value="item.cType" :label="item.cType"></el-option>
         
        </el-select>
      </el-form-item>
      
         
         <el-form-item label="课前准备" :label-width="formLabelWidth">
        <el-input v-model="form.prepare" autocomplete="off"></el-input>
      </el-form-item>
          <el-form-item label="课程步骤" :label-width="formLabelWidth">
        <el-input v-model="form.steps" autocomplete="off" placeholder="如有多条请以@符号分隔"></el-input>
      </el-form-item>
          <el-form-item label="常见错误" :label-width="formLabelWidth">
        <el-input v-model="form.errors" autocomplete="off" placeholder="如有多条请以@符号分隔"></el-input>
      </el-form-item>
          <el-form-item label="课程建议" :label-width="formLabelWidth">
        <el-input v-model="form.suggests" autocomplete="off" placeholder="如有多条请以@符号分隔"></el-input>
      </el-form-item>
      <el-form-item label="课程封面" label-width=21%>
          <el-upload
            class="avatar-uploader"
            action="/api/manageCourse/addImg"
            name="cover"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatarImg">
            <i v-else class="el-icon-plus tt"></i>
        </el-upload>
        
      </el-form-item>
      <el-form-item label="上传视频" label-width=21%>
          <el-upload class="avatar-uploader"
                           action="/api/manageCourse/addVideo"
                           v-bind:data="{FoldPath:'上传目录',SecretKey:'安全验证'}"
                           v-bind:on-progress="uploadVideoProcess"
                           v-bind:on-success="handleVideoSuccess"
                           v-bind:before-upload="beforeUploadVideo"
                           v-bind:show-file-list="false"
                           name="video">
                    <video v-if="videoForm.showVideoPath !='' && !videoFlag"
                           v-bind:src="videoForm.showVideoPath"
                           class="avatar"
                           controls="control">
                        您的浏览器不支持视频播放
                    </video>
                    <i v-else-if="videoForm.showVideoPath =='' && !videoFlag"
                       class="el-icon-plus tt"></i>
                    <el-progress v-if="videoFlag == true"
                                 type="circle"
                                 v-bind:percentage="videoUploadPercent"
                                style="height: 80px;width: 80px;"
                                 ></el-progress>
                </el-upload>
        
      </el-form-item>

     
    </el-form>
    <div class="demo-drawer__footer">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="addCourse()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
    </div>
  </div>
</el-drawer>
<div>
<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :page-sizes="sizeArr" layout=" prev, pager, next, sizes, jumper" :total="total">
      </el-pagination>
</div>


    <el-button @click="dialog = true" type="primary" style="margin-left: 16px;">
  添加课程
</el-button>

</div>
</template>

<script>
import request from '@/utils/request'
import {getAdminName} from '@/utils/auth'
export default{
    name:'child1',
    data(){
        return{
            tableData:[],
            dialog: false,
      loading: false,
             form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      timer: null,
      imageUrl: '',
       videoFlag: false,
            //是否显示进度条
            videoUploadPercent: "",
            //进度条的进度，
            isShowUploadVideo: false,
            //显示上传按钮
            videoForm: {
                showVideoPath: ''
            },
      imgUrl:'',
      typeList:[],
      typeArr:[],
      coverUrl:'',
     getRowKeys(row) {
                return row.courseID;
            },
            // 要展开的行，数值的元素是row的key值
    expands: [],
    ButtonTxt:'Edit',
    /**分页功能 */
    currentPage: 1, //默认第一页
      total: 0, //总条数
      pageSize: 8, //默认第一页展示10条
      sizeArr:[8,10,20,30]

    }
    },
    mounted(){
          //console.log("tab1组件")
          if(getAdminName()){
            this.showInfo();
          }
          else{
            this.$router.push('/admin')
          }
          
      },
      methods:{
           handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
          showInfo(){
              let start = (this.currentPage-1)*this.pageSize;
                let num=this.pageSize;
              request({
                url:'api/manageCourse/selType',//为下拉菜单展示课程类型
                method:'post',
                data:{}
              }).then(res=>{
                //console.log(res.msg)
                if(res.msg=='success'){
                  this.typeArr=res.list;
                  /**============================= */
                  request({
                  url:'api/manageCourse/show',//重新展示课程列表
                  method:'post',
                  data:{
                       start:start,
                        num:num
                  }           
              }).then(res=>{
                  if(res.msg=='查询成功'){
                    let list=res.list;
                    list.forEach(element => {
                      element.show=false;
                    });
                      this.tableData=list;
                      this.total=res.total[0]['total']
                     
                      var i=0;
                      res.list.forEach(element => {
                        
                          this.typeList[i]=element.cType;
                          i++;
                      });
                  
                  }
                  else{
                      console.log('课程信息查询失败')
                  }
              })
             
                }
              })
              /**/
          },
         
         handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
             
          }, 2000);

        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    /**上传图片 */
    handleAvatarSuccess(res, file) {
        this.imageUrl = '/service/'+res.data.replace(/\\/g,"/");//URL.createObjectURL(file.raw);
        //this.imgUrl=res.data.replace(/\\/g,"/");
       
        //console.log('图片地址'+this.imgUrl);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      /**上传视频 */
      

        beforeUploadVideo(file) {
                var fileSize = file.size / 1024 / 1024 < 50;
                if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
                    this.$message.error("请上传正确的视频格式");
                    return false;
                }
                if (!fileSize) {
                    this.$message.error("视频大小不能超过50MB");
                    return false;
                }
                this.isShowUploadVideo = false;
            },
            //进度条
            uploadVideoProcess(event, file, fileList) {
                this.videoFlag = true;
                this.videoUploadPercent = file.percentage.toFixed(0) * 1;
            },
            //上传成功回调
            handleVideoSuccess(res, file) {
                this.isShowUploadVideo = true;
                this.videoFlag = false;
                this.videoUploadPercent = 0;
           
                console.log(typeof(res.data))
                if (res.msg == '上传成功') {
                    this.videoForm.showVideoPath ='/service/'+res.data;
                } else {
                    this.$message.error("上传失败，请重新上传");
                }
            },
        /**添加课程 */
      
        addCourse(){
                   
            let audioElement = new Audio(this.videoForm.showVideoPath);
            //console.log('videopath'+this.videoForm.showVideoPath)
                      let duration;
                      let temp='';
                       duration = audioElement.duration;
                      audioElement.addEventListener("loadedmetadata", function (_event) {                  
                        temp =(this.duration/60.0).toString().split('.')[0];//秒钟转为分钟
                     }) 
                         if(temp==0){
                          temp=1;
                      }

            const data={
                name:this.form.name,
                intro:this.form.intro,
                type:this.form.type,
                prepare:this.form.prepare,
                steps:this.form.steps,
                errors:this.form.errors,
                suggests:this.form.suggests,
                imgUrl:this.imageUrl,
                videoUrl:this.videoForm.showVideoPath,
                videoTime:temp
            }
            let k=''
            let flag=true;
           for(k in data){
             //console.log(data[k])
             //console.log(k+'---------'+data[k])
             if(data[k]=='' || data[k]==undefined){
               //console.log('无数据')
               flag=false;
             }
           }
           if(!flag){
             //console.log('有空值')
             this.$message.error('所填内容不能有空值')
           }
           else{
             //console.log('无空值')
             request({
                url:'/api/manageCourse/addCourse',
                method:'post',
                data:data

            }).then(res=>{
                if(res.msg=='success'){
                this.$message.success('课程添加成功');
                this.dialog = false;
                this.showInfo();
               
                }
                else{
                    this.$message.error('课程添加失败');
                }
            })
           }

            /**/
        },

        /**删除课程 */
        handleDelete(key,row){
          //console.log('key:'+key+'row'+row.courseID)
          request({
            url:'api/manageCourse/delCourse',
            method:'post',
            data:{
              id:row.courseID
            }
          }).then(res=>{
            if(res.msg=='success'){
              this.$message.success('删除成功~');
              this.showInfo()
            }
            else{
              this.$message.error('删除失败');
              
            }
          })         
        },

 


   
   /**编辑课程信息 */
    handleEdit(row,column){
      row.show=true;
      this.expands.push(row.courseID)/**点击编辑按钮，展开当前的内容 */ 
    },

    handleSave(row,col){/**保存编辑的课程信息 */
      row.show=false;
      //this.expands.pop(row.courseID);
      ///console.log(row.cName);
      var cImgUrl;
      var cVideoUrl;
      if(this.videoForm.showVideoPath==''){
        cVideoUrl=row.cVideo
      }
      else{
        cVideoUrl=this.videoForm.showVideoPath
      }
      if(this.imageUrl==''){
        cImgUrl=row.cImg;
      }
      else{
        cImgUrl=this.imageUrl;
      }
      const data={
        id:row.courseID,
        name:row.cName,
        imgUrl:cImgUrl,
        videoUrl:cVideoUrl,
        intro:row.cIntro,
        type:row.cType,
        prepare:row.cPrepare,
        steps:row.cSteps,
        errors:row.cErrors ,
        suggests:row.cSuggests ,
      }
      //console.log(data)
      request({
        url:'api/manageCourse/editCourse',
        method:'post',
        data:data
      }).then(res=>{
        if(res.msg=='success'){
          this.$message.success('信息修改成功');
              this.showInfo();
        }
        else{
          this.$message.error('信息修改失败');
        }
      })
    },

    //分页功能
    handleSizeChange(val) {
      this.pageSize = val;
      this.showInfo()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showInfo()
    },

      }
}
</script>

<style lang="less">
/**上传封面 */
.avatarImg {
    width: 100px;
    height: 100px;
    line-height: 100px;
    display: block;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 100px;
    width: 100px;
}
.tt{
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
/**上传封面 */

.el-form-item{
    margin-bottom: 5px;
}
.el-scrollbar__wrap {
   overflow-x: hidden;
  
}
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .el-drawer ltr .demo-drawer{
      width: 50% !important;
  }
  /**上传视频进度条 */
  .ttt{
      width: 80px;
      height: 80px;
  }
/**视频上传进度 */
 .el-progress--circle .el-progress__text{
    position: absolute;
    top: 50%;
    left: 0;
}
.el-progress--circle{
    top: 11%;
    left: 9%;
    position: absolute;
}
.el-progress .el-progress--circle{
    width: 80px;
    height: 80px;
}
.el-progress-circle{
    width: 80px !important;
    height: 80px !important;
}
</style>
