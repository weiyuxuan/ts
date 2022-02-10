"use strict";
// @ts-nocheck
// 01 基础类型系统
{
    /*
     * any 类型
     * 无法确定类型是什么时，默认是 any。这是兜底类型，应该尽量避免使用。
     * any 类型的值就像常规的 JavaScript 一样，类型检查器完全发挥不了作用。
     */
    let a1 = 666;
    let b1 = ['danger'];
    let c1 = a1 + b1;
    /*
     * unknown 类型
     * 当确实无法预知一个值的类型时，应该使用 unknown，它同样可以表示任何值。
     * TypeScript 不会把任何值推导成 unknown 类型。
     * 如果一个值的类型是 unknown，会被 TypeScript 要求再做检查，细化类型。
     */
    let a2 = 30;
    let b2 = a2 === 123;
    let c2 = a2 + 10; // Error: 对象的类型为 "unknown"
    if (typeof a2 === 'number') {
        let d2 = a2 + 10; // No Error
    }
    /*
     * boolean 类型
     * 有两个值，true 和 false，可用于比较。
     * 配置 const 也可声明类型为类型字面量。
     */
    let a3 = true; // boolean
    let b3 = false; // boolean
    const c3 = true; // true
    let d3 = true; // boolean
    let e3 = true; // true
    let f3 = false; // Error: 不能将类型 "false" 分配给类型 "true"
    /*
     * number 类型
     * 包括所有数字：整数，浮点数，正数，负数，Infinity，NaN 等，可以用于做算术运算。
     */
    let a4 = 1234; // number
    let b4 = Infinity * 0.1; // number
    const c4 = 5678; // 5678
    let d4 = a4 < b4; // boolean
    let e4 = 100; // number
    let f4 = 26.218; // 26.218
    let g4 = 10; // Error: 不能将类型 10 分配给类型 26.218
    /*
     * bigint 类型
     * bigint 是 JavaScript 和 TypeScript 新引入的类型，用于处理大整数。
     */
    let a5 = 1234n; // bigint
    const b5 = 5678n; // 5678n
    let c5 = a5 + b5; // bigint
    let d5 = a5 < 1235; // boolean
    let e5 = 100n; // bigint
    let f5 = 100n; // bigint
    let g5 = 100; // Error: 不能将类型 "number" 分配给类型 "bigint"
    /*
     * string 类型
     * 包括所有字符串，以及可以对字符串执行的操作。
     */
    let a6 = 'hello'; // string
    let b6 = 'billy'; // string
    const c6 = '!'; // '!'
    let d6 = a6 + ' ' + b6 + c6; // string
    let e6 = 'zoom'; // string
    let f6 = 'john'; // 'john'
    let g6 = 'zoe'; // Error: 不能将类型 "zoe" 分配给类型 "john"
    /*
     * symbol 类型
     * symbol 是符号类型，通常用于代替对象和映射的字符串键，确保使用正确的已知键，防止键被意外设置。
     * unique symbol 是 symbol 的子类型，只能用于 const 声明。用于标识 symbol 的唯一性。
     * TypeScript 在编译时能判断一个 unique symbol 类型的值绝不会与另一个 unique symbol 类型的值相等。
     */
    let a7 = Symbol('a'); // symbol
    let b7 = Symbol('b'); // symbol
    let c7 = a7 === b7; // boolean
    let d7 = a7 + 'x'; // Error: "+" 运算符不能应用于类型 "symbol"
    const e7 = Symbol('e'); // typeof e7
    const f7 = Symbol('f'); // typeof f7
    let g7 = Symbol('g'); // Error: 类型为 "unique symbol" 的变量必须为 "const"。
    let h7 = e7 === e7; // boolean
    let i7 = e7 === f7; // Error: 此条件将始终返回 "false"，因为类型 "typeof e7" 和 "typeof f7" 没有重叠
    /*
     * 对象类型
     * 通过对象类型无法区分不同的字面量对象或构造对象。
     * 使用类型描述对象有两种方式：1. object 类型；2. 对象字面量句法。
     * 其中 object 类型的范围很窄，仅能判断为一个对象，而不能判断其中的内容。
     */
    let a8 = {
        x: 'x'
    };
    a8.x; // Error: 类型 "object" 上不存在属性 "x"
    let b8 = {
        x: 'x'
    }; // {x: string}
    let c8 = {
        x: {
            z: 'z'
        }
    }; // {x: {z: string}}
    let d8 = {
        x: 'x'
    }; // {x: string}
    let e8;
    e8 = {}; // Error: 类型 "{}" 中缺少属性 "x"，但类型 "{ x: string; }" 中需要该属性
    e8 = {
        x: 'x',
        z: 'z'
    }; // Error: 不能将类型 "{ x: string; z: string; }" 分配给类型 "{ x: string; }"。
    let f8;
    f8 = {
        x: 'x',
        10: true,
        20: false
    }; // f8 中有类型为 string 的 x，可能有类型为 string 的 c，可能有任意多个数字属性，其值为 boolean 类型。
    let g8 = {
        x: 'x'
    };
    g8.x = 'z'; // Error: 无法分配到 "x" ，因为它是只读属性
    /*
     * 数组类型
     * 数组是特殊的对象类型，支持拼接、插入、搜索和切片等操作。
     * TypeScript 支持两种注解数组类型的句法：T[] 和 Array<T>，两者的作用和性能无异。
     * 一般情况下，数组应该保持同质。
     */
    let a9 = [1, 2, 3]; // number[]
    let b9 = ['a', 'b']; // string[]
    let c9 = ['a']; // string[]
    let d9 = [1, 'a']; // (string|number)[]
    const e9 = [2, 'b']; // (string|number)[]
    let f9 = ['red'];
    f9.push('blue');
    f9.push(true); // Error: 类型 "boolean" 的参数不能赋给类型 "string" 的参数
    let g9 = [];
    g9.push(1); // number[]
    g9.push('red'); // (string|number)[]
    let h9 = []; // number[]
    h9.push(1); // number[]
    h9.push('red'); // Error: 类型 "string" 的参数不能赋给类型 "number" 的参数
    let i9 = [1, 2, 3]; // readonly number[]
    i9[4] = 4; // Error: 类型 "readonly number[]" 中的索引签名仅允许读取
    /*
     * 元组类型
     * 元组是数组的子类型，是定义数组的一种特殊形式，长度固定，各索引位上的值具有固定的已知类型。
     * 元组支持剩余元素类型定义。
     */
    let a10 = [1]; // [number]
    let b10 = ['a', 'b', 1];
    b10 = ['a', 'b', 1, 2]; // Error: 不能将类型 "[string, string, number, number]" 分配给类型 "[string, string, number]"
    let c10 = [
        [3.75],
        [8.25, 7.70],
        [10.50]
    ]; // [number, number?][]
    let d10 = ['a', 1, 2, 3];
    /*
     * null、undefined、void 和 never 类型
     * null 和 undefined 类型即是对应 null 和 undefined 值。
     * void 是函数没有显式得返回任何值时的类型。
     * never 是函数根本不返回（抛出异常，或者永远运行下去）时的类型。
     */
    function a11() {
        return null;
    }
    function b11() {
        return undefined;
    }
    function c11() {
        let a = 2 + 2;
    }
    function d11() {
        throw TypeError('I always error');
    }
    function e11() {
        while (true) {
            console.log(new Date());
        }
    }
    /*
     * 枚举类型
     * 无序数据结构，把键映射到值上。访问键时，TypeScript 将检查指定的键是否存在。
     * 枚举分为两种：字符串到字符串之间的映射和字符串到数字之间的映射。
     */
    let Language1;
    (function (Language1) {
        Language1[Language1["English"] = 0] = "English";
        Language1[Language1["Spanish"] = 1] = "Spanish";
        Language1[Language1["Russian"] = 2] = "Russian";
    })(Language1 || (Language1 = {})); // 会编译成 JavaScript 对象声明
    let Language2;
    (function (Language2) {
        Language2[Language2["English"] = 0] = "English";
        Language2[Language2["Spanish"] = 1] = "Spanish";
        Language2[Language2["Russian"] = 2] = "Russian";
    })(Language2 || (Language2 = {})); // 会编译成 JavaScript 对象声明
    let myFirstLanguage = Language1.English; // 编译成赋值
    let mySecondLanguage = Language2.Spanish; // 编译成赋值
    let Color1;
    (function (Color1) {
        Color1[Color1["Red"] = 1] = "Red";
        Color1[Color1["Green"] = 2] = "Green";
        Color1[Color1["Blue"] = 4] = "Blue";
    })(Color1 || (Color1 = {}));
    let color1 = Color1.Green; // 2
    let Color2;
    (function (Color2) {
        Color2[Color2["Red"] = 1] = "Red";
        Color2[Color2["Green"] = 2] = "Green";
        Color2[Color2["Blue"] = 3] = "Blue";
    })(Color2 || (Color2 = {}));
    let color2 = Color2[2]; // 'Green'
}
// 一些总结：
// 1. 尽量不用 any 类型，确实不确定类型可以用 unknown 类型；
// 2. 我们通常让 TypeScript 自己推导类型，如果没有特殊原因，不需要把类型显式注解为 boolean / number / bigint / string / symbol；
// 3. 当使用 const 关键字进行变量声明时，简单值类型会推导得更具体，变成类型字面量；
// 4. 对于对象的可选键，可以使用 ? 修饰符；对于对象的只读键，可以使用 readonly 修饰符；
// 5. 对于数组的整体只读性，可以使用 readonly 修饰符；
// 6. 对于元组的可选项，可以使用 ? 修饰符；对于元组的剩余元素类型，可以使用 ... 修饰符；
// 7. 一个枚举可以分成几次声明，TypeScript 将自动把各部分合并在一起，并自动推算索引值。
