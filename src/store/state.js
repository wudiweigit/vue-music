import { playMode } from "common/js/config";  //[  3-12.1  ] 

// 状态


const state = {   
    singer: {},
    
 //[   3-12] 显示由于我们的播放器可以通过歌手/歌单详情还可以根据排行版以及搜索结果打开所以我们通过vuex管理数据  
    playing: false, //播放的状态()
    fullScreen: false, //播放的展开和收起
    playlist: [],//播放列表
    sequenceList: [], //顺序列表 （sequenceList与palyList的区别当是顺序播放时它们的顺序是相同，当是随机播放时它们的顺序是不一样的）
    mode: playMode.sequence,   //[  3-12.1  设置播放模式] 默认顺序播放
    currentIndex: -1,// 当前播放的索引
}

export default state 