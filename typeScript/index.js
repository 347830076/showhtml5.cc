var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Person = (function () {
    function Person(name) {
        this.name = name;
        console.log('haha ' + name);
    }
    // public name;
    Person.prototype.eat = function () {
        console.log('im eating ' + this.name);
    };
    return Person;
}());
var p1 = new Person("batman");
p1.eat();
var p2 = new Person("superman");
p2.eat();
var employee = (function (_super) {
    __extends(employee, _super);
    function employee(name, code) {
        var _this = _super.call(this, name) || this;
        console.log(code);
        return _this;
    }
    employee.prototype.show = function () {
        console.log('show');
    };
    return employee;
}(Person));
var e1 = new employee('e1', '007');
e1.eat();
e1.show();
//泛型
var arrF = [];
arrF[0] = new Person('zhangshan');
var Presoni = (function () {
    function Presoni(config) {
        this.config = config;
        console.log(config.name);
        console.log(config.age);
    }
    return Presoni;
}());
var pi = new Presoni({
    name: 'xiao',
    age: 23
});
var sheep = (function () {
    function sheep() {
    }
    sheep.prototype.eat = function () {
        console.log('i eat grass');
    };
    return sheep;
}());
var _a;
//模块Moudule
