// @ts-nocheck

// 05 接口
{
  /*
   * 接口
   * 类型别名和接口算是同一概念的两种句法，但是有三个细微差别：
   * 1. 类型别名更通用，声明时右边可以是任意类型，而接口只能是结构体类型；
   * 2. 扩展接口时，TypeScript 会检查扩展的接口是否可赋值给被扩展的接口，而类型别名会尽可能合并；
   * 3. 同一作用域的多个同名接口会自动合并为一个接口（声明合并），而类型别名会报错。
   */
  type Food = {
    calories: number
    tasty: boolean
  }
  type Sushi = Food & {
    salty: boolean
  }

  interface Food2 {
    calories: number
    tasty: boolean
  }
  interface Sushi2 extends Food2 {
    salty: boolean
  }

  type A1 = {
    good(x: number): string
    bad(x: number): string
  }
  type B1 = {
    good(x: number | number): string
    bad(x: string): string
  } & A1

  interface A2 {
    good(x: number): string
    bad(x: number): string
  }
  interface B2 extends A2 {
    good(x: number | number): string
    bad(x: string): string // Error: 接口 “B” 错误扩展接口 “A”
                           // 不能将类型 “(x: string) => string” 分配给类型 “(x: number) => string”
  }

  interface User {
    name: string
  }
  interface User {
    age: number
  }

  let a: User = {
    name: 'alex',
    age: 28,
  }

  /*
   * 实现
   * 声明类时，可以使用 implements 来指定实现的接口，接口的属性必须是全部实现的，否则会报错。
   * 如果需要，在此基础上还可以实现其他方法和属性。
   */
  interface Animal {
    eat(food: string): void
    sleep(hour: number): void
  }
  class Cat implements Animal {
    eat(food: string) {
      console.log(`eat ${food}`)
    }
    sleep(hour: number) {
      console.log(`sleep ${hour} hour`)
    }
  }

  /*
   * 属性
   * 接口可以声明实例属性，但是不能带有可见性修饰符，也不能使用 static 关键字。
   * 但是可以使用 readonly 关键字来声明只读属性。
   */
  interface Person {
    readonly name: string
    eat(food: string): void
    sleep(hour: number): void
  }

  /*
   * 泛型
   * 泛型的作用域可以放在整个接口中，也可以放在特定的方法中。
   */
  interface MyMap<K, V> {
    get(Key: K): V
    set(key: K, value: V): void
    merge<K1, V1>(map: MyMap<K1, V1>): MyMap<K | K1, V | V1>
  }
}

// 一些总结：
// 1. 接口是对结构建模的方式，接口不生成 JavaScript 对象，只存在于编译时；
// 2. 类可以实现（implement）多个接口，但只能扩展（extends）自一个抽象类。
