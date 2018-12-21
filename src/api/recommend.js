


import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getRecommend(){ 
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  
    const data = Object.assign( {}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    return jsonp(url, data, options)
}


// //[    2-1.22   ]获取歌单数据
// export function getDiscList() {
//     const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

//     const data = Object.assign({}, commonParams, {
    //     g_tk: 1928093487,
//         platform: 'yqq',
//         hostUin: 0,
//         sin: 0,
//         ein: 29,
//         sortId: 5,
//         needNewCode: 0,
//         categoryId: 10000000,
//         rnd: Math.random(),
//     })
//     console.log(data)
//     return jsonp(url, data, options)
// }



 // [    2-1.23-3   ]
 import axios from 'axios'
export function getDiscList() {
    // const url = '/api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'  //[    2-1.23-2.1  方法二：跨域代理处理，用官方的代理 ]

    const url = '/api/getDiscList'  //方法一：调用自定义的接口

    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'    //使用的时axios,所以format使用的是json,不是jsonp
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data) //es6新语法，返回一个以给定值解析后的Promise对象
    })

}