<!--
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
-->

# 代理模式 (`Delegate`)

## 认识代理模式

- 设计模式类型: 结构型模式
- 关注点: 对象之间的组合和关系
- 解决问题: 解决访问源对象带来的问题(对象创建、程序安全、权限控制)
- 本质: 拦截访问,缓存数据,控制程序开关;
- 应用场景: `JS Proxy`、代售点平台、远程代理服务、租房代理平台、外卖代理平台等等
- 表现形式:
  - 定义实现功能接口约束类,源对象功能与代理对象基于功能接口约束类(`implements`)进行实现功能接口;
  - 代理对象中在初始化事存在对源对象的引用(`private 变量`: 源对象);
  - 代理对象在实现源对象方法时可进行增强处理(程序安全、权限控制、其它增强操作)
- 代理模式类型
  - 静态代理
  - 虚拟代理
  - 缓存代理
  - 远程代理(暂未遇到过)

## 静态代理

在源对象功能实现前后进行相关拦截操作

```ts
/** 实现功能接口约束类 */
declare interface ITrain {
  buyTicket(): void;
}

/** 源对象 */
class SourceTrain implements ITrain {
  /** 源对象基本购票功能 */
  public buyTicket(): void {
    console.log(`源购票`);
  }
}

/** 代理对象 */
class ProxyTrain implements ITrain {
  /** 对源对象的引用 */
  private train: ITrain;

  constructor(train?: ITrain) {
    this.train = train ?? new SourceTrain();
  }

  /** 代理对象购票功能 */
  public buyTicket(): void {
    /** 对程序安全、权限控制等其它增强功能进行实现 */
    console.log(`增强功能`);
    this.train.buyTicket();
    console.log(`其它操作`);
  }
}

const pt = new ProxyTrain();
pt.buyTicket();
```

## 虚拟代理

代理对象提供占位,当需要的时候再去实例化,再把结果覆盖占位;

```ts
/** 源对象 */
class SouceImg {
  constructor() {
    this.src = '';
    this.name = '';
  }

  /** 设置图片路径 */
  public setSrc(src: string = '') {
    this.src = src;
  }
}

/** 代理对象 */
class ProxyImg {
  /** 缓存源对象实例 */
  private img: SouceImg;

  /** 懒加载时显示的默认图片 */
  private defSrc: string;

  constructor(img: SouceImg) {
    this.defSrc = 'xxxx';
    this.img = img;
  }

  /** 设置图片路径 */
  public setSrc(url: string) {
    /** 在获取到虚拟代理结果前进行其它相关操作 */
    this.img.setSrc(this.defSrc); // 提供占位

    const img = new Image();
    img.onload = () => {
      /** 实例化获取结果再覆盖占位内容 */
      this.img.setSrc(img.src);
    };
    img.src = url;
  }
}
```

## 缓存代理

代理对象中对结果进行缓存,当再次调用时,直接返回结果;

```ts
/** 源对象 */
class Calculator {
  /** 加法 */
  public add(...args: number[]): number {
    return args.reduce((init, prev) => init + prev);
  }
  /** 减法 */
  public subtr(...args: number[]): number {
    return args.reduce((init, prev) => init - prev);
  }
  /** 乘法 */
  public multi(...args: number[]): number {
    return args.reduce((init, prev) => init * prev, 1);
  }
  /** 除法 */
  public divis(...args: number[]): number {
    if (args.slice(1).includes(0)) {
      console.log(`分母不能为 0`);
      return 0;
    }
    return args.reduce((init, prev) => init / prev);
  }
}

/** 代理对象 */
class ProxyCalculator {
  /** 代理缓存内存地址 */
  private cache: Record<string, any>;
  private calculator: Calculator;

  constructor(calculator: Calculator) {
    this.cache = new Object();
    this.calculator = calculator;
  }

  public add(...args: number[]): number {
    const key: string = [this.add.name, args].join('-');
    for (const k in this.cache) {
      /** 有缓存则直接返回 */
      if (k === key) return this.cache[key];
    }
    /** 没有在缓存列表里,应当添加到缓存 */
    const value = this.calculator.add(...args);
    this.cache[key] = value;
    return value;
  }
}

const c = new Calculator();
// console.log(c.add(1, 2, 3, 4, 6));
// console.log(c.subtr(1, 2, 3, 4, 6));
// console.log(c.multi(1, 2, 3, 4, 5));
// console.log(c.divis(1, 2, 3, 4, 6));

const pc = new ProxyCalculator(c);
console.log(pc.add(12, 34, 5));
console.log(pc.add(12, 34, 8));
console.log(pc.add(12, 34, 5));
console.log(pc.add(12, 34, 5));
console.log(pc.add(23, 34, 54));
console.log(pc.add(12, 34, 5));
```
