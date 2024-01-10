import { cardList, colCount, rowCount } from './lottery-config-users.js';

const lotteryConfig = {
  prizeList: [
    {
      count: 1, // 总数量
      countRemain: 1, // 剩余的数量
      everyTimeGet: 1,
      name: "Apple Watch",
      detail: "Apple Watch",
      img: "",
      id: '1',
      round: 0,
      cardListWin: []
    },
    {
      count: 1, // 总数量
      countRemain: 1,
      everyTimeGet: 1,
      name: "Dyson Supersonic",
      detail: "Dyson Supersonic",
      img: "",
      id: '2',
      cardListWin: [],
      round: 0
    },
    {
      count: 1,
      countRemain: 1,
      everyTimeGet: 1,
      name: "Breo Massager",
      detail: "Breo Massager",
      id: '3',
      cardListWin: [],
      round: 0
    },
    {
      count: 1,
      countRemain: 1,
      everyTimeGet: 1,
      name: "Marshall Speaker",
      detail: "Marshall Speaker",
      id: '4',
      cardListWin: [],
      round: 0
    },
    {
      count: 1,
      countRemain: 1,
      everyTimeGet: 1,
      name: "Apple Ipad",
      detail: "Apple Ipad",
      id: '5',
      cardListWin: [],
      round: 0
    },
    {
      count: 1,
      countRemain: 1,
      everyTimeGet: 1,
      name: "Breo Massager",
      detail: "Breo Massager",
      id: '6',
      cardListWin: [],
      round: 0
    },
    {
      count: 1,
      countRemain: 1,
      everyTimeGet: 1,
      name: "Apple Watch",
      detail: "Apple Watch",
      id: '7',
      cardListWin: [],
      round: 0
    },
    {
      count: 1,
      countRemain: 1,
      everyTimeGet: 1,
      name: "Xiaomi Cleaning Robot",
      detail: "Xiaomi Cleaning Robot",
      id: '8',
      cardListWin: [],
      round: 0
    },
    {
      count: 1,
      countRemain: 1,
      everyTimeGet: 1,
      name: "Delonghi Coffee Machine",
      detail: "Delonghi Coffee Machine",
      id: '9',
      cardListWin: [],
      round: 0
    },
    {
      count: 1,
      countRemain: 1,
      everyTimeGet: 1,
      name: "Dyson Vacuum",
      detail: "Dyson Vacuum",
      id: '10',
      cardListWin: [],
      round: 0
    },
    {
      count: 1,
      countRemain: 1,
      everyTimeGet: 1,
      name: "Dyson Cool Air Fan",
      detail: "Dyson Cool Air Fan",
      id: '11',
      cardListWin: [],
      round: 0
    },

  ], // 奖品列表
  headerTitle: 'Welcome to Greenworld Logistics Anniversary Dinner Lucky Draw Session',
  currentPrize: null, // 当前抽奖的奖品
  colCount, rowCount, // table模式下行列数
  cardList, // 所有卡片的数据
  cardListWinAll: [], // 已经中奖的卡片
  cardListRemainAll: cardList, // 剩余未中奖的卡片
};
lotteryConfig.getCurrentPrize = (prizeId = lotteryConfig.currentPrize) => {
  return lotteryConfig.prizeList.find(_ => {
    return _.id === prizeId;
  });
};
lotteryConfig.getUserById = (id) => {
  return cardList.find(_ => _.id === id);
}

let isInit = false;
const localStorageKey = '___lottery___';
lotteryConfig.setLocalStorage = () => {
  const _lotteryConfig = lotteryConfig;
  _lotteryConfig.headerTitle = lotteryConfig.headerTitle;
  _lotteryConfig.currentPrize = lotteryConfig.currentPrize;
  _lotteryConfig.prizeList = lotteryConfig.prizeList;
  _lotteryConfig.cardListWinAll = lotteryConfig.cardListWinAll;
  _lotteryConfig.cardListRemainAll = lotteryConfig.cardListRemainAll;
  localStorage.setItem(localStorageKey, JSON.stringify(_lotteryConfig));
}
lotteryConfig.getLocalStorage = () => {
  if (isInit !== false) {
    return void 0;
  }
  isInit = true;
  const _lotteryConfigString = localStorage.getItem(localStorageKey);
  if (!_lotteryConfigString) {
    return void 0;
  }
  let _lotteryConfig = null;
  try {
    // TODO 数据有效性判断
    _lotteryConfig = JSON.parse(_lotteryConfigString)
  } catch (e) {
    console.log(e);
  }
  lotteryConfig.headerTitle = _lotteryConfig.headerTitle && _lotteryConfig.headerTitle;
  lotteryConfig.currentPrize = _lotteryConfig.currentPrize && _lotteryConfig.currentPrize;
  lotteryConfig.prizeList = _lotteryConfig.prizeList && _lotteryConfig.prizeList;
  lotteryConfig.cardListWinAll = _lotteryConfig.cardListWinAll && _lotteryConfig.cardListWinAll;
  lotteryConfig.cardListRemainAll = _lotteryConfig.cardListRemainAll && _lotteryConfig.cardListRemainAll;
}
lotteryConfig.clearLocalStorage = () => {
  localStorage.removeItem(localStorageKey)
}
console.log('lotteryConfig', lotteryConfig);
export default lotteryConfig;