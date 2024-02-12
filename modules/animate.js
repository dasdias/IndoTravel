export const flyOnScroll = () => {
  const docEl = document.documentElement;
  let clientWidth = NaN;
  let flyElem = '';
  let flyElemAvalible = false;

  clientWidth = docEl.clientWidth;

  const createFlyElement = () => {
    const fly = document.createElement('div');
    fly.classList.add('fly');
    clientWidth = docEl.clientWidth;

    fly.style.cssText = `
      position: fixed;
      width: 50px;
      height: 50px;
      right: 0;
      bottom: 0;
      pointer-events: none;
      background: url('./img/airplane.svg') center/contain no-repeat;
    `;
    document.body.append(fly);
    flyElemAvalible = false;
    return fly;
  };


  const calcPositionFly = () => {
    const maxHeight = docEl.clientHeight - flyElem.clientHeight;
    const maxScroll = docEl.scrollHeight - docEl.clientHeight;
    const percentScroll = (window.scrollY * 100) / maxScroll;

    const bottom = maxHeight * (percentScroll / 100);
    if (flyElem) {
      flyElem.style.transform = `translateY(-${bottom}px)`;
    }
  };

  if (clientWidth >= 758) {
    flyElem = createFlyElement();
    calcPositionFly();
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(calcPositionFly);
  });

  window.addEventListener('resize', () => {
    clientWidth = docEl.clientWidth;
    if (clientWidth < 758) {
      console.log('flyElem: ', flyElem);
      if (flyElem) {
        console.log('remove');
        flyElem.remove();
      }
      flyElemAvalible = true;
    } else {
      if (flyElemAvalible) {
        calcPositionFly();
        flyElem = createFlyElement();
        flyElemAvalible = false;
        console.log('create > 758');
      }
    }
  });
};
