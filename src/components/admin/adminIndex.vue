<template>

  <div class="d_box">
      <side-nav></side-nav>
    
  </div>
</template>
<script>
import request from "@/utils/request";
import sideNav from './sideNav'
import {getAdminName} from '@/utils/auth'
// import Pagination from "@/components/Pagination";
export default {
  name: "ArticleManager",
  components: {
    // Pagination
    sideNav
  },
  data() {
    return {
      articleList: [],
      title: "",
      currentPage: 1, //默认第一页
      total: 0, //总条数
      pageSize: 10 //默认第一页展示10条
    };
  },
  mounted() {
    if(!getAdminName()){
      this.$router.push('/admin')
    }
    //this.getList();
    
  },
  methods: {
    /*getList() {
      request({
        url: "/api/article/list",
        method: "post",
        data: {}
      }).then(res => {
        console.log(res);
        if (res.msg === "查询成功") {
          this.articleList = res.list;
          this.total = this.articleList.length;
        }
      });
    },
    handleEdit(row) {
      this.$router.push({
        name: "ArticleUpdate",
        params: row
      });
    },
    handleDelete(id) {
      request({
        url: "/api/article/deleteArticle",
        method: "post",
        data: { id: id }
      }).then(res => {
        console.log(res);
        if (res.msg === "删除成功") {
          this.$message({
            message: "删除成功！",
            type: "success"
          });
          this.getList();
        }
      });
    },
    toCreate() {
      this.$router.push("createArticle");
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }*/
  }
};
</script>
<style lang="less">
.d_box {
  width: 90%;
  height: 100%;
  margin: auto;
      margin-top: 2px;
  .search {
    width: 30%;
    float: left;
  }
  .searchBtn {
    width: 60%;
    float: left;
  }
  .addBtn {
    width: 10%;
    float: left;
  }
 
}
</style>
