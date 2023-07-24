/*
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
 */

/** ======== 享元模式 Flyweight ========
 *  类型: 结构型模式
 *  解决问题: 解决重复构建对象(同质资源),减少内存消耗;
 *  应用场景: 搜索展示(如百度地图图标 tooltips), react 源码、内存池、线程池、连接池等等
 *  实现技巧: 定义个搜集器,将未使用的的业务对象进行搜集,在使用过程中拿出来复用填充数据即可
 *  编写秘诀: 享元对象有 3 步骤: 初始化缓存列表,分配对象,回收对象; 使用时,先回收对象,再创建对象进行赋值,并记录待回收对象;
 *
 *  特别注意:
 *    1.同质资源: 是指具备同一类对象的具体描述; (比如: (同一类)杯子, 有颜色(具体描述)白色、黑色、红色等等)
 */

/** 碗的大小类型(小|中|大) */
declare type BowlType = 'small' | 'middle' | 'large';

/** 碗类 */
class Bowl {
  public type: BowlType;
  constructor() {
    /** 自行定义该碗的具体描述 */
    this.type = 'middle';
  }
}

/** 碗类搜纳盒 */
class BowlManage {
  /** 碗的存放(缓存)位置 */
  public bowlList: Bowl[];

  constructor() {
    /** 初始化碗的存放(缓存)位置 */
    this.bowlList = [];
  }

  /** 拿出碗 */
  produce(): Bowl {
    if (!this.bowlList.length) {
      /** 碗的存放(缓存)位置没有碗,则需要去购买新碗(实例化碗对象) */
      const bowl = new Bowl();
      console.log('没碗了,得去购买碗');
      return bowl;
    } else {
      /** 碗的存放(缓存)位置有碗,直接取出即可 */
      return this.bowlList.pop() as Bowl;
    }
  }

  /** 回收碗: 饭后洗干净返回碗的存放(缓存)位置 */
  recover(bowl: Bowl): void {
    this.bowlList.push(bowl);
  }
}

/** ======== 入新房吃席,添新碗 ======== */
const bowl_manage = new BowlManage();

/** 摆桌的碗数,一桌多少(人)碗 */
const tables: Bowl[] = [];

/** ======== 午饭期间这一桌来了 3 客人 ======== */
// /** 回收当前摆桌上的碗 */
// tables.forEach(bowl => bowl_manage.recover(bowl));
// Array.from({ length: 3 }).forEach(man => {
//   /** 拿出碗给客人 */
//   const bowl = bowl_manage.produce();
//   /** 把碗摆上桌 */
//   tables.push(bowl);
// });

// /** ======== 晚饭期间这一桌来了 5 客人 ======== */
// tables.forEach(bowl => bowl_manage.recover(bowl));
// Array.from({ length: 5 }).forEach(man => {
//   /** 拿出碗给客人 */
//   const bowl = bowl_manage.produce();
//   /** 把碗摆上桌 */
//   tables.push(bowl);
// });

/** 将以上程序代码封装 */
function test(length: number) {
  console.log('准备吃席啦');
  tables.forEach(bowl => bowl_manage.recover(bowl));
  Array.from({ length }).forEach(man => {
    /** 拿出碗给客人 */
    const bowl = bowl_manage.produce();
    /** 把碗摆上桌 */
    tables.push(bowl);
  });
  console.log('吃席结束啦');
}

console.log(`午饭期间 start`);
test(3); // 因为没碗,来 3 人,购买了 3 个碗
console.log(`午饭期间 end`);

console.log(`晚饭期间 start`);
test(5); // 因为有 3 碗,来 5 人;缺少 2 个碗,因此购买 2 个碗
console.log(`晚饭期间 end`);

/** 以后这摆桌上无论来多少人,都是重复"收拾碗(销毁对象),拿出碗(创建对象)"的过程;
 *  由于这里使用"享元模式",解决了"收拾碗(销毁对象),拿出碗(创建对象)"这些过程上的开销;
 *  解决了性能优化问题(创建|销毁对象),又解决了程序代码重用问题;提高程序代码的有效阅读能力;
 */
