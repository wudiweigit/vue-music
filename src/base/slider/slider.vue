<!-- <template>
    <div class="slider">
        <div class="slider-group"> -->
            <!--   [   2-1.11   ]  外部引入slider时它里面包裹的DOM会被插到插槽的这个部分 -->
            <!-- <slot>

            </slot>
        </div>
        <div class="dots">

        </div>
    </div>
</template> -->



<template>
        <!-- [   2-1.13   ]给这两个元素加上一个引用 ref="slider"  ref="sliderGroup"  -->
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>

            </slot>
        </div>
        <div class="dots">

        </div>
    </div>
</template>


<script>
    
import BScroll from 'better-scroll'// [   2-1.12   ] 

import {addClass} from 'common/js/dom'  // [   2-1.13-1   ] 

export default {
    // [   2-1.12   ] 
    props: {
        loop: {//可不可以循环轮播
            type: Boolean,//  接收的数据类型
            defualt: true, //  默认值
        },
        autoPlay: {//  自动轮播
            type: Boolean,
            defualt: true,
        },
        interval: {// 多少毫秒滚动一次
            type: Number,
            defualt: 4000,
        },
    },

    // better-scroll初始化时不能滚动或者报错的原因初始化时组件没有真正渲染或者高度宽度计算不对
    // [   2-1.13   ] 
    mounted() {
        setTimeout( () => {//通常保证DOM成功渲染我们要添加一个延时操作
            this._setSliderWidth(),
            this._initSliderWidth()
        }, 20 )
    },

    methods:{
        _setSliderWidth(){ //设置宽度
            this.children = this.$refs.sliderGroup.children //获取整个列表元素的个数

            let width = 0  //总宽度
            let sliderWidth = this.$refs.slider.clientWidth  //获取父容器的宽度
            for(let i = 0; i<this.children.length; i++){
                let child = this.children[i]

                addClass(child, 'slider-item')   // [   2-1.13-1   ] 
                child.style.width = sliderWidth + 'px'  // 设置每个child 的宽度等于父容器的宽度
                width += sliderWidth  //累加宽度
            }
            if(this.loop){  //如果loop为true的话实际上它会左右克隆两个DOM保障它的循环切换所以这里要增加两倍的宽度
                width += 2 * sliderWidth
            }
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initSliderWidth(){
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,  //横向滚动
                scrollY: false,  //不予许纵向滚动
                momentum: false,  // 
                snap: true,
                snapLoop: this.loop,  // 循环等于我们传入的loop
                snapThreshold: 0.3,
                snapSpeed: 4000,
                click: true,  //允许点击
            })
        }
    }
}



</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable";

.slider
    min-height: 1px
    .slider-group
        position: ralative
        overflow: hidden
        white-space: nowrap
        .slider-item
            float: left
            box-sizing: border-box
            overflow: hidden
            text-align: center
            a
                display: block
                width: 100%
                overflow: hidden
                text-decoration: none
            img
                display: block
                width: 100%
    .dodts
        position: absolute
        right: 0
        left: 0
        bottom: 12px
        text-align: center
        font-size: 0
        .dot
            dispaly: inline-block
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
                width: 20px
                border-radius: 5px
                background: $color-text-ll





</style>