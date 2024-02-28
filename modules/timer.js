let timerId = 0;

export const declOfNum = (number, words) => words[
  (number % 100 > 4 && number % 100 < 20) ?
  2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];

export const timer = (dedline) => {
  const getTimeRemaining = () => {
    const dateStop = new Date(dedline).getTime();
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    // Получаем секунды. В одной секунде 1000 миллисекунд
    const second = Math.floor(timeRemaining / 1000 % 60);
    // Получаем минуты.
    const minutes = Math.ceil(timeRemaining / 1000 / 60 % 60);
    // Получаем часы.
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    // Получаем дни.
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    return {timeRemaining, second, minutes, hours, days};
  };

  const renderTimer = () => {
    const timerCountDays = document.querySelector('.timer__count_days');
    const timerCountHours = document.querySelector('.timer__count_hours');
    const timerCountMinutes = document.querySelector('.timer__count_minutes');
    const timerUnitsDays = document.querySelector('.timer__units_days');
    const timerUnitsHours = document.querySelector('.timer__units_hours');
    const timerUnitsMinutes = document.querySelector('.timer__units_minutes');
    const heroText = document.querySelector('.hero__text');
    const heroTimer = document.querySelector('.hero__timer');
    clearTimeout(timerId);
    const {timeRemaining, minutes, hours, days} = getTimeRemaining();

    if (timeRemaining < 0) {
      heroText.remove();
      heroTimer.remove();
    } else {
      timerId = setTimeout(renderTimer, 1000);

      timerCountDays.textContent = days;
      timerCountHours.textContent = hours;
      timerCountMinutes.textContent = minutes;
      timerUnitsMinutes.textContent = declOfNum(minutes,
        ['минута', 'минуты', 'минут']);
      timerUnitsHours.textContent = declOfNum(hours,
        ['час', 'часа', 'часов']);
      timerUnitsDays.textContent = declOfNum(days,
        ['день', 'дня', 'дней']);
    }
  };
  renderTimer();
};
