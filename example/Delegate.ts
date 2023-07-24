/*
 * @Author: chenfengbukeyimi 2590856083@qq.com
 * @LastEditors: chenfengbukeyimi 2590856083@qq.com
 * Copyright (c) 2023 by chenfengbukeyimi, All Rights Reserved.
 */

/** ======== 代理模式 Proxy ========
 *  类型: 结构型模式
 *  解决问题: 解决直接访问源对象带来的问题(权限控制、程序安全等),因此提供"访问层"对源对象的访问进行拦截或加以控制;
 *  应用场景: (某平台)代售点、(某平台)外卖等等;
 *  实现技巧: 源对象(被代理对象) => 代理对象 => 统一代理方法(调用不同代理对象的方法实现代理逻辑)
 *  编写秘诀: 建议代理对象的接口方法一致化,减少代理分支判断;
 *
 *  特别注意:
 *    1.代理对象中存在属性(变量) 对源对象的引用;源对象应有基本功能实现或抽象实现;
 *    2.代理对象中的方法,建议与源对象方法保持同等结构(函数参数、函数输出)
 *    3.代理对象可实现差异化的属性或方法
 *
 *  专业术语:
 *  1.切面编程(AOP 编程)、适配器模式、装饰器模式
 *  2.与适配器模式、装饰器模式的区别:
 *    1) 代理模式主旨在于"拦截控制"
 *    2) 适配器模式主旨在于"接口适配"
 *    3) 装饰器模式主旨在于"功能增强"
 */

/** ======== 日常生活购票事例(官网、区域、机器人等三种方式进行购票) ======== */
/** 火车站点 */
declare type TrainStation = '广州' | '北京' | '上海' | '南京' | '湖北';
declare type TrainStationTicket = [TrainStation, TrainStation, number];

/** 购票方式 */
declare type BuyTicketWay = 'online' | 'offline';

/** 平台: 车票 */
class Ticket {
  /** 车票起点站 */
  public from: string;
  /** 车票终点站 */
  public to: string;
  /** 车票价格(含代理服务费) */
  public price: number;
  /** 代理服务费 */
  private service: number;
  /** 车险费(默认 3 元) */
  private premium: number;

  constructor(from: string, to: string, price: number, service: number) {
    this.from = from;
    this.to = to;
    this.price = price;
    this.service = service;
    this.premium = 3;
  }

  /** 车票总计费用 */
  getAllFee(): number {
    return this.price + this.service + this.premium;
  }
}

/** 平台: 火车站 */
class Train {
  /** 基本功能: 火车站站点票价表 */
  public getTrainStationTickets(): TrainStationTicket[] {
    return [
      ['广州', '北京', 100],
      ['广州', '上海', 80],
      ['广州', '南京', 75],
      ['广州', '湖北', 50],
      ['北京', '广州', 100],
      ['上海', '广州', 80],
      ['南京', '广州', 75],
      ['湖北', '广州', 50],
    ];
  }

  /** 基本功能: 火车站站点票官方价格 */
  public getTrainStationTicketOfficeFee(
    from: TrainStation,
    to: TrainStation,
  ): number {
    let price = 0;
    this.getTrainStationTickets().forEach(station => {
      const [f, t, p] = station;
      from === f && to === t && (price = p);
    });
    return price;
  }

  /** 基本功能: 火车站购票 */
  public buyTicket(
    from: TrainStation,
    to: TrainStation,
    isSelf: boolean = false,
    service: number = 0, // 增值服务费
  ): Ticket | null {
    if (!isSelf) {
      console.log('购票时,请出示本人身份证');
      return null;
    }
    if (service > 5) {
      console.log(
        '代售点服务费不能超过 5 元; 如有超过,请拨打 xxx-xxxxx 进行举报',
      );
      return null;
    }

    const price = this.getTrainStationTicketOfficeFee(from, to);
    const ticket = new Ticket(from, to, price, service);
    return ticket;
  }
}

console.log('====== 火车站(官网平台)购票功能, 官网代理费 0 元 ======');
const train = new Train();
const t1 = train.buyTicket('广州', '上海', true);
console.log(t1, t1?.getAllFee());

class TianheTrain {
  /** 源对象(被代理对象) */
  private train: Train;

