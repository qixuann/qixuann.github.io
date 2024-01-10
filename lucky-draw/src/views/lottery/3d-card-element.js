import lotteryConfig from './lottery-config.js';
const { cardList, colCount, rowCount } = lotteryConfig;
import { scene, objects } from './3d-core.js';

const THREE = window.THREE;

const { CSS3DObject } = THREE;
const create3DCard = function(_objects = objects) {
  // 中奖的卡片要染色
  const cardListWinAll = lotteryConfig.cardListWinAll;
  const cardListWinAllIds = cardListWinAll.map(_ => _.id);

  for (let i = 0; i < cardList.length; i++) {
    const currentCardData = cardList[i];
    const element = document.createElement( 'div' );
    element.className = 'element';
    element.dataset.cardId = currentCardData.id; // 卡片唯一ID
    element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
    if (cardListWinAllIds.includes(currentCardData.id)) {
      element.classList.add('prize');
    }

    const symbol = document.createElement( 'div' );
    symbol.className = 'symbol';
    symbol.textContent = currentCardData.name;
    symbol.style.fontSize = '60px';
    element.appendChild( symbol );

    const objectCSS = new CSS3DObject( element );
    objectCSS.position.x = Math.random() * 4000 - 2000;
    objectCSS.position.y = Math.random() * 4000 - 2000;
    objectCSS.position.z = Math.random() * 4000 - 2000;
    scene.add( objectCSS );

    objects.push( objectCSS );
  }
}

export { create3DCard }
