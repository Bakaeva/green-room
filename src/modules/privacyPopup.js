const privacyPopup = () => {
  const popup = document.querySelector('.popup-privacy');

  const openModal = () => {
    popup.classList.add('active');
  };

  const closeModal = () => {
    popup.classList.remove('active');
  };

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('link-privacy')) {
      e.preventDefault();
      openModal();
      return;
    };

    if (e.target.matches('.popup-privacy .close') ||  // крестик закрытия
      e.target.classList.contains('popup-privacy')) { // мимо списка
      closeModal();
      return;
    };
  });
};

export default privacyPopup;