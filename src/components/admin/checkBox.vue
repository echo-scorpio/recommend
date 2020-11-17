<template>
    <el-checkbox-group 
    v-model="checkedCities"
    >
    <el-checkbox v-for="(right,index) in rightList" :label="right.name" :key="index">{{right.name}}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
    export default{
        props:{
            value:Array
        },
        data(){
            return{
                rightList: [{ name: '课程管理' }, { name: '课程类型管理' }, { name: '用户管理' }, { name: '数据统计' }],
                
            }
        },
        computed:{
            checkedCities:{
                get(){
                    return this.value
                },
                set(val){
                    this.$emit('checked',val)
                }
            }
        },
        mounted(){
            //console.log(this.checkedCities,'aaaaaaaaaaaaaaa')
        }
    }
</script>