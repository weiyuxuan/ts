// @ts-nocheck

// 02 类型别名、并集和交集
{
  /*
   * 别名
   * 使用 type 关键字来声明类型别名，首字母要大写。
   * type 声明采用块级作用域。
   */
  type Age = number
  type Person = {
    name: string
    age: Age
  } // Age 实际上就是 number，这种写法可以让 Person 的结构定义更容易理解

  let age: Age = 55
  let driver: Person = {
    name: 'Jay',
    age: 35
  }

  /*
   * 并集与交集
   * 使用 ｜ 符号来实现类型并集。
   * 一个并集类型的值不一定属于并集中的某一个成员，还可以同时属于每个成员。
   * 使用 & 符号来实现交集类型。
   * 一个交集类型的值必须包含交集中的所有成员。
   */
  type Cat = {name: string, purrs: boolean}
  type Dog = {name: string, barks: boolean, wags: boolean}
  type CatOrDogOrBoth = Cat | Dog
  type CatAndDog = Cat & Dog

  let a: CatOrDogOrBoth = {
    name: 'cat',
    purrs: true
  }

  let b: CatOrDogOrBoth = {
    name: 'dog',
    barks: true,
    wags: true
  }

  let c: CatOrDogOrBoth = {
    name: 'both',
    barks: true,
    purrs: true,
    wags: true
  }

  let d: CatAndDog = {
    name: 'both',
    barks: true,
    purrs: true,
    wags: true
  }
}
