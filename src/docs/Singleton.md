<!--
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
-->

# 单例模式 (`Singleton`)

## 认识代理模式

- 设计模式类型: 创建型模式
- 关注点: 如何创建对象,且隐藏创建对象的逻辑;
- 解决问题: 解决访问同一对象实例的问题,减少创建多个实例的消耗;
- 本质: 仅且只有一个实例对象;
- 应用场景: 配置管理器、日志系统、缓存系统、公共单一组件(如弹窗);
- 表现形式:
  - 饿汉型: 类加载时就完成单例对象初始化,不支持懒加载,线程安全;
  - 懒汉型: 类初始化后,在使用过程再获取单例对象,支持懒加载,线程不安全;
- 单例模式类型:
  - 饿汉型单例模式(加载实例化)
  - 懒汉型单例模式(首次使用时实例化)
  - new 型单例模式(首次 new 需先获取实例)

## 饿汉型单例模式

```ts
class HungrySingleton {
  /** 缓存单例对象 */
  private static instance: HungrySingleton = new HungrySingleton();
  /** 禁止 new 实例化单例对象 */
  private constructor() {}
  /** 提供访问单例对象的接口 */
  public static getInstance() {
    return HungrySingleton.instance;
  }
}

const h1 = HungrySingleton.getInstance();
const h2 = HungrySingleton.getInstance();
console.log(h1 === h2);
```

## 懒汉型单例模式

```ts
class LazySingleton {
  /** 缓存单例对象 */
  private static instance: LazySingleton;

  /** 禁止 new 实例化单例对象 */
  private constructor() {}

  /** 在首次使用时才进行初始化 */
  public static getInstance(): LazySingleton {
    if (!LazySingleton.instance) {
      LazySingleton.instance = new LazySingleton();
    }
    return LazySingleton.instance;
  }
}

const l1 = LazySingleton.getInstance();
const l2 = LazySingleton.getInstance();
console.log(l1 === l2);
```

## `new` 型单例模式

```ts
class CreateSingleton {
  /** 缓存单例对象 */
  private static instance: CreateSingleton;

  public constructor() {
    if (new.target === CreateSingleton) {
      !CreateSingleton.instance && (CreateSingleton.instance = this);
    }
    return CreateSingleton.instance;
  }

  /** 提供访问单例对象的接口 */
  public static getInstance(): CreateSingleton {
    if (!CreateSingleton.instance) {
      CreateSingleton.instance = new CreateSingleton();
    }
    return CreateSingleton.instance;
  }
}

const cs1 = new CreateSingleton();
const cs2 = new CreateSingleton();
const cs3 = CreateSingleton.getInstance();
console.log(cs1 === cs2);
console.log(cs1 === cs3);
```
