<!--[  3-4  ] 由于歌手/歌单详情以及排行榜（rank）都有相同的结构所以创建个y业务组件 -->


<template>
    <div class="music-list">
        <div class="back">
            <i class="icon-back"></i>
        </div>
        <!-- [  3-4-1.2  ] v-html="title" 由于数据里面有些字符所以用v-html转义字符指令  :style="bgStyle"-->
        <!-- <h1 class="title"></h1> -->
        <h1 class="title" v-html="title"></h1>
        <!-- <div class="bg-image"> -->   <!-- [  3-5.3  ] ref="bgImage" -->
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <!-- [   3-8  ] -->
            <!-- <div class="filter"></div> -->
            <div class="filter" ref="filter"></div>
        </div>


        <!-- [  3-5.3-1  ] 要让列表和它的底也一起向上滚动首先要注释掉overflow:hidden并且在添加层（bg-layer）当我们滚动时来操作该层的transform的外向的偏移让其随着一起滚动那因此我们要监听其滚动的距离-->
        <div class="bg-layer" ref="layer"></div>


        <!-- [  3-5.2   ] --> <!-- [  3-5.3  ] ref="list" --> <!-- [  3-5.3-3  ] :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll"-->
        <scroll :data="songs" class="list" ref="list" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll"> <!-- 为计算高度将songs作为data传进去  -->
            <div class="song-list-wrapper">
                <song-list :songs="songs"></song-list>
            </div>
        
        </scroll>
    </div>
</template>


<!-- <script>
import Scroll from 'base/scroll/scroll'  //[  3-5.2   ]
import SongList from 'base/song-list/song-list'  //[  3-5.2   ]

const RESERVED_HEIGHT = 40  //  [3-5.3-8]标题高度

export default {
    props: {  // [  3-4-1  ]
        bgImage: {//背景图
            type: String,
            default:''
        },
        songs: {
            type: Array,
            default: '',
        },
        title: {//标题
            type: String,
            default: ''
        }
    },
    data(){
        return {
            scrollY: 0//[  3-5.3-5  ]
        }
    },
    computed: {
        bgStyle() { //[  3-4-1.2-1  ]
            return `background-image:url(${this.bgImage})`
        }

    },
    mounted() {
        this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`   //[  3-5.3  ]它的top等于背景图的高度 【由于不同浏览器大小背景图所占的高度是不一样所以组件的top值不对但是可以通过计算而来】
        
        this.imageHeight = this.$refs.bgImage.clientHeight // [3-5.3-9] 缓存高度减少DOM操作
        this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT // [3-5.3-9] 计入最小滚动高度

    },
    created() {
        this.probeType = 3  //[  3-5.3-2  ]created时为其添加属性
        this.listenScroll = true   //[  3-5.3-2  ]created时为其添加属性
    },
    methods: {
        scroll(pos){//[  3-5.3-6  ]
            this.scrollY = pos.y
        }
    },
    watch: {
        scrollY(newY){
            // this.$refs.layer.style['transform'] = `translate3d(0, ${newY}px, 0)`//[  3-5.3-7  ]设置bg-layer的滚动【h获取layer并设置transform】
            // this.$refs.layer.style['webkitTransform'] = `translate3d(0, ${newY}px, 0)` //[  3-5.3-7  ]



            //[3-5.3-10]  完成3-5.3-7步骤后出现个问题：bg-layer的高度所以我们要设置当bg-layer滚动到标题下方是就不滚动了
            let translateY = Math.max(this.minTranslateY, newY)// 设置个最大的滚动距离
            this.$refs.layer.style['transform'] = `translate3d(0, ${translateY}px, 0)`
            this.$refs.layer.style['webkitTransform'] = `translate3d(0, ${translateY}px, 0)`


            let zIndex = 0   //[   3-6  ]当我们滚动时文字会遮住图片==>通过改变zIndex来改变
            if(newY < this.minTranslateY){  //  [   3-6.1  ]如果滚到顶部设置为10
                zIndex = 10
                this.$refs.bgImage.style.paddingTop = 0
                this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`

            }else {  //还没滚到顶部进行重置
                this.$refs.bgImage.style.paddingTop = '70%'
                this.$refs.bgImage.style.height = 0
            }
            

            let scale = 1   //[   3-7  ]当我们向下拉列表时背景图片图片有个放大缩小的效果
            let blur = 0 //[   3-8  ]  向上滑石背景图片有个高斯模糊的效果
            const percent = Math.abs(newY / this.imageHeight)  //[   3-7  ]往下拉时计算比例
            if(newY > 0){   //[   3-7.1  ] 向下拉
                scale = 1 + percent
                zIndex = 10   //[   3-7.1-1  ] 
            }else{
                blur = Math.min(20 * percent, 20)  //[   3-8  ]
            }

            this.$refs.bgImage.style['transform'] = `scale(${scale})`    //[   3-7.1  ]
            this.$refs.bgImage.style['webkitTransform'] = `scale(${scale})`   //[   3-7.1  ]

            this.$refs.filter.style['backdrop-filter'] = `scale(${blur})`    //[   3-8  ]
            this.$refs.filter.style['webkitBackdrop-filter'] = `scale(${blur})`   //[   3-8  ]


            this.$refs.bgImage.style.zIndex = zIndex  //[   3-6.1  ]
        }
    },

    components: {
        Scroll,   //[  3-5.2   ]
        SongList,  //[  3-5.2   ]
    }
}
</script> -->



<script>
import Scroll from 'base/scroll/scroll' 
import SongList from 'base/song-list/song-list'  
import {prefixStyle} from 'common/js/dom'   // [ 3-9.1 ]

const RESERVED_HEIGHT = 40  
const transform = prefixStyle('transform')   // [ 3-9.1 ]
const backdrop = prefixStyle('backdrop-filter')   // [ 3-9.1 ]

export default {
    props: {  
        bgImage: {
            type: String,
            default:''
        },
        songs: {
            type: Array,
            default: '',
        },
        title: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            scrollY: 0
        }
    },
    computed: {
        bgStyle() { 
            return `background-image:url(${this.bgImage})`
        }

    },
    mounted() {
        this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
        
        this.imageHeight = this.$refs.bgImage.clientHeight 
        this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    },
    created() {
        this.probeType = 3 
        this.listenScroll = true 
    },
    methods: {
        scroll(pos){
            this.scrollY = pos.y
        }
    },
    watch: {
        scrollY(newY){
           
            let translateY = Math.max(this.minTranslateY, newY)
            this.$refs.layer.style['transform'] = `translate3d(0, ${translateY}px, 0)`
            this.$refs.layer.style['webkitTransform'] = `translate3d(0, ${translateY}px, 0)`


            let zIndex = 0 
            if(newY < this.minTranslateY){ 
                zIndex = 10
                this.$refs.bgImage.style.paddingTop = 0
                this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`

            }else {
                this.$refs.bgImage.style.paddingTop = '70%'
                this.$refs.bgImage.style.height = 0
            }
            

            let scale = 1   
            let blur = 0
            const percent = Math.abs(newY / this.imageHeight)
            if(newY > 0){ 
                scale = 1 + percent
                zIndex = 10 
            }else{
                blur = Math.min(20 * percent, 20) 
            }


            this.$refs.bgImage.style['transform'] = `scale(${scale})` // [ 3-9.1 ]
            // this.$refs.bgImage.style['webkitTransform'] = `scale(${scale})` 

            // this.$refs.filter.style['backdrop-filter'] = `scale(${blur})` 
            // this.$refs.filter.style['webkitBackdrop-filter'] = `scale(${blur})`

            
            this.$refs.filter.style['backdrop'] = `scale(${blur})` // [ 3-9.1 ]
            // this.$refs.filter.style['webkitBackdrop-filter'] = `scale(${blur})`

            this.$refs.bgImage.style.zIndex = zIndex 
        }
    },

    components: {
        Scroll, 
        SongList, 
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable";
    @import "~common/stylus/mixin";
  
    .music-list
        position: fixed
        z-index: 100
        top: 0
        left: 0
        bottom: 0
        right: 0
        background: $color-background
        .back
            position absolute
            top: 0
            left: 6px
            z-index: 50
            .icon-back
                display: block
                padding: 10px
                font-size: $font-size-large-x
                color: $color-theme
        .title
            position: absolute
            top: 0
            left: 10%
            z-index: 40
            width: 80%
            no-wrap()
            text-align: center
            line-height: 40px
            font-size: $font-size-large
            color: $color-text
        .bg-image
            position: relative
            width: 100%
            height: 0
            padding-top: 70%
            transform-origin: top
            background-size: cover
            .play-wrapper
                position: absolute
                bottom: 20px
                z-index: 50
                width: 100%
                .play
                    box-sizing: border-box
                    width: 135px
                    padding: 7px 0
                    margin: 0 auto
                    text-align: center
                    border: 1px solid $color-theme
                    color: $color-theme
                    border-radius: 100px
                    font-size: 0
                    .icon-play
                        display: inline-block
                        vertical-align: middle
                        margin-right: 6px
                        font-size: $font-size-medium-x
                    .text
                        display: inline-block
                        vertical-align: middle
                        font-size: $font-size-small
            .filter
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                background: rgba(7, 17, 27, 0.4)
        .bg-layer
            position: relative
            height: 100%
            background: $color-background
        .list
            position: fixed
            top: 0
            bottom: 0
            width: 100%
            /* overflow: hidden */
            background: $color-background
            .song-list-wrapper
                padding: 20px 30px
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>