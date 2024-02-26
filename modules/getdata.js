const reservationPeople = document.querySelector('#reservation__people');
const reservationDate = document.querySelector('#reservation__date');
const tourPeople = document.querySelector('#tour__people');
const tourDate = document.querySelector('#tour__date');

// const tourDate = document.
//     querySelector('.tour__select-wrapper_date .tour__select');
// const tourPeople = document.
//   querySelector('.tour__select-wrapper_people .tour__select');
// const reservationDate = document.
//   querySelector('.reservation__select-wrapper_date .reservation__select');
// const reservationPeople = document.
//   querySelector('.reservation__select-wrapper_people .reservation__select');

const getData = async () => {
  const result = await fetch('./date.json');
  const data = await result.json();
  return data;
};

const createDataElements = (data, classes) => {
  const elements = data.map(item => {
    // tour__option reservation__option
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

export const renderData = async () => {
  const data = await getData();
  const massMaxPeople = data.map(item => item['max-people']);
  const massMinPeople = data.map(item => item['min-people']);
  const maxCountPeople = Math.max.apply(null, massMaxPeople);
  const minCountPeople = Math.min.apply(null, massMinPeople);


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
};

const changeData = async (e) => {
  const data = await getData();
  console.log('data: ', data);
  const target = e.target;
  const countPeople = target.value;
  const newData = data.filter(item => {
    if (+countPeople >= item['min-people'] &&
    +countPeople <= item['max-people']) {
      return item;
    }
  });

  const tourDateElements = createDataElements(newData, ['tour__option']);
  tourDate.innerHTML =
  '<option value="" class="tour__option">Выбери дату</option>';
  tourDate.append(...tourDateElements);

  const reservationDateElements =
    createDataElements(newData, ['tour__option', 'reservation__option']);
  reservationDate.innerHTML =
    '<option value="" class="tour__option">Дата путешествия</option>';
  reservationDate.append(...reservationDateElements);
};

const changePeople = async (e) => {
  const data = await getData();
  console.log('data: ', data);
  const target = e.target;
  const targetValue = target.value;
  console.log('targetValue: ', targetValue);
};

reservationDate.addEventListener('change', changePeople);
tourDate.addEventListener('change', changePeople);


reservationPeople.addEventListener('change', changeData);
tourPeople.addEventListener('change', changeData);
