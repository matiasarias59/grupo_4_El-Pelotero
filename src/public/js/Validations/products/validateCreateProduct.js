window.onload = function () {
  
    const nameField = document.querySelector('[name=name]');
    const priceField = document.querySelector('[name=price]');
    const brandField = document.querySelector('[name=brands_id]');
    const categoryField =document.querySelector('[name=categories_id');
    const quantityField = document.querySelector('[name=quantity]');
    const descriptionField = document.querySelector('[name=description]');
    const imageField = document.querySelector('[name=image]');
  
   
  
const validateField = (message, field) => {
    if (field.value.trim() === "") {
      field.setCustomValidity(message);
    } else {
      field.setCustomValidity("");
    }
    field.reportValidity();
  };

  const validateOption = (message, selectElement) => {
    if (selectElement.value === "-") {
      selectElement.setCustomValidity(message);
    } else {
      selectElement.setCustomValidity("");
    }
    selectElement.reportValidity();
  };
  
  const validateNumber = (message, field) => {
    if (isNaN(field.value.trim())) {
      field.setCustomValidity(message);
    } else {
      field.setCustomValidity("");
    }
    field.reportValidity();
  };
  
  const validateStringLength = (message, field, minLength, maxLength) => {
    if (field.value.trim().length < minLength || field.value.trim().length > maxLength) {
      field.setCustomValidity(message);
    } else {
      field.setCustomValidity("");
    }
    field.reportValidity();
  };
  const validateFileType = (message, field) => {
    const errorSpan = field.nextElementSibling;
    errorSpan.textContent = '';
    const extFile = field.files[0].name.split('.')[1];
    if(extFile != ('jpg'||'png'||'jpeg')){
      errorSpan.textContent = message
    }
  }

nameField.addEventListener("input", () => validateStringLength("El nombre del producto debe tener entre 1 y 50 caracteres", nameField, 1, 50));
nameField.addEventListener("blur", () => validateField("El nombre del producto es obligatorio", nameField));

priceField.addEventListener("blur", () => validateField("El precio del producto es obligatorio", priceField));
priceField.addEventListener("input", () => validateNumber("El precio del producto debe ser un número", priceField));

brandField.addEventListener("blur", () => validateOption("La marca del producto es obligatoria", brandField));

categoryField.addEventListener("blur", () => validateOption("La categoría del producto es obligatoria", categoryField));

quantityField.addEventListener("blur", () => validateField("La cantidad en stock es obligatoria", quantityField));
quantityField.addEventListener("input", () => validateNumber("La cantidad en stock debe ser un número", quantityField));

descriptionField.addEventListener("blur", () => validateField("La descripción del producto es obligatoria", descriptionField));
descriptionField.addEventListener("input", () => validateStringLength("La descripción del producto debe tener entre 1 y 200 caracteres", descriptionField, 1, 200));

imageField.addEventListener('blur',()=> validateFileType('Solo puedes subir archivos Jpg o Png', imageField) );
imageField.addEventListener('input',()=> validateFileType('Solo puedes subir archivos Jpg o Png', imageField) );
};
