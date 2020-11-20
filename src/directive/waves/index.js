import waves from './waves'
import Vue from 'vue'
Vue.directive('waves', waves)
// Vue.directive('demo', {
//   bind: function(el, binding, vnode) {
//     var s = JSON.stringify
//     el.innerHTML =
//       'name: ' + s(binding.name) + '<br>' +
//       'value: ' + s(binding.value) + '<br>' +
//       'expression: ' + s(binding.expression) + '<br>' +
//       'argument: ' + s(binding.arg) + '<br>' +
//       'modifiers: ' + s(binding.modifiers) + '<br>' +
//       'vnode keys: ' + Object.keys(vnode).join(', ')
//   }
// })
// const install = function(Vue) {
//   Vue.directive('waves', waves)
// }

// if (window.Vue) {
//   window.waves = waves
//   Vue.use(install); // eslint-disable-line
// }

// waves.install = install
// export default waves
