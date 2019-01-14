
import {getLyric} from 'api/song' //[  3-26-1]
import {ERR_OK} from 'api/config'  //[  3-26-1]
import {Base64} from 'js-base64'  //[  3-26-1.2] 对抓取的数据进行编码/解码【安装 js-base64 第三库】

export default class Song {  
    constructor({id, mid, singer, name, album, duration, image, url}){
        this.id = id 
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration 
        this.image = image
        this.url = url      
    }
   
    // getLyric(){ //[  3-26-1.1] 歌词可以认为是song类的一个属性我们可以为我扩展一个方法
    //     getLyric(this.mid).then((res) => {
    //         if(res.retcode == ERR_OK ){
    //             // this.lyric = res.lyric
    //             this.lyric = Base64.decode(res.lyric) //[  3-26-1.2]  解码得到字符串
                
    //             console.log(this.lyric)
    //         }
    //     })
    // }

    getLyric(){  //  [  3-26-1.3  优化]减少getLyric的请求
        if(this.lyric){   //如果有lyric
            return Promise.resolve(this.lyric)
        }
        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                if(res.retcode == ERR_OK ){
                    this.lyric = Base64.decode(res.lyric) 
                    resolve(this.lyric)
                    // console.log(this.lyric)
                }else{
                    reject('no lyric')
                }
            })
        })   
    }
}


export function createSong(musicData, songVkey){
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval, //歌曲时长s
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`  
        //注意guid以实时数据为主
        url: `http://ws.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=${songVkey}&guid=6319873028&uin=0&fromtag=66`
   })
}
function filterSinger(singer){  
    let ret = []
    if(!singer){ 
        return ''
    }
    singer.forEach( (s) => {
        ret.push(s.name)
    } )
    return ret.join('/')
}
