import tpl from "./info.tpl";

document.querySelector("#app").innerHTML = tpl({
    name: "zhanghsna",
    age: 19
});
