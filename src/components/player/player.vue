
<template>
    <div class="player" v-show="playlist.length>0">
        <transition name="normal"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave"
                    @after-leave="afterLeave"
        >
            <div class="normal-player" v-show="fullScreen"> 
                <div class="background">
                    <img width="100%" height="100%" :src="currentSong.image">
                </div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.singer"></h2>
                </div>

                <!-- [ 3-26-1.16-3] @touchstart.prevent
                    @touchmove.prevent
                    @touchend.prevent-->
                <div class="middle" 
                    @touchstart.prevent="middleTouchStart"
                    @touchmove.prevent="middleTouchMove"
                    @touchend.prevent="middleTouchEnd"
                >
                    <!-- [ 3-26-1.16-5.3] ref="middleL"-->
                    <div class="middle-l" ref="middleL">    
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd" :class="cdCls">
                                <img class="image" :src="currentSong.image">
                            </div>
                        </div>

                        <!-- [ 3-28] 添加DOM结构-->
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric">{{playingLyric}}</div>
                        </div>
                    </div>
                

                    <!-- [ 3-26-1.8 ] DOM结构-->
                    <!-- [ 3-26-1.14 让歌词能滚动] <scroll> {:data="currentLyric && currentLyric.lines" 表示不为null时才传入scroll组件} -->

                    <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
                    <!-- <div class="middle-r" ref="lyricList"> -->
                    
                        <div class="lyric-wrapper">
                        <div v-if="currentLyric">

                                <!-- [ 3-26-1.13 ] :class="{'current':currentLineNum===index}"   index 高亮效果-->

                                <!-- <p ref="lyricLine"  class="text" v-for="line in currentLyric.lines">{{line.txt}}</p> -->
                                <p ref="lyricLine" :class="{'current':currentLineNum===index}" class="text" v-for="(line, index) in currentLyric.lines">{{line.txt}}</p>
                        </div>
                        </div>
                    <!-- </div>     -->
                    </scroll>    
                </div>
                



                <div class="bottom">
                    <!-- [ 3-26-1.16 歌词和唱片页面左右切换的效果] DOM结构-->
                    <div class="dot-wrapper">
                        <!-- [ 3-26-1.16-2] -->
                        <!-- <span class="dot"></span>
                        <span class="dot"></span> -->
                        <span class="dot" :class="{'active':currentShow==='cd'}"></span>
                        <span class="dot" :class="{'active':currentShow==='lyric'}"></span> 
                    </div>



                    <div class="progress-wrapper"> 
                        <span class="time time-l">{{format(currentTime)}}</span>
                        <div class="progress-bar-wrapper"> 
                            <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
                        </div>
                        <span class="time time-r">{{format(currentSong.duration)}}</span>
                    </div>
                    <div class="operators">                 
                        <div class="icon i-left" @click="changeMode">
                            <i :class="iconMode"></i>
                        </div>
                        <div class="icon i-left" :class="disableCls">
                            <i @click="prev" class="icon-prev"></i>
                        </div>
                        <div class="icon i-center" :class="disableCls">
                            <i @click="togglePlaying" :class="playIcon"></i>
                        </div>
                        <div class="icon i-right" :class="disableCls">
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
     
            <div class="mini-player" v-show="!fullScreen" @click="open">

                
                <div class="icon">
          
                    <img :class="cdCls" width="40" height="40" :src="currentSong.image">
                </div>
                <div class="text">
                  
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">
   
                    <progress-circle :radius="radius" :percent="percent">
                        <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
                    </progress-circle>

                    
                </div>
                <div class="control"> 
                    <i class="icon-playlist"></i>  
                </div>
            </div>
        </transition>
        
        <audio :src="currentSong.url" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>

    </div>
</template>


<script>


import { mapGetters, mapMutations } from 'vuex'  
import animations from 'create-keyframe-animation'  
import {prefixStyle} from 'common/js/dom'   
const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')  //[ 3-26-1.16-5.1] 

