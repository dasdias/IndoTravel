import {menu} from '/modules/menu.js';
import {accordion} from '/modules/accordion.js';
import {timer} from '/modules/timer.js';


const timerInit = () => {
  const timerElem = document.querySelector('.timer');
  const dataDedline = timerElem.dataset.deadline;
  timer(dataDedline);
};

const initTabs = () => {
  accordion();
};

const initMenu = () => {
  menu();
};
initTabs();
timerInit();
initMenu();

