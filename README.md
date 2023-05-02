# 源代码
    class Obj { }

    export const test = () => {
        var obj = new Obj();
        console.log(obj);

        // 箭头函数
        const add = (a, b) => a + b;

        // Promise 对象
        const promise1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(add(1, 2));
            }, 1000);
        });

        const promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(add(3, 4));
            }, 1000);
        });

        const promise3 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(add(5, 6));
            }, 1000);
        });

        Promise.all([promise1, promise2, promise3]).then(values => {
            console.log(values); // [3, 7, 11]
        });

        // 实例方法：Array.prototype.includes()
        const arr = [1, 2, 3, 4, 5];
        console.log(arr.includes(3)); // true

        console.log(add(1, 3));
    }
    test();

# 编译后
    var Obj = /*#__PURE__*/(0,_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(function Obj() {
    (0,_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Obj);
    });
    var test = function test() {
    var obj = new Obj();
    console.log(obj);

    // 箭头函数
    var add = function add(a, b) {
        return a + b;
    };

    // Promise 对象
    var promise1 = new (_babel_runtime_corejs3_core_js_stable_promise__WEBPACK_IMPORTED_MODULE_2___default())(function (resolve, reject) {
        _babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_3___default()(function () {
        resolve(add(1, 2));
        }, 1000);
    });
    var promise2 = new (_babel_runtime_corejs3_core_js_stable_promise__WEBPACK_IMPORTED_MODULE_2___default())(function (resolve, reject) {
        _babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_3___default()(function () {
        resolve(add(3, 4));
        }, 1000);
    });
    var promise3 = new (_babel_runtime_corejs3_core_js_stable_promise__WEBPACK_IMPORTED_MODULE_2___default())(function (resolve, reject) {
        _babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_3___default()(function () {
        resolve(add(5, 6));
        }, 1000);
    });
    _babel_runtime_corejs3_core_js_stable_promise__WEBPACK_IMPORTED_MODULE_2___default().all([promise1, promise2, promise3]).then(function (values) {
        console.log(values); // [3, 7, 11]
    });

    // 实例方法：Array.prototype.includes()
    var arr = [1, 2, 3, 4, 5];
    console.log(_babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_4___default()(arr).call(arr, 3)); // true

    console.log(add(1, 3));
    };
    test();


# 安装 babel

## 1. 依赖安装

    npm install -D babel-loader @babel/core @babel/preset-env

## 2. webpack Loader 配置
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader'
                }
            },
        ]
    },

## 3. 创建 .babelrc 或 babel.config.json

# Babel 的配置

    {
        "presets": [
            ["@babel/preset-env", {
                "useBuiltIns": "usage", // 按需引入 corejs 中的模块 
                "corejs": 3, // 核心 js 版本
                "targets": "> 0.05%, not dead" // 浏览器支持范围
            }]
        ]
    }

## 还需要下载的依赖：

    npm i core-js@3 --save

    注意： 必须要配置 useBuiltIns，如果不配置，babel 将不会处理 Promise、Map、Set、Symbol 等全局对象；corejs 也要同时配置，2 的版本可以处理全局对象，但实例方法并不处理，所以这里用 3 的版本。

# 最佳的 babel 配置(最好配置到这一步)
    如果在写一个库时，最好添加上插件 —— babel/plugin-transform-runtime，配置如下：

    npm install --save-dev @babel/plugin-transform-runtime
    npm install --save @babel/runtime @babel/runtime-corejs3


    {
        "presets": [
            ["@babel/preset-env", {
                "targets": "> 0.05%, not dead"
            }]
        ],
        "plugins": [
            // 不污染全局，在运行时加载
            ["@babel/plugin-transform-runtime", {
                "corejs": 3
            }]
        ]
    }

# 备注

    Babel 版本更新后，很多内容已经发生变化，官方文档也是晦涩难读，而中文网上的文章很多都已经过时，好在我看到了一位大佬的文章，这才让我对 @babel/preset-env 和 @babel/plugin-transform-runtime 有了基本的认识。
    文章 link 放在文末，请自行阅读。

    @babel/preset-env just transforms code with syntax, if we don’t config useBuiltIns.
    @babel/transform-runtime can provide re-use helpers, but don’t polyfill by default.
    Most situation best config: use @babel/preset-env transforms syntax. use @babel/transform-runtime avoid duplicate code, and config corejs: 3 to polyfill.
