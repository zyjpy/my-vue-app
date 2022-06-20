// 导入mockjs
import Mock from 'mockjs'
import loginApi from '../mock/login.js'
// 设置延时200-2000延时
Mock.setup({
  timeout: '200-2000'
})

// 登录
// 拦截的是/user/login
Mock.mock("/getUserInfo", 'post', loginApi.getUserInfo)
Mock.mock("/getMovieList", 'post', loginApi.getMovieList)
