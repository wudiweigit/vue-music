
<template>
     <!-- [    2-1.39-1.2   ]  :listenScroll="listenScroll"    @scroll="scroll"-->
     <!-- [    2-1.39-1.7-2  ] :probeType="probeType"-->
    <scroll :data="data" 
        class="listview" 
        ref="listview"
        :listenScroll="listenScroll"
        @scroll="scroll"
        :probeType="probeType"
    >
        <ul>
            <li v-for="group in data" 
                class="list-group" 
                ref="listGroup"    
            >
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item">
                    
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" 
        @touchstart="onShortcutTouchStart"
        @touchmove.stop.prevent="onShortcutTouchMove"
        >
            <ul>
                    <!-- [    2-1.39-1.7-3  ] 'current': currentIndex === index-->
                <li v-for="(item, index) in shortcutList"
                    class="item"
                    :data-index="index"
                    :class="{'current': currentIndex == index}"
                >
                    {{item}}
                </li>
            </ul>
        </div>


        <!-- [  2-1.42 ]滚动固定标题实现 -->
        <!-- <div class="list-fixed">  [  2-1.42-1 ] -->
        <!-- [  2-1.42-1 ] v-show="fixedTitle"   [  2-1.42-5 ]ref="fixed"-->
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">  
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
    </scroll>
</template>



<!-- <script>
import Scroll from 'base/scroll/scroll'

import {getData} from 'common/js/dom'   

const ANCHOR_HEIGHT = 18

export default {
    
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    data(){
        return {//[    2-1.39-1.3 ]  
            scrollY: -1, // 实时观测滚动的位置
            currentIndex: 0, //当前应该显示第几个【默认第一个是高亮】
            
        }
    },
    created(){
        this.touch = {}

        // [    2-1.39-1.1   ]
        this.listenScroll = true
        // [    2-1.39-1.5 ]
        this.listHeight = []
        // [    2-1.39-1.7-2  ] 由于scroll.vue组件中probeType属性为1不能实现节流滚动这里要设为3才能
        this.probeType = 3

    },
    components: {
        Scroll,
    }, 
    computed: {
        shortcutList(){
            return this.data.map( (group) => {
                return group.title.substr(0, 1)
            })
        }
        
    },

    methods: {   
        onShortcutTouchStart(e){   
            let anchorIndex = getData( e.target, 'index' )
            
            let firstTouch = e.touches[0] 
            this.touch.y1 = firstTouch.pageY  
            this.touch.anchorIndex = anchorIndex 
            this._scrollTo(anchorIndex)
        },
        onShortcutTouchMove(e){
            let firstTouch = e.touches[0]
            this.touch.y2 = firstTouch.pageY
            let delta = (this.touch.y2 - this.touch.y1) /ANCHOR_HEIGHT | 0   

            let anchorIndex = parseInt(this.touch.anchorIndex) + delta   
            this._scrollTo(anchorIndex)   

            
        },
        scroll(pos){
            this.scrollY = pos.y//[    2-1.39-1.4 ] 
        },

        _calculateHeight() {//[    2-1.39-1.6  ]计算高度
            this.listHeight = []
            const list = this.$refs.listGroup


            let height = 0  //一开始高度为0
            this.listHeight.push(height) //赋值开始高度为0
            for (let i = 0; i < list.length; i++) {
            let item = list[i]
            height += item.clientHeight

            this.listHeight.push(height)
            }
        },
   
        _scrollTo(index){
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)

            // 当我们点击右侧字母时高亮并没有随之显示==》因为我们的高亮并不因为我们点击的点而是根据我们scrollY去计算出来的而scrollY的变化是根据scroll(pos)事件进行实时跟新的，当我们点击_scrollTo方法时让他滚动到相应位置但是并没有触发相应事件所以scroll(pos)里并不能监听scrollY的变化的这里就需要手动设置scrollY的
            this.scrollY = -this.listHeight[index] //[  2-1.40 ]赋值每个listHeight上限位置

            console.log(index)//[  2-1.41 ]
            if(!index && index !== 0){ //[  2-1.41-1 ] 对index做一些判断如果是null就停止（排除父元素上的不必要的点击）
                return 
            }

            if(index < 0){//[  2-1.41-2 ] 当拖动到顶/底时进行考虑确
                index =0
            }else if(index > this.listHeight.length -2 ){
                index = this.listHeight.length - 2
            }
        }
    },
    watch: {
        data(){//[    2-1.39-1.4 ]  监听当我们传给listview的data发生变化时去计算高度
            setTimeout( () => {//数据的变化到DOM的变化其实是有个延时的所以这里使用了setTimeout
                this._calculateHeight()//DOM渲染好了才调用方法计算高度
            }, 20 )
        },
        scrollY(newY){ //[    2-1.39-1.7  ]
            const listHeight = this.listHeight  //保留this.listHeight
    
            //当滚动到底部 newY>0
            if(newY>0){ //如果大于零第一个元素为高亮
                this.currentIndex = 0 
                return
            }

            //在中间部分滚动（这里的listHeight不用遍历到最后一个（listHeight.length-1）=》在_calculateHeight时listHeight实际上它的元素的长度是大于列表元素（height）的个数的因为我们给每个列表元素添加了一个上线和下线并且列表元素的第一个元素的上限是第二个元素的下限）
            for(let i = 0; i<listHeight.length-1; i++){
                let height1 = listHeight[i]
                let height2 = listHeight[i+1]

                if(-newY >= height1 && -newY < height2){ // 在height1和height2区间内 【由于listHeight是正数,而Y是负数得到-newY是正数】
                    this.currentIndex = i  //在height1和height2区间内就可也跳出
                    // console.log(this.currentIndex) //[    2-1.39-1.7-1  ]
                    return
                }
            }
            //当滚动到底部且-newY大于最后一个元素的上限
            this.currentIndex = listHeight.length - 2 //否则为0
        }
    },
        
    

}
</script> -->



<script>
import Scroll from 'base/scroll/scroll'

import {getData} from 'common/js/dom'   

const ANCHOR_HEIGHT = 18

const TITLE_HEIGHT = 30  // [  2-1.42-2 ] 标题高度

export default {
    
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    data(){
        return {
            scrollY: -1, 
            currentIndex: 0,
            diff: -1  //// [  2-1.42-4 ]表示某区块的上限和我当前滚动位置的一个滚动差
            
        }
    },
    created(){
        this.touch = {}
        this.listenScroll = true
        this.listHeight = []
        this.probeType = 3

    },
    components: {
        Scroll,
    }, 
    computed: {
        shortcutList(){
            return this.data.map( (group) => {
                return group.title.substr(0, 1)
            })
        },

        
        fixedTitle(){// [  2-1.42-1 ]
            if(this.scrollY > 0){//由于往下滑动时会出现两个title
                return ''
            }
            return this.data[this.currentIndex] ?  this.data[this.currentIndex].title : ''  //由于我们props中设置data默认是空数组所以这里做个判断
        }
        
    },

    methods: {   
        onShortcutTouchStart(e){   
            let anchorIndex = getData( e.target, 'index' )
            
            let firstTouch = e.touches[0] 
            this.touch.y1 = firstTouch.pageY  
            this.touch.anchorIndex = anchorIndex 
            this._scrollTo(anchorIndex)
        },
        onShortcutTouchMove(e){
            let firstTouch = e.touches[0]
            this.touch.y2 = firstTouch.pageY
            let delta = (this.touch.y2 - this.touch.y1) /ANCHOR_HEIGHT | 0   

            let anchorIndex = parseInt(this.touch.anchorIndex) + delta   
            this._scrollTo(anchorIndex)   

            
        },
        scroll(pos){
            this.scrollY = pos.y
        },

        _calculateHeight() {
            this.listHeight = []
            const list = this.$refs.listGroup


            let height = 0  
            this.listHeight.push(height)
            for (let i = 0; i < list.length; i++) {
            let item = list[i]
            height += item.clientHeight

            this.listHeight.push(height)
            }
        },
    
        _scrollTo(index){
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)

            
            this.scrollY = -this.listHeight[index] 
            console.log(index)
            if(!index && index !== 0){ 
                return 
            }

            if(index < 0){
                index =0
            }else if(index > this.listHeight.length -2 ){
                index = this.listHeight.length - 2
            }
        }
    },
    watch: {
        data(){
            setTimeout( () => {
                this._calculateHeight()
            }, 20 )
        },
        scrollY(newY){ 
            const listHeight = this.listHeight  
            if(newY>0){ 
                this.currentIndex = 0 
                return
            }

            for(let i = 0; i<listHeight.length-1; i++){
                let height1 = listHeight[i]
                let height2 = listHeight[i+1]

                if(-newY >= height1 && -newY < height2){ 

                    this.diff = height2 + newY // [  2-1.42-3 ]

                    this.currentIndex = i 
                    return
                }
            }
            
            this.currentIndex = listHeight.length - 2 
        },

        diff(newVal) {// [  2-1.42-4.1 ]
            let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
            if (this.fixedTop === fixedTop) {
            return
            }
            this.fixedTop = fixedTop
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`// [  2-1.42-5.1 ]
        }
        
    },
        
    

}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable";
  
    .listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
            .list-group-item
                display: flex
                align-items: center
                padding: 20px 0 0 30px
            .avatar
                width: 50px
                height: 50px
                border-radius: 50%
            .name
                margin-left: 20px
                color: $color-text-l
                font-size: $font-size-medium
        .list-shortcut
            position: absolute
            z-index: 30
            right: 0
            top: 50%
            transform: translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
        .list-fixed
            position: absolute
            top: 0
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
  </style>
  