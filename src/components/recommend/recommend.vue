

<template>
    <div class="recommend">
            <!-- [  2-1.25-2.2 ] 这里把div改成 Scroll组件【问题：当我们在浏览器中纵滑动时并不能滚动==》因为我们的scroll数据是动态渲染的拿到后把DOM给撑开这时候我们需要重新去计算这个scroll（也就是调用refresh）才能让这个scroll重新滚动，而不是在mounte时去计算scroll】
        <scroll class="recommend-content">-->

            <!-- [  2-1.26-1 ]  ref="scroll"-->
            <!-- [  2-1.25-2.3 ] 解决： :data="discList" 监听discList的变化（意思就是我的歌单渲染了scroll就会监听到data变化然后就会调用refresh方法）-->
        <scroll class="recommend-content" :data="discList" ref="scroll">
        <!-- <div class="recommend-content"> -->
             <!-- [  2-1.25 ]  在外城加个div来设置纵向滚动-->
            <div>

                <div v-if="recommends.length" class="slider-wrapper">
                    <slider>
                        <div v-for="item in recommends">
                            <a :href="item.linkUrl">
                                    <!-- [  2-1.26 ] -->
                                <!-- <img :src="item.picUrl"> -->
                                <img @load="loadImage" :src="item.picUrl">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                            <!-- [  2-1.24-2  ] -->
                        <li class="item" v-for="item in discList">
                            <div class="icon">
                                <img width="60" height="60" :src="item.imgurl">
                            </div>
                            <div class="text">
                                    <!-- [  2-1.24-2.1  ] 由于拿到的数据中有字符v-html指令会将这些字符进行转义-->
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
        <!-- </div> -->
        </scroll>
    </div>
</template>


<script>  
import {getRecommend, getDiscList} from 'api/recommend'   
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll' //[  2-1.25-2 ]

export default {
    created() {
        // setTimeout(() => {
        //     this._getRecommend()
        // },2000)
        this._getRecommend()

        this._getDiscList()
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
        _getDiscList(){
            getDiscList().then((res) => {
                if(res.code === ERR_OK){
                    console.log(res.data.list)

                    this.discList = res.data.list// [  2-1.24-1  ]
                }
            })
        },

        
    // 问题： 为什们要定义loadImage方法
//现实中你并不知道哪个会被先渲染出来所以这里我们使用 load事件当一加载时就拿去该事件对应元素的高度 ==》假设当我们在  reacommend.vue组件中created中设置一个延迟时间【setTimeout(() => {this._getRecommend()},2000)】这时去纵向滚动歌单是滚不到底部的，然而 《==
//==》原因： 当我们设置延迟时间后歌单先被渲染出来这时refresh计算高度【默认是减去轮播图的高度】，后轮播图才被渲染 《==
        loadImage(){ // [  2-1.26-2 ] 一旦图片被加载时触发该事件
            if(!this.checkLoading){   //【设置标识位让逻辑执行一次】由于加载时会有多张图片所以这里定义一个变量这个变量保证我只有一张图片时我的高度就会被撑开【加载时没有checkLoading时去调用 refresh()方法拿取图片的高度并且调用完成后将checkLoading 赋值为true】
                this.$refs.scroll.refresh()  
                this.checkLoading = true
            }
            
        }
    },
    data(){
        return {
            recommends: [],
            // [  2-1.24  ]
            discList: [],
        }
    },
    components: {
        Slider,
        Scroll, //[  2-1.25-2.1 ]
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