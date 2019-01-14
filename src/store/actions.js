// 异步操作或者对mututions做一些封装

// 设置当前的点击列表的playlist和sequenceList其次根据点击的索引我们可以设置currentList再次设置playerState由于在一个动作中多次改变mutations所以我们要封装一个actions
import * as types from './mutation-types'



export const selectPlay = function ({commit, state}, {list, index}){ 
  commit(types.SET_SEQUENCE_LIST, list)

  if(state.mode === playMode.random){
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])

  }else{
    commit(types.SET_PLAYLIST, list)
  }
  
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

function findIndex(list, song){  
  return list.findIndex((item) => {
    return item.id === song.id
  })
}



import {playMode} from 'common/js/config' 
import {shuffle} from 'common/js/util'
export const randomPlay = function ({commit}, {list}){
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0) 
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)

}
