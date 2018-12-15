// [  2-1.5   jsonp的封装 ==> 首先安装jsonp {npm indtall jsonp --save} ]

import originJSONP from 'jsonp'  //引入npm安装的jsonp

export default function jsonp (url, data, option){
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data) /// 判断url中有没有 ？如果没有的话添加 ？ 否则就添加 & 

    return new Promise( (resolve, reject) => {
        originJSONP(url, option, (err, data) => {
            if(!err){
                resolve(data)  // 成功
            }else{
                reject(err)   // 失败
            }
        })
    } )
}


function param (data){
    let url = '';
    for(var k in data){
        let value = data[k] !== undefined ? data[k] : ''; //如果data是undefined时我们给他一个空值（''）否则为 data[k]
        url += `&${k}=${encodeURIComponent(value)}`;  //拼接url
    }
    return url ? url.substring(1) : ''  // 如果第一个url有data我们要把 & 删除，如果url无data我们就返回一个空（''）
}