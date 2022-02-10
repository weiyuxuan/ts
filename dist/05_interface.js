"use strict";
// @ts-nocheck
// 05 接口
{
    let a = {
        name: 'alex',
        age: 28,
    };
    class Cat {
        eat(food) {
            console.log(`eat ${food}`);
        }
        sleep(hour) {
            console.log(`sleep ${hour} hour`);
        }
    }
}
// 一些总结：
// 1. 接口是对结构建模的方式，接口不生成 JavaScript 对象，只存在于编译时；
// 2. 类可以实现（implement）多个接口，但只能扩展（extends）自一个抽象类。
