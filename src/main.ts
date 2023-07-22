/*
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
 */

/** ======== 单例模式 ======== */
import { Singleton1, Singleton2, Singleton3 } from './modules/Singleton';
import { type Temp, PoolFactory1, PoolFactory2 } from './modules/Flyweight';

/** ======== 测试 Demo ======== */

/** ======== 单例模式 ======== */
console.log(`/** ======== Singleton1 Start ======== */`);
const s11 = Singleton1.getInstance();
const s12 = Singleton1.getInstance();
console.log(s11 === s12);
console.log(s11.getInfo());
console.log(`/** ======== Singleton1 End ======== */`);

console.log(`/** ======== Singleton2 Start ======== */`);
const s21 = Singleton2.getInstance();
const s22 = Singleton2.getInstance();
const s23 = new Singleton2();
const s24 = new Singleton2();
console.log(s21 === s22);
console.log(s23 === s24);
console.log(s21 === s24);
console.log(s21.getInfo());
console.log(`/** ======== Singleton2 End ======== */`);

console.log(`/** ======== Singleton3 Start ======== */`);
const s31 = Singleton3.getInstance();
const s32 = Singleton3.getInstance();
console.log(s31 === s32);
console.log(s31.getInfo());
console.log(`/** ======== Singleton3 End ======== */`);

/** ======== 享元模式 ======== */

/** 请求回来的数据 */
declare interface User {
  id: number;
  name: string;
  level: number;
}
const getReqData = (): User[] => {
  const resList: User[] = [
    { id: 1, name: 'muchenfeng', level: 4 },
    { id: 2, name: 'qinmutian', level: 6 },
    { id: 3, name: 'xiaoyimi', level: 9 },
    { id: 4, name: 'qinyao', level: 8 },
    { id: 5, name: 'chenyulin', level: 2 },
    { id: 6, name: 'zhangsan', level: 2 },
    { id: 7, name: 'lisi', level: 1 },
    { id: 8, name: 'wangwu', level: 2 },
  ];
  return resList;
};

const pool2 = new PoolFactory2();
/** 当前展示的 temp 对象集合 */
const displayedList: Temp[] = [];
/** 请求数据并展示 */
const displayList = () => {
  /** 第一步,必须回收已展示的 temp 对象集合 */
  displayedList.forEach(temp => pool2.recover(temp));

  /** 第二步,根据请求数据进行构建对象(同质资源),并对已构建对象进行缓存 */
  const list = getReqData();
  console.log('before', list);
  list.forEach(option => {
    const temp = pool2.create() as Temp;
    temp.author = option.name;
    temp.number = option.id;
    temp.score = option.level;
    displayedList.push(temp);
  });

  console.log('after', displayedList);
};

displayList();
