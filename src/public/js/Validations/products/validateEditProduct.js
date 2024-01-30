<<<<<<< HEAD
window.onload = function () {
  const form = document.querySelector('form');
  const nameField = document.querySelector('[name=name]');
  const brandField = document.querySelector('[name=brands_id]')
  const categoryField = document.querySelector('[name=categories_id]');
  const priceField = document.querySelector('[name=price]');
  const quantityField = document.querySelector('[name=quantity]');
  const pictureField = document.querySelector('[name=picture]');
  const descriptionInput = document.getElementById("description");
    
  
  const validateField = (message, field) => {
    const errorSpan = field.nextElementSibling;
    errorSpan.textContent = '';
    if (field.value.trim() === '' || !isNaN(field.value)) {
      errorSpan.textContent = message;
    };
  };

  const validateOption = (message, selectElement) => {
    const errorSpan = selectElement.nextElementSibling;
    errorSpan.textContent = '';
    if (selectElement.value === "-") {
      errorSpan.textContent = message;}
    };
  
  const validateNumber = (message, field) => {
    const errorSpan = field.nextElementSibling;
    errorSpan.textContent = "";
    if (isNaN(field.value.trim())) {
      errorSpan.textContent = message;}
    };
    const validateQuantity = (message, field) => {
      const errorSpan = field.nextElementSibling;
      errorSpan.textContent = "";
      if (isNaN(field.value.trim()) || field.value.trim() < 0 || field.value.trim() > 1000) {
        errorSpan.textContent = message;
      }
    };
    const validateFileType = (message, field) => {
      const errorSpan = field.nextElementSibling;
      errorSpan.textContent = '';
      const extFile = field.files[0].name.split('.')[1];
      if(extFile != ('jpg'||'png'||'jpeg')){
        errorSpan.textContent = message
      }
    }
 
    nameField.addEventListener ('input', () => validateField('Es necesario un Nombre', nameField));
    nameField.addEventListener ('blur', () => validateField('Es necesario un Nombre', nameField));
    
    brandField.addEventListener('input', () => validateOption('Es necesaria una Marca', brandField));
    brandField.addEventListener('blur', () => validateOption('Es necesaria una Marca', brandField));
    
    categoryField.addEventListener('input',() => validateOption ('Es necesaria una Categoría', categoryField) );
    categoryField.addEventListener('blur',() => validateOption ('Es necesaria una Categoría', categoryField) );
    
    priceField.addEventListener('input', () => validateNumber('El precio debe estar en números', priceField));
    priceField.addEventListener('blur', () => validateNumber('El precio debe estar en números', priceField));
    
    quantityField.addEventListener('input', () => validateQuantity('La cantidad debe ser entre 0-1000', quantityField));
    quantityField.addEventListener('blur', () => validateQuantity('La cantidad debe ser entre 0-1000', quantityField));
    quantityField.addEventListener('input',()=> validateNumber('La cantidad debe ser un número', quantityField) );
    quantityField.addEventListener('blur',()=> validateNumber('La cantidad debe ser un número', quantityField) );

    pictureField.addEventListener('input',()=> validateFileType('Solo puedes subir archivos Jpg o Png', pictureField) );
    pictureField.addEventListener('blur',()=> validateFileType('Solo puedes subir archivos Jpg o Png', pictureField) );
  };

  
  
 
=======
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const brandInput = document.querySelector('#brand');
const priceInput = document.querySelector('#price');
const quantityInput = document.querySelector('#quantity');

form.addEventListener('submit', validateForm);

function validateForm(e) {
  const name = nameInput.value;
  const brand = brandInput.value;
  const price = priceInput.value;
  const quantity = quantityInput.value;


  if (!name) {
    alert('Es necesario un Nombre');
    e.preventDefault();
  }
  if (!brand) {
    alert('Es necesaria una Marca');
    e.preventDefault();
  }
  if (Number.isNaN(parseFloat(price))) {
    alert('El precio debe estar en números');
    e.preventDefault();
  }
  if (parseFloat(quantity) < 0 || parseFloat(quantity) > 1000) {
    alert('La cantidad debe ser entre 0-1000');
    e.preventDefault();
  }
}
>>>>>>> 33bffa700c0652f8681e540ea115f96879d28382
