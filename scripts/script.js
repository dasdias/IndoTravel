import {timer} from '/modules/timer.js';


const timerInit = () => {
  const timerElem = document.querySelector('.timer');
  const dataDedline = timerElem.dataset.deadline;
  timer(dataDedline);
};

timerInit();