import ProgressBar from 'base/progress-bar/progress-bar' 
import ProgressCircle from 'base/progress-circle/progress-circle'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import Lyric from 'lyric-parser'// [  3-26-1.4  npm install lyric-parser] 对解码后的字符串解析成我们可以使用的数据结构
import Scroll from 'base/scroll/scroll'   //[ 3-26-1.14 ]

export default {
    data(){
        return {
            songReady: false,
            currentTime: 0, 
            radius: 32,
            currentLyric: null,  //[ 3-26-1.5 ]
            currentLineNum: 0,   //[ 3-26-1.10 ] 当前歌词所在行
            currentShow: 'cd',// [ 3-26-1.16-1]  当前显示哪个页面
            playingLyric: ''  //  [ 3-28-1]
        }
    },
    components: {
        ProgressBar, 
        ProgressCircle,
        Scroll,  //[ 3-26-1.14 ]
    },
    computed: {
        ...mapGetters([  
            'fullScreen',  
            'playlist', 
            'currentSong',
            'playing',  
            'currentIndex',
            'mode',
            'sequenceList',
        ]),

        playIcon(){
            return this.playing ? 'icon-pause' : 'icon-play'
        },
        miniIcon(){
            return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
        },
        cdCls(){
            return this.playing ? 'play' : 'play pause'
        },

        percent(){
            return this.currentTime / this.currentSong.duration
        },

        iconMode(){ 
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'  
        }
 

    },
    methods: {
        back(){  
            this.setFullScreen(false)  
        },
        open(){
            this.setFullScreen(true) 
        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlayingState: 'SET_PLAYING_STATE',

            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlaylist: 'SET_PLAYLIST',
        }),

        _getPosAndScale() {
            const targetWidth = 40
            const paddingLeft = 40
            const paddingBottom = 30
            const paddingTop = 80
            const width = window.innerWidth * 0.8
            const scale = targetWidth / width
            const x = -(window.innerWidth / 2 - paddingLeft)
            const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
            return {
                x,
                y,
                scale
            }
        },

        enter(el, done) {
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

            animations.registerAnimation({
                name: 'move',
                animation,
                presets: {
                    duration: 400,
                    easing: 'linear'
                }
            })

            animations.runAnimation(this.$refs.cdWrapper, 'move', done)
        },
        afterEnter() {
            animations.unregisterAnimation('move')
            this.$refs.cdWrapper.style.animation = ''
        },


        leave(el, done) {
            this.$refs.cdWrapper.style.transition = 'all 0.4s'
            const {x, y, scale} = this._getPosAndScale()
            this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`

            this.$refs.cdWrapper.addEventListener('transitionend', done)
        },
        afterLeave() {
            this.$refs.cdWrapper.style.transition = ''
            this.$refs.cdWrapper.style[transform] = ''
        },

        togglePlaying(){
            if (!this.songReady) {
                return
            }
            this.setPlayingState(!this.playing)

            if (this.currentLyric) {// [ 3-37-1 ]解决当我们暂停歌曲时歌词也跟着暂停
                this.currentLyric.togglePlay()
            } 
            
        },
// [ 3-37-2 ]解决当将歌曲切到循环播放时让其歌曲回到原来的初始位置

        next(){  
            if(!this.songReady){
                return 
            }

            // let index = this.currentIndex + 1   
            // if(index === this.playlist.length){ 
            //     index = 0
            // }

            if(this.playlist.length === 1){  
                this.loop() //[ 3-29-1 考虑些异常情况] 解决如果歌曲列表只有一条数据的问题
            }else{
                let index = this.currentIndex + 1   
                if(index === this.playlist.length){ 
                   index = 0
                }
            }
            
            this.setCurrentIndex(index)
            if(!this.playing){
                this.togglePlaying()
            }

            this.songReady = false 
        },
        prev(){
            if(!this.songReady){
                return 
            }
            // let index = this.currentIndex - 1
            // if(index === -1){   
            //     index = this.playlist.length - 1
            // }
            // this.setCurrentIndex(index)
            // if(!this.playing){
            //     this.togglePlaying()
            // }

            if(this.playlist.length === 1){ 
                this.loop()  // [ 3-29-1 考虑些异常情况] 解决如果歌曲列表只有一条数据的问题
            }else{
                let index = this.currentIndex - 1
                if(index === -1){   
                    index = this.playlist.length - 1
                }
                this.setCurrentIndex(index)
                if(!this.playing){
                    this.togglePlaying()
                }
            }

            this.songReady = false  

        },
        ready(){
            this.songReady = true
        },

        error() {
            this.songReady = true
        },
        disableCls(){
            return this.songReady ? '' : 'disable'
        },

        updateTime(e){
            this.currentTime = e.target.currentTime
        },
        
        format(interval){
            interval = interval | 0
            const minute = interval/60 | 0
           
            const second = this._pad(interval % 60 )  
            return `${minute}:${second}`
        },
        _pad(num, n = 2){ 
            let len = num.toString().length  
            while(len < n){
                num = '0' + num
                len++
            }
            return num
        },
        
        onProgressBarChange(percent) {
            // this.$refs.audio.currentTime = this.currentSong.duration * percent

            const currentTime = this.currentSong.duration * percent  //  [ 3-27-1  ]解决滑动进度条歌词也跟着跳动
            this.$refs.audio.currentTime = currentTime   //  [ 3-27-1  ]
            if(!this.playing){
                this.togglePlaying()
            }

            if(this.currentLyric){  //  [ 3-27-1  ]
                this.currentLyric.seek(currentTime * 1000)
            }
        },

        changeMode(){ 
            const mode = (this.mode + 1) % 3

            this.setPlayMode(mode) 
            let list = null 
            if(mode === playMode.random){ 
                list = shuffle(this.sequenceList)
            }else{  
                list = this.sequenceList
            }
            this.setPlaylist(list)
            this.resetCurrentIndex(list) 
        },
        
        resetCurrentIndex(list){ 
            let index = list.findIndex((item) => { 
                return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
        },
        
        end(){// [ 3-24-1 ]
            if(this.mode === playMode.loop){ 
                this.loop()
            }else { 
                this.next() 
            }
            
        },
        loop(){
            this.$refs.audio.currentTime = 0
            this.$refs.audio.play()
            
            if(this.currentLyric){// [  3-27-2  ]  解决当暂停歌曲时切换成循环模式并移动进度条到末尾歌词重新回到初始位置  (调用currentLyric提供的seek方法)
                this.currentLyric.seek(0)
            }

        },

        // getLyric(){  //[ 3-26-1.6 ]  获取歌词
        //     this.currentSong.getLyric().then((lyric) => {
        //         // this.currentLyric = new Lyric(lyric)

        //         this.currentLyric = new Lyric(lyric, this.handleLyric)  //[ 3-26-1.12 ] 初始化时传个回调函数this.handleLyric

        //         if(this.playing){  // [ 3-26-1.9 ]如果歌曲在播放执行下面操作
        //             this.currentLyric.play()
        //         }
        //         console.log(this.currentLyric)
        //     })
        // },

        getLyric(){  
            this.currentSong.getLyric().then((lyric) => {
                this.currentLyric = new Lyric(lyric, this.handleLyric)
                if(this.playing){  
                    this.currentLyric.play()
                }
            }).catch(() => {   //[ 3-29 考虑些异常情况]  getLyric获取不到歌词要做些清理操作
                this.currentLyric = null
                this.playingLyric = ''
                this.currentLineNum = 0
            })
        },

        
        handleLyric({lineNum, txt}){  //[ 3-26-1.11 ]当我们歌词每一行发生改变时执行
            this.currentLineNum = lineNum
            
            if (lineNum > 5) {// [ 3-26-1.15 ]
                let lineEl = this.$refs.lyricLine[lineNum - 5]
                this.$refs.lyricList.scrollToElement(lineEl, 1000)
            } else {
                this.$refs.lyricList.scrollTo(0, 0, 1000) //在5行之内直接滚动到顶部
            }

            this.playingLyric = txt  //  [ 3-28-2]
        },
        
        middleTouchStart(e) {  // [ 3-26-1.16-4]
            this.touch.initiated = true//设置标志位
            const touch = e.touches[0]
            this.touch.startX = touch.pageX//计入X坐标
            this.touch.startY = touch.pageY//计入Y坐标
        },

        middleTouchMove(e) {// [ 3-26-1.16-4]
            if (!this.touch.initiated) {
            return
            }
            const touch = e.touches[0]
            const deltaX = touch.pageX - this.touch.startX
            const deltaY = touch.pageY - this.touch.startY
            if (Math.abs(deltaY) > Math.abs(deltaX)) {//纵轴方向滚动的偏差绝对值大于横轴方向滚动的偏差绝对值什么都不做
                return
            }
            const left = this.currentShow === 'cd' ? 0 : -window.innerWidth   // 0:默认起始位置 -widow.innerWidth:-屏幕宽度

            const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))  //width是一个0到负值之间的数
            this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`   //lyricList实际上是个scroll组件他是个Vue组件是没法操作DOM只能通过$el才能访问DOM

            this.touch.percent = Math.abs(offsetWidth / window.innerWidth)//[ 3-26-1.16-5]滑动的比例（列表向左滚动的宽度 / 整个屏幕的宽度）

            this.$refs.lyricList.$el.style[transitionDuration] = 0  //[ 3-26-1.16-5.2]
            this.$refs.middleL.style.opacity = 1 - this.touch.percent  //[ 3-26-1.16-5.3]
            this.$refs.middleL.style[transitionDuration] = 0  //[ 3-26-1.16-5.3]

        },

        middleTouchEnd(){// [ 3-26-1.16-5]  决定歌词停到哪个位置（是滚回去还是滚到左边来）
            
            let offsetWidth
            let opacity   //[ 3-26-1.16-5.3]
            if(this.currentShow === 'cd'){  // 从右向左滑
                if(this.touch.percent > 0.1){ //如果大于10%就滑动
                    offsetWidth = -window.innerWidth
                    opacity = 0  //[ 3-26-1.16-5.3]
                    this.currentShow = 'lyric'
                }else{
                    offsetWidth = 0
                    opacity = 1   //[ 3-26-1.16-5.3]
                }
            }else{ //从左向右滑
                if(this.touch.percent < 0.9){
                    offsetWidth = 0
                    this.currentShow = 'cd'
                    opacity = 1   //[ 3-26-1.16-5.3]
                }else{
                    offsetWidth = -window.innerWidth
                    opacity = 0   //[ 3-26-1.16-5.3]
                }
            }
            const time = 300  //[ 3-26-1.16-5.1] 
            this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
            this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`  //[ 3-26-1.16-5.1] 
            this.$refs.middleL.style.opacity = opacity  //[ 3-26-1.16-5.3]
            this.$refs.middleL.style[transitionDuration] = `${time}ms`  //[ 3-26-1.16-5.3]
        }



    },

    watch: {
    
        
        currentSong(newSong, oldSong){  
            if(newSong.id === oldSong.id){
                return
            }

            if(this.currentLyric){//[ 3-27  ]解决当切换歌曲时歌词会一直跳动
                this.currentLyric.stop()
            }

            // this.$nextTick(( ) =>{ 
            setTimeout(( ) =>{   // [  3-29-2  ]不使用this.$nextTick解决在手机浏览器使用时从后台切回前台时歌曲正常播放
                this.$refs.audio.play()

                // this.currentSong.getLyric() //[  3-26-1.1]
                this.getLyric()  //[ 3-26-1.7 ]
            }, 1000) 
        },
           
        playing(newPlaying){  
            const audio = this.$refs.audio
            this.$nextTick(( ) =>{
                newPlaying ? audio.play() : audio.pause()
            }) 
           
        }
    },

    created() {  // [ 3-26-1.16-]
        this.touch = {}
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