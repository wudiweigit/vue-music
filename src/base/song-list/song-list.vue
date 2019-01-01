<!-- 由于多地复用所以单独拿出来创建个组件 -->
<!-- [  3-5   ] -->
<!-- <template>
    <div class="song-list">
        <ul>

        </ul>
    </div>
</template>


<script>
export default {
    props: {
        songs: {
            type: Array,
            default: []
        }
    }
    
}
</script> -->


<template>
    <div class="song-list">
        <ul>
            <!-- [  3-5.1   ] --> 
            <li v-for="song in songs" class="item">
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDest(song)}}</p>
                </div>
            </li>

        </ul>
    </div>
</template>


<script>
export default {
    props: {
        songs: {
            type: Array,
            default: []
        }
    },
    methods: {
        getDest(song){  //[  3-5.1-1   ]
            return `${song.singer}。${song.album}`
        }
    },
 
}
</script>



<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable";
@import "~common/stylus/mixin";

.song-list
    .item
        display: flex
        align-items: center
        box-sizing: border-box
        height: 64px
        font-size: $font-size-medium
        .content
            flex: 1
            line-height: 20px
            overflow: hidden
            .name
                no-wrap()
                color: $coor-text
            .desc
                no-wrap()
                margin-top: 4px
                color: $color-text-d




</style>