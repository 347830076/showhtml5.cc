//第1节：ES6的开发环境搭建
/**
 * 初始化项目

在安装Babel之前，需要用npm init先初始化我们的项目。打开终端或者通过cmd打开命令行工具，进入项目目录，输入下边的命令：	
npm init -y
-y代表全部默认同意，就不用一次次按回车了。命令执行完成后，会在项目根目录下生产package.json文件。

全局安装Babel-cli
 	
npm install -g babel-cli

本地安装babel-preset-es2015 和 babel-cli
	
npm install --save-dev babel-preset-es2015 babel-cli
在根目录下新建.babelrc文件，并打开录入下面的代码
{
    "presets":[
        "es2015"
    ],
    "plugins":[]
}

 */
//第2节：新的声明方式
var a = 2;
{
    //let是局部变量声明，let声明只在区块内起作用，外部是不可以调用的。let是防止你的数据污染的
    let a = 1;
}
console.log(a);
var i = 'i';
for (let i = 0; i < 10; i++) {
    console.log('循环体中:' + i);
}
console.log('循环体外:' + i);

//const声明常量 在程序开发中，有些变量是希望声明后在业务层就不再发生变化了，简单来说就是从声明开始，这个变量始终不变，就需要用const进行声明。

//第3节：变量的解构赋值 ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。解构赋值在实际开发中可以大量减少我们的代码量，并且让我们的程序结构更清晰
//数组模式和赋值模式统一： 如果等号两边形式不一样，很可能获得undefined或者直接报错。
let [a1,b1,c1] = [1,2,3];
//解构的默认值：
let [foo = true] = [];
console.log(foo);
//需要注意的是undefined和null的区别。  undefined相当于什么都没有 null相当于有值，但值为null

//对象的解构赋值  对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

let {foo1,bar1} = {foo1:'JSPang',bar1:'技术胖'};
console.log(foo1+bar1); //控制台打印出了“JSPang技术胖”
//如果在解构之前就定义了变量，这时候你再解构会出现问题。 要解决报错，使程序正常，我们这时候只要在解构的语句外边加一个圆括号就可以了。

//字符串解构   字符串也可以解构，这是因为，此时字符串被转换成了一个类似数组的对象。
const [a2,b2,c2,d2,e2,f2]="JSPang";

//第4节：扩展运算符和rest运算符(...) 它们可以很好的为我们解决参数和对象数组未知情况下的编程，让我们的代码更健壮和简洁。
//对象扩展运算符（…）：
function jspang(...arg){
    console.log(arg[0]);
    console.log(arg[1]);
    console.log(arg[2]);
    console.log(arg[3]);
 
}
jspang(1,2,3);

//扩展运算符的用处：   我们先用一个例子说明，我们声明两个数组arr1和arr2，然后我们把arr1赋值给arr2，然后我们改变arr2的值，你会发现arr1的值也改变了，因为我们这是对内存堆栈的引用，而不是真正的赋值。
let arr1=['www','jspang','com'];
//let arr2=arr1;
let arr2=[...arr1];
console.log(arr2);
arr2.push('shengHongYu');
console.log(arr2);
console.log(arr1);
//rest运算符
function jspang(first,...arg){
    for(let val of arg){
        console.log(val);
    }
}
 
jspang(0,1,2,3,4,5,6,7);

//第5节：字符串模版 而且这里边 支持html标签 对运算的支持 字符串查找
let yu='yu';
let yublog = `<b>非常高兴你能看到这篇文章</b>，我是你的老朋友${yu}。${3+3}这节课我们学习字符串模版。`;
document.write(yublog);
document.write(yublog.includes(yu));