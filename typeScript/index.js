/*字符串新特性*/
//多行字符串
var content = "dsdf\nsdfsdf\nsdfsd\nfdsf\nsdf\n";
//字符串模板
var myname = 'guo yu';
var getName = function () {
    return 'chenguoyu';
};
console.log("hello" + myname);
console.log("hello" + getName() + "\n<span>" + myname + "</span>\n");
//自动拆分字符串
function test(template, name, age) {
    console.log(template);
    console.log(name);
    console.log(age);
}
var getAge = function () {
    return 18;
};
(_a = ["hello my name is ", ",i'm ", ""], _a.raw = ["hello my name is ", ",i'm ", ""], test(_a, myname, getAge()));
//参数类型
var stringtest = '陈国宇';
var alias = "12";
var age = 2313;
var man = true;
function funtest(name) {
}
function funtest1() {
    return "dsd";
}
var Person = (function () {
    function Person() {
    }
    return Person;
}());
var chen = new Person();
chen.age = 15;
chen.name = "yu";
function add(name, age, sex) {
    if (sex === void 0) { sex = '男'; }
    console.log(name);
}
add('name', 'sex', 'sdf');
/*
* 参数类型
*    在参数名称后面使用冒号来指定参数的类型
* 默认参数
*    在参数声明后面用等号来指定参数的默认值
* 可选参数
*    在方法的参数声明后面用问号来标明此参数为可选参数
* */
// func1(1,1,1,1,"ds");
// function func1(...args){
//     args.forEach(function(args)){
//         console.log(args)
//     }
// }
var args2 = [1, 1, 1, 1, 1];
// func2(...args2);
function func2(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}
console.log(function () {
    var a = 1;
    return a;
});
var arr2 = [1, 2, 3, 4];
// arr2.desc = 'sfd';
for (var _i = 0, arr2_1 = arr2; _i < arr2_1.length; _i++) {
    var i = arr2_1[_i];
}
var _a;
