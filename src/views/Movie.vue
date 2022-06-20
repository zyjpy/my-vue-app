<template>

  <div>
    <!-- <img src="https://img2.doubanio.com/view/photo/s_ratio_poster/public/p452089833.jpg" alt="123" referrerPolicy="no-referrer"> -->
  <div>
  <el-button type="primary" size="mini" style="width:60px" @click="onhandAdd">新增</el-button>
  <el-input 
    placeholder="请输入电影名和演员"
    v-model="movieTitle"
    clearable
    style="width: 200px" fit = false
    @keyup.enter.native="seachEnter">
  </el-input>
  <el-button type="primary" icon="el-icon-search" style="width:60px" @click="searchMovie">搜索</el-button>
  
  </div>

  <div>{{movieinfo}}</div>
  <div>{{msg}}</div>
  <div>{{testinfo}}</div>

  <div class="multipleTable">
  <el-table
    :data="tableData"
    style="width: 100%">

    <el-table-column
      prop="123"
      label="封面"
      sortable>
      <template v-slot="scope">
        <img :src="scope.row.cover_url" alt="123" referrerPolicy="no-referrer" style="width: 120px;height: 200px">
      </template>
    </el-table-column>

    <el-table-column
      prop="title"
      label="名称"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="score"
      label="评分"
      sortable>
    </el-table-column>
    <el-table-column
      prop="release_date"
      label="上映时间"
      
      sortable>
    </el-table-column>

    <el-table-column
      prop="actors"
      label="主演"
      sortable>
    
    </el-table-column>

      <el-table-column label="操作">
        <template v-slot="scope">

        <el-button

        @click="editShow(scope.row)">编辑</el-button>
        <!-- append-to-body 分割两个按钮 -->

          <el-popconfirm
            confirmButtonText="好的"
            cancelButtonText="不用了"
            title="确定删除吗？"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button
                type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
  </el-table>
  </div>
  <div v-if="dialogVisible">
    <el-dialog 
      :title="dialogTitle"
      style="text-align:left !important"
      v-model="dialogVisible"
      :append-to-body="true" 
      :model-append-to-body="false"
      :before-close="handleClose"
      width="500px"
      >
      <el-form 
        :model="ruleForm" 
        ref="ruleForm"               
        :rules="rules"
        label-width="80px">

        <el-form-item
          prop="title"
          label="电影名"
          style="width:250px"
          >
          <el-input v-model="ruleForm.title" placeholder="请输入电影名"></el-input> 
        </el-form-item>
<!-- el-date-picker value-format="yyyy-MM-dd-hh-mm-ss" -->
        <el-form-item label="上映时间" required>
          <el-col :span="11">
            <el-form-item prop="release_date">
              <el-date-picker 

              type="datetime" placeholder="选择日期" v-model="ruleForm.release_date" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <!-- <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col> -->
        </el-form-item>

        <el-form-item
        label="封面"
        prop="cover_url"
        >
        <el-upload
          :http-request="uploadFile"
          class="avatar-uploader"
          action="action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          v-loading.fullscreen.lock="loading"
          element-loading-text="拼命上传中"
           :on-error="handleUploadError">
          <img v-if="ruleForm.cover_url" :src="ruleForm.cover_url" class="avatar" width="220">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        </el-form-item>
        <el-form-item
        label="演员"
        prop="actors"
        >
          <el-input v-model="ruleForm.actors" placeholder="请输入演员"></el-input>
        </el-form-item>
        <el-form-item
        label="评分"
        prop="score"
        style="width:250px">

          <!-- <el-input-number v-model.number="ruleForm.score" placeholder="请输入评分" /> --> 
          <!-- <el-input v-model="ruleForm.score"  type="number" placeholder="请输入评分"></el-input> --> 
          <el-input-number v-model="ruleForm.score" placeholder="请输入评分" @change="handleChange"  />

          <!-- <el-input v-model.number='ruleForm.score' oninput="value=value.replace(/[^\d]/g,'')" maxlength='9'/> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="submitForm()">提交</el-button>
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
  <div class="block">
    <span class="demonstration"></span>
    <el-pagination style="position:absolute"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :hide-on-single-page="value"
      >
    </el-pagination>

 
  </div>

  <el-backtop></el-backtop>
  </div> 
</template>

