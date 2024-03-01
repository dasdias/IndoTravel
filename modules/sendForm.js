// const reservationForm = document.querySelector('.reservation__form');
// const footerForm = document.querySelector('.footer__form');
// const reservationTitle = document.querySelector('.reservation__title');
const reservationPrice = document.querySelector('.reservation__price');


const URL = 'https://jsonplaceholder.typicode.com/';

const fetchRequest = async (url, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };
    // собираем body если есть
    if (body) options.body = JSON.stringify(body);
    // собираем headers если есть
    if (headers) options.headers = headers;

    // отправляем запрос
    const response = await fetch(url, options);

    // если ответ положительный, обрабатываем ответ
    if (response.ok) {
      const data = await response.json();
      // если есть callback функция, вызываем её и передаём ответ от сервера
      if (callback) callback(null, data);
      return;
    }

    // если ответ от сервера с ошибкой, то вызываем ошибку и передаём статус
    throw new Error(`Ошибка ${response.status} ${response.statusText}`);
  } catch (error) {
    // при ошибке вызываем колбек функцию и передаём ошибку
    callback(error);
  }
};

const createModal = (title, description, round = false) => {
  const modalWrap = document.createElement('div');
  modalWrap.classList.add('modal-wrap');
  modalWrap.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
    padding-left: 10px;
  `;
  const modal = document.createElement('div');
  modal.classList.add('.modal-body');
  modal.style.cssText = `
    background-color: #ebebeb;
    max-width: 500px;
    width: 100%;
    padding: 30px 20px;
    border-radius: 10px;
    text-align: center;
  `;
  const titleElem = document.createElement('h2');
  titleElem.style.cssText = `
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 25px;
  `;
  titleElem.innerHTML = title;
  const descElem = document.createElement('p');
  descElem.style.cssText = `
    margin-bottom: 25px;
  `;
  descElem.textContent = description;


  modal.append(titleElem, descElem);

  if (round) {
    const roundElem = document.createElement('div');
    roundElem.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #2aff81;
    width: 50px;
    height: 50px;
    margin: 0 auto;
  `;

    const checkbox = document.createElement('div');
    checkbox.style.cssText = `
    background: #ffffff;
    clip-path: polygon(45% 64%, 84% 14%, 100% 28%, 47% 100%, 0 49%, 15% 32%);
    width: 20px;
    height: 20px;
  `;

    roundElem.append(checkbox);

    modal.append(roundElem);
  }
  modalWrap.append(modal);
  return {modalWrap, modal};
};

export const sendData = () => {
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    const formTarget = e.target;

    fetchRequest(URL + 'posts', {
      method: 'POST',
      callback(err, data) {
        if (err) {
          console.warn(err, data);
          formTarget.textContent = err;
          const {modalWrap} = createModal(`Упс... Что-то пошло не так`,
            `Не удалось отправить заявку.
            Пожалуйста, повторите отправку ещё раз`,
          );
          modalWrap.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('modal-wrap')) {
              target.remove();
            }
          });
          setTimeout(() => {
            modalWrap.remove();
          }, 6000);
          document.body.append(modalWrap);
          return;
        }
        const {modalWrap} = createModal(`Ваша заявка успешно <br> отправлена`,
          `Наши менеджеры свяжутся с вами в течении 3-х рабочих дней`, true);

        modalWrap.addEventListener('click', (e) => {
          const target = e.target;
          if (target.classList.contains('modal-wrap')) {
            target.remove();
          }
        });
        setTimeout(() => {
          modalWrap.remove();
        }, 6000);
        document.body.append(modalWrap);
      },
      body: {
        userId: Date.now(),
        title: `${formTarget.querySelector('.reservation__title')?.textContent ?
          `${formTarget.querySelector('.reservation__title').textContent}` :
          `${formTarget.querySelector('.footer__form-title').textContent}`} `,
        body: `${formTarget.dates?.value ?
            `Дата бронирования: ${formTarget.dates?.value};` : ''}
          ${formTarget.people?.value ?
            `Кол-во человек: ${formTarget.people?.value};` : ''}
          ${formTarget.name?.value ?
            `ФИО: ${formTarget.name?.value};` : ''}
          ${formTarget.phone?.value ?
            `Телефон: ${formTarget.phone?.value};` : ''}
          ${reservationPrice.textContent.trim() !== '0₽' ?
            `Цена общая: ${reservationPrice.textContent};` : ''}
          ${formTarget.mail?.value ? `E-mail: ${formTarget.mail?.value}` : ''}`,
      },
      headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
  });
};
