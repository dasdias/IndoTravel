export const menu = () => {
  const headerMenu = document.querySelector('.header__menu');
  const headerLink = document.querySelectorAll('.header__link');

  headerLink.forEach((elem) => {
    elem.addEventListener('click', () => {
      headerMenu.classList.remove('header__menu_active');
    });
  });

  document.addEventListener('click', (e) => {
    const target = e.target;

    if (!target.closest('.header__menu') &&
        headerMenu.classList.contains('header__menu_active') &&
        !target.closest('.header__menu-button')) {
      headerMenu.classList.remove('header__menu_active');
    }

    if (target.closest('.header__menu-button')) {
      headerMenu.classList.toggle('header__menu_active');
    }
  });
};
