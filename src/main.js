import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// 导入全局mock
import './mock'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as echarts from 'echarts'
// axios.defaults.baseURL="http://192.168.40.177:5000";

const app = createApp(App);
app.config.globalProperties.$echarts = echarts;
app.use(router).use(store).use(ElementPlus).use(VueAxios, axios).mount('#app');