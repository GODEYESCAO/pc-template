import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
import router from '@/router'
import storeLocal from 'storejs'

/**
 * @public post数据传输
 * @param  {url} 地址
 * @param  {data} 数据
 *
*/
export function post(url, data = {}) {
  const urls = process.env.BASE_API + '/api' + url
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: urls,
      data: qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + storeLocal.get('token')
      }
    }).then(res => {
      const resa = res.data
      if (Number(resa.error_code) === 0) {
        return resolve(resa)
      } else if (Number(resa.error_code) === 10001 || Number(resa.error_code) === 10000) {
        Message.error(resa.msg)
        storeLocal.clear()
        router.push('/login')
      } else {
        if (resa.msg !== '未到账，请稍后' && resa.msg !== '规格商品不存在.') {
          Message.error(resa.msg)
          resolve(resa)
        }
        resolve(resa)
      }
      resolve(resa)
    }).catch(err => {
      if (err.response) {
        const res = err.response.data
        if (router.history.current.path !== '/login') {
          Message.error(res.msg)
        }
        if (Number(res.error_code) === 10000) {
          Message.error(res.msg)
          storeLocal.clear()
          router.push('/login')
        } else if (Number(res.error_code) === 10001) {
          Message.error(res.msg)
          if (res.content.login_fail_count > 2) { // 输入密码超过4次时
            storeLocal.set('loginSet', true)
          }
        } else if (res.error_code === '1000' || res.error_code === 1000) { // 无权限
          Message.error('登录状态已失效！请重新登录')
          storeLocal.clear()
          router.push('/login')
        }
      }
      reject(err)
    })
  })
}
