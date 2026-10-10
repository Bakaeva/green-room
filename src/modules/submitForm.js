const submitFormModule = () => {
  const sendData = (url, data) => {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ошибка со статусом: ${response.status}`);
        }
        return response.json();
      });
  };

  const submitForm = (form) => {
    const formData = new FormData(form);
    const formBody = {};
    formData.forEach((value, key) => {
      formBody[key] = value;
    });

    sendData('server.php', formBody)
      .then(result => {
        form.reset();

        const thankPopup = document.querySelector('.popup-thank');
        const thankDialog = document.querySelector('.popup-thank-bg');
        if (thankPopup && thankDialog) {
          thankPopup.classList.add('active');
          thankDialog.classList.add('active');
          setTimeout(() => {
            thankDialog.classList.remove('active');
            setTimeout(() => {
              thankPopup.classList.remove('active');
            }, 500);
          }, 3000);
        };
      })
      .catch(error => {
        alert(`Ошибка при отправке данных (sendData): ${error.message}`);
      });
  };

  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (!form.matches('form'))
      return;

    e.preventDefault();

    const checkbox = form.querySelector('input[type="checkbox"]');
    if (checkbox && !checkbox.checked) {
      checkbox.parentElement.style.outline = '2px solid red';
      setTimeout(() => checkbox.parentElement.style.outline = 'none', 2000);
      return;
    };

    submitForm(form);
  });
};

export default submitFormModule;