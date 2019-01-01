


import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'


export function getSingerList(){
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })
    
    return jsonp(url, data, options)
}



// [  3-3 ]歌手数据的抓取
export function getSingerDetail(singerId) {//根据不同传入singerId抓取不同的数据（不同歌手的详情）
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({}, commonParams, {
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq',
      order: 'listen',
      begin: 0,
      num: 80,
      songstatus: 1,
    //   g_tk: 5381,
      g_tk: 1664029744,
      singermid: singerId
    })
  
    return jsonp(url, data, options)
}