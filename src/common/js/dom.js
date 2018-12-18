// [   2-1.13-1   ] 给 Slider 组件添加样式（.slider-item）
export function addClass(el, className){ //el是DOM对象
    // console.log(hasClass(el, className))
    if(hasClass(el, className)){ //有className我就什么都不做
        return
    }

    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')

}


export function hasClass(el, className){ //判断DOM对象中是否有className
    let reg = new RegExp('(^|\\s)' +className+ '(\\s|$)')  //满足这个条件就有className
    return reg.test(el.className)
}