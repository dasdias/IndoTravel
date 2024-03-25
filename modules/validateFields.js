const validateReservationForm = () => {
  const reservationInputName = document.
    querySelector('.reservation__input_name');

  const regexName = /[^А-ЯЁа-яё ]/gi;

  reservationInputName.addEventListener('input', () => {
    const result = reservationInputName.value.replace(regexName, '');
    reservationInputName.value = result;
  });
};

export default validateReservationForm;
