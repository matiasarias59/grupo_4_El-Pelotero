const validateField = (message, inputField) => {
    if (inputField.value.trim() === "") {
      inputField.setCustomValidity(message);
    } else {
      inputField.setCustomValidity("");
    }
    inputField.reportValidity();
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
  
  const initializeValidation = () => {
    const form = document.querySelector(".form-box");
    const nameField = document.getElementById("name");
    const priceField = document.getElementById("price");
    const quantityField = document.getElementById("quantity");
    const descriptionField = document.getElementById("description");
  
    nameField.addEventListener("input", () => validateField("El nombre del producto es obligatorio", nameField));
    nameField.addEventListener("input", () => validateStringLength("El nombre del producto debe tener entre 1 y 50 caracteres", nameField, 1, 50));
    priceField.addEventListener("input", () => validateField("El precio del producto es obligatorio", priceField));
    priceField.addEventListener("input", () => validateNumber("El precio del producto debe ser un número", priceField));
    quantityField.addEventListener("input", () => validateField("La cantidad en stock es obligatoria", quantityField));
    quantityField.addEventListener("input", () => validateNumber("La cantidad en stock debe ser un número", quantityField));
    descriptionField.addEventListener("input", () => validateField("La descripción del producto es obligatoria", descriptionField));
    descriptionField.addEventListener("input", () => validateStringLength("La descripción del producto debe tener entre 1 y 200 caracteres", descriptionField, 1, 200));
  };
  
  initializeValidation();