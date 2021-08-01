"use strict";
// @ts-nocheck
// 03 函数
{
    /*
     * 函数声明
     * 通常需要注解参数的类型，而返回类型不要求必须注解。
     * 使用 ? 标记参数为可选的，声明函数的参数时，必要的参数放在前面，随后才是可选的参数。
     * 使用 ... 来指定剩余参数的类型。
     */
    function add(a, b) {
        return a + b;
    }
    add(1, 2);
    add(1, 'a'); // Error: 类型 "string" 的参数不能赋给类型 "number" 的参数
    function log(message, userId) {
        let time = new Date().toLocaleDateString();
        console.log(time, message, userId || 'Not signed in');
    }
    log('Page loaded');
    log('User signed in', 'da763be');
    function sumVariadicSafe(...numbers) {
        return numbers.reduce((total, n) => total + n, 0);
    }
    sumVariadicSafe(1, 2, 3);
    let log2 = (message, userId = 'Not signed in') => {
        let time = new Date().toLocaleDateString();
        console.log(time, message, userId || 'Not signed in');
    };
    function times(f, n) {
        for (let i = 0; i < n; i++) {
            f(i);
        }
    } // 上下文推导
    let filter = (array, f) => {
        let result = [];
        for (let i = 0; i < result.length; i++) {
            let item = array[i];
            if (f(item)) {
                result.push(item);
            }
        }
        return result;
    };
    filter([1, 2, 3], _ => _ > 2);
    filter(['a', 'b'], _ => _ !== 'b');
    // <T> 在调用签名中声明，Typescript 将在调用该类型的函数时为 T 绑定具体类型
    let numberFilter = (array, f) => {
        let result = [];
        for (let i = 0; i < result.length; i++) {
            let item = array[i];
            if (f(item)) {
                result.push(item);
            }
        }
        return result;
    };
    let myEvent = {
        target: document.querySelector('#button'),
        type: 'click'
    };
    /*
     * 类型驱动开发
     * 先草拟类型签名，然后填充值的编程风格
     */
    function map(array, f) {
        // 即使以前没见过 map 函数，也可以通过签名直观看到 map 的作用
    }
}
// 一些总结：
// 1. 声明泛型的位置不仅限定泛型的作用域，还决定 TypeScript 什么时候为泛型绑定具体的类型；
// 2. 如果想将泛型限制在一个类型上限，可以使用 <T extends MyType>，那么 T 可以是 MyType，也可以是 MyType 的子类型；
// 3. 可以为泛型指定一个默认类型
