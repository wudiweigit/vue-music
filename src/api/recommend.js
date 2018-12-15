// // [  2-1.6   使用jsonp抓取真实的数据并封装些方法   ]

// import jsonp from 'common/js/jsonp'  // 引入jsonp 【 因为文件common下的js文件中的jsonp.js输出的方法使jsonp  {export default function jsonp (url, data, option){} 】

// export function getRecommend(){  //输出方法
//     const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
// }







import jsonp from 'common/js/jsonp'

import {commonParams, options} from './config'// [ 2-1.8 引入公共配置]

export function getRecommend(){ 
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    // [  2-1.8  通过E6中的方法Objest.assign()来读取公共配置]
    const data = Object.assign( {}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    return jsonp(url, data, options)
}
