const menu = () => {
  const popup = document.querySelector('.popup');
  const menuDialog = document.querySelector('.popup-dialog-menu');

  const openMenu = () => {
    popup.classList.add('active-menu');
    menuDialog.classList.add('active-menu');
  };

  const closeMenu = () => {
    menuDialog.classList.remove('active-menu');
    popup.classList.remove('active-menu');
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('.menu')) {  // бургер-меню
      popup.classList.contains('active-menu') ? closeMenu() : openMenu();
      return;
    };

    if (e.target.closest('.close-menu') || // крестик закрытия
      e.target.closest('.menu-link') ||  // пункт-ссылка меню
      !(e.target.closest('.popup-dialog-menu'))) {  // мимо меню
      closeMenu();
      return;
    };
  });
};

export default menu;