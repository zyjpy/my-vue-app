// history模式
import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'

import Home from '../views/Home.vue'
import Memory from '../views/Memory.vue'
import Empty from '../views/Empty.vue'
import Login from '../views/Login.vue'
import Table from '../views/Table.vue'
import Movie from '../views/Movie.vue'

const routes = [
// 路由的默认路径,设置 redirect值，就可以默认显示你想显示的那个路由页面
  {
      path:'/',
      redirect:"home"
  },
  {
      path: '/home',
      component: Home
  },

  {
      path: '/empty',
      component: Empty
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/table',
    component: Table
  },
  {
    path: '/movieinfo',
    component: Movie
  },  {
    path: '/memory',
    component: Memory
  },
  
]

// 创建路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router;