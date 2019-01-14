/**
 * mixin: 一个对象，Vue的混合机制，提高组件内容的复用性
 */
// 如果需要多个组件写相同的逻辑使用mixin(mixin把这段js放到一个地方去写如果说我们组件用了mixin的话他就会把这段代码添加到它的组件里)
// 解决底部播放器适配
// [  3-30  ]
import {mapGetters} from 'vuex'  // [  3-30  ]
export const playlistMixin = {
    computed: {   // [  3-30  ]
        ...mapGetters([
        'playlist'
        ])
    },
    mounted() {
        this.handlePlaylist(this.playlist)  // [  3-30-1  ]
    },

    activated() {  //<keep-alive>组件切换过来时会触发activated
        this.handlePlaylist(this.playlist)  // [  3-30-1  ]
    },

    watch: {
        playlist(newVal) {   // [  3-30  ]
            this.handlePlaylist(newVal)  // [  3-30-1  ]
        } 
    },

    methods: {  //组件中定义handlePlaylist，就会覆盖这个，否则就会抛出异常
        handlePlaylist() { // [  3-30-1  ]  handlePlaylist需要具体组件来实现
            throw new Error('component must implement handlePlaylist method')
        }
    },

}