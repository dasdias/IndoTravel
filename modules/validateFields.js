const validateReservationForm = () => {
  const reservationInputName = document.getElementById('reservation__name');
  const reservationInputPhone = document.getElementById('reservation__phone');

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

export default validateReservationForm;
