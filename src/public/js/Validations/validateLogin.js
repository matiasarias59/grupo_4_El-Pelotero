const validateField = (message, inputField) => {
  if (inputField.value.trim() === "") {
    inputField.setCustomValidity(message);
  } else {
    inputField.setCustomValidity("");
  }
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
};

const validatePasswordLength = (inputField) => {
  const MIN_PASSWORD_LENGTH = 6;
  if (inputField.value.trim().length < MIN_PASSWORD_LENGTH) {
    inputField.setCustomValidity(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`);
  } else {
    inputField.setCustomValidity("");
  }
};

const initializeValidation = () => {
  const form = document.querySelector(".login-form");
  const emailField = document.getElementById("login-email");
  const passwordField = document.getElementById("login-password");
  
  const validateEmailField = () => {
    validateField("El correo es obligatorio", emailField);
    validateEmailFormat(emailField);
  };
  
  const validatePasswordField = () => {
    validateField("La contraseña es obligatoria", passwordField);
    validatePasswordLength(passwordField);
  };
  
  emailField.addEventListener("input", validateEmailField);
  passwordField.addEventListener("input", validatePasswordField);
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateCredentials(emailField, passwordField);
  });
};

const validateCredentials = (emailField, passwordField) => {
  const email = emailField.value.trim();
  const password = passwordField.value.trim();
  
  const errors = {};
  
  if (email === "") {
    errors.email = "El correo electrónico es obligatorio";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Ingrese un correo electrónico válido";
  }
  
  if (password === "") {
    errors.password = "La contraseña es obligatoria";
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`;
  }
  
  return errors;
};

window.onload = () => {
  initializeValidation();
};