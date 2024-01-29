window.onload = function () {
  const form = document.querySelector('form');
  const nameField = document.getElementById("name");
  const brandField = document.getElementById("brands")
  const categoryField = document.getElementById("categories");
  const priceField = document.getElementById("price");
  const quantityField = document.getElementById("quantity");
  const pictureField = document.getElementById("picture");
  const descriptionInput = document.getElementById("description");
    
  
  const validateField = (message, inputField) => {
    if (inputField.value.trim() === "") {
      inputField.setCustomValidity(message);
    } else {
      inputField.setCustomValidity("");
    }
    inputField.reportValidity();
  };

  const validateOption = (message, selectElement) => {
    if (selectElement.value === "-") {
      selectElement.setCustomValidity(message);
    } else {
      selectElement.setCustomValidity("");
    }
    selectElement.reportValidity();
  };
  
  const validateNumber = (message, inputField) => {
    if (isNaN(inputField.value.trim())) {
      inputField.setCustomValidity(message);
    } else {
      inputField.setCustomValidity("");
    }
    inputField.reportValidity();
  };
  
  const validateStringLength = (message, inputField, minLength, maxLength) => {
    if (inputField.value.trim().length < minLength || inputField.value.trim().length > maxLength) {
      inputField.setCustomValidity(message);
    } else {
      inputField.setCustomValidity("");
    }
    inputField.reportValidity();
  };

  const validateForm = (e) => {
    e.preventDefault();
    nameField.addEventListener ('input', () => validateField('Es necesario un Nombre', nameInput));
    nameField.addEventListener ('blur', () => validateField('Es necesario un Nombre', nameInput));
    
    brandField.addEventListener('input', () => validateOption('Es necesaria una Marca', brandInput));
    brandField.addEventListener('blur', () => validateOption('Es necesaria una Marca', brandInput));
    
    categoryField.addEventListener('input',() => validateOption ('Es necesaria una Categoría', categoryInput) );
    categoryField.addEventListener('blur',() => validateOption ('Es necesaria una Categoría', categoryInput) );
    
    priceField.addEventListener('input', () => validateNumber('El precio debe estar en números', priceInput));
    priceField.addEventListener('blur', () => validateNumber('El precio debe estar en números', priceInput));
    
    quantityField.addEventListener('input', () => validateStringLength(0, 'La cantidad debe ser entre 0-1000', quantityInput));
    quantityField.addEventListener('blur', () => validateStringLength(0, 'La cantidad debe ser entre 0-1000', quantityInput));
    
    pictureField.addEventListener('input',()=> validateFileType('Solo puedes subir archivos Jpg o Png', pictureInput) );
  };

  
  form.addEventListener('submit', validateForm);
 
};