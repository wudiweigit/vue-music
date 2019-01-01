
<template>
    <div class="singer">

        <!-- <list-view :data="singers" ></list-view> -->

        <!-- [  3-1.1-4 ] @select="selectSinger"-->
        <list-view :data="singers" @select="selectSinger"></list-view>
        <!-- [  3-1.1-1 ] -->
        <router-view></router-view>
    </div>
</template>


<script>

import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config.js'
import Singer from 'common/js/singer' 

import {mapMutations} from 'vuex'  //[  3-2.1  ] mapMutations是由vuex提供的语法糖来减少不必要的代码【对mutations做了一些封装】

import ListView from 'base/listview/listview'  

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10  
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
        selectSinger(singer){   //[  3-1.1-5 ]
            this.$router.push({
                path: `/singer/${singer.id}`
            })
            this.setSinger(singer)  //[  3-2.1-2  ] 
        },
        _getSingerList(){
            getSingerList().then((res) => {
                if(res.code === ERR_OK){

                    this.singers = this._normalizeSinger(res.data.list)   
                }
                
            })
            
        },

        _normalizeSinger(list){
            let map = {
                hot: { 
                    title: HOT_NAME,
                    items: []
                }  
            }

            list.forEach((item, index) => {
                if(index < HOT_SINGER_LEN){
                    map.hot.items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name,
                    }))
                }
                const key = item.Findex  
                if(!map[key]){
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                 map[key].items.push(new Singer({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name,
                }))
            })

            let hot = []
            let ret = []
            for(let key in map){
                let val = map[key]
                if(val.title.match(/[a-zA-Z]/)){
                    ret.push(val)
                }else if(val.title === HOT_NAME){
                    hot.push(val)
                }
            }
            ret.sort((a,b) => {
                return a.title.charCodeAt(0) -b.title.charCodeAt(0)
            }) 
            return hot.concat(ret)
        },

        ...mapMutations({ //[  3-2.1-1  ] 通过扩展运算符方式来掉mapMutations来做一个映射
            setSinger: 'SET_SINGER'  //把mutations的修改来映射成一个方法名
        })
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