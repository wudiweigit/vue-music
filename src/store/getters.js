// 获取state做一些映射

export const singer = state => state.singer 

//[  3-12.1-1  getters既能做代理也能让做计算属性]state里面只保留些最基础的数据所有可以在基础数据计算而来的数据我们都放在getters中  

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex



export const currentSong = (state) => {//currentSong可以被playList和curretIndex计算出来的
    return state.playlist[state.currentIndex] || {}//如果取不到给个空对象
  }