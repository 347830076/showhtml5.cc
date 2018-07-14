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
let yublog = `yu<b>非常高兴你能看到这篇文章</b>，我是你的老朋友${yu}。${3+3}这节课我们学习字符串模版。`;
document.write(yublog);
document.write(yublog.includes(yu)); //字符串查找
document.write(yublog.startsWith(yu)); //判断开头是否存在：
document.write(yublog.endsWith(yu)+"<br/>"); //判断结尾是否存在：
 	
document.write('jspang|'.repeat(3));

//第6节：ES6数字操作
//二进制声明：二进制的英文单词是Binary,二进制的开始是0（零），然后第二个位置是b（注意这里大小写都可以实现），然后跟上二进制的值就可以了。
let binary = 0B010101;   //21
//八进制声明：八进制的英文单词是Octal，也是以0（零）开始的，然后第二个位置是O（欧），然后跟上八进制的值就可以了。
let b = 0o666; //438

//数字判断和转换

//数字验证Number.isFinite( xx ) 只要是数字，不论是浮点型还是整形都会返回true，其他时候会返回false。
let a3= 11/4;
console.log('数字验证--------------');
console.log(Number.isFinite(a3));//true
console.log(Number.isFinite('jspang'));//false
console.log(Number.isFinite(NaN));//false
console.log(Number.isFinite(undefined));//false
//NaN验证 NaN是特殊的非数字，可以使用Number.isNaN()来进行验证。下边的代码控制台返回了true。
console.log('NaN验证-------------');
console.log(Number.isNaN(NaN)); //true
console.log(Number.isNaN(12)); //false
console.log(Number.isNaN('dd')); //false
//判断是否为整数Number.isInteger(xx)
console.log(Number.isInteger(123))
console.log(Number.isInteger(123.32));
console.log(Number.isInteger('123.32'));
//整数转换Number.parseInt(xxx)和浮点型转换Number.parseFloat(xxx)
let a4='9.18';
console.log(Number.parseInt(a4)); 
console.log(Number.parseFloat(a4));

//整数取值范围操作 整数的操作是有一个取值范围的，它的取值范围就是2的53次方。我们先用程序来看一下这个数字是什么.
console.log('整数取值范围操作------------------')
let a5 = Math.pow(2,53) - 1;
console.log(a5); //9007199254740991
//最大安全整数
console.log(Number.MAX_SAFE_INTEGER);
//最小安全整数
console.log(Number.MIN_SAFE_INTEGER);
//安全整数判断isSafeInteger( )
console.log(Number.isSafeInteger(a5));//false

//第7节：ES6中新增的数组知识（1）
//JSON数组格式转换
console.log('Array.from json对象转数组')
let  json = {
    '0': 'jspang',
    '1': '技术胖',
    '2': '15151',
    // length:3
}

let arr=Array.from(json);
console.log(arr)
//Array.of()方法：
console.log('Array.of() 文本，字符串转数组 ')
let arr4 =Array.of(3,4,5,6);
console.log(arr4);
let arr5 =Array.of('技术胖','jspang','15125');
console.log(arr5);

//Array.find()
console.log('Array.find() 传入匿名函数，查找数组元素，符合条件就返回，并停止查找，没有找到undefined')
let arr6=[1,2,3,4,5,7,8,9];
console.log(arr6.find(function(value,index,arr){
    return value > 5;
}))
//Array.fill()
console.log('Array.fill() 数组填充')
let arr7=[0,1,2,3,4,5,6,7,8,9];
arr7.fill('jspang',2,5);
console.log(arr7);
//for…of循环：
let arr8=['jspang','技术胖','大胖逼逼叨']
 
for (let item of arr8){
    console.log(item);
}
//for…of数组索引:有时候开发中是需要数组的索引的，那我们可以使用下面的代码输出数组索引。
let arr9=['jspang','技术胖','大胖逼逼叨']
for (let index of arr9.keys()){
    console.log(index);
}
//同时输出数组的内容和索引：我们用entries()这个实例方法，配合我们的for…of循环就可以同时输出内容和索引了。
let arr10=['jspang','技术胖','大胖逼逼叨']
for (let [index,val] of arr10.entries()){
    console.log(index+':'+val);
}
let arr11=['jspang','技术胖','大胖逼逼叨']
let list=arr11.entries();
console.log(list.next().value);
console.log(list.next().value);
console.log(list.next().value);

//箭头函数
var add = (a,b=1) =>{
    console.log('箭头函数')
    return a+b;
}
console.log(add(20));

//对象的函数解构
(({a,b}) =>{
    console.log(a,b);
})({c:'cc','a':'aa','b':'bb'});

((a,b,c,d) =>{
    console.log(a,b,c,d)
})(...[1,2,3,4]);

//in 
console.log('in 是用来判断对象或者数组中是否存在某个值');
console.log('a' in {a:'a'});
console.log(4 in [0,4])

//forEach
console.log('forEach 循环的特点就是会自动省略为空的数组元素，相当于直接给我们筛空了')
let arr12 = ['d',4,4];
arr12.forEach((val,index)=>{console.log(val,index)});
console.log('Array.filter()');
let arr13 = ['jspang','技术胖','前端教程'];
arr13.filter(x => console.log(x));

let arr14=['jspang','技术胖','前端教程'];
 
console.log(arr14.map(x=>'web'));

(x => {console.log(x)})(12);

//数组转字符串
console.log('arr.join("|")  arr.toString()' ,'join()方法就是在数组元素中，加了一些间隔 ； toString() 只是用逗号隔开')