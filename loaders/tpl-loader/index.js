// 模板，数据替换
function tplReplace(template, replaceOptions) {
    return template.replace(/\{\{(.*?)\}\}/g, (node, key) => {
        return replaceOptions[key]
    });
}

// const str = tplReplace(`
//     <div>
//         <h1>{{name}}</h1>
//         <h1>{{age}}</h1>
//     </div>
// `, { name: 'zhanghsna', age: 18 });
// console.log(str);// <div><h1>zhanghsna</h1><h1>18</h1></div>


function tplLoader(source) { // source 就是 test: /\.tpl$/, 匹配到文件的源码
    source = source.replace(/\s+/g, '');// 去掉空格，得到 <div><h1>zhanghsna</h1><h1>18</h1></div>

    const options = this.getOptions(); // 获取 loader 参数
  
    const _log = options.log ? `console.log('${this.resourcePath} 编译完成')` : ''; // 实现打印日志

    // 返回的是 import tpl from "./info.tpl";  tpl 的值
    // options 为调用该函数传入的参数
    return `
        export default function(options) {
            ${tplReplace.toString()}
            ${_log}
            return tplReplace('${source}', options);
        }
    `;
}

/**
 * 非必须
 * @remainingRequest 剩余请求
 * @precedingRequest 前置请求
 * @data 数据对象
 */
tplLoader.pitch = function (remainingRequest, precedingRequest, data) {
    console.log("开始执行tplLoader Pitching Loader");
    console.log(remainingRequest, precedingRequest, data);
    // return "bLoader Pitching Loader->";
};


module.exports = tplLoader;
