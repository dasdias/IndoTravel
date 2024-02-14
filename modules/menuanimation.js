export const menuAnimation = () => {
  const duration = 400;
  const degrees = 180;
  const menuScale = 100;
  let flag = 1;

  const headerMenuButton = document.querySelector('.header__menu-button');
  const headerMenu = document.querySelector('.header__menu');
  headerMenuButton.style.transition = 'unset';
  headerMenu.style.transition = 'unset';

  const startAnimation = (duration, callback) => {
    let startTime = NaN;
    let progress = NaN;

    requestAnimationFrame(function step(timestamp) {
      startTime ||= timestamp;
      if (flag % 2 === 1) {
        progress = (timestamp - startTime) / duration;

        if (progress < 1) {
          flag = 1;
          requestAnimationFrame(step);
          callback(progress);
        } else {
          flag = 2;
          callback(Math.floor(progress));
        }
      } else {
        progress = (menuScale / 100) - ((timestamp - startTime) / duration);
        if (progress > 0) {
          flag = 2;
          requestAnimationFrame(step);
          callback(progress);
        } else {
          flag = 1;
          callback(Math.ceil(progress));
        }
      }
    });
  };

  headerMenuButton.addEventListener('click', () => {
    if (!headerMenu.classList.contains('header__menu_active')) {
      flag = 1;
    }
    startAnimation(duration, (progress) => {
      const deg = progress * degrees;
      const scale = progress;
      headerMenuButton.style.transform = `rotate(${deg}deg)`;
      headerMenu.style.transform = `scale(${scale})`;
    });
  });
};
