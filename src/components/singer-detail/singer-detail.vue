
<!-- [  3-1 ] -->
<!-- <template>
    <div class="singer-detail"></div>
</template> -->



<template>
    <!-- [  3-1.1-6 ] name="slider"-->
    <transition name="slider">
        <div class="singer-detail"></div>
    </transition>
    
</template>



<script>
import {mapGetters} from 'vuex' //[  3-2.1-3  ]


export default {
    computed: {
        ...mapGetters([ //[  3-2.1-4  ]
            'singer'
        ])
    },
    created(){
        console.log(this.singer)
    }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable";

.singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background
.slider-enter-active, .slider-leave-acrive /*  [  3-1.1-6 ] */
    transition: all 0.3s   
.slider-enter, .slider-leave-to  /*  [  3-1.1-6 ] */
    transform: translate3d(100%, 0, 0)  /* 从右向左滑的一个动画 */


</style>