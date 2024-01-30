window.onload = function () {

  const userNameField = document.querySelector('[name=first_name]');
  const lastNameField = document.querySelector('[name=last_name]');
  const birthDateField = document.querySelector('[name=birth_date]');
  const emailField = document.querySelector('[name=email]');
  const passwordField = document.querySelector('[name=password]');
  const confirmPasswordField = document.querySelector('[name=confirmPassword]');
  const avatarField = document.querySelector('[name=avatar]');


  const validateEmptyField = (message, field) => {
    const errorSpan = field.nextElementSibling;
    errorSpan.textContent = '';
    if (field.value.trim() === '' || !isNaN(field.value)) {
      errorSpan.textContent = message;
    }
  };

  const validateNonNumeric = (message, field) => {
    const errorSpan = field.nextElementSibling;
    if (isNaN(field.value)) {
      errorSpan.textContent = '';
    }
  };

  const validateEmailFormat = (field) => {
    const errorSpan = field.nextElementSibling;
    errorSpan.textContent = '';
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(field.value)) {
      errorSpan.textContent = 'Ingrese un correo electrónico válido';
    }
  };

  const validateMinLengthField = (minLenght, message, field) => {
    const errorSpan = field.nextElementSibling;
    errorSpan.textContent = '';
    if (field.value.length < minLenght) {
      errorSpan.textContent = message;
    }
  };

  const validateMatchField = (message, field, matchField) => {
    const errorSpan = field.nextElementSibling;
    errorSpan.textContent = '';
    if (field.value != matchField.value) {
      errorSpan.textContent = message;
    }
  };

  const validateFileType = (message, field) => {
    const errorSpan = field.nextElementSibling;
    errorSpan.textContent = '';
    const extFile = field.files[0].name.split('.')[1];
    if((extFile != 'jpg')&& (extFile !='png')){
      errorSpan.textContent = message
    }
  }
 
  userNameField.addEventListener('input', () => validateEmptyField('El nombre es obligatorio', userNameField));
  userNameField.addEventListener('blur', () => validateEmptyField('El nombre es obligatorio', userNameField));

  lastNameField.addEventListener('input', () => validateEmptyField('El apellido es obligatorio', lastNameField));
  lastNameField.addEventListener('blur', () => validateEmptyField('El apellido es obligatorio', lastNameField));

  birthDateField.addEventListener('change', () => validateEmptyField('La fecha de nacimiento es obligatoria', birthDateField));
  birthDateField.addEventListener('blur', () => validateEmptyField('La fecha de nacimiento es obligatoria', birthDateField));

  emailField.addEventListener('input', () => {
    validateEmptyField('El correo es obligatorio', emailField);
    validateEmailFormat(emailField);
  });

  passwordField.addEventListener('input', () => {
    validateMinLengthField(8, 'La contraseña debe tener al menos 8 caracteres', passwordField);
  });

  confirmPasswordField.addEventListener('input', () => {
    validateMinLengthField(8, 'La contraseña debe tener al menos 8 caracteres', confirmPasswordField);
    validateMatchField('Las contraseñas no coinciden', confirmPasswordField, passwordField);
  });

  avatarField.addEventListener('input', ()=>{validateFileType('Solo puedes subir archivos Jpg o Png', avatarField)})
  
};

