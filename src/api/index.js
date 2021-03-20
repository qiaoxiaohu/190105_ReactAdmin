
import jsonp from 'jsonp'
import {message} from 'antd'
import ajax from './ajax'

/*
export function reqLogin(username, password) {
    return ajax('/login', {username, password}, 'POST')
}*/
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

/*export const reqWeather = (city) => {
    const url = `http://api.map.baidu.com/weather/v1/?district_id=${city}&output=json&data_type=all&ak=oP7NQpP3TWKR6WDBwltv9ZWc7A7HfegF`
    jsonp(url, {}, (err, data) => {
        console.log('jsonp()', err, data)
    })
}*/

export const reqCategorys = (parentId) => ajax('/manage/category/list',
    {parentId})

export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add',
    {categoryName, parentId}, 'POST')

export const reqUpdateCategory = ({categoryName, categoryId}) => ajax('/manage/category/update',
    {categoryName, categoryId}, 'POST')

export const reqCategory = (categoryId) => ajax('/manage/category/info', {categoryId})

export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize})

export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax('/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName
})

export const reqWeather = (city) => {

    return new Promise((resolve, reject) => {
        const url = `https://v0.yiketianqi.com/api?version=v61&appid=41277367&appsecret=iSaS9ixF&city=${city}`
        // 发送jsonp请求
        jsonp(url, {}, (err, data) => {
            console.log('jsonp()', err, data)
            // 如果成功了
            if (!err) {
                // 取出需要的数据
                const {wea_img, wea} = data
                resolve({wea_img, wea})
            } else {
                // 如果失败了
                message.error('获取天气信息失败!')
            }

        })
    })
}
// reqWeather('三门峡')
