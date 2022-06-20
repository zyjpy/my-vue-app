// 导入mockjs 使用数据
// import Mock from 'mockjs'
export default {
    getUserInfo: () => {
      return {
        code: 200,
        data: {
          message: 'success',
          name:"zhang",
          phonenum:1375,
        }
      }
    },
    getMovieList: () => {
      return {
        code: 200,
        data: [{
          moviename: '功夫',
          actor:"史蒂芬.周",
          date:2007
          },
          {
            moviename: '少林足球',
            actor:"史蒂芬.周",
            date:2002
          },
        ],
        msg:"success"
      }
    }
  }

  
  