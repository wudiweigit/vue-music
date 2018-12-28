
export function addClass(el, className){
        
    if(hasClass(el, className)){
        console.log(hasClass(el, className))
        return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}



export function hasClass(el, className){
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}


// [    2-1.37-2    ]获取点击元素的index
export function getData(el, name, val){//val是一个扩展出来的参数表示如果传过来有值我就set否则就get
    const prefix = 'data-'
    name = prefix + name
    if(val){
        return el.setAttribute(name, val)
    }else{
        return el.getAttribute(name)
    }
}