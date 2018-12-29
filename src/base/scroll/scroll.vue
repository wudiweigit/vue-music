
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
        probeType:{
            type: Number,
            default: 1
        },
        click: { 
            type: Boolean,
            defualt: true,
        },
        data: {
            type: Array,
            defualt: null,
        },
        
        //[    2-1.39    左右有个联动的效果=》滚动某区域时点亮某个字母【我要实时知道它的滚动位置然后根据其滚动位置来算到它落在左侧的那个区间最后找出那个之母高亮】
        listenScroll: {
            type: Boolean,//这个属性是让我们的scroll要不要监听滚动事件
            default: false
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScoll()
        }, 20)
        
    },
    methods: {
        _initScoll(){
            if(!this.$refs.wrapper){
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, { 
                probeType: this.probeType,
                click: this.click,
            })


            // [    2-1.39-1   ]

            if(this.listenScroll){// 如果是true就监听了scroll
                let me = this//指vue实例的this
                this.scroll.on('scroll', (pos) => {//this.scroll.on这里的this是指向scroll

                    me.$emit('scroll', pos)
                })
            }
            
        },
        enable(){
            this.scroll && this.scroll.enable() 
        },
        disable(){
            this.scroll && this.scroll.disable()
        },
        refresh(){
            this.scroll && this.scroll.refresh()
        },



       
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }



    },
    watch: { 
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