window.onload = () => {

  const emailField = document.querySelector('[name=email]');

  const validateEmailFormat = (field) => {
    const errorSpan = field.nextElementSibling;
    errorSpan.textContent = '';
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(field.value)) {
      errorSpan.textContent = 'Ingrese un correo electrónico válido';
    }
  };

  emailField.addEventListener('blur', () => {
    validateEmailFormat(emailField);
  });


};