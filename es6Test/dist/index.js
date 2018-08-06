'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _obj2;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _temp = require('./temp.js');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var _a = 1;
}
console.log(a);
var i = 'i';
for (var _i = 0; _i < 2; _i++) {
    console.log('循环体中:' + _i);
}
console.log('循环体外:' + i);

//const声明常量 在程序开发中，有些变量是希望声明后在业务层就不再发生变化了，简单来说就是从声明开始，这个变量始终不变，就需要用const进行声明。

//第3节：变量的解构赋值 ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。解构赋值在实际开发中可以大量减少我们的代码量，并且让我们的程序结构更清晰
//数组模式和赋值模式统一： 如果等号两边形式不一样，很可能获得undefined或者直接报错。
var a1 = 1,
    b1 = 2,
    c1 = 3;
//解构的默认值：

var _ref = [],
    _ref$ = _ref[0],
    foo = _ref$ === undefined ? true : _ref$;

console.log(foo);
//需要注意的是undefined和null的区别。  undefined相当于什么都没有 null相当于有值，但值为null

//对象的解构赋值  对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

var _foo1$bar = { foo1: 'JSPang', bar1: '技术胖' },
    foo1 = _foo1$bar.foo1,
    bar1 = _foo1$bar.bar1;

console.log(foo1 + bar1); //控制台打印出了“JSPang技术胖”
//如果在解构之前就定义了变量，这时候你再解构会出现问题。 要解决报错，使程序正常，我们这时候只要在解构的语句外边加一个圆括号就可以了。

//字符串解构   字符串也可以解构，这是因为，此时字符串被转换成了一个类似数组的对象。

var _JSPang = "JSPang",
    _JSPang2 = _slicedToArray(_JSPang, 6),
    a2 = _JSPang2[0],
    b2 = _JSPang2[1],
    c2 = _JSPang2[2],
    d2 = _JSPang2[3],
    e2 = _JSPang2[4],
    f2 = _JSPang2[5];

//第4节：扩展运算符和rest运算符(...) 它们可以很好的为我们解决参数和对象数组未知情况下的编程，让我们的代码更健壮和简洁。
//对象扩展运算符（…）：


function jspang() {
    console.log(arguments.length <= 0 ? undefined : arguments[0]);
    console.log(arguments.length <= 1 ? undefined : arguments[1]);
    console.log(arguments.length <= 2 ? undefined : arguments[2]);
    console.log(arguments.length <= 3 ? undefined : arguments[3]);
}
jspang(1, 2, 3);

