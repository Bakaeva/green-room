const repairTypesPopup = () => {
  const popup = document.querySelector('.popup-repair-types');

  const openModal = () => {
    popup.classList.add('active');
  };

  const closeModal = () => {
    popup.classList.remove('active');
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('.link-list-menu a, .link-list-repair a')) {
      e.preventDefault();
      openModal();
      return;
    };

    if (e.target.matches('.popup-repair-types .close') ||  // крестик закрытия
      e.target.classList.contains('popup-repair-types')) { // мимо списка
      closeModal();
      return;
    };
  });
};

export default repairTypesPopup;