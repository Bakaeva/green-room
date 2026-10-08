const headerPhone = () => {
  const phoneAccord = document.querySelector('.header-contacts__phone-number-accord');
  const arrow = document.querySelector('.header-contacts__arrow');

  const toggleSecondPhone = () => {
    phoneAccord.classList.toggle('is-open');
    arrow.classList.toggle('is-open');
  };

  arrow.addEventListener('click', toggleSecondPhone);
};

export default headerPhone;
