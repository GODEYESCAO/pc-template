/*
 * @Author: 曹建勇
 * @Date: 2020-11-12 09:59:31
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-11-12 10:22:39
 * @Description: 
 * @FilePath: \v_client\src\icons\index.js
 */
import Vue from 'vue'
// import SvgIcon from '@/components/SvgIcon'// svg组件

// register globally
// Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
