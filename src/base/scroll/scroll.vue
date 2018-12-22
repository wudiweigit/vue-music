
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