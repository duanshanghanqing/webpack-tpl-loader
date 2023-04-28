class mdToHtml {
    constructor({ filename, template }) {
        if (!filename) {
            filename = 'md.html';
        }
        if (!template) {
            throw new Error("template 不能为空");
        }
        this.filename = filename;
        this.template = template;
    }
}

module.exports = mdToHtml;
