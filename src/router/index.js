/*
 * @Author: your name
 * @Date: 2020-11-12 09:59:31
 * @LastEditTime: 2020-11-12 10:22:05
 * @LastEditors: 曹建勇
 * @Description: In User Settings Edit
 * @FilePath: \v_client\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/
/**
* hidden: true                  //当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
* alwaysShow: true              //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
                                //只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
                                //若你想不管路由下面的 children 声明的个数都显示你的根路由
                                //你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
* redirect: noredirect          //当设置 noredirect 的时候该路由在面包屑导航中不可被点击
* name:'router-name'            //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* meta : {
    roles: ['admin','editor']   //设置该路由进入的权限，支持多个权限叠加
    title: 'title'              //设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'            //设置该路由的图标
    noCache: true               //如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
  }
**/
// import redirect from '@/views/redirect/index'
// import homepage from '@/customerviews/homepage/layout'
// import logins from '@/views/login/index'
// import authredirect from '@/views/login/authredirect'
// import guide from '@/components/guide/index'
export const constantRouterMap = [
    {
        path: '/',
        component: () => import('@/views/index'),
        redirect: '/index',
        hidden: true,
        meta: { title: 'Tospino 卜鸣集购', noCache: true },
        children: [
            {
                path: '/index',
                component: () => import('@/views/index'),
                name: 'newHomePage',
                hidden: true,
                meta: { title: 'Tospino 卜鸣集购', noCache: true }
            }
        ]
    },
    {
        // name:"404",
        path: '/404',
        component: () => import('@/views/errorPage/404'),
        hidden: true
    },
    {
        // name:"401",
        path: '/401',
        // component: errorPage401,
        component: () => import('@/views/errorPage/401'),
        hidden: true
    },
    {
        path: '*', // 此处需特别注意置于最底部
        component: () => import('@/views/errorPage/404'),
        redirect: '/404'
    }

]

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    // mode: 'history',
    routes: constantRouterMap
})

export const asyncRouterMap = [
    {
        name: '404',
        path: '/404',
        // component: () => import('@/views/errorPage/404'),
        component: () => import('@/views/errorPage/404'),
        hidden: true
    },
    {
        name: '401',
        path: '/401',
        component: () => import('@/views/errorPage/401'),
        // component: errorPage401,
        hidden: true
    }
]
