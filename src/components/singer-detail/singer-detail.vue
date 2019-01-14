<template>

    <transition name="slider">

        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
    
</template>



<script>
import {mapGetters} from 'vuex' 
import {getSingerDetail, getMusic} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import  MusicList from '@/components/music-list/music-list'
 

export default {
    data(){
        return {
            songs: []   
        }
    },
    computed: {
        title(){ 
            return this.singer.name
        },
        bgImage(){
            return this.singer.avatar
        },

        ...mapGetters([
            'singer'
        ])
    },
    created(){
        this._getDetail()
        
    },
    methods: {
        _getDetail(){
            if(!this.singer.id){ 
                this.$router.push('/singer')
                return
            }
            getSingerDetail(this.singer.id).then((res) => {
            if(res.code === ERR_OK){
              
               this.songs = this._normallizeSongs(res.data.list)
               console.log(this.songs)
            }
         })
        },

        _normallizeSongs(list){
            let ret = []  
            list.forEach((item) => {
                let {musicData} = item 
                if(musicData.songid && musicData.albummid){  
                
                getMusic(musicData.songmid).then((res) => {
                    
                    if(res.code === ERR_OK){
                        
                        const svkey = res.data.items
                        const songVkey = svkey[0].vkey
                        const newSong = createSong(musicData, songVkey)
                        ret.push(newSong)
                    }
                })
                }
            })
            // console.log(ret)
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

.slider-enter-active, .slider-leave-acrive 
    transition: all 0.3s   
.slider-enter, .slider-leave-to   
    transform: translate3d(100%, 0, 0)  /* //100% 完全移动到屏幕右侧 动画开始后向左滑入*/


</style>