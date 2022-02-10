// @ts-nocheck

// 04 类
{
  /*
   * 访问修饰符
   * public: 任何地方都可以访问。这是默认的访问级别。
   * protected: 只可在当前类和子类中访问。不能在外部访问。
   * private: 只可在当前类中访问。
   */
  class Parent {
    public name: string
    protected age: number
    private sex: string

    constructor(name: string, age: number, sex: string) {
      this.name = name
      this.age = age
      this.sex = sex
    }

    say() {
      console.log('name', this.name)
      console.log('age', this.age)
      console.log('sex', this.sex)
    }
  }

  class Child extends Parent {
    constructor(name: string, age: number, sex: string) {
      super(name, age, sex)
    }

    say() {
      console.log('name', this.name)
      console.log('age', this.age)
      console.log('sex', this.sex) // Error: 属性 “sex” 为私有属性，只能在类 “Parent” 中访问
    }
  }

  const me = new Child('alex', 28, 'male')

  me.name
  me.age // Error: 属性 “age” 受保护，只能在类 “Parent” 及其子类中访问
  me.sex // Error: 属性 “sex” 为私有属性，只能在类 “Parent” 中访问

  /*
   * 只读修饰符
   * readonly: 只读属性，只能在初始化之后被赋值一次。
   */
  class Person {
    readonly name: string
    constructor(name: string) {
      this.name = name
    }
    say() {
      console.log(`我的名字叫${this.name}`)
    }
  }

  const person = new Person('小可爱')
  person.say() // 我的名字叫小可爱
  person.name = '大可爱' // Error: 无法赋值给 “name” ，因为它是只读属性

  /*
   * 静态修饰符
   * static: 静态属性，可以通过类名访问。
   */
  class Service {
    static url: string = 'http://test.com'
  }

  const service = new Service()
  Service.url // http://test.com
  service.url // Error: 属性 “url” 为静态属性，只能在类 “Service” 中访问

  /*
   * 抽象类
   * abstract: 抽象类，不允许被实例化。抽象类中的抽象方法必须被子类实现。
   */
  abstract class Animal {
    name: string // Error: 属性“name”没有初始化表达式，且未在构造函数中明确赋值
    walk(): void {
      console.log('walk')
    }
    abstract say(): void
  }

  class Cat extends Animal {
    say() {
      console.log('meow')
    }
  }

  const animal = new Animal() // Error: 无法创建抽象类的实例
  const cat = new Cat()

  /*
   * this type
   * this 可以用于注解方法的返回类型，表示方法的返回值类型是调用它的类的实例。
   * 对于链式调用，这是一个特别便利的特性。
   */
  class Set {
    has(value: any): boolean {
      // ...
    }
    add(value: any): this {
      // ...
    }
  }

  /*
   * 泛型
   * 泛型的作用域可以放在整个类中，也可以放在特定的方法中。
   */
  class MyMap<K, V> { // 声明类时绑定作用域为整个类的泛型
    constructor(initialKey: K, initialValue: V) { // 构造方法中不能声明泛型
      // ...
    }
    get(Key: K): V {
      // ...
    }
    set(key: K, value: V): void {
      // ...
    }
    merge<K1, V1>(map: MyMap<K1, V1>): MyMap<K | K1, V | V1> { // 实例方法可以访问类的泛型，也可以自己声明泛型
      // ...
    }
    static of<K, V>(k: K, v: V): MyMap<K, V> { // 静态方法不能访问类的泛型，但可以自己声明泛型
      // ...
    }
  }
}

// 一些总结：
// 1. 类使用 class 关键字声明。扩展类时使用 extends 关键字；
// 2. 类可以是具体的，也可以是抽象的（abstract）。抽象类可以有抽象方法和抽象属性；
// 3. 方法的可见性可以是 public，protected，private。默认是 public。方法分实例方法和静态方法；
// 4. 类可以有实例属性，可见性可以是 public，protected，private。默认是 public。实例属性可以在构造函数中初始化。
