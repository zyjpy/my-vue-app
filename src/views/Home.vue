<template>
  <meta name="referrer" content="never" charset="UTF-8">

  <div class="mk" style="overflow: auto">
    <ul
      class="dianjing_list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance="10"
      immediate-check="false"
    >
      <li v-for="(i,index) in list" :key="i" class="li" style="list-style-type:none">
        <div class="boxnew">
        <a class="icon" v-bind:href="baseUrl+i.url" target="_blank">
            <img  class="focus_img" v-bind:src="i.thumbnail" style=width:100px >

        </a>
        <div class="content" type="nba">
            <h2 class="title"><a v-bind:href="baseUrl+i.url" target="_blank" >{{i.title}}</a></h2>
            <div class="bottom_con">
                <div class="date_start">{{i.createtime}}</div>

            </div>
        </div>
      </div> 
      </li>   
    </ul>
    <p v-if="loading" style="text-align: center ">加载中...</p>
    <p v-if="noMore" style="text-align: center">没有更多了</p>
  </div>
  <el-backtop></el-backtop>
</template>


<script>
  // const baseUrl = "http://192.168.31.110:5000"
  export default {
  
  data() {
    return {

      count: 0,
      loading: false,
      list:[],
      noMore: false, // 控制滚动禁用
      routeLoad: false, // 控制滚动禁用
      currentPage: 1, // 页码
      pageSize: 10, // 一页6条
      totalPages: "",
      baseUrl :"http://192.168.31.111:5000",
    }
  },
  computed: {
    noMore() {
      return this.currentPage >=  this.totalPages - 1;

    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  created(){
      // this.test();
      this.getMoiveList();
      // this.getMessage();

    },
  methods: {

    load() {
      if (this.disabled) return;
      this.loading = true;

      setTimeout(() => {

        this.currentPage += 1;
        
        this.getMoiveList()

      }, 2000);

    },
    getMoiveList() {
      this.axios.get(this.baseUrl+'/dianjing', {  //params参数必写 , 如果没有参数传{}也可以
          params: {  
            // start: 20,
            currentPage: this.currentPage,
            // limit: 20
            pageSize: this.pageSize
          }
      })
        .then((res) => {
          console.log(res.data)
          this.list = this.list.concat(res.data["data"])
          this.total = res.data["total"]
          this.totalPages = res.data["totalPages"]
          console.log(this.total)
          this.loading=false

        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getMoiveList()
        });
    },

  },

}

</script>

<style scoped>

.mk {

    width: 680px;
    height: 700px;
    margin: 0 auto;

    /* position: relative; */

  
}

.list {

  width: 100%;

}

.li {

  margin-top: 20px;

  width: 100%;

  height: 100px;

  background-color: rgb(255, 255, 255);

}


.container{
    width: 990px; height: auto; margin: 0 auto; overflow: hidden; position: relative;
}
.top_20{margin-top: 20px;}
.fl{float:left;}
.fr{float:right;}
.b-clear:before,.b-clear:after{content:"";display: block;clear: both;}
.rd50{-webkit-border-radius: 50%;-moz-border-radius: 50%;-o-border-radius: 50%;border-radius: 50%;}





.boxnew{width:100%;overflow:hidden;position:relative;padding:0px 0;border-bottom:1px solid #f2f2f2}
.boxnew a.icon{float:left;position:relative;}
.boxnew a .video{display:block;}
.boxnew a .focus_img{float:left;width:200px;height:100px;}
.boxnew .picture{position:absolute;top:0;width:100%;height:100%;text-align:center;vertical-align:middle;display:none;line-height:70px;}
.boxnew .picture img{vertical-align:middle;max-width:100%;max-height:100%;width:60px;margin-top:5px;}
.boxnew .content{padding-left:30px;font-size:14px;}
.boxnew .content h2{display:flex;align-items:center;height:60px;font-size:18px;}
.boxnew .content h2 a{color:#000;}
.boxnew .content .to_top{float:right;width:80px;text-align:right;line-height:30px;}
.boxnew .content .to_top a{font-size:12px;background:#3AA9F3;color:#fff;border-radius:3px;padding:3px 5px;}

.boxnew .content .bottom_con{overflow:hidden;margin-top:12px;color:#929292;position: absolute;left: 30px; right: 0;  bottom: 20px;}
/* .boxnew .content .date_start{float:left;} */
.boxnew .content .pinglun{float:right;height:18px;background:url(../../../bbsimg.zhibo8.cc/bbsimg/2018-05-28/20180528150753_9621.png) no-repeat left center;background-size:auto 14px;text-indent:20px;}



.box-r{width:320px;}

.hot-news ul li{margin-top:14px;position:relative;max-height: 155px;min-height:110px;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;overflow: hidden;}
.hot-news .s_tlt{position:absolute;top:0;right:15px;padding:0 5px;border-radius:1px;background:#3AA9F3;color:#fff;}
.hot-news .s_icon{width:100%;height:auto;vertical-align:top;}
.hot-news .s_info{height:26px;line-height:26px;margin-top:-26px;}
.hot-news .s_info .s_word{position: absolute;bottom: 0;width: 100%;z-index: 2;text-indent:10px;font-size: 13px;font-weight: 500;color:#fff;background:rgba(0,0,0,.3);}
/* vue.js去掉滚动条的方法： */
   /* ::-webkit-scrollbar {
     width: 0 !important;
   }
   ::-webkit-scrollbar {
     width: 0 !important;height: 0;
   } */

body {

    overflow: hidden;
}
</style>