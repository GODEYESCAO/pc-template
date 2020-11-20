/*
 * @Author: 曹建勇
 * @Date: 2020-11-12 09:59:31
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-11-20 17:07:09
 * @Description:
 * @FilePath: \v_client\src\utils\compoents.js
 */

import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

// 引入 图片预览
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)


// 将cancel,挂载到vue原型上
Vue.prototype.cancel = function () {
    // 获取缓存的 请求取消标识 数组，取消所有关联的请求
    const cancelArr = window.axiosCancel
    cancelArr.forEach((ele, index) => {
        ele.cancel('取消了请求') // 在失败函数中返回这里自定义的错误信息
        delete window.axiosCancel[index]
    })
}

// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '../static/goods_default.jpg',
    // loading: '../static/weixin.gif',
    loading: '../static/spaceusage.png',
    attempt: 1
})

Vue.use(Element, {
    size: 'small' // set element-ui default size
    // i18n: (key, value) => i18n.t(key, value)
})

// 给组件绑定一个或多个快捷键
import VueHotkey from 'v-hotkey'
Vue.use(VueHotkey, {
    'esc': 27, // esc
    'tab': 9, // tab
    'enter': 13 // 回车键
})
