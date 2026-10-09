const menu = () => {
  const popup = document.querySelector('.popup');
  const menuDialog = document.querySelector('.popup-dialog-menu');

  const openMenu = () => {
    popup.classList.add('active');
    menuDialog.classList.add('active');
  };

  const closeMenu = () => {
    menuDialog.classList.remove('active');
    setTimeout(() => popup.classList.remove('active'), 1000); // ждем окончания анимации меню (1s), прежде чем скрыть оверлей
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('.menu')) {  // бургер-меню
      popup.classList.contains('active') ? closeMenu() : openMenu();
      return;
    };

    if (e.target.closest('.close-menu') || // крестик закрытия
      e.target.closest('.menu-link') ||  // пункт-ссылка меню
      (menuDialog.classList.contains('active') && !e.target.closest('.popup-dialog-menu'))) {  // мимо меню
      closeMenu();
      return;
    };
  });
};

export default menu;