/*
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
 */

/** ======== 单例模式 ========
 *  类型: 创建型模式
 *  解决问题: 解决访问同一对象实例的问题,减少创建多个实例的消耗;
 *  应用场景: 配置管理器、日志系统、缓存系统、IO 读写、公共单一组件(如弹窗);
 *  实现技巧: 单例类有且仅有一个实例对象,该实例对象由自己创建;所访问的单例对象指向同一内存地址;
 *  编写秘诀: 1.加载模块或 new 操作立即实例化对象并缓存到变量或属性;
 *           2.在构造函数通过 new.target 检测是否 new 实例化操作,返回实例化内存地址;
 *           3.提供访问单例实例对象的接口 getInstance();
 *
 *  特别注意: 你无法阻挡别人通过 new 实例化来构建对象,因此需要进行处理;
 */

/** 加载时立即实例化单例实例; 禁用 new 实例化操作; */
export const Singleton1 = class Singleton {
  /** 加载时通过关键字 new 实例化单例对象 */
  private static readonly instance: Singleton = new Singleton();

  /** 提供对外访问单例实例接口 */
  public static getInstance() {
    return Singleton.instance;
  }

  /** 通过设置私有(private)构造函数;不允许通过 new 进行构造单例实例; */
  private constructor() {
    /** 单例实例的内部配置 */
  }

  /** 通过对外提供访问单例实例的非静态属性或方法 */
  public getInfo() {
    return `当前方案: 加载模块时,静态属性直接 new 实例化;构造函数私有化,不允许通过 new 实例化对象`;
  }
};

/** 拦截 new 实例化操作,返回 getInstance() 单例实例 */
export const Singleton2 = class Singleton {
  private static instance: Singleton;

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public constructor() {
    /** new.target 检测函数或构造函数是否通过关键字 new 进行构建实例化对象 */
    if (new.target === Singleton) {
      return Singleton.instance;
    }
  }

  public getInfo() {
    return `当前方案: 检测是否通过关键字 new 进行实例化; 并通过私有静态属性实例化或缓存单例实例`;
  }
};

/** 闭包构建单例实例,对外提供访问单例实例 */
export const Singleton3 = (function () {
  let instance: Record<string, any>;
  function createSingleton() {
    const obj: Record<string, any> = {
      getInfo() {
        return `当前方案: 通过闭包模式;内部变量缓存单例实例,函数实现构建单例逻辑,返回对外提供的访问实例的接口`;
      },
    };
    /** 定义对象的属性或方法 */
    return obj;
  }

  return {
    getInstance() {
      !instance && (instance = createSingleton());
      return instance;
    },
  };
})();
