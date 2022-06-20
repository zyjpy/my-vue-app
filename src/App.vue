<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import Watchlist from "./components/Watchlist.vue"
</script>

<template>


    <a title="zhang" href="/"><img class=logo alt="直播吧" src="./pic/nba.png"></a>



  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <!-- <Watchlist /> -->
  <!-- <router-link to="/">index</router-link> -->

    <router-link to="/home" style="margin-left:10px;"> 电竞快看 </router-link>
    <!-- <router-link to="/about" style="margin-left:10px;"> 其他 </router-link> -->
    <router-link to="/movieinfo" style="margin-left:10px;"> 电影表格 </router-link>


    <!-- <router-link to="/memory"> 测试 </router-link>  -->
  <!-- <router-link to="/login">进入login页</router-link> --> 
  <!-- <router-link to="/table">进入table页</router-link> --> 
  <div class="line"></div>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>


</template>

<style>

  a {
  text-decoration: none;
  color: rgb(91, 87, 87);
}
.line {
    margin: 0px auto 10px;
    height: 10px;
    width: 100%;
    border-bottom: solid 3px #0d91ea;
}
.logo{
    width: 120px; height: 60px; 
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  text-decoration: none;
}

</style>
