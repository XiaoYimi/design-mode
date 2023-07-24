<!--
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
-->

# 享元模式 (`Flyweight`)

## 认识享元模式

- 设计模式类型: 结构型模式
- 关注点: 对象之间的组合和关系;
- 解决问题: 解决创建同质资源对象次数的问题,减少创建与销毁的开销;
- 本质: 合理利用已有的同质资源对象,通过回收与重新分配资源达到减少创建对象次数;
- 应用场景: 百度 `mask` 图标、`react` 源码、列表搜索、池化技术(内存池、线程池、连接池)等等
- 表现形式:
  - 定义管理器类,内部缓存同质资源对象列表,并定义分配与回收方法;

## 享元模式场景

```ts
/** ======== 列表搜索案例 ======== */
/** 列表元素内容(同质资源) */
class ListItem {
  public author: string;
  public level: number;
  public id?: number;

  /** 构建同质资源 */
  public constructor(author?: string, level?: number) {
    this.author = author ?? '';
    this.level = level ?? 0;
  }

  /** 恢复初始值 */
  public reset() {
    this.author = '';
    this.level = 0;
    this.id = undefined;
  }
}

/** 同质资源管理类 */
class StoreManage {
  /** 缓存同质资源的仓库 */
  private store: ListItem[];

  constructor() {
    this.store = [];
  }

  /** 分配对象 */
  create() {
    let item;
    if (!this.store.length) {
      item = new ListItem();
      console.log(`我被创建了`);
      return item;
    } else {
      item = this.store.pop() as ListItem;
      item.reset();
    }
    return item;
  }

  /** 回收对象 */
  recover(item: ListItem) {
    this.store.push(item);
  }
}

/** 展示的内容列表 */
const displayList: ListItem[] = [];
const store = new StoreManage();
const getList = (length: number) => {
  /** 此处逻辑,一般人都会先根据请求列表数据创建新的展示内容列表(存在 n 次(条)创建开销),然后直接赋值 */
  /** 享元模式:解决同质资源对象多次创建的开销;因此先回收内容列表项,再进行重新分配赋值即可;因此减少创建对象的次数 */
  while (displayList.length) {
    const item = displayList.pop() as ListItem;
    item.reset();
    store.recover(item);
  }

  /** 请求列表数据; 条数由 length 决定 */
  Array.from({ length }).forEach((_, index) => {
    const item = store.create();
    item.reset();

    item.id = index;
    item.author = Math.random().toString().slice(2, 20);
    item.level = Math.floor(Math.random() * 10);

    displayList.push(item);
  });
};

/** 第一次搜索,创建对象 5 次 */
getList(5);
console.log(`第一次搜索,展示内容`, displayList);

/** 第二次搜索, 因仓库有对象,故不用创建 */
getList(3);
console.log(`第二次搜索,展示内容`, displayList);

/** 第三次搜索, 因仓库对象数与请求数相差 2,故创建 2 次 */
getList(7);
console.log(`第三次搜索,展示内容`, displayList);
```
