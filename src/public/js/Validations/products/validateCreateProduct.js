window.onload = function () {
  const form = document.querySelector('.form-box');
  const nameField = document.getElementById('name');
  const priceField = document.getElementById('price');
  const quantityField = document.getElementById('quantity');
  const descriptionField = document.getElementById('description');
  const pictureField = document.querySelector('[name=picture]');
  const errorSpan = document.getElementsByClassName('error-span');



  const handleSubmit = (e) => {


    for(span of errorSpan){
      span.innerHTML = '';

    }

    const errors = [];

    if (nameField.value.trim() === '') {
      const message = 'El nombre del producto es obligatorio';
      errors.push({
        field: nameField,
        message,
      });
    }

    if (priceField.value.trim() === '') {
      const message = 'El precio del producto es obligatorio';
      errors.push({
        field: priceField,
        message,
      });
    }

    if (descriptionField.value.trim() === '') {
      const message = 'La descripción del producto es obligatoria';

      errors.push({
        field: descriptionField,
        message,
      });
    }

    if (isNaN(priceField.value.trim())) {
      const message = 'El precio del producto debe ser un número';

      errors.push({
        field: priceField,
        message,
      });
    }

    if (quantityField.value.trim() === '') {
      const message = 'La cantidad del producto es obligatoria';

      errors.push({
        field: quantityField,
        message,
      });
    }

    if (isNaN(quantityField.value.trim())) {
      const message = 'La cantidad del producto debe ser un número';

      errors.push({
        field: quantityField,
        message,
      });
    }

      if(pictureField.files.length != 0){

        const extFile = pictureField.files[0]?.name?.split('.')[1];
        if((extFile != 'jpg')&& (extFile !='png')){
          const message = 'Solo puedes subir archivos Jpg o Png'
          errors.push({
            field: pictureField,
            message,
          });
        }
      }  
    

    if (errors.length != 0) {
      console.log(errors)
      e.preventDefault();
      errors.forEach((error) => {
        const errorSpan = error.field.nextElementSibling;
        errorSpan.textContent = error.message;
      });
    }
  };

  form.addEventListener('submit', (e) => handleSubmit(e));
};