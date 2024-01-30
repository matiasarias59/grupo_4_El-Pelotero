window.onload = function () {

    const userNameField = document.querySelector('[name=first_name]');
    const lastNameField = document.querySelector('[name=last_name]');
    const birthDateField = document.querySelector('[name=birth_date]');
    const emailField = document.querySelector('[name=email]');
    const avatarField = document.querySelector('[name=avatar]');
  
  
    const validateEmptyField = (message, field) => {
      const errorSpan = field.nextElementSibling;
      errorSpan.textContent = '';
      if (field.value.trim() === '' || !isNaN(field.value)) {
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
  
    avatarField.addEventListener('input', ()=>{validateFileType('Solo puedes subir archivos Jpg o Png', avatarField)})
    
  };
  
  