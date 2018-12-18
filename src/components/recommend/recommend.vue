<!--[      2-1.9     ]  -->
<!-- <template>
    <div class="recommend">
        <div class="recommend-content">
            <div class="slider-wrapper">

            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul>

                </ul>
            </div>
        </div>
    </div>
</template>


<script>
    
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable";

.recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
        height: 100%
        overflow: hidden
    .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
    .recommend-list
        .list-title
            height: 65px
            line-height: 65px
            text-align: center
            font-size: $font-size-medium
            color: $color-theme
        .item
            display: flex
            box-sizing: border-box
            align-items: center
            padding: 0 20px 20px 20px
        .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
        .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
                margin-bottom: 10px
                color: $color-text
            .desc
                color: $color-text-d
    .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)

</style> -->




<!-- <template>
    <div class="recommend">
        <div class="recommend-content">
            <div class="slider-wrapper">

            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul>

                </ul>
            </div>
        </div>
    </div>
</template>


<script>
//[      2-1.10    ]    
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
// [   2-1.11   ]
import Slider from 'base/slider/slider'


export default {
    created() {
        this._getRecommend()
    },
    methods: {
        _getRecommend(){
            getRecommend().then( (res) => {
                if(res.code === ERR_OK){
                    console.log(res.data.slider)
                }
            } )
        }
    },
    components: {
        Slider,
    }
}


</script> -->




<template>
    <div class="recommend">
        <div class="recommend-content">
                <!-- [   2-1.13-2   ] 为什么要设置 v-if="recommends.length" -->
                <!-- 解决 ：这里我们直接引用 <slider>这个组件 而这里我们的 recommends 的时机我们是在 created 时去 this._getRcommend而这个方法是个异步过程，所以说当我们的 recommends 还没有拿到数据时slider.vue文件中的mounteds已经执行了-->
            <div v-if="recommends.length" class="slider-wrapper">
                    <!-- [   2-1.11   ] -->
                <slider>
                    <div v-for="item in recommends">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl">
                        </a>
                    </div>
                </slider>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul>

                </ul>
            </div>
        </div>
    </div>
</template>


<script>  
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
// [   2-1.11   ]
import Slider from 'base/slider/slider'


export default {
    created() {
        this._getRecommend()
    },
    methods: {
        _getRecommend(){
            getRecommend().then( (res) => {
                if(res.code === ERR_OK){
                    console.log(res.data.slider)

                    this.recommends = res.data.slider // [   2-1.11   ]
                }
            } )
        }
    },
    // [   2-1.11   ]
    data(){
        return {
            recommends: []
        }
    },
    components: {
        Slider,
    }
}


</script>







<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable";

.recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
        height: 100%
        overflow: hidden
    .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
    .recommend-list
        .list-title
            height: 65px
            line-height: 65px
            text-align: center
            font-size: $font-size-medium
            color: $color-theme
        .item
            display: flex
            box-sizing: border-box
            align-items: center
            padding: 0 20px 20px 20px
        .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
        .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
                margin-bottom: 10px
                color: $color-text
            .desc
                color: $color-text-d
    .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)

</style>