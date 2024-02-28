import {declOfNum} from '/modules/timer.js';

const reservationPeople = document.querySelector('#reservation__people');
const reservationDate = document.querySelector('#reservation__date');
const tourPeople = document.querySelector('#tour__people');
const tourDate = document.querySelector('#tour__date');
const reservationData = document.querySelector('.reservation__data');
const reservationPrice = document.querySelector('.reservation__price');

const getData = async () => {
  const result = await fetch('./date.json');
  const data = await result.json();
  return data;
};

const createDataElements = (data, classes) => {
  const elements = data.map(item => {
    const option = document.createElement('option');
    option.classList.add(...classes);
    option.setAttribute('value', item.date);
    option.setAttribute('data-min-people', item['min-people']);
    option.setAttribute('data-max-people', item['max-people']);
    option.textContent = item.date;
    return option;
  });
  return elements;
};
const createPeopleElements =
  (data, classes, countMinPeople, countMaxPeople) => {
    const elements = [];
    for (countMinPeople; countMinPeople <= countMaxPeople; countMinPeople++) {
      const option = document.createElement('option');
      option.classList.add(...classes);
      option.setAttribute('value', countMinPeople);
      option.textContent = countMinPeople;
      elements.push(option);
    }
    return elements;
  };

const nimMaxPeople = (arr) => {
  const massMaxPeople = arr.map(item => item['max-people']);
  const massMinPeople = arr.map(item => item['min-people']);
  const maxCountPeople = Math.max.apply(null, massMaxPeople);
  const minCountPeople = Math.min.apply(null, massMinPeople);
  return {
    minCountPeople,
    maxCountPeople,
  };
};

const getSum = async (data, date, countPeople) => {
  const option = {
    month: 'long',
    day: 'numeric',
  };

  if (date && countPeople) {
    const arrtDate = date.split('-');
    const firstDate = Date.parse(arrtDate[0].
      trim().split('.').reverse().join('.'));
    const secondDate = Date.parse(arrtDate[1].
      trim().split('.').reverse().join('.'));
    const dateFirstParse = new Date(firstDate);
    const dateSecondParse = new Date(secondDate);

    data.filter((item) => {
      if (date === item.date) {
        reservationData.textContent = `${dateFirstParse.
          toLocaleString('ru', option)} - ${dateSecondParse.
          toLocaleString('ru', option)}, ${countPeople}
          ${declOfNum(countPeople, ['человек', 'человека', 'человек'])}`;
        reservationPrice.textContent = `
          ${new Intl.NumberFormat('ru-RU').format(item.price * +countPeople)}₽`;
      }
    });
  }
};

export const renderData = async () => {
  const data = await getData();
  const {minCountPeople, maxCountPeople} = nimMaxPeople(data);

  const tourDateElements = createDataElements(data, ['tour__option']);
  tourDate.innerHTML =
  '<option value="" class="tour__option">Выбери дату</option>';
  tourDate.append(...tourDateElements);

  const tourPeopleElements = createPeopleElements(data,
    ['tour__option'], minCountPeople, maxCountPeople);

  tourPeople.innerHTML = `
    <option value="" class="tour__option">Количество человек</option>`;
  tourPeople.append(...tourPeopleElements);

  const reservationDateElements =
    createDataElements(data, ['tour__option', 'reservation__option']);
  reservationDate.innerHTML =
    '<option value="" class="tour__option">Дата путешествия</option>';
  reservationDate.append(...reservationDateElements);

  const reservationPeopleElements = createPeopleElements(data,
    ['tour__option', 'reservation__option'], minCountPeople, maxCountPeople);

  reservationPeople.innerHTML = `<option value=""
    class="tour__option reservation__option">Количество человек</option>`;
  reservationPeople.append(...reservationPeopleElements);
  reservationPrice.textContent = `0₽`;
};

const changeDateTour = async (e) => {
  const data = await getData();
  const target = e.target;
  const countPeople = target.value;
  const tourDateValue = tourDate.value.trim();

  const newData = data.filter(item => {
    if (+countPeople >= item['min-people'] &&
    +countPeople <= item['max-people']) {
      return item;
    }
  });

  if (newData.length <= 0) {
    const tourDateElements = createDataElements(data, ['tour__option']);
    tourDate.innerHTML =
    '<option value="" class="tour__option">Выбери дату</option>';
    tourDate.append(...tourDateElements);
  } else {
    const tourDateElements = createDataElements(newData, ['tour__option']);
    tourDate.innerHTML =
    '<option value="" class="tour__option">Выбери дату</option>';
    tourDate.append(...tourDateElements);
  }

  if (tourDateValue) {
    tourDate.value = tourDateValue;
  }
};

