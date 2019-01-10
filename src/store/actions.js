// 异步操作或者对mututions做一些封装

//  [  3-12.2-7 ] 设置当前的点击列表的playlist和sequenceList其次根据点击的索引我们可以设置currentList再次设置playerState由于在一个动作中多次改变mutations所以我们要封装一个actions
import * as types from './mutation-types'

export const selectPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  }
  