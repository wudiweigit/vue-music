<!--[  2-1.25-1 ] 纵向滚动组件 -->
<template>
    <div ref="wrapper">
        <slot>

        </slot>
    </div>
</template>


<script>
import BScroll from 'better-scroll'

export default {
    props: {
        probeType:{//监听一些滚动事件
            type: Number,
            default: 1
        },
        click: { //一些点击事件
            type: Boolean,
            defualt: true,
        },
        data: {
            type: Array,
            defualt: null,
        },
    },
    mounted() {
        setTimeout(() => {
            this._initScoll()
        }, 20)
        
    },
    methods: {
        _initScoll(){//初始化方法
            if(!this.$refs.wrapper){//方法被调用时判断是否有参数如果没有（undefined）就结束
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, { //否则进行下面操作
                probeType: this.probeType,
                click: this.click,
            })
        },
        enable(){ //BScroll方法的代理
            this.scroll && this.scroll.enable() //如果有this.scroll就调用BScroll提供的代理方法
        },
        disable(){//BScroll方法的代理
            this.scroll && this.scroll.disable()
        },
        refresh(){//BScroll方法的代理（refresh刷新scroll重新计算它的高度）
            this.scroll && this.scroll.refresh()
        }
    },
    watch: { //如果data变化就重新scroll
        data(){
            setTimeout(() => {
                this.refresh()
            }, 20)
        }
    },
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">


</style>