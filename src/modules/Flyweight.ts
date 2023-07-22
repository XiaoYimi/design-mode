/*
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
 */

/** ======== 享元模式 ========
 *  类型: 结构型模式
 *  解决问题: 解决重复构建对象(同质资源),减少内存消耗
 *  应用场景: 搜索展示(如百度地图图标 tooltips), react 源码、内存池、线程池、连接池等等
 *  实现技巧: 定义个搜集器,将未使用的的业务对象进行搜集,在使用过程中拿出来复用填充数据即可
 *  编写秘诀: 享元对象有 3 步骤: 初始化缓存列表,分配对象,回收对象; 使用时,先回收对象,再创建对象进行赋值,并记录待回收对象;
 */

export declare interface Temp {
  number: number;
  author: string;
  score: number;
}
/** ======== 使用闭包实现享元模式 ======== */
export const PoolFactory1 = (function () {
  /** 初始化池对象列表 */
  const list: Record<string, any>[] = [];

  /** 提供对外访问接口 */
  return {
    /** 构建对象(分配) */
    create: () => {
      if (!list.length) {
        /** 构造对象(同质资源)逻辑, 请自行编写(对象初始化默认值),此处仅使用 Temp 替代 */
        /** Node 环境无法使用 DOM 相关 API, 因此此处举例用 "模板转换" 作为案例; 因此此处进行模板初始化值 */
        const temp: Temp = {
          number: 0,
          author: '',
          score: 0,
        };

        return temp;
      } else {
        return list.pop();
      }
    },

    /** 回收对象 */
    recover: (temp: Temp) => {
      /** 此处可限制池对象列表的长度 */
      return list.push(temp);
    },
  };
})();

/** ======== 使用类对象实现享元模式 ======== */
export const PoolFactory2 = class PoolFactory {
  private caches: Temp[];
  constructor() {
    /** 初始化缓存列表 */
    this.caches = [];
  }

  /** 构建对象模板(分配对象) */
  create() {
    if (!this.caches.length) {
      const temp: Temp = {
        number: 0,
        author: '',
        score: 0,
      };

      return temp;
    } else {
      return this.caches.pop();
    }
  }

  /** 回收对象 */
  recover(temp: Temp) {
    return this.caches.push(temp);
  }
};
