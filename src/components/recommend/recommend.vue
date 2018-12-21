

<template>
    <div class="recommend">
        <div class="recommend-content">

            <div v-if="recommends.length" class="slider-wrapper">

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
import {getRecommend, getDiscList} from 'api/recommend' //[    2-1.23-1   ] 引入getDiscList
import {ERR_OK} from 'api/config'

import Slider from 'base/slider/slider'


export default {
    created() {
        this._getRecommend()

        this._getDiscList()//[    2-1.23   ]调用该方法获取歌单数据
    },
    methods: {
        _getRecommend(){
            getRecommend().then( (res) => {
                if(res.code === ERR_OK){
                    console.log(res.data.slider)

                    this.recommends = res.data.slider
                }
            } )
        },

        _getDiscList(){//[    2-1.23-1   ]
            getDiscList().then((res) => {
                if(res.code === ERR_OK){//请求接口时jsonp请求是被客户服务端拒绝的是因为在请求头部（Request Header）它有一个Host和Referer的限制而前端是不能直接修改Request Header的  ==》解决 ：需要通过后端代理的方式解决（有两种方法：1.在buil/webpack.dev.conf.js中配置 2.在config/index.js中的proxyTable属性加入代理相关的配置【用官方的代理】 ）
                    console.log(res.data.list)
                }
            })
        }
        
        
    },

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