<script>
  const baseUrl = "http://192.168.31.111:5000"
  export default {

    data() {
      return {
        tableData:"",
        total:0, //总数
        pageSize: 10, // 每页多少条
        currentPage: 1,
        pageSizes: [10, 30, 100],
        dialogTitle: "",
        movieTitle:"",

        dialogVisible:false,
        ruleForm:{
          id:"",
          title:"",
          release_date:"",
          cover_url:"https://zhang-movie.oss-accelerate.aliyuncs.com/image/example/20220529130546_58A70AD8-8B3E-476A-B570-DEB3DF586A22.jpeg",
          actors:"",
          score:""

        },
        fileToUpload:[],
        rules:{
          title:[

            {required: true, message: '请输入电影名', trigger: 'blur'},
            { min: 2, max: 10, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
          release_date:[
            {required: true, message: '请输入上映日期', trigger: 'blur'},
            // { min: 2, max: 10, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
          actors:[
            {required: true, message: '请输入演员', trigger: 'blur'},
            // { min: 2, max: 10, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
          score:[
              {required: true, message: '请输入评分', trigger: 'blur'},
            ],                     
        },
        loading:false,
      }
    },
    created(){
      // this.test();
      this.getMoiveList();
      // this.getMessage();

    },
    methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getMoiveList();

      
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getMoiveList();

    },
    test(){
      this.axios.get(baseUrl+"/test").then((response) => {
      this.testinfo = response.data
      })
    },
    getMessage() {
      const path = baseUrl+'/getMsg';
      this.axios.get(path)
        .then((res) => {
          this.msg = res.data;
          
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getMoiveList() {
      this.axios.get(baseUrl+'/movieList', {  //params参数必写 , 如果没有参数传{}也可以
          params: {  
            // start: 20,
            currentPage: this.currentPage,
            // limit: 20
            pageSize: this.pageSize
          }
      })
        .then((res) => {
          console.log(res.data)
          this.tableData = res.data["data"]
          this.total = res.data["total"]
          console.log(this.total)

        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    searchMovie(){
      this.axios.get(baseUrl+'/searchMovie', {  //params参数必写 , 如果没有参数传{}也可以
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            movieTitle:this.movieTitle,
          }
      })
        .then((res) => {
          console.log(res.data)
          this.tableData = res.data["data"]
          this.total = res.data["total"]
          console.log(this.total)

        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
      seachEnter(e) {
        let keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13) {
          this.searchMovie(); //搜索按钮的回调
        }
      },
      // handleEdit(index, row) {
      //   // let data = row
      //   // this.axios.post(baseUrl+"/moifyMovie",data)
      //   // .then(() => {
      //   //   ElMessage.success("修改成功");
      //   //   this.getMoiveList();
      //   // });
      //   this.dialogVisible = true;
      //   console.log(index, row);
        
      // },
      handleDelete(index, row) {
        let data = row
        this.axios.post(baseUrl+"/delMovie",data)
        .then(() => {
          ElMessage.success("删除成功");
          this.getMoiveList();
        });
        // console.log(index, row);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {

            done();
            this.$refs.ruleForm.resetFilds()
          })
          .catch(_ => {});
      },
      editShow(row){
        this.dialogTitle = "编辑电影";
        this.ruleForm = JSON.parse(JSON.stringify(row));//element ui 解决在表单中修改数据保存，表格的数据也跟着修改的问题
        // this.copyProperties(row,this.ruleForm)
        // console.log(this.ruleForm)
        this.dialogVisible=true;

        this.title = '更新信息';
      },
      //拷贝对象
      copyProperties(source, target, ...ignoreProperties) {
        Object.keys(target).forEach(key => {
          if (!ignoreProperties.includes(key) && source[key] !== undefined && source[key] !== null) {
            if (typeof source[key] === 'object') { // 进行深拷贝
              target[key] = deepClone(source[key])
            } else {
              target[key] = source[key]
            }
          }
        })
      },
      deepClone(source) {
        if (!source && typeof source !== 'object') {
          console.error(`deepClone() Error: error arguments ${source}`)
          return
        }
        const targetObj = source.constructor === Array ? [] : {}
        Object.keys(source).forEach(keys => {
          if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
          } else {
            targetObj[keys] = source[keys]
          }
        })
        return targetObj
      },
      //上传图片
	    uploadFile(param){
        this.loading=true
        let form = new FormData()
        form.append("file", param.file)
        console.log(form) // output is: FormData {}; 需要使用 .get() 来读取
        console.log(form.get("fileToUpload")) // output is exactly the fileObj
        // let config = {
        //   // "Content-Type":"multipart/form-data"
        //   'Content-Type':'application/x-www-form-urlencoded'
        // }

        this.axios.post(baseUrl+"/uploadFile", form).then((res) => {
          console.log(res.data)
          this.ruleForm.cover_url=res.data
          this.loading=false;
          })
	    },
      handleUploadError(err) {
          this.$message.error("上传失败, 请重试");
        },
      handleChange(value) {
        console.log(value);
      },

      submitForm(){
        console.log(this.ruleForm);
  
        this.$refs.ruleForm.validate((valid) => {

          if (valid) {
            let id = this.ruleForm.id
            const data={
            id:this.ruleForm.id, 
            title:this.ruleForm.title,
            cover_url:this.ruleForm.cover_url,
            release_date:this.ruleForm.release_date,
            actors:this.ruleForm.actors,
            score:this.ruleForm.score
            }
            if(id){
                this.axios.post(baseUrl+"/updateMovieInfo", data).then((res) => {
                console.log(res.data)
                
                this.$message.success("修改成功")
                this.getMoiveList()
                })
            this.dialogVisible=false;
            }else{

                this.axios.post(baseUrl+"/addMovie", data).then((res) => {
                console.log(res.data)
                
                this.$message.success("新增成功")
                this.getMoiveList()
                this.dialogVisible=false;
                })
          }}
          else {
            console.log('error submit!!');
            return false;}
        });
      },
      beforeAvatarUpload (file) {
        // 只能上传jpg和png的图片
        // const isImage = file.type==="image/jpg"||file.type==="image/png"||file.type==="image/gif"||file.type==="image/jpeg"||file.type==="image/bmp"
        // 大小限制为2M    
        
        if(!['image/jpg','image/png','image/gif',"image/jpeg","image/bmp"].includes(file.type)){
            this.$message.error("不是jpeg,.png,.jpg,.bmp,.gif文件,请上传正确的图片类型")
            return false

        }
        if(file.size/1024/1024 > 5 ){
            this.$message.error("图片不能超过5M")
            return false
        }
        return true

      },
      onhandAdd(){
        this.dialogVisible = true;
        this.dialogTitle = "新增电影";        

        this.ruleForm = {
          id:"",
          title:"",
          release_date:"",
          cover_url:"https://zhang-movie.oss-accelerate.aliyuncs.com/image/example/20220529130546_58A70AD8-8B3E-476A-B570-DEB3DF586A22.jpeg",
          actors:"",
          score:""
        };
      },

    }
}
</script>

<style>

</style>