//扩展运算符的用处：   我们先用一个例子说明，我们声明两个数组arr1和arr2，然后我们把arr1赋值给arr2，然后我们改变arr2的值，你会发现arr1的值也改变了，因为我们这是对内存堆栈的引用，而不是真正的赋值。
var arr1 = ['www', 'jspang', 'com'];
//let arr2=arr1;
var arr2 = [].concat(arr1);
console.log(arr2);
arr2.push('shengHongYu');
console.log(arr2);
console.log(arr1);
//rest运算符
function jspang(first) {
    for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        arg[_key - 1] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = arg[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var val = _step.value;

            console.log(val);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

jspang(0, 1, 2, 3);

//第5节：字符串模版 而且这里边 支持html标签 对运算的支持 字符串查找
var yu = 'yu';
var yublog = 'yu<b>\u975E\u5E38\u9AD8\u5174\u4F60\u80FD\u770B\u5230\u8FD9\u7BC7\u6587\u7AE0</b>\uFF0C\u6211\u662F\u4F60\u7684\u8001\u670B\u53CB' + yu + '\u3002' + (3 + 3) + '\u8FD9\u8282\u8BFE\u6211\u4EEC\u5B66\u4E60\u5B57\u7B26\u4E32\u6A21\u7248\u3002';
document.write(yublog);
document.write(yublog.includes(yu)); //字符串查找
document.write(yublog.startsWith(yu)); //判断开头是否存在：
document.write(yublog.endsWith(yu) + "<br/>"); //判断结尾是否存在：

document.write('jspang|'.repeat(3));

//第6节：ES6数字操作
//二进制声明：二进制的英文单词是Binary,二进制的开始是0（零），然后第二个位置是b（注意这里大小写都可以实现），然后跟上二进制的值就可以了。
var binary = 21; //21
//八进制声明：八进制的英文单词是Octal，也是以0（零）开始的，然后第二个位置是O（欧），然后跟上八进制的值就可以了。
var b = 438; //438

//数字判断和转换

//数字验证Number.isFinite( xx ) 只要是数字，不论是浮点型还是整形都会返回true，其他时候会返回false。
var a3 = 11 / 4;
console.log('数字验证--------------');
console.log(Number.isFinite(a3)); //true
console.log(Number.isFinite('jspang')); //false
console.log(Number.isFinite(NaN)); //false
console.log(Number.isFinite(undefined)); //false
//NaN验证 NaN是特殊的非数字，可以使用Number.isNaN()来进行验证。下边的代码控制台返回了true。
console.log('NaN验证-------------');
console.log(Number.isNaN(NaN)); //true
console.log(Number.isNaN(12)); //false
console.log(Number.isNaN('dd')); //false
//判断是否为整数Number.isInteger(xx)
console.log(Number.isInteger(123));
console.log(Number.isInteger(123.32));
console.log(Number.isInteger('123.32'));
//整数转换Number.parseInt(xxx)和浮点型转换Number.parseFloat(xxx)
var a4 = '9.18';
console.log(Number.parseInt(a4));
console.log(Number.parseFloat(a4));

//整数取值范围操作 整数的操作是有一个取值范围的，它的取值范围就是2的53次方。我们先用程序来看一下这个数字是什么.
console.log('整数取值范围操作------------------');
var a5 = Math.pow(2, 53) - 1;
console.log(a5); //9007199254740991
//最大安全整数
console.log(Number.MAX_SAFE_INTEGER);
//最小安全整数
console.log(Number.MIN_SAFE_INTEGER);
//安全整数判断isSafeInteger( )
console.log(Number.isSafeInteger(a5)); //false

//第7节：ES6中新增的数组知识（1）
//JSON数组格式转换
console.log('Array.from json对象转数组');
var json = {
    '0': 'jspang',
    '1': '技术胖',
    '2': '15151'
    // length:3
};

var arr = Array.from(json);
console.log(arr);
//Array.of()方法：
console.log('Array.of() 文本，字符串转数组 ');
var arr4 = Array.of(3, 4, 5, 6);
console.log(arr4);
var arr5 = Array.of('技术胖', 'jspang', '15125');
console.log(arr5);

//Array.find()
console.log('Array.find() 传入匿名函数，查找数组元素，符合条件就返回，并停止查找，没有找到undefined');
var arr6 = [1, 2, 3, 4, 5, 7, 8, 9];
console.log(arr6.find(function (value, index, arr) {
    return value > 5;
}));
//Array.fill()
console.log('Array.fill() 数组填充');
var arr7 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
arr7.fill('jspang', 2, 5);
console.log(arr7);
//for…of循环：
var arr8 = ['jspang', '技术胖', '大胖逼逼叨'];

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
    for (var _iterator2 = arr8[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _item2 = _step2.value;

        console.log(_item2);
    }
    //for…of数组索引:有时候开发中是需要数组的索引的，那我们可以使用下面的代码输出数组索引。
} catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
        }
    } finally {
        if (_didIteratorError2) {
            throw _iteratorError2;
        }
    }
}

var arr9 = ['jspang', '技术胖', '大胖逼逼叨'];
var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
    for (var _iterator3 = arr9.keys()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var index = _step3.value;

        console.log(index);
    }
    //同时输出数组的内容和索引：我们用entries()这个实例方法，配合我们的for…of循环就可以同时输出内容和索引了。
} catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
        }
    } finally {
        if (_didIteratorError3) {
            throw _iteratorError3;
        }
    }
}

var arr10 = ['jspang', '技术胖', '大胖逼逼叨'];
var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
    for (var _iterator4 = arr10.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _step4$value = _slicedToArray(_step4.value, 2),
            _index = _step4$value[0],
            val = _step4$value[1];

        console.log(_index + ':' + val);
    }
} catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
        }
    } finally {
        if (_didIteratorError4) {
            throw _iteratorError4;
        }
    }
}

