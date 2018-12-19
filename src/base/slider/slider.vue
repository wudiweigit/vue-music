
<template>

<div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
        <slot>

        </slot>
    </div>
    <div class="dots">
        <!-- [  2-1.14-4   ] -->
        <!-- <span class="dot" v-for="item in dots"></span> -->

        <!-- [  2-1.14-6   ] 当 currentPageIndex === index手动/自动切换时为其添加active样式小圆点会变形/大 -->
        <span class="dot" v-for="(item, index) in dots" :class="{active:currentPageIndex === index}"></span>
    </div>
</div>
</template>


<!-- <script >
    import {addClass} from 'common/js/dom'
    import BScroll from 'better-scroll'
  
    export default {
      name: 'slider',
      props: {
        loop: {
          type: Boolean,
          default: true
        },
        autoPlay: {
          type: Boolean,
          default: true
        },
        interval: {
          type: Number,
          default: 4000
        }
      },
      data() {
        return {
          dots: [], //  [  2-1.14-2   ]
           currentPageIndex: 0  //  [  2-1.14-5   ]当前是那个元素
         }
      },
      mounted() {
        setTimeout(() => {
          this._setSliderWidth()

          this._initDots()//  [  2-1.14-1   ]
          this._initSlider()

          if(this.autoPlay){//  [  2-1.15  ] 自动播放
            this._play()  //[  2-1.15-1  ]如果属性autoPlay为true调用该方法自动播放
          }
  
        }, 20)
  
      },
     
      methods: {
        _setSliderWidth(isResize) {
          this.children = this.$refs.sliderGroup.children
          console.log(this.children) //  [  2-1.14   ] 手动滚动

          let width = 0
          let sliderWidth = this.$refs.slider.clientWidth
          for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i]
            addClass(child, 'slider-item')
  
            child.style.width = sliderWidth + 'px'
            width += sliderWidth
          }
          if (this.loop) {
            width += 2 * sliderWidth
          }
          this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initSlider() {
          this.slider = new BScroll(this.$refs.slider, {
            scrollX: true,
            scrollY: false,
            momentum: false,  //当快速滑动时是否开启滑动惯性
            snap: true,  //该组件是给slider组件使用
            snapLoop: this.loop,   //是可以无缝轮播
            snapThreshold: 0.3,   //用于手指滑动是页面的阈值
            snapSpeed: 400   //轮播图切换的动画时间
          })
  
          // [  2-1.14-7   ] 切换时 BScroll提供了一个事件（scrollEnd）
          this.slider.on( 'scrollEnd', () => {
            let pageIndex = this.slider.getCurrentPage().pageX //使用BScroll提供的方法【getCurrentPage()】中的pagex属性获取当前第几个子元素
            // console.log( pageIndex)
            if(this.loop){ //之前说了 loop 会复制 2个DOM元素
              pageIndex -=1
            }
            this.currentPageIndex = pageIndex


            if(this.autoPlay){//[  2-1.15-3  ] 每次轮播前清除一次
              clearTimeout(this.timer)
              this._play()

            }


          } )

        },
        _initDots() { //  [  2-1.14-3  ]
          this.dots = new Array(this.children.length) 
        },
        _play(){//  [  2-1.15-2  ]
          let pageIndex = this.currentPageIndex + 1
          if(this.loop){
            pageIndex += 1
          }
          this.timer = setTimeout(() => {
            this.slider.goToPage(pageIndex, 0, 400) //调用BScroll提供的方法goToPage
          }, this.interval )
        }

        
       
      }
    }
  </script> -->




<script >
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        dots: [], 
          currentPageIndex: 0 
        }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()  // [  2-1.17 ]  一开始这里不用传表示 underfined 

        this._initDots()
        this._initSlider()

        if(this.autoPlay){
          this._play()  
        }

      }, 20)
      // [  2-1.16  ]当窗口发生改变时轮播图会有问题
      window.addEventListener('resize', () => {
        if(!this.slider){  // 如果this.slider还没有初始化时什么都不做
          return 
        }
        // this._setSliderWidth()  //否则重新调用方法计算宽度==》会存在问题： 因为每次调用该方法时都会重新给width赋予两倍的宽度（width += 2 * sliderWidth）
        this._setSliderWidth(true)  //[  2-1.16-1  ] 解决： 为其设置标识位（isResize ==>标识这个是不是resize过来的）
        this.slider.refresh()   // [  2-1.18 ]BScroll 提供的借口当宽度发生变化时调用该方法
      })

    },
    
    methods: {
      _setSliderWidth(isResize) {//[  2-1.16-1  ] [  2-1.17 ]  !underfined 返回的是true
        this.children = this.$refs.sliderGroup.children
        console.log(this.children) 

        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {//[  2-1.16-1  ]
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,  
          snap: true,  
          snapLoop: this.loop,   
          snapThreshold: 0.3, 
          snapSpeed: 400 ,
          // click: true,  // [   2-1.19   ] 在手机中点击图片时不会进行跳转是因为BScroll与fastclick产生冲突这里要把其注释掉 
        })


        this.slider.on( 'scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX 
          if(this.loop){ 
            pageIndex -=1
          }
          this.currentPageIndex = pageIndex


          if(this.autoPlay){
            clearTimeout(this.timer)
            this._play()

          }


        } )

      },
      _initDots() { 
        this.dots = new Array(this.children.length) 
      },
      _play(){
        let pageIndex = this.currentPageIndex + 1
        if(this.loop){
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400) 
        }, this.interval )
      }

      
      
    },
    destroyed() { // [2-1.21  ]当组件中有计时器资源时将组件销毁时删除
      clearTimeout(this.timer)
    },
  }
</script>




<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable";

  .slider
    min-height: 1px
    .slider-group
        position: relative
        overflow: hidden
        white-space: nowrap
        .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
            a
                display: block
                width: 100%
                overflow: hidden
                text-decoration: none
            img
                display: block
                width: 100%
    .dots
        position: absolute
        right: 0
        left: 0
        bottom: 12px
        text-align: center
        font-size: 0
        .dot
            display: inline-block
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
                width: 20px
                border-radius: 5px
                background: $color-text-ll





</style>