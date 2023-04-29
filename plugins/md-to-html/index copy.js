// https://www.bilibili.com/video/BV15i4y1j7gk/?p=2&spm_id_from=pageDriver&vd_source=e970c86801423745004edc5dc5ac2697
const { readFileSync } = require('fs');
const { resolve } = require('path');

class mdToHtml {
    constructor({ filename, template }) {
        if (!filename) {
            filename = 'md.html';
        }
        if (!template) {
            throw new Error('template 不能为空');
        }
        this.filename = filename;
        this.template = template;
        this.INNER_MARK = '<!-- inner -->';
    }

    // 在插件函数的 prototype 上定义一个 `apply` 方法，以 compiler 为参数。
    apply(compiler) {

        // 指定一个挂载到 compilation 的钩子，回调函数的参数为 compilation 。
        compiler.hooks.emit.tap('md-to-html-plugin', (compilation) => {
            const _assets = compilation.assets; //webpack 构建时的资源对象
            const _mdContent = readFileSync(this.template, 'utf8'); // 读取 .md 文件
      
            // 基本实现，md文件内容直接放到 html 文件中。主要的实现思路
            // 增加一个资源
            _assets[this.filename] = {
                source() {
                    return _mdContent;
                },
                size() {
                    return _mdContent.length;
                }
            };
        });
    }
}

module.exports = mdToHtml;