var arr11 = ['jspang', '技术胖', '大胖逼逼叨'];
var list = arr11.entries();
console.log(list.next().value);
console.log(list.next().value);
console.log(list.next().value);

//箭头函数
var add = function add(a) {
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    console.log('箭头函数');
    return a + b;
};
console.log(add(20));

//对象的函数解构
(function (_ref2) {
    var a = _ref2.a,
        b = _ref2.b;

    console.log(a, b);
})({ c: 'cc', 'a': 'aa', 'b': 'bb' });

(function (a, b, c, d) {
    console.log(a, b, c, d);
}).apply(undefined, [1, 2, 3, 4]);

//in 
console.log('in 是用来判断对象或者数组中是否存在某个值');
console.log('a' in { a: 'a' });
console.log(4 in [0, 4]);

//forEach
console.log('forEach 循环的特点就是会自动省略为空的数组元素，相当于直接给我们筛空了');
var arr12 = ['d', 4, 4];
arr12.forEach(function (val, index) {
    console.log(val, index);
});
console.log('Array.filter()');
var arr13 = ['jspang', '技术胖', '前端教程'];
arr13.filter(function (x) {
    return console.log(x);
});

var arr14 = ['jspang', '技术胖', '前端教程'];

console.log(arr14.map(function (x) {
    return 'web';
}));

(function (x) {
    console.log(x);
})(12);

//数组转字符串
console.log('arr.join("|")  arr.toString()', 'join()方法就是在数组元素中，加了一些间隔 ； toString() 只是用逗号隔开');

//对象赋值
var name = 'jishu';
var obj12 = { name: name };
console.log('ES6允许把声明的变量直接赋值给对象', obj12.name);
var key2 = 'skill';
var obj13 = _defineProperty({}, key2, 'web');
console.log(obj13.skill);

//object.is()对象比较
console.log('Object.is()对象比较');
console.log(Object.is({ name: '1' }.name, { name: '1' }.name));

console.log('Object.assign()合并对象');
console.log(Object.assign({ a: 'b' }, { b: 'b' }, { c: 'c' }));

console.log('Symbol在对象中的作用');

var g = Symbol('jspang');
console.log(g);
console.log(g.toString());
console.log('Symbol对象元素的保护作用');
var jspang = Symbol();
var obj = (_obj2 = {}, _defineProperty(_obj2, jspang, '技术胖'), _defineProperty(_obj2, 'name', 'cylyiou'), _obj2);
console.log(obj[jspang]);
obj[jspang] = 'web';
console.log(obj[jspang]);
console.log(obj);

var obj = { name: 'jspang', skill: 'web', age: 18 };

for (var item in obj) {
    console.log(item, obj[item]);
}
console.log('-----------');
var obj15 = { name: 'jspang', skill: 'web' };
var age15 = Symbol();
obj15[age15] = 18;
for (var _item in obj15) {
    console.log(_item, obj15[_item]);
}
console.log(obj15);

console.log('Set和Array 的区别是Set不允许内部有重复的值，如果有只显示一个，相当于去重。虽然Set很像数组，但是他不是数组。');
var setArr = new Set(['a', 'b2', 'c']);
console.log(setArr);
setArr.add('前端职场');
console.log(setArr);
var _iteratorNormalCompletion5 = true;
var _didIteratorError5 = false;
var _iteratorError5 = undefined;

try {
    for (var _iterator5 = setArr.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _step5$value = _slicedToArray(_step5.value, 2),
            _index2 = _step5$value[0],
            val = _step5$value[1];

        console.log(_index2, val);
    }
} catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
        }
    } finally {
        if (_didIteratorError5) {
            throw _iteratorError5;
        }
    }
}

console.log(setArr.has('a'));
console.log(setArr.size);
setArr.forEach(function (val, index) {
    return console.log(val, index);
});
setArr.clear();
console.log(setArr);

