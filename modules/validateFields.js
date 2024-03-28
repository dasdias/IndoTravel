const reservationInputPhone = document.getElementById('reservation__phone');
const reservationInputName = document.getElementById('reservation__name');


export const validateReservationForm = () => {
  const regexName = /[^А-ЯЁа-яё\s]/gi;
  const regexPhone = /[^+\d]/gi;

  reservationInputName.addEventListener('input', () => {
    const result = reservationInputName.value.replace(regexName, '');
    reservationInputName.value = result;
  });

  reservationInputPhone.addEventListener('input', () => {
    const result = reservationInputPhone.value.replace(regexPhone, '');
    reservationInputPhone.value = result;
  });
};

const checkFieldName = (checkMass = []) => {
  if (checkMass?.length < 3) {
    reservationInputName.style.border = `1px solid red`;
    reservationInputName.style.borderRadius = `8px`;
    return false;
  } else {
    reservationInputName.style.border = ``;
    reservationInputName.style.borderRadius = ``;
    return true;
  }
};


export const validateName = () => {
  const regexWorldName = /[а-яА-ЯёЁ\w-]+/ig;
  let countWorld = reservationInputName.value.match(regexWorldName);

  reservationInputName.addEventListener('input', () => {
    countWorld = reservationInputName.value.match(regexWorldName);
    return checkFieldName(countWorld);
  });

  return checkFieldName(countWorld);
};
