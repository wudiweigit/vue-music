// [  3-3.1-3 ]由于歌手/歌单详情以及排行榜（rank）都需要歌手数据（musicData）所以我们所需要提取我们需要的部份来构造成我们所需的数据对象进行封装
export default class Song {  //构建Song类【为什么设计成类而不设计成对象应为类可以把代码集中到一块来维护不需要在大量地方写相同代码，还有类的扩展性比对象要强很多】
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
}



//[  3-3.1-6 ]
export function createSong(musicData){//给Song扩展一个工厂方法（把musicData转化成Song实例如果用new的方式需要写一部分代码而且歌单和排行版都要写一部分代码）
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    })
}


function filterSinger(singer){  //由于singer是一个数组而我们需要的是一个字符串所以这里一次性把数据处理好
    let ret = []
    if(!singer){  //做边界处理
        return ''
    }
    singer.forEach( (s) => {
        ret.push(s.name)
    } )
    return ret.join('/')
}
