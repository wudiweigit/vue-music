<!-- <template>
    <div>
        歌手页面
    </div>
</template>


<script>

import {getSingerList} from 'api/singer'// [  2-1.29-1 ]
import {ERR_OK} from 'api/config.js'// [  2-1.29-1 ]

// [  2-1.29-2 ]
export default {
    data(){
        return {
            singers: []
        } 
    },
    created() {
        this._getSingerList()
    },
    methods: {
        _getSingerList(){
            getSingerList().then((res) => {
                if(res.code === ERR_OK){
                    this.singers = res.data.list
                    console.log(this.singers)
                }
            })
        }
    },
}

</script> -->


<template>
    <div class="singer">
            <!-- [  2-1.34-1 ] -->
        <list-view :data="singers"></list-view>
    </div>
</template>


<script>

import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config.js'
import Singer from 'common/js/singer'  // [  2-1.31-1 ]

import ListView from 'base/listview/listview'  //[  2-1.34 ]

const HOT_NAME = '热门' //[  2-1.30-1 ] 
const HOT_SINGER_LEN = 10  //[  2-1.30-1 ]将遍历list前10条数据定义为热门数据

export default {
    data(){
        return {
            singers: []
        } 
    },
    created() {
        this._getSingerList()
    },
    methods: {
        _getSingerList(){
            getSingerList().then((res) => {
                if(res.code === ERR_OK){
                    //this.singers = res.data.list
                    //console.log(this.singers)
                    //console.log(this._normalizeSinger(this.singers)) //[  2-1.31-2 ] [  2-1.32 ]
                    this.singers = this._normalizeSinger(res.data.list)   //[  2-1.34-2 ]
                }
                
            })
            
        },

        _normalizeSinger(list){// [  2-1.30 ] 由于控制台输出数据不符合我们的数据结构我们根据数据中提供的Findex进行聚合（把相同的归类在一起）
            let map = {
                hot: { //热门数据
                    title: HOT_NAME,
                    items: []
                }  
            }
            // list.forEach((item, index) => {//遍历list
            //     if(index < HOT_SINGER_LEN){
            //         map.hot.items.push({
            //             id: item.Fsinger_mid,
            //             name: item.Fsinger_name,
            //             avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
            //         })
            //     }
            //     const key = item.Findex  //查找Findex
            //     if(!map[key]){//map中没有map[key]我就创建一个map[key]
            //         map[key] = {
            //             title: key,
            //             items: []
            //         }
            //     }
            //    map[key].items.push({
            //         id: item.Fsinger_mid,
            //         name: item.Fsinger_name,
            //         avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150${item.Fsinger_mid}.jpg?max_age=2592000`
            //     })
            // })
            list.forEach((item, index) => {//遍历list
                if(index < HOT_SINGER_LEN){
                    map.hot.items.push(new Singer({// [  2-1.31-2 ]使用Singer类
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name,
                    }))
                }
                const key = item.Findex  //查找Findex
                if(!map[key]){//map中没有map[key]我就创建一个map[key]
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                 map[key].items.push(new Singer({// [  2-1.31-2 ]使用Singer类
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name,
                }))
            })
            //console.log(map) //[  2-1.31-2 ]


            //为得到有序列表我们需要处理map [  2-1.32 ]
            let hot = []
            let ret = []
            for(let key in map){
                let val = map[key]
                if(val.title.match(/[a-zA-Z]/)){//如果是一个字母
                    ret.push(val)
                }else if(val.title === HOT_NAME){//如果是一个标题
                    hot.push(val)
                }
            }
            ret.sort((a,b) => {//按字母升序排列
                return a.title.charCodeAt(0) -b.title.charCodeAt(0)
            }) 
            return hot.concat(ret)
        }
    },
    components: {
        ListView,
    }
}

</script>




<style scoped lang="stylus" rel="stylesheet/stylus">

.singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%

</style>