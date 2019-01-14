// [  3-26  歌词数据数据的获取]
import {commonParams} from './config'
import axois from 'axios'
export function getLyric(mid){  //mid歌曲的id
    const url = '/api/lyric'
    const data = Object.assign({}, commonParams, {
        songmid: mid,
        pcachetime: +new Date(), //当前时间戳
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        g_tk: 67232076, //会变化，以实时数据为准
        format: 'json'
    })
    return axois.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}


