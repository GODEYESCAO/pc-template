/*
 * @Author: your name
 * @Date: 2020-11-12 09:59:31
 * @LastEditTime: 2020-11-12 10:05:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \v_client\src\main.js
 */
import Vue from 'vue'
import 'babel-polyfill'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import App from './App'
import router from './router'
import store from './store'
import storeLocal from 'storejs'
import waves from '@/directive/waves/waves.js'

Vue.prototype.$storage = storeLocal

import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import $ from 'jquery'// 引入JQ

// 引入组件
import '@/utils/compoents'

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        if (to.path === '/' || to.path === '/index') {
            document.title = to.meta.title
        } else {
            document.title = to.meta.title ? `${to.meta.title}-Tospino 卜鸣集购` : `Tospino 卜鸣集购`
        }
    }
    next()
})

// 给按钮添加波纹效果
Vue.directive('waves', waves)

// 全局参数，方法
import globalMixins from '@/mixins/globalMixins'
Vue.mixin(globalMixins)

Vue.config.productionTip = false

// 自定义插件
import MyPlugin from '@/utils/MyPlugin'
Vue.use(MyPlugin)
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
