/*
 * @Author: 曹建勇
 * @Date: 2020-11-12 09:59:31
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-11-12 10:33:32
 * @Description: 
 * @FilePath: \v_client\src\store\modules\user.js
 */
import storeLocal from 'storejs'
import { MessageBox } from 'element-ui'
import router from '@/router'

const user = {
    state: {
        token: '', // token
        user_id: '', // 用户id
        name: '', // 用户名称
        avatar: '', // 用户头像
        phone: '', // 用户电话
        department: '', // 用户部门
        roles: [],
        cartNumber: '', // 购物车数量
        messageNumber: '' // 购物车数量
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_NUMBER: (state, number) => {
            state.cartNumber = number
        },
        SET_messageNumber: (state, number) => {
            state.messageNumber = number
        },
        SET_PHONE: (state, phone) => {
            state.phone = phone
        },
        SET_DEPARTMENT: (state, department) => {
            state.department = department
        },
        SET_USERID: (state, user_id) => {
            state.user_id = user_id
        }
    },

    actions: {
        // 示例
        loginToken({ commit }, userInfo) {
            if (userInfo.account) {
                userInfo.account = userInfo.account.trim()
            }
            return new Promise((resolve, reject) => {

            })
        },


    }
}

export default user
