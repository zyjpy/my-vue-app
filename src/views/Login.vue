<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
        <el-form-item label="密码">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  const baseUrl = "http://192.168.40.177:5000"
  export default {

    data() {
      return {
        tableData:"",
        form: {
          name: '',

        }

      }
    },
    created(){
      this.onSubmit();

    },
    methods:{
      onSubmit() {
        console.log('submit!');

      },
  }
}
</script>

<style>
  .login{
    background:url("../pic/foo.jpg");
    width: 100%;
    height: 100%;
    position:fixed;
    margin-top: -65px;/*上边距*/
    margin-left: -10px;/*左边距*/
    background-size:100% 100%;
    }
</style>