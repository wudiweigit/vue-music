
<!-- [  3-1 ] -->
<!-- <template>
    <div class="singer-detail"></div>
</template> -->



<template>
    <!-- [  3-1.1-6 ] name="slider"-->
    <transition name="slider">

         
        <!-- <div class="singer-detail"></div> -->
        <!-- [  3-4.1  ] -->
        <!-- <music-list></music-list> -->
        <!-- [  3-4.1-1  ] :title="title" :bg-imsge="bgImage" :songs="songs" 传入3个数据-->
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
    
</template>



<script>
import {mapGetters} from 'vuex' //[  3-2.1-3  ]
import {getSingerDetail} from 'api/singer'//[  3-3.1 ]
import {ERR_OK} from 'api/config'//[  3-3.1 ]
import {createSong} from 'common/js/song'  //[  3-3.1-7 ]


import MusicList from 'components/music-list/music-list'   //[  3-4.1  ]

export default {
    data(){
        return {
            songs: []    //[  3-3.1-4 ]
        }
    },
    computed: {
        title(){   //[  3-4.1-1  ]
            return this.singer.name
        },
        bgImage(){  //[  3-4.1-1  ]
            return this.singer.avatar
        },

        ...mapGetters([ //[  3-2.1-4  ]
            'singer'
        ])
    },
    created(){
        this._getDetail()
        //console.log(this.singer)//[  3-2.1-4  ]
        
    },
    methods: {
        _getDetail(){
            if(!this.singer.id){ // [  3-3.1-2 ]如果在当前页面刷新是获取不到数据的所以我们让他回跳回去（这也是我们处理一些边界情况的常用手段）
                this.$router.push('/singer')
                return
            }
            getSingerDetail(this.singer.id)// [  3-3.1-1 ]
                .then( (res) => {
                    if(res.code === ERR_OK){
                        // console.log(res.data.list) // [  3-3.1-1 ]

                        this.songs = this._normailzeSongs(res.data.list)  //[  3-3.1-9 ]
                        console.log(this.songs)  //[  3-3.1-9 ]

                    }
                } )
        },

        _normailzeSongs(list){ //[  3-3.1-5 ]
            let ret = []
            list.forEach( (item) => {
                let {musicData} = item  //解构赋值

                if(musicData.songid && musicData.albummid){  //[  3-3.1-8 ]有这两个id我才去push，song的实例
                    ret.push(createSong(musicData))  //调用createSong创建Song实例之后才push，Song实例
                }
            } )
            return ret
        }
    },
    components: {
        MusicList,
    }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable";

/*  [  3-4.1  ] .singer-detail由于调用music-list组件所以这里样式注销 */
/* .singer-detail 
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background */
.slider-enter-active, .slider-leave-acrive /*  [  3-1.1-6 ] */
    transition: all 0.3s   
.slider-enter, .slider-leave-to  /*  [  3-1.1-6 ] */
    transform: translate3d(100%, 0, 0)  /* 从右向左滑的一个动画 */


</style>