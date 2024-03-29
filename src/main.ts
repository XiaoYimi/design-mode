/*
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
 */

console.log(`\n Start learning design patterns ... \n`);

console.log(
  `Please you execute the 'yarn test:xxxx' script command in the command panel. Such as 'yarn test:delegate' \n`,
);

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
