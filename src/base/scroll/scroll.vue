
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


        //[    2-1.37-3.2    ]BScroll提供的方法
       
        scrollTo() {//滚动到哪
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