var weakObj = new WeakSet();
var objw = { a: 'jspang', b: '技术胖' };
var objw2 = { a: 'jspang2', b: '技术胖2' };
var obj1w = objw;

weakObj.add(objw);
weakObj.add(objw2);
weakObj.add(obj1w);

console.log(weakObj);

var jsonm = {
    name: 'jspang',
    skill: 'web'
};
console.log(jsonm.name);

var map = new Map();
map.set(jsonm, 'iam');
console.log(map);
console.log(map.get(jsonm));
console.log(map.has(jsonm));
console.log(map.size);

console.log('用Proxy进行预处理 new Proxy({},{})');

var pro = new Proxy({
    add: function add(val) {
        return val + 10;
    },
    name: 'I am Jspang'
}, {
    get: function get(target, key) {
        console.log('come in Get');
        return target[key];
    },
    set: function set(target, key, value, receiver) {
        console.log('                            setting ' + key + ' = ' + value);
        // return target[key] = value;
        return target[key] = 12;
    }

});

console.log(pro.name);
pro.name = '技术胖';
console.log(pro.name);

var target = function target() {
    return 'I am JSPang';
};
var handler = {
    apply: function apply(target, ctx, args) {
        console.log('do apply');
        return Reflect.apply.apply(Reflect, arguments);
    }
};

var pro = new Proxy(target, handler);

console.log(pro());

var state = 1;

function step1(resolve, reject) {
    console.log('1.开始-洗菜做饭');
    if (state == 1) {
        resolve('洗菜做饭--完成');
    } else {
        reject('洗菜做饭--出错');
    }
}

function step2(resolve, reject) {
    console.log('2.开始-坐下来吃饭');
    if (state == 1) {
        resolve('坐下来吃饭--完成');
    } else {
        reject('坐下来吃饭--出错');
    }
}

function step3(resolve, reject) {
    console.log('3.开始-收拾桌子洗完');
    if (state == 1) {
        resolve('收拾桌子洗完--完成');
    } else {
        reject('收拾桌子洗完--出错');
    }
}

new Promise(step1).then(function (val) {
    console.log(val);
    state = 2;
    return new Promise(step2);
}).then(function (val) {
    console.log(val);
    return new Promise(step3);
}, function (error) {
    console.log(error);
}).then(function (val) {
    console.log(val);
    return val;
});

//这里需要注意的是两个方法中间不要写逗号了，还有这里的this指类本身，还有要注意return 的用法。

var Coder = function () {
    function Coder(a, b) {
        _classCallCheck(this, Coder);

        this.a = a;
        this.b = b;
    }

    _createClass(Coder, [{
        key: 'name',
        value: function name(val) {
            console.log(val);
            return val;
        }
    }, {
        key: 'skill',
        value: function skill(val) {
            console.log(this.name('jspang') + ' : ' + 'Skill ' + val);
        }
    }, {
        key: 'add',
        value: function add() {
            return this.a + this.b;
        }
    }]);

    return Coder;
}();

var coders = new Coder(1, 2);
coders.name('haha');
coders.skill('vue');
console.log('add ', coders.add());

//class继承

var htmler = function (_Coder) {
    _inherits(htmler, _Coder);

    function htmler() {
        _classCallCheck(this, htmler);

        return _possibleConstructorReturn(this, (htmler.__proto__ || Object.getPrototypeOf(htmler)).apply(this, arguments));
    }

    _createClass(htmler, [{
        key: 'minux',
        value: function minux(val) {
            console.log('minux ' + this.name('min'));
        }
    }]);

    return htmler;
}(Coder);

var pang = new htmler();
pang.name('jishu');
pang.minux('jishu');

console.log('\nexport :\u8D1F\u8D23\u8FDB\u884C\u6A21\u5757\u5316\uFF0C\u4E5F\u662F\u6A21\u5757\u7684\u8F93\u51FA\u3002\nimport : \u8D1F\u8D23\u628A\u6A21\u5757\u5F15\uFF0C\u4E5F\u662F\u6A21\u5757\u7684\u5F15\u5165\u64CD\u4F5C\u3002\n');

console.log(_temp.aex);