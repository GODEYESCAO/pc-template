import axios from 'axios'
import { Message } from 'element-ui'
import storeLocal from 'storejs'
import router from '@/router'

var CancelToken = axios.CancelToken
var source = CancelToken.source()
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API + '/api', // api 的 base_url
  timeout: 15000 // request timeout
})

window.axiosCancel = [] // 全局定义一个存放取消请求的标识
// request interceptor
service.interceptors.request.use(
  config => {
    // 添加取消标记
    config.cancelToken = new axios.CancelToken(cancel => {
      window.axiosCancel.push({
        cancel
      })
    })
    if (storeLocal.get('token')) {
      config.headers = {
        Authorization: 'Bearer ' + storeLocal.get('token')
      }
    } else {
      config.params = {
        cancelToken: source.token
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
source.cancel('不想请求了')
// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res && res.error_code === 0) {
      return Promise.resolve(res)
    } else {
      if (res.error_code === 10000 || res.error_code === 10001) {
        storeLocal.clear()
        router.push('login') // 全部进入登录页面重新登录
      }
      return res
    }
  },

  error => {
    const err = error.response
    if (err) {
      if (err.status === 500) {
        Message.error('请联系管理员处理该问题，抱歉给您带来的不便！')
      } else if (err.status === 404) {
        Message.error('服务器无该资源！')
      } else if (err.status === 403 || err.status === 401) {
        const cancelArr = window.axiosCancel
        cancelArr.forEach((ele, index) => {
          ele.cancel('取消了请求') // 在失败函数中返回这里自定义的错误信息
          delete window.axiosCancel[index]
        })
        storeLocal.clear()
        router.push('/login')
        // if (err.data.error_code == 10000) {
        //   // Message.error('您的请求是使用无效凭据进行的！')
        // }
      } else {
        const res = err.data
        if (res.error_code === '10000' || res.error_code === 10000) { // 需要登录
          storeLocal.clear()
          router.push('/login')
        } else if (res.error_code === '10001' || res.error_code === 10001) { // 用户名或密码错误
          Message.error(10001 + res.msg)
        } else if (res.error_code === '1000' || res.error_code === 1000) { // 无权限
          Message.error('登录状态已失效！请重新登录')
          storeLocal.clear()
          router.push('/login')
        }
        return res
      }
    }
    // else {
    //   Message.error('请联系管理员处理该问题，抱歉给您带来的不便！')
    // }
  }
)

export default service
