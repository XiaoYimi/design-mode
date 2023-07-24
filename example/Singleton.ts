/*
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
 */

/** ======== 单例模式 Singleton ========
 *  类型: 创建型模式
 *  解决问题: 解决访问同一对象实例的问题,减少创建多个实例的消耗;
 *  应用场景: 配置管理器、日志系统、缓存系统、IO 读写、公共单一组件(如弹窗);
 *  实现技巧: 单例类有且仅有一个实例对象,该实例对象由自己创建;所访问的单例对象指向同一内存地址;
 *  编写秘诀: 1.加载模块或 new 操作立即实例化对象并缓存到变量或属性;
 *           2.在构造函数通过 new.target 检测是否 new 实例化操作,返回实例化内存地址;
 *           3.提供访问单例实例对象的接口 getInstance();
 *
 *  特别注意:
 *    1.你无法阻挡别人通过 new 实例化来构建对象,因此需要进行处理;
 *    2.区分饿汉式与懒汉式: 饿汉:加载就实例化; 懒汉:调用时再实例化;
 */

/** ======== 使用类实现单例模式(饿汉式) ======== */
export const Singleton1 = class Singleton {
  /** 类加载时,直接初始化,减少构建的过程开销 */
  private static instance: Singleton = new Singleton();

  /** 使用修饰符 private 禁止通过运算符 new 进行构造函数 */
  private constructor() {}

  /** 提供访问单例实例的静态方法 */
  public static getInstance(): Singleton {
    return Singleton.instance;
  }
};

/** ======== 使用类实现单例模式(懒汉式) ======== */
export const Singleton2 = class Singleton {
  /** 缓存单例实例 */
  private static instance: Singleton;

  public constructor() {
    /** new.target 检索是否通过运算符 new 进行构造函数; */
    if (new.target === Singleton) {
      return Singleton.instance;
    }
  }

  /** 提供访问单例实例的静态方法 */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
};

/** 特别注意: 使用前优先通过 Singleton.getInstance() 方法进行实例化单例对象 */
Singleton2.getInstance();
console.log(`/** ======== Singleton1 Start ======== */`);
// new Singleton1(); // 提示禁止使用 new 实例化对象
const s11 = Singleton1.getInstance();
const s12 = Singleton1.getInstance();
console.log(s11 === s12);
console.log(`/** ======== Singleton1 End ======== */`);

console.log(`/** ======== Singleton2 Start ======== */`);
const s21 = new Singleton2();
const s22 = new Singleton2();
const s23 = Singleton2.getInstance();
const s24 = Singleton2.getInstance();

console.log(s21 === s22);
console.log(s23 === s24);
console.log(s21 === s23);
console.log(Singleton2.getInstance() === s22);
console.log(`/** ======== Singleton2 End ======== */`);
