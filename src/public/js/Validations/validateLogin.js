
const validateField = (message, inputField) => {
    if (inputField.value.trim() === "") {
      inputField.setCustomValidity(message);
    } else {
      inputField.setCustomValidity("");
    }
    inputField.reportValidity();
  };
  
  const validateEmailFormat = (inputField) => {
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const MIN_EMAIL_LENGTH = 8;
  
    if (!EMAIL_REGEX.test(inputField.value.trim())) {
      inputField.setCustomValidity("Ingrese un correo electrónico válido");
    } else if (inputField.value.trim().length < MIN_EMAIL_LENGTH) {
      inputField.setCustomValidity(`El correo debe tener al menos ${MIN_EMAIL_LENGTH} caracteres`);
    } else {
      inputField.setCustomValidity("");
    }
    inputField.reportValidity();
  };
  
  const validatePasswordLength = (inputField) => {
    const MIN_PASSWORD_LENGTH = 6;
  
    if (inputField.value.trim().length < MIN_PASSWORD_LENGTH) {
      inputField.setCustomValidity(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`);
    } else {
      inputField.setCustomValidity("");
    }
    inputField.reportValidity();
  };
  
  
  const initializeValidation = () => {
    const form = document.querySelector(".login-form");
    const emailField = document.getElementById("login-email");
    const passwordField = document.getElementById("login-password");
  
    emailField.addEventListener("input", () => validateField("El correo es obligatorio", emailField));
    emailField.addEventListener("input", () => validateEmailFormat(emailField));
    passwordField.addEventListener("input", () => validateField("La contraseña es obligatoria", passwordField));
    passwordField.addEventListener("input", () => validatePasswordLength(passwordField));
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      validateCredentials(emailField, passwordField);
    });
  };
  
  initializeValidation();