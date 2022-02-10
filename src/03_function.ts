// @ts-nocheck

// 03 函数
{
  /*
   * 函数声明
   * 通常需要注解参数的类型，而返回类型不要求必须注解。
   * 使用 ? 标记参数为可选的，声明函数的参数时，必要的参数放在前面，随后才是可选的参数。
   * 使用 ... 来指定剩余参数的类型。
   */
  function add(a: number, b: number) {
    return a + b
  }
  add(1, 2)
  add(1, 'a') // Error: 类型 "string" 的参数不能赋给类型 "number" 的参数

  function log(message: string, userId?: string) {
    let time = new Date().toLocaleDateString();
    console.log(time, message, userId || 'Not signed in')
  }
  log('Page loaded')
  log('User signed in', 'da763be')

  function sumVariadicSafe(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0)
  }
  sumVariadicSafe(1, 2, 3)

  /*
   * 调用签名
   * 即是函数自身的完整类型，它的句法和箭头函数十分相似。
   * 如果把函数作为参数传给另一个函数，或者作为其他函数的返回值，就需要使用这样的句法注解类型。
   */
  type Log = (message: string, userId?: string) => void
  let log2: Log = (message, userId = 'Not signed in') => {
    let time = new Date().toLocaleDateString();
    console.log(time, message, userId || 'Not signed in')
  }

  function times(f: (index: number) => void, n: number) {
    for(let i = 0; i < n; i++) {
      f(i)
    }
  } // 上下文推导

  /*
   * 重载函数
   * 以多种不同的方式（传参形式）来调用一个函数，参数类型可以定义多种。
   * 一般来说，声明了重载的函数类型，每个重载的签名都必须被函数实现。
   */
  type Reserve = {
    (from: Date, to: Date, destination: string): string,
    (from: Date, destination: string): string
  }

  const reserve: Reserve = (from, toOrDest, destination?) => {
    if (typeof toOrDest === 'string') {
      return `Date: ${from} - ${toOrDest}, Dest: ${destination}`
    } else {
      return `Date: ${from}, Dest: ${destination}`
    }
  }

  type CreateElement = {
    (tag: 'a'): HTMLAnchorElement
    (tag: 'canvas'): HTMLCanvasElement
    (tag: 'table'): HTMLTableElement
    (tag: string): HTMLElement
  }

  /*
   * 多态
   * 当无法知道具体类型，并且想确认传入的确实是那个类型时，使用泛型。泛型是在类型层面施加约束的占位类型，也称多态类型参数。
   * 泛型参数使用尖括号 <> 声明，可以理解成 type 关键字的缩写。
   * 泛型让函数的功能更具有一般性，比接受具体类型的函数更强大。
   */
  type Filter = {
    <T>(array: T[], f:(item: T) => boolean): T[]
  }
  let filter: Filter = (array, f) => {
    let result = []
    for(let i = 0; i < result.length; i++) {
      let item = array[i]
      if (f(item)) {
        result.push(item)
      }
    }
    return result
  }
  filter([1, 2, 3], _ => _ > 2)
  filter(['a', 'b'], _ => _ !== 'b')

  type Filter2<T> = {
    (array: T[], f:(item: T) => boolean): T[]
  }
  // <T> 在调用签名中声明，Typescript 将在调用该类型的函数时为 T 绑定具体类型
  let numberFilter: Filter2<number> = (array, f) => {
    let result = []
    for(let i = 0; i < result.length; i++) {
      let item = array[i]
      if (f(item)) {
        result.push(item)
      }
    }
    return result
  }

  type MyEvent<T> = {
    target: T,
    type: string
  }
  type TimedEvent<T> = {
    event: MyEvent<T>, // 泛型别名
    from: Date,
    to: Date
  }
  type ButtonEvent = MyEvent<HTMLButtonElement> // 泛型别名
  let myEvent: MyEvent<HTMLButtonElement | null> = {
    target: document.querySelector('#button'),
    type: 'click'
  }

  type MyDefaultEvent<T extends HTMLElement = HTMLElement> = { // 泛型限定 + 默认类型
    target: T,
    type: string
  }

  /*
   * 类型驱动开发
   * 先草拟类型签名，然后填充值的编程风格
   */
  function map<T, U>(array: T[], f: (item: T) => U): U[] {
    // 即使以前没见过 map 函数，也可以通过签名直观看到 map 的作用
    const result: U[] = []
    for(let i = 0; i < array.length; i++) {
      result.push(f(array[i]))
    }
    return result
  }
}

// 一些总结：
// 1. 声明泛型的位置不仅限定泛型的作用域，还决定 TypeScript 什么时候为泛型绑定具体的类型；
// 2. 如果想将泛型限制在一个类型上限，可以使用 <T extends MyType>，那么 T 可以是 MyType，也可以是 MyType 的子类型；
// 3. 可以为泛型指定一个默认类型。
