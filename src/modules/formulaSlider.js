import Slider from './Slider.js';

const formulaSlider = () => {
  if (window.innerWidth > 575)
    return;

  const sliderContainer = document.querySelector('.formula-slider');
  if (!sliderContainer)
    return;

  const slider = new Slider({
    container: '.formula-slider-wrap',
    slides: '.formula-slider__slide',
    arrows: {
      left: '#formula-arrow_left',
      right: '#formula-arrow_right'
    },
    counterCurrent: '.slider-counter-content__current',
    counterTotal: '.slider-counter-content__total',
    activeClass: 'active-item',
    inactiveOpacity: 0.4
  });

  sliderContainer.addEventListener('click', (e) => {
    const icon = e.target.closest('.formula-item__icon');
    if (!icon)
      return;

    const popup = icon.querySelector('.formula-item-popup');
    if (!popup)
      return;

    const isAlreadyOpen = popup.style.visibility === 'visible';

    if (!isAlreadyOpen) {
      popup.style.visibility = 'visible';
      popup.style.opacity = '1';

      requestAnimationFrame(() => {
        const iconRect = icon.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        const spaceAbove = iconRect.top;
        const popupHeight = popupRect.height;
        const offset = 90;

        if (spaceAbove < popupHeight + offset) {
          popup.style.bottom = 'auto';
          popup.style.top = `${iconRect.height + 10}px`;
        } else {
          popup.style.bottom = '90px';
          popup.style.top = 'auto';
        };
      });
    };
  });
};

export default formulaSlider;