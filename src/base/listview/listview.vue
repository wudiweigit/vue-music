<!-- <template> -->
    <!--[  2-1.33 ] 因为我们这个数据也是异步获取完通过props拿取scroll.vue中的data传入listview.vue中的data并动态绑定，当data发生变化我们重新计算scroll -->
    <!-- <scroll :data="data" class="listview">
        <ul>
            <li v-for="group in data" class="list-group">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item"> -->
                        <!-- <img class="avatar" :src="item.avatar"> -->
                        <!-- [    2-1.35    ] 懒加载-->
                        <!-- <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </scroll>
</template>



<script>
import Scroll from 'base/scroll/scroll'

export default {
    
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    components: {
        Scroll,
    }
}
</script> -->




<template>
        <!-- [    2-1.37-3.1    ] ref="listview"  ref="list-group"-->
<!--<scroll :data="data" class="listview"> -->
    <scroll :data="data" class="listview" ref="listview">
        <ul>
            <!-- <li v-for="group in data" class="list-group"> -->
            <li v-for="group in data" class="list-group" ref="listGroup">

                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item">
                    
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- [    2-1.36-1    ] -->
        <!-- <div class="list-shortcut">
            <ul>
                <li v-for="item in shortcutList" class="item">{{item}}
                </li>
            </ul>
        </div> -->
        <!-- [    2-1.37    ] 为其添加点击事件（由BScroll封装好的=> touchstart,）-->
        <!-- <div class="list-shortcut" @touchstart="onShortcutTouchStart">
            <ul> -->
                <!-- [    2-1.37-1    ] 点的时候获取该元素的索引(data-index="index") -->
                <!-- <li v-for="(item, index) in shortcutList" class="item" :data-index="index">{{item}}
                </li>
            </ul>
        </div> -->

        <!-- [    2-1.38    ] 在字母中滑动时滚动到指定位置事件（由BScroll封装好的=> touchmove,）
           .stop.prevent（VUE提供的两个修饰符） 由于左侧列表和右侧字母列表都能进行滚动所以这里我们来阻止事件冒泡也可以阻止浏览器的原生滚动
        -->
        <div class="list-shortcut" 
        @touchstart="onShortcutTouchStart"
        @touchmove.stop.prevent="onShortcutTouchMove"
        >
            <ul>
                <li v-for="(item, index) in shortcutList" class="item" :data-index="index">{{item}}
                </li>
            </ul>
        </div>
    </scroll>
</template>



<script>
import Scroll from 'base/scroll/scroll'

import {getData} from 'common/js/dom'   //[    2-1.37-3    ]

const ANCHOR_HEIGHT = 18    //[  2-1.38-1.3  ]获取每个字母的高度

export default {
    
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    components: {
        Scroll,
    },
    computed: {
        shortcutList(){//[    2-1.36    ]获取右侧字母快速列表
            return this.data.map( (group) => {//使用数组的map方法
                return group.title.substr(0, 1)
            })
        }
        
    },

    methods: {   
        // onShortcutTouchStart(e){   //[    2-1.37-3.2    ]点击后滚动到相应的位置
        //     // console.log(e)
        //     let anchorIndex = getData( e.target, 'index' )
            
        //     this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
        // },


        onShortcutTouchStart(e){   
            let anchorIndex = getData( e.target, 'index' )
            
            let firstTouch = e.touches[0]  //[  2-1.38-1  ]指的是你触碰到的某个字母【这里默认是第一个字母】 
            this.touch.y1 = firstTouch.pageY  //[  2-1.38-1.2  ]某个字母的位置
            this.touch.anchorIndex = anchorIndex //[  2-1.38-1.5  ]记录刚开始点击的元素

            // this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
            this._scrollTo(anchorIndex)//[  2-1.38-1.7  ]对齐进行封装
        },
        onShortcutTouchMove(e){//[    2-1.38-1.4    ]根据刚开始位置（TouchStart）和结束位置(TouchMove)计算位置的差值
            let firstTouch = e.touches[0]
            this.touch.y2 = firstTouch.pageY
            let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0   //偏移了几个锚点【向下取整获0 相当Match.floor】

            let anchorIndex = parseInt(this.touch.anchorIndex) + delta   //[  2-1.38-1.6  ]

            this._scrollTo(anchorIndex)    //[  2-1.38-1.7  ]

            
        },
        _scrollTo(index){//[  2-1.38-1.7  ]对齐进行封装
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0) //scrollToElement表示滚动动画的实现这里是瞬间滚动所以设为 0
        }
    },
    created(){
        this.touch = {}//  [  2-1.38-1.1  ]由于需要获取pageY值并且要在两个方法【onShortcutTouchStart，onShortcutTouchMove】中共享pageY值所以把它保存在created钩子中  ==》那为什们不在data和props中保存【因为在vue中这两个属性里的东西都会被Vue添加个get/set方法来观测data和props以及computed中值的变化，变化了会对这个值进行监听然后主要是对DOM做数据绑定用的而这里我们并不需要对this.touch 进行观测变化只是为两个函数间获取数据】
    }
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
  