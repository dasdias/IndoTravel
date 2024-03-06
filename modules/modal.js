import {loadStyle} from './loadStyle.js';
import {declOfNum} from '/modules/timer.js';

export const modal = async (data) => {
  await loadStyle('./css/modal.css');
  const modal = document.createElement('div');
  const modalElement = document.createElement('div');
  const modalBtnWrap = document.createElement('div');
  const modalBtnConfirm = document.createElement('button');
  const modalBtnEdit = document.createElement('button');
  const modaltitle = document.createElement('h2');
  const modalTextOne = document.createElement('p');
  const modalTextTwo = document.createElement('p');
  const modalTextTree = document.createElement('p');
  modal.classList.add('overlay', 'overlay_confirm');
  modalElement.classList.add('modal');
  modaltitle.classList.add('modal__title');
  modalBtnWrap.classList.add('modal__button');
  modalBtnConfirm.classList.add('modal__btn', 'modal__btn_confirm');
  modalBtnEdit.classList.add('modal__btn', 'modal__btn_edit');
  modalTextOne.classList.add('modal__text');
  modalTextTwo.classList.add('modal__text');
  modalTextTree.classList.add('modal__text');
  modalBtnConfirm.textContent = 'Подтверждаю';
  modalTextOne.textContent = `Бронирование путешествия в Индию на
    ${data.peopleCount} ${declOfNum(data.peopleCount,
  ['человек', 'человека', 'человек'])}`;
  modalTextTwo.textContent = `В даты: ${data.dates}`;
  modalTextTree.textContent = `Стоимость тура ${data.price}`;
  modalBtnEdit.textContent = 'Изменить данные';
  modaltitle.textContent = 'Подтверждение заявки';


  modalBtnWrap.append(modalBtnConfirm, modalBtnEdit);

  modalElement.append(modaltitle, modalTextOne,
    modalTextTwo, modalTextTree, modalBtnWrap);
  modal.append(modalElement);

  document.body.append(modal);

  return new Promise((resolve) => {
    modalBtnConfirm.addEventListener('click', () => {
      modal.remove();
      resolve(true);
    });

    modalBtnEdit.addEventListener('click', () => {
      modal.remove();
      resolve(false);
    });
  });
};
