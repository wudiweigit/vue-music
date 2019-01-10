
<!-- [  3-12.2 ] -->
<!-- <template>
    <div class="player">
        <div class="mormal-player">
            播放器
        </div>
        <div class="mini-player"></div>
    </div>
</template> -->


<!-- <template> -->
        <!-- [  3-12.2-4 ] v-show="playlist.length>0"   v-show="!fullScreen"-->
    <!-- <div class="player" v-show="playlist.length>0">
        <div class="normal-player" v-show="fullScreen">
            播放器
        </div>
        <div class="mini-player" v-show="!fullScreen"></div>
    </div>
</template> -->




<!-- [  3-13 ] -->
<!-- <template>
    <div class="player" v-show="playlist.length>0">
        <div class="normal-player" v-show="fullScreen">
            
            <div class="background">
                <img width="100%" height="100%">
            </div>
            <div class="top">
                <div class="back">
                    <i class="icon-back"></i>
                </div>
                <h1 class="title"></h1>
                <h2 class="subtitle"></h2>
            </div>
            <div class="middle">
                <div class="middle-l">
                    <div class="cd-wrapper">
                        <div class="cd">
                            <img class="image">
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="operators">
                    <div class="icon i-left">
                        <i class="icon-sequence"></i>
                    </div>
                    <div class="icon i-left">
                        <i class="icon-prev"></i>
                    </div>
                    <div class="icon i-center">
                        <i class="icon-play"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon-next"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon icon-not-favorite"></i>
                    </div>
                </div>
            </div>

        </div>
        <div class="mini-player" v-show="!fullScreen">
            <div class="icon">
                <img width="40" height="40">
            </div>
            <div class="text">
                <h2 class="name"></h2>
                <p class="desc"></p>
            </div>
            <div class="control"></div>
            <div class="control">
                <i class="icon-playlist"></i>
            </div>
        </div>
    </div>
</template> -->


<template>
    <div class="player" v-show="playlist.length>0">

            <!-- [  3-14 ] 动画<transition name="normal,mini">-->
            <!-- [  3-14-1 ]通过JS方式创建CSS动画要安装第三库（create-keyframe-animation）【播放器展开和收起的动画由Vue.js提供的JavaScript动画钩子再在其里面创建一个CSS3的animation】 @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave"
                    @after-leave="afterLeave"-->
        <transition name="normal"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave"
                    @after-leave="afterLeave"
        >
            <div class="normal-player" v-show="fullScreen">
                
                <div class="background">
                        <!-- [  3-13-1.1 ] :src="currentSong.image"-->
                    <img width="100%" height="100%" :src="currentSong.image">
                </div>
                <div class="top">
                        <!-- [  3-13-1.2 ] @click="back"-->
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <!-- [  3-13-1.1 ] v-html="currentSong.name" v-html="currentSong.singer"-->
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.singer"></h2>
                </div>
                <div class="middle">
                    <div class="middle-l">
                            <!--  [  3-14-1.3 ]  ref="cdWrapper"-->
                        <div class="cd-wrapper" ref="cdWrapper">

                            <!-- [  3-16 ] 给CD添加旋转效果:class="cdCls"-->
                            <div class="cd" :class="cdCls">
                                <!-- [  3-13-1.1 ] :src="currentSong.image"-->
                                
                                <img class="image" :src="currentSong.image">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-sequence"></i>
                        </div>

                        <!-- [  3-18-1.5 ] :class="disableCls"-->
                        <!-- <div class="icon i-left"> -->
                            <div class="icon i-left" :class="disableCls">

                            <!-- [  3-17 ]歌曲的前进后退功能【其实是改变当前播放的索引{currentIndex}】 @click="prev"-->
                            <!-- <i class="icon-prev"></i> -->
                            <i @click="prev" class="icon-prev"></i>
                        </div>
                        <div class="icon i-center" :class="disableCls">

                            <!-- [  3-15-1.2 ] @click="togglePlaying" 控制播放和暂停-->
                            <!-- <i class="icon-play"></i> -->
                            <!-- <i @click="togglePlaying" class="icon-play"></i> -->

                            <!-- [  3-15-1.8 ] -->
                            <i @click="togglePlaying" :class="playIcon"></i>

                        </div>
                        <div class="icon i-right" :class="disableCls">
                            <!-- [  3-17 ]歌曲的前进后退功能【其实是改变当前播放的索引{currentIndex}】 @click="next"-->
                            <!-- <i  class="icon-next"></i> -->
                            <i @click="next" class="icon-next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon icon-not-favorite"></i>
                        </div>
                    </div>
                </div>

            </div>
        </transition >

        <transition name="mini">
            <!-- [  3-13-1.6 ] @click="open"-->
            <div class="mini-player" v-show="!fullScreen" @click="open">

                
                <div class="icon">
                    <!-- [  3-13-1.1 ] :src="currentSong.image"--> <!-- [  3-16 ] 给CD添加旋转效果  :class="cdCls"-->
                    <img :class="cdCls" width="40" height="40" :src="currentSong.image">
                </div>
                <div class="text">
                    <!-- [  3-13-1.1 ] v-html="currentSong.name" v-html="currentSong.singer"-->
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">

                    <!-- [  3-15-1.10 ] <i @click="togglePlaying" :class="miniIcon"></i> 当点击时会进行弹层【因为子元素点击事件会冒泡到父元素上然而我们父元素也有点击事件打开我们的播放器使用.stop来阻止冒泡】-->
                    <!-- <i @click="togglePlaying" :class="miniIcon"></i> -->
                    <i @click.stop="togglePlaying" :class="miniIcon"></i>
                </div>
                <div class="control"> 
                    <i class="icon-playlist"></i>  
                </div>
            </div>
        </transition>
        <!-- [  3-18 ] 当我们快速切换歌曲时控制台会报错 【W3C提供了audio几个事件canplay/error并且提供一个标志位】 @canplay="ready" @error="error"-->

        <!-- [  3-15 ]  歌曲播放功能实现  :src="currentSong.url" ref="audio"-->
        <!-- <audio :src="currentSong.url" ref="audio"></audio> -->
        <audio :src="currentSong.url" ref="audio" @canplay="ready" @error="error"></audio>

    </div>
</template>


<script>
// import { mapGetters } from 'vuex'  //[  3-12.2-2 ]

import { mapGetters, mapMutations } from 'vuex'  //[  3-13-1.3]
import animations from 'create-keyframe-animation'   //[  3-14-1 ]
import {prefixStyle} from 'common/js/dom'   //[  3-14-1.4 ]
const transform = prefixStyle('transform')  //[  3-14-1.4 ]

export default {
    data(){
        return {
            songReady: false// [  3-18-1 ]
        }
    },
    computed: {
        ...mapGetters([  //[  3-12.2-3 ]
            'fullScreen',  // [  3-12.2-3 ]控制展开与收起
            'playlist',  // [  3-12.2-3 ]控制播放器的渲染
            'currentSong',// [  3-13-1 ]
            'playing',  //[  3-15-1.3 ] 这里的playing是映射到getters.js中的playing所以我们可以获取当前playing的状态 
            'currentIndex',   //[  3-17-1 ]
        ]),

        playIcon(){//[  3-15-1.7 ] 根据播放状态切换图标（样式）
            return this.playing ? 'icon-pause' : 'icon-play'
        },
        miniIcon(){ //[  3-15-1.9 ]
            return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
        },
        cdCls(){// [  3-16-1 ]
            return this.playing ? 'play' : 'play pause'
        }


    },
    methods: {
        back(){  
            this.setFullScreen(false)  //[  3-13-1.5 ] 点击关闭
        },
        open(){
            this.setFullScreen(true)  //[  3-13-1.7 ]
        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',//[  3-13-1.4 ]
            setPlayingState: 'SET_PLAYING_STATE',//[  3-15-1.4 ]这里会映射到mutations-types.js中的SET_PLAYING_STATE

            setCurrentIndex: 'SET_CURRENT_INDEX'   //[  3-17-1.1]
        }),

        _getPosAndScale() {// / [  3-14-1.1 ]封装函数获取初始位置和缩放的尺寸
            const targetWidth = 40//代表mini-player下的img宽度
            const paddingLeft = 40//代表mini-player下的img离左边的宽度
            const paddingBottom = 30//代表mini-player下的img离底部的高度
            const paddingTop = 80//代表middle下的img离顶部的高度
            const width = window.innerWidth * 0.8//代表middle下的img的宽度
            const scale = targetWidth / width//缩放比列
            const x = -(window.innerWidth / 2 - paddingLeft)
            const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
            return {
                x,
                y,
                scale
            }
        },

        enter(el, done) {// [  3-14-1.2 ]done其实是一个回调函数当执行时会自动跳到下一个钩子函数
            const {x, y, scale} = this._getPosAndScale()

            let animation = {
                0: {
                    transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
                },
                60: {
                    transform: `translate3d(0,0,0) scale(1.1)`
                },
                100: {
                    transform: `translate3d(0,0,0) scale(1)`
                }
            }

            animations.registerAnimation({//注册动画
                name: 'move',
                animation,
                presets: {//预设字段
                    duration: 400,
                    easing: 'linear'
                }
            })

            animations.runAnimation(this.$refs.cdWrapper, 'move', done)//运行动画
        },
        afterEnter() {//[  3-14-1.2 ]
            animations.unregisterAnimation('move')
            this.$refs.cdWrapper.style.animation = ''
        },


        leave(el, done) {//[  3-14-1.2 ]
            this.$refs.cdWrapper.style.transition = 'all 0.4s'
            const {x, y, scale} = this._getPosAndScale()//获取目标位置
            this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`

            this.$refs.cdWrapper.addEventListener('transitionend', done)//动画是否完成如果完成监听transitionend事件自动自行done
        },
        afterLeave() {//[  3-14-1.2 ]
            this.$refs.cdWrapper.style.transition = ''
            this.$refs.cdWrapper.style[transform] = ''
        },

        togglePlaying(){
            this.setPlayingState(!this.playing)//[  3-15-1.6 ]
        },


        next(){  
            if(!this.songReady){//[  3-18-1.2 ]如果songReady没有ready时我们就不让点
                return 
            }
            
            // [  3-17-1.2 ]
            let index = this.currentIndex + 1   
            if(index === this.playlist.length){ //如果播放最后一首置为第一首
                index = 0
            }
            this.setCurrentIndex(index)
            if(!this.playing){//当点击下一首歌时图标没有改变所以这里进行判断来切换图标的改变
                this.togglePlaying()
            }


            this.songReady = false  //[  3-18-1.3 ]点了以后将其置为false
        },
        prev(){// [  3-17-1.2 ]
            
            if(!this.songReady){//[  3-18-1.2 ]如果songReady没有ready时我们就不让点
                return 
            }

            
            let index = this.currentIndex - 1
            if(index === -1){    //表示第一首歌往前退
                index = this.playlist.length - 1
            }
            this.setCurrentIndex(index)
            if(!this.playing){
                this.togglePlaying()
            }

            this.songReady = false  //[  3-18-1.3 ]点了以后将其置为false


        },
        ready(){ //[  3-18-1.1 ]
            this.songReady = true
        },
        // error() {
        // },
        error() {// [  3-18-1.4 ]处理网络错误和加载失败
            this.songReady = true
        },
        disableCls(){// [  3-18-1.5 ]处理网络错误和加载失败来添加样式
            return this.songReady ? '' : 'disable'
        }
    },

    watch: {
        currentSong(){//当currentSong发生改变时去调用（如何让它播放要调用auto提供拍的play方法）
            // this.$refs.audio.play() //[  3-15-1 ]// 这里会出现报错因为我们在调用play()时同时请求src这时我们的DOM并没有渲染所以我们要等渲染完成后再调play()【这里给一个延迟】
            this.$nextTick(( ) =>{//[  3-15-1.1 ]
                this.$refs.audio.play()
            })  
        },
        playing(newPlaying){  //[  3-15-1.5 ] 获取当前的状态  这两个都是audio实例的方法play/pause()
            const audio = this.$refs.audio
            this.$nextTick(( ) =>{
                newPlaying ? audio.play() : audio.pause()
            }) 
           
        }
    },


}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable";
@import "~common/stylus/mixin";

.player
    .normal-player
        position: fixed
        left: 0
        right: 0
        top: 0
        bottom: 0
        z-index: 150
        background: $color-background
        .background
            position: absolute
            left: 0
            top: 0
            width: 100%
            height: 100%
            z-index: -1
            opacity: 0.6
            filter: blur(20px)
        .top
            position: relative
            margin-bottom: 25px
            .back
                position absolute
                top: 0
                left: 6px
                z-index: 50
                .icon-back
                    display: block
                    padding: 9px
                    font-size: $font-size-large-x
                    color: $color-theme
                    transform: rotate(-90deg)
            .title
                width: 70%
                margin: 0 auto
                line-height: 40px
                text-align: center
                no-wrap()
                font-size: $font-size-large
                color: $color-text
            .subtitle
                line-height: 20px
                text-align: center
                font-size: $font-size-medium
                color: $color-text
        .middle
            position: fixed
            width: 100%
            top: 80px
            bottom: 170px
            white-space: nowrap
            font-size: 0
            .middle-l
                display: inline-block
                vertical-align: top
                position: relative
                width: 100%
                height: 0
                padding-top: 80%
                .cd-wrapper
                    position: absolute
                    left: 10%
                    top: 0
                    width: 80%
                    height: 100%
                    .cd
                        width: 100%
                        height: 100%
                        box-sizing: border-box
                        border: 10px solid rgba(255, 255, 255, 0.1)
                        border-radius: 50%
                        &.play
                            animation: rotate 20s linear infinite   /* CD旋转的样式 */
                        &.pause
                            animation-play-state: paused
                        .image
                            position: absolute
                            left: 0
                            top: 0
                            width: 100%
                            height: 100%
                            border-radius: 50%

                .playing-lyric-wrapper
                    width: 80%
                    margin: 30px auto 0 auto
                    overflow: hidden
                    text-align: center
                    .playing-lyric
                        height: 20px
                        line-height: 20px
                        font-size: $font-size-medium
                        color: $color-text-l
            .middle-r
                display: inline-block
                vertical-align: top
                width: 100%
                height: 100%
                overflow: hidden
                .lyric-wrapper
                    width: 80%
                    margin: 0 auto
                    overflow: hidden
                    text-align: center
                    .text
                        line-height: 32px
                        color: $color-text-l
                        font-size: $font-size-medium
                        &.current
                            color: $color-text
        .bottom
            position: absolute
            bottom: 50px
            width: 100%
            .dot-wrapper
                text-align: center
                font-size: 0
                .dot
                    display: inline-block
                    vertical-align: middle
                    margin: 0 4px
                    width: 8px
                    height: 8px
                    border-radius: 50%
                    background: $color-text-l
                    &.active
                        width: 20px
                        border-radius: 5px
                        background: $color-text-ll
            .progress-wrapper
                display: flex
                align-items: center
                width: 80%
                margin: 0px auto
                padding: 10px 0
                .time
                    color: $color-text
                    font-size: $font-size-small
                    flex: 0 0 30px
                    line-height: 30px
                    width: 30px
                    &.time-l
                        text-align: left
                    &.time-r
                        text-align: right
                .progress-bar-wrapper
                    flex: 1
            .operators
                display: flex
                align-items: center
                .icon
                    flex: 1
                    color: $color-theme
                    &.disable
                        color: $color-theme-d
                    i
                        font-size: 30px
                .i-left
                    text-align: right
                .i-center
                    padding: 0 20px
                    text-align: center
                    i
                        font-size: 40px
                .i-right
                    text-align: left
                .icon-favorite
                    color: $color-sub-theme
        &.normal-enter-active, &.normal-leave-active
            transition: all 0.4s
            .top, .bottom
                transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        &.normal-enter, &.normal-leave-to
            opacity: 0
            .top
                transform: translate3d(0, -100px, 0)
            .bottom
                transform: translate3d(0, 100px, 0)       
    .mini-player
        display: flex
        align-items: center
        position: fixed
        left: 0
        bottom: 0
        z-index: 180
        width: 100%
        height: 60px
        background: $color-highlight-background
        &.mini-enter-active, &.mini-leave-active
            transition: all 0.4s
        &.mini-enter, &.mini-leave-to
            opacity: 0
        .icon
            flex: 0 0 40px
            width: 40px
            padding: 0 10px 0 20px
            img
                border-radius: 50%
                &.play
                    animation: rotate 10s linear infinite
                &.pause
                    animation-play-state: paused
        .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            .name
                margin-bottom: 2px
                no-wrap()
                font-size: $font-size-medium
                color: $color-text
            .desc
                no-wrap()
                font-size: $font-size-small
                color: $color-text-d
        .control
            flex: 0 0 30px
            width: 30px
            padding: 0 10px
            .icon-play-mini, .icon-pause-mini, .icon-playlist
                font-size: 30px
                color: $color-theme-d
            .icon-mini
                font-size: 32px
                position: absolute
                left: 0
                top: 0

@keyframes rotate  /* CD旋转的样式 */
    0%
        transform: rotate(0)
    100%
        transform: rotate(360deg)
</style>