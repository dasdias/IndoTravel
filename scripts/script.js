import {menu} from '/modules/menu.js';
import {accordion} from '/modules/accordion.js';
import {timer} from '/modules/timer.js';
import {flyOnScroll} from '/modules/animateScroll.js';
import {menuAnimation} from '/modules/menuanimation.js';
import {renderData} from '/modules/getdata.js';
import {sendData} from '/modules/sendForm.js';


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
flyOnScroll();
menuAnimation();
renderData();
sendData();

