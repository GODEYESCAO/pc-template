/*
 * @Author: your name
 * @Date: 2020-11-12 09:59:31
 * @LastEditTime: 2020-11-12 10:07:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \v_client\src\permission.js
 */
import router from './router'
import NProgress from 'nprogress' // 进度条（用于加载）
import 'nprogress/nprogress.css'// progress bar style
NProgress.configure({ showSpinner: false })// NProgress Configuration

router.beforeEach((to, from, next) => { // 在路由加载前的判断
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})
