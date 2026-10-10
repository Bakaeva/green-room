const phoneMask = () => {
  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, '');

    // Собираем строку по маске +7 (ddd) ddd-dd-dd
    if (digits.startsWith('7') || digits.startsWith('8')) {
      digits = digits.substring(1);
    };
    let formatted = '+7';
    if (digits.length > 0) formatted += ' (' + digits.substring(0, 3);
    if (digits.length >= 4) formatted += ') ' + digits.substring(3, 6);
    if (digits.length >= 7) formatted += '-' + digits.substring(6, 8);
    if (digits.length >= 9) formatted += '-' + digits.substring(8, 10);

    return formatted;
  };

  document.addEventListener('input', (e) => {
    const input = e.target;
    if (input.matches('input[name="phone"]'))
      input.value = formatPhone(input.value);
  });

  document.addEventListener('keydown', (e) => {
    const input = e.target;
    if (e.target.matches('input[name="phone"]')) {
      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End'];
      if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey)
        return;

      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    }
  });

  document.addEventListener('focus', (e) => {
    const input = e.target;
    if (input.matches('input[name="phone"]') && !input.value)
      input.value = '+7 (';
  }, true);

  document.addEventListener('blur', (e) => {
    const input = e.target;
    if (input.matches('input[name="phone"]') && (input.value === '+7 (' || input.value === '+7'))
      input.value = '';
  }, true);
};

export default phoneMask;