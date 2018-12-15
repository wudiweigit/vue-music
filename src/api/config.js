//  [  2-1.7 ] 在接口抓取数据时有些相同的参数是固定不变的所以我们需要配置这些参数


export const commonParams = {  //  输出公用参数
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
}
export const options = {
    param: 'jsonpCallback'
}

export const ERR_OK = 0   //其实是配置接口返回值code: 0