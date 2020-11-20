/*
 * @Author: 曹建勇
 * @Date: 2020-11-12 09:59:31
 * @LastEditors: 曹建勇
 * @LastEditTime: 2020-11-12 10:30:05
 * @Description: 
 * @FilePath: \v_client\src\api\account.js
 */
import request from '@/utils/request'
import { post } from '@/utils/post'

/**
 * 示例
*/
export function user_info(query) { // 个人信息 get
    return request({
        url: '/v1/user/user_info',
        method: 'get',
        params: query
    })
}
export function user_infoPOST(query) { // 个人信息 post
    return post('/v1/user/user_info', query)
}
