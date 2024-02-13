export const menuAnimation = () => {
  const duration = 400;
  const degrees = 180;

  const headerMenuButton = document.querySelector('.header__menu-button');
  headerMenuButton.style.transition = 'unset';

  const startAnimation = (duration, callback) => {
    let startTime = NaN;

    requestAnimationFrame(function step(timestamp) {
      startTime ||= timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress < 1) {
        requestAnimationFrame(step);
        callback(progress);
      } else {
        callback(Math.floor(progress));
      }
    });
  };

  headerMenuButton.addEventListener('click', () => {
    startAnimation(duration, (progress) => {
      const deg = progress * degrees;
      headerMenuButton.style.transform = `rotate(${deg}deg)`;
    });
  });
};
