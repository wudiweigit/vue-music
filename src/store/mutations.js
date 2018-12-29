


//[  3-2  ] store初始化
import * as types from './mutation-types'//引入常量

const matutaions = {
    [types.SET_SINGER](state, singer){  // [方法名](状态, 参数)
        state.singer = singer
    }
}


export default matutaions