<template>
  <div>
    <el-button type="text" size="mini" @click="addAdmin">添加管理员</el-button>
    <manageRight-dialog ref="rightDialog" :title="title"></manageRight-dialog>
    <el-table :data="tableData" stripe style="width: 100%" id="tab" >
      <el-table-column prop="id" label="管理员ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="admin_right" label="权限">
        <template slot-scope="props">
          <el-checkbox v-for="(right,index) in rightList" :label="right.id" v-model="props.row.admin_right"
            :key="index">{{right.name}}</el-checkbox>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="text" @click="editInfo(scope.row)" icon="el-icon-edit">编辑</el-button>
        </template>
        
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
  import request from '@/utils/request'
  import manageRightDialog from './manageRightDialog'
  export default {
    mounted() {
      this.showList();
    },
    components:{
      manageRightDialog
    },
    data() {
      return {
        title:'',
        tableData: [],
        rightList: [
          {
            id: '1',
            name: '课程管理',
          },
          {
            id: '2',
            name: '课程类型管理',
          },
          {
            id: '3',
            name: '用户管理',
          },
          {
            id: '4',
            name: '数据统计',
          }
        ],

        form: {
          name: ''
        },
        formLabelWidth: '120px',
        dialogFormVisible: false,
      }
    },
    methods: {
      RndNum(n) {
        var rnd = "";
        for (var i = 0; i < n; i++)
          rnd += Math.floor(Math.random() * 10);
        return rnd;
      },
      showList() {
        request({
          url: 'api/manageUser/showAdminList',
          method: 'post',
          data: {}
        }).then(res => {
          if (res.msg == 'success') {
            this.tableData = res.list;
          }
        })
      },
      addAdmin(){
        this.$refs.rightDialog.open('add','').then(()=>{
          this.showList()
        })
      },
      editInfo(val){
        this.$refs.rightDialog.open('edit',val)
      }

    }

  }
</script>

<style>
  .container {
    width: 80%;
    height: auto;

  }

  .innerContainer {
    width: 100%
  }
</style>



<!--


<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="管理员id" width="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
    </el-table-column>
    <el-table-column  label="权限">
      <template slot-scope="props">     
        <el-checkbox v-for="(right,index) in rightList" :label="right.id" v-model="props.row.admin_right" :key="index">{{right.name}}</el-checkbox>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import request from '@/utils/request'
  import CheckBox from './checkBox'
  export default {
    components: {
      CheckBox
    },
    data() {
      return {
        tableData: [],
        checkedCities: ['课程管理'],
        checkList:[],
        rightList: [
          {
            id:'1',
            name: '课程管理',
          },
          {
            id:'2',
            name: '课程类型管理',
          },
          {
            id:'3',
            name: '用户管理',
          },
          {
            id:'4',
            name:'数据统计',
          }
        ],
      }
    },
    mounted() {

      this.onLoad()
    },
    computed: {

    },
    methods: {
      onLoad() {
        request({
          url: 'api/manageUser/showAdminList',
          method: 'post',
          data: {}
        }).then(res => {
          if (res.msg == 'success') {
            this.tableData = res.list;
            /**因为在dom加载完之前就会执行js所以不能在此处为复选框赋值，要在页面全部加载完之后再为复选框赋值 */
          }
        })
      },
      handelChange() {

      }
    }
  }
</script>-->