const changePeopleTour = async (e) => {
  const data = await getData();
  const target = e.target;
  const targetValue = target.value;
  const currentValue = tourPeople.value;

  const newDatePeople = data.filter((item) => {
    if (targetValue === item.date) {
      return item;
    }
  });

  if (newDatePeople.length <= 0) {
    const {minCountPeople, maxCountPeople} = nimMaxPeople(data);

    const reservationPeopleElements = createPeopleElements(data,
      ['tour__option', 'reservation__option'], minCountPeople, maxCountPeople);

    tourPeople.innerHTML = `<option value=""
      class="tour__option reservation__option">Количество человек</option>`;
    tourPeople.append(...reservationPeopleElements);
  } else {
    const {minCountPeople, maxCountPeople} = nimMaxPeople(newDatePeople);

    const reservationPeopleElements = createPeopleElements(newDatePeople,
      ['tour__option', 'reservation__option'], minCountPeople, maxCountPeople);

    tourPeople.innerHTML = `<option value=""
      class="tour__option reservation__option">Количество человек</option>`;
    tourPeople.append(...reservationPeopleElements);
  }

  if (currentValue) {
    tourPeople.value = currentValue;
  }
};


const changeDateReserv = async (e) => {
  const data = await getData();
  const target = e.target;
  const countPeople = target.value.trim();
  const reservationDateValue = reservationDate.value.trim();

  const newData = data.filter(item => {
    if (+countPeople >= item['min-people'] &&
    +countPeople <= item['max-people']) {
      return item;
    }
  });

  if (newData.length <= 0) {
    const reservationDateElements =
      createDataElements(data, ['tour__option', 'reservation__option']);
    reservationDate.innerHTML =
      '<option value="" class="tour__option">Дата путешествия</option>';
    reservationDate.append(...reservationDateElements);
    reservationData.textContent = 'Выберите дату и кол-во человек';
    reservationPrice.textContent = `0₽`;
  } else {
    getSum(newData, reservationDateValue, countPeople);
    const reservationDateElements =
      createDataElements(newData, ['tour__option', 'reservation__option']);
    reservationDate.innerHTML =
      '<option value="" class="tour__option">Дата путешествия</option>';
    reservationDate.append(...reservationDateElements);
  }

  if (reservationDateValue) {
    reservationDate.value = reservationDateValue;
  }
};


const changePeopleReserv = async (e) => {
  const data = await getData();
  const target = e.target;
  const targetValue = target.value;
  const reservationPeopleValue = reservationPeople.value;

  const newDatePeople = data.filter((item) => {
    if (targetValue === item.date) {
      return item;
    }
  });

  if (newDatePeople.length <= 0) {
    const {minCountPeople, maxCountPeople} = nimMaxPeople(data);

    const reservationPeopleElements = createPeopleElements(data,
      ['tour__option', 'reservation__option'], minCountPeople, maxCountPeople);

    reservationPeople.innerHTML = `<option value=""
      class="tour__option reservation__option">Количество человек</option>`;
    reservationPeople.append(...reservationPeopleElements);
    reservationData.textContent = 'Выберите дату и кол-во человек';
    reservationPrice.textContent = `0₽`;
  } else {
    getSum(newDatePeople, targetValue, reservationPeopleValue);
    const {minCountPeople, maxCountPeople} = nimMaxPeople(newDatePeople);

    const reservationPeopleElements = createPeopleElements(newDatePeople,
      ['tour__option', 'reservation__option'], minCountPeople, maxCountPeople);

    reservationPeople.innerHTML = `<option value=""
      class="tour__option reservation__option">Количество человек</option>`;
    reservationPeople.append(...reservationPeopleElements);
  }

  if (reservationPeopleValue) {
    reservationPeople.value = reservationPeopleValue;
  }
};

reservationDate.addEventListener('change', changePeopleReserv);
reservationPeople.addEventListener('change', changeDateReserv);

tourDate.addEventListener('change', changePeopleTour);
tourPeople.addEventListener('change', changeDateTour);
