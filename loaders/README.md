# tpl-loader
> 编译模板字符串

   import tpl from "./info.tpl";

    document.querySelector("#app").innerHTML = tpl({
        name: "zhanghsna",
        age: 19
    });

    