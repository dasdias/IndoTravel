export const menu = () => {
  const headerMenuButton = document.querySelector('.header__menu-button');
  const headerMenu = document.querySelector('.header__menu');

  headerMenuButton.addEventListener('click', () => {
    headerMenu.classList.toggle('header__menu_active');
  });
};
