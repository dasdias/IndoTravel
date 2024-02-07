export const timer = (dedline) => {
  const getTimeRemaining = () => {
    const dateStop = new Date(dedline).getTime();
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    // Получаем секунды. В одной секунде 1000 миллисекунд
    const second = Math.floor(timeRemaining / 1000 % 60);
    // Получаем минуты.
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
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
    const {minutes, hours, days} = getTimeRemaining();

    timerCountDays.textContent = days;
    timerCountHours.textContent = hours;
    timerCountMinutes.textContent = minutes;

    const timerId = setTimeout(renderTimer, 1000);
    console.log('timerId: ', timerId);
  };
  setTimeout(renderTimer);
};
