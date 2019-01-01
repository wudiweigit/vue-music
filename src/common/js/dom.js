
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



export function getData(el, name, val){
    const prefix = 'data-'
    name = prefix + name
    if(val){
        return el.setAttribute(name, val)
    }else{
        return el.getAttribute(name)
    }
}



//  [ 3-9 ]  由于我们这里大量的使用了transform和webkitTransform所以这里要使用CSS前缀做一个js方面的封装【由于我们写CSS时vue自己自带了插件为我们自动添加前缀而在js方面没有提供添加前缀的方式需要我们自己封装】

let elementStyle = document.createElement('div').style

let vendor = ( () => {  //创建一个供应商
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        mst: 'msTransform',
        standard: 'transform'
    }
    for(let key in transformNames){
        if(elementStyle[transformNames[key]] !== undefined){
            return key
        }
    }
    return false  //所有浏览器都不支持说明是有毛病的所以返回false
} )()


export function prefixStyle(style){
    if(vendor === false){   //如果供应商是false就结束
        return false
    }
    if(vendor === 'standard'){
        return style
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
