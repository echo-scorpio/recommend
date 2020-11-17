<template>
    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" required></el-input>
            </el-form-item>
            <el-form-item label="权限" :label-width="formLabelWidth">
                <el-checkbox v-for="(item,index) in rightList" :key="index" v-model="form.admin_right" :label="item.id">
                    {{item.name}}
                </el-checkbox>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import request from '@/utils/request'
    export default {
        data() {
            return {
                dialogFormVisible: false,
                submitType: '',
                form: {
                    admin_right: []
                },
                formTitle: '',
                formLabelWidth: "120px",
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
                resolve: null,
                reject: null,
            }
        },
        methods: {
            open(type, val) {
                if (type == 'add') {
                    this.dialogFormVisible = true
                    this.formTitle = '添加管理员'
                    this.submitType = 'add'
                    return new Promise((resolve, reject) => {

                        this.resolve = resolve;
                        this.reject = reject;


                    })
                }
                else if (type == 'edit') {
                    this.dialogFormVisible = true
                    this.formTitle = '编辑信息'
                    this.form = val
                    this.submitType = 'edit'
                    return new Promise((resolve, reject) => {
                        this.resolve = resolve;
                        this.reject = reject;
                    })
                }

            },
            RndNum(n) {
                var rnd = "";
                for (var i = 0; i < n; i++)
                    rnd += Math.floor(Math.random() * 10);
                return rnd;
            },
            submit() {   
                if(this.form.admin_right.length==0){
                        this.form.admin_right=['0']
                    }  
                if (this.submitType === 'add') {                    
                    request({
                        url: '/api/manageUser/addAdmin',
                        method: 'post',
                        data: {
                            id: this.RndNum(6),
                            name: this.form.name,
                            rights: this.form.admin_right
                        }
                    }).then(res => {                        
                        if (res.msg == 'success') {
                            this.dialogFormVisible = false
                            this.resolve && this.resolve()
                        }
                    })
                }
                else if (this.submitType === 'edit') {
                    request({
                        url: '/api/manageUser/editRight',
                        method: 'post',
                        data: {
                            id: this.form.id,
                            name: this.form.name,
                            rights: this.form.admin_right
                        }
                    }).then(res => {                        
                        if (res.msg == 'success') {
                            this.dialogFormVisible = false
                            this.resolve && this.resolve()
                        }
                    })
                }
            }
        }
    }
</script>