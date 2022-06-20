<template>
  <div>
  <button @click="getMovieList">获取用户信息</button>
  <img src="http://zhang-movie.oss-cn-hangzhou.aliyuncs.com/image/bear.png" alt="">
  <video src=""></video>
  
  <p>asdasd</p>
  <el-table
    :data="tableData"
    style="width: 100%"
    >
    <el-table-column
      prop="actor"
      label="主演"
      width="180">
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="moviename"
      label="电影名称">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },methods:{
    getUserInfo(){
      this.axios.post("/getUserInfo").then((response) => {
      console.log(response.data.data)
      let res = response.data.data
      let tableData = Object.values(res)
      console.log(tableData)
      this.tableData = tableData
      })
    },
    getMovieList(){
      this.axios.post("/getMovieList").then((response) => {
      console.log(response.data)
      console.log(response.data.data)
      this.tableData = response.data.data
      })    
    }
    }
  }
</script>