  /** 线上购票服务费 2 元 */
  private onLineService: number;
  /** 线下购票服务费 1 元 */
  private offLineService: number;

  constructor() {
    this.train = new Train();
    this.onLineService = 2;
    this.offLineService = 1;
  }

  /** 获取当前代售点的站点票价格表 */
  public getTrainStationTickets(
    type: BuyTicketWay = 'online',
  ): TrainStationTicket[] {
    const list = this.train.getTrainStationTickets();
    const service =
      type === 'online' ? this.onLineService : this.offLineService;
    const result: TrainStationTicket[] = list.map(station => {
      const [f, t, p] = station;
      return [f, t, p + service];
    });
    return result;
  }

  /** 获取当前代售点的站点票价 */
  public getTrainStationTicketFee(
    from: TrainStation,
    to: TrainStation,
    type: BuyTicketWay,
  ): number {
    const officePrice = this.train.getTrainStationTicketOfficeFee(from, to);
    const delefateService =
      type === 'online' ? this.onLineService : this.offLineService;
    return officePrice + delefateService;
  }

  /** 获取代理(服务)费 */
  private getDelegateService(type: BuyTicketWay): number {
    return type === 'online' ? this.onLineService : this.offLineService;
  }

  /** 火车票代售点购票 */
  public buyTicket(
    from: TrainStation,
    to: TrainStation,
    isSelf: boolean = false,
    type: BuyTicketWay = 'offline',
    service: number = 0,
  ): Ticket | null {
    const ticket = this.train.buyTicket(
      from,
      to,
      isSelf,
      this.getDelegateService(type) + service,
    );
    return ticket;
  }
}

/** 某区域(天河)火车站购票功能 */
console.log(
  '====== 火车站代售点(区域平台)购票功能, 区域平台代理费 (线上购票 2 元,线下购票 1 元) ======',
);
const tianheTrain = new TianheTrain();
const t2 = tianheTrain.buyTicket('广州', '上海', true);
console.log(t2, t2?.getAllFee());

/** 机器人代售点购票功能 */
class Machine {
  /** 被代理对象 */
  private train: Train | TianheTrain;

  /** 用户信息 */
  private IDCard: number | null;
  private IsSelf: boolean;
  private Station: [TrainStation, TrainStation];
  private ButWay: BuyTicketWay;

  /** 机器人代理服务费 */
  private service: number;

  /** 默认代理点 */
  private DefTrain: TianheTrain = new TianheTrain();

  constructor() {
    this.service = 0.1;
    this.ButWay = 'online';
    this.train = this.DefTrain;

    this.IDCard = null;
    this.IsSelf = false;
    this.Station = ['广州', '广州'];
  }

  /** 读取身份信息 */
  loadIDCard() {
    this.IDCard = parseInt(Math.random().toString().slice(2, 20));
    this.IsSelf = this.IDCard ? true : false;
  }

  /** 选择购票代理点(一般机器不会设置该功能) */
  selectDelegate(train: Train | TianheTrain): void {
    this.train = train;
  }

  /** 选择购票站点 */
  selectStation(from: TrainStation, to: TrainStation): void {
    this.Station = [from, to];
  }

  /** 购票 */
  public buyTicket(): Ticket | null {
    if (!this.train) {
      console.log(`请选择车票代售点`);
      return null;
    }

    if (!(this.IDCard || this.IsSelf)) {
      console.log(`身份证读取失败,请重新操作`);
      this.recover();
      return null;
    }

    if (this.Station[0] === this.Station[1]) {
      console.log(`车票起点站与终点站不能一样,请重新选择`);
      return null;
    }

    const ticket = this.DefTrain.buyTicket(
      ...this.Station,
      this.IsSelf,
      this.ButWay,
      this.service,
    );

    return ticket;
  }

  /** 恢复初始状态 */
  recover() {
    this.IDCard = null;
    this.IsSelf = false;
    this.Station = ['广州', '广州'];
    this.train = new Train();
  }
}

console.log(`====== 火车站代售点(机器人)购票功能, 机器人代理费 0.1 元 ======`);
const machine = new Machine();
machine.loadIDCard();
machine.selectStation('广州', '上海');
const t3 = machine.buyTicket();
console.log(t3, t3?.getAllFee());
