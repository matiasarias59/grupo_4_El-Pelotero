window.onload = function () {
  
    const nameField = document.getElementById("name");
    const priceField = document.getElementById("price");
    const brandField = document.getElementById("brand");
    const categoryField =document.getElementById("categories");
    const quantityField = document.getElementById("quantity");
    const descriptionField = document.getElementById("description");
  
   
  
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
}
