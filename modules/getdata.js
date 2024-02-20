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
const createPeopleElements = (data, classes, countPeople) => {
  console.log('countPeople: ', countPeople);
  const elements = [];
  for (let i = 0; i < countPeople; i++) {
    const option = document.createElement('option');
    option.classList.add(...classes);
    option.setAttribute('value', i + 1);
    option.textContent = i + 1;
    elements.push(option);
  }
  // const elements = data.map(item => {
  //   // tour__option reservation__option
  //   return option;
  // });
  return elements;
};

export const renderData = async () => {
  const data = await getData();
  const massMaxPeople = data.map(item => item['max-people']);
  const maxCountPeople = Math.max.apply(null, massMaxPeople);
  console.log('data: ', data);

  const tourDate = document.
    querySelector('.tour__select-wrapper_date .tour__select');
  const tourPeople = document.
    querySelector('.tour__select-wrapper_people .tour__select');
  const reservationDate = document.
    querySelector('.reservation__select-wrapper_date .reservation__select');
  const reservationPeople = document.
    querySelector('.reservation__select-wrapper_people .reservation__select');

  const tourDateElements = createDataElements(data, ['tour__option']);
  tourDate.innerHTML =
  '<option value="" class="tour__option">Выбери дату</option>';
  tourDate.append(...tourDateElements);

  const tourPeopleElements = createPeopleElements(data,
    ['tour__option'], maxCountPeople);

  tourPeople.innerHTML = `
    <option value="" class="tour__option">Количество человек</option>`;
  tourPeople.append(...tourPeopleElements);

  const reservationDateElements =
    createDataElements(data, ['tour__option', 'reservation__option']);
  reservationDate.innerHTML =
    '<option value="" class="tour__option">Дата путешествия</option>';
  reservationDate.append(...reservationDateElements);

  const reservationPeopleElements = createPeopleElements(data,
    ['tour__option', 'reservation__option'], maxCountPeople);

  reservationPeople.innerHTML = `<option value=""
    class="tour__option reservation__option">Количество человек</option>`;
  reservationPeople.append(...reservationPeopleElements);
};
