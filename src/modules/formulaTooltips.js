const formulaTooltips = () => {
  const formulaItems = document.querySelectorAll('.formula-item');

  formulaItems.forEach(item => {
    const icon = item.querySelector('.formula-item__icon');
    const popup = item.querySelector('.formula-item-popup');
    if (!icon || !popup)
      return;

    const positionPopup = () => {
      // временно добавляем инлайн-стили для измерения:
      popup.style.visibility = 'visible';
      popup.style.opacity = '1';

      requestAnimationFrame(() => {
        const iconRect = icon.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();

        const spaceAbove = iconRect.top;
        const popupHeight = popupRect.height;
        const popupBottom = 90;

        if (spaceAbove >= popupHeight + popupBottom) {
          popup.style.bottom = '90px';
          popup.style.top = 'auto';
        } else {
          popup.style.bottom = 'auto';
          popup.style.top = `${iconRect.height + 10}px`;
        };

        // удаляем временные инлайн-стили:
        popup.style.visibility = '';
        popup.style.opacity = '';
      });
    };

    const resetPopup = () => {
      popup.style.bottom = '';
      popup.style.top = '';
    };

    icon.addEventListener('mouseenter', () => {
      item.classList.add('active-item');
      positionPopup();
    });

    icon.addEventListener('mouseleave', () => {
      item.classList.remove('active-item');
      resetPopup();
    });
  });
};

export default formulaTooltips;