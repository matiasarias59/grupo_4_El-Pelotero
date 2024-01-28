const validateEmptyField = (message, field) => {
  const errorSpan = field.nextElementSibling; // Obtiene el siguiente elemento (el <span> de error)

  if (field.value.trim() === "" || !isNaN(field.value)) {
    field.setCustomValidity(message);
    errorSpan.textContent = message; // Muestra el mensaje de error
  } else {
    field.setCustomValidity('');
    errorSpan.textContent = ''; // Limpia el mensaje de error
  }
  field.reportValidity();
};

const validateNonNumeric = (message, field) => {
  const errorSpan = field.nextElementSibling;

  if (isNaN(field.value)) {
    field.setCustomValidity('');
    errorSpan.textContent = '';
  } else {
    field.setCustomValidity(message);
    errorSpan.textContent = message;
  }
  field.reportValidity();
};

const validateEmailFormat = (field) => {
  const errorSpan = field.nextElementSibling;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(field.value)) {
    field.setCustomValidity("Ingrese un correo electrónico válido");
    errorSpan.textContent = "Ingrese un correo electrónico válido";
  } else {
    field.setCustomValidity('');
    errorSpan.textContent = '';
  }
  field.reportValidity();
};

const initializeValidation = () => {
  const form = document.querySelector("form");
  const fields = form.querySelectorAll("input, select");

  fields.forEach((field) => {
    if (field.hasAttribute("data-validation")) {
      const rules = field.getAttribute("data-validation").split(" ");
      const errorSpan = document.createElement("span");
      errorSpan.className = "error-span";
      field.parentNode.appendChild(errorSpan);

      rules.forEach((rule) => {
        switch (rule) {
          case "required":
            field.addEventListener("input", () =>
              validateEmptyField("Este campo es obligatorio", field)
            );
            break;
          case "numeric":
            field.addEventListener("input", () =>
              validateNonNumeric("Ingrese solo números", field)
            );
            break;
          case "email":
            field.addEventListener("input", () => validateEmailFormat(field));
            break;
          case "minlength-6":
            field.addEventListener("input", () => {
              if (field.value.length < 6) {
                field.setCustomValidity("La contraseña debe tener al menos 6 caracteres");
              } else {
                field.setCustomValidity('');
              }
              field.reportValidity();
            });
            break;
          case "match-password":
            const passwordField = document.querySelector("[name=password]");
            field.addEventListener("input", () => {
              if (passwordField.value !== field.value) {
                field.setCustomValidity("Las contraseñas no coinciden");
              } else {
                field.setCustomValidity('');
              }
              field.reportValidity();
            });
            break;
          case "accept-terms":
            field.addEventListener("change", () => {
              if (!field.checked) {
                field.setCustomValidity("Debe aceptar los términos y condiciones");
              } else {
                field.setCustomValidity('');
              }
              field.reportValidity();
            });
            break;
          default:
            break;
        }
      });
    }
  });
};

window.onload = function () {
  const userNameField = document.querySelector("[name=first_name]");
  const lastNameField = document.querySelector("[name=last_name]");
  const birthDateField = document.querySelector("[name=birth_date]");
  const emailField = document.querySelector("[name=email]");
  const passwordField = document.querySelector("[name=password]");
  const confirmPasswordField = document.querySelector("[name=confirmPassword]");
  const termsCheckField = document.querySelector("[name=termsCheck]");
  const avatarField = document.querySelector("[name=avatar]");

  userNameField.addEventListener("input", () =>
    validateEmptyField("El nombre es obligatorio", userNameField)
  );

  lastNameField.addEventListener("input", () =>
    validateEmptyField("El apellido es obligatorio", lastNameField)
  );

  birthDateField.addEventListener("input", () =>
    validateEmptyField("La fecha de nacimiento es obligatoria", birthDateField)
  );

  emailField.addEventListener("input", () => {
    validateEmptyField("El correo es obligatorio", emailField);
    validateEmailFormat(emailField);
  });

  passwordField.addEventListener("input", () => {
      validateEmptyField("La contraseña es obligatoria", passwordField);
      if (passwordField.value.length < 8) {
        passwordField.setCustomValidity("La contraseña debe tener al menos 8 caracteres");
      } else {
        passwordField.setCustomValidity('');
      }
      passwordField.reportValidity();
    });
    
    confirmPasswordField.addEventListener("input", () => {
      validateEmptyField("Confirme la contraseña", confirmPasswordField);
      if (passwordField.value !== confirmPasswordField.value) {
        confirmPasswordField.setCustomValidity(`Las contraseñas no coinciden`);
      } else {
        confirmPasswordField.setCustomValidity('');
      }
      confirmPasswordField.reportValidity();
    });
    
    function checkTerms() {
      if (!termsCheckField.checked) {
        termsCheckField.setCustomValidity(`Debe aceptar los términos y condiciones`);
      } else {
        termsCheckField.setCustomValidity('');
      }
      termsCheckField.reportValidity();
    }
    
    termsCheckField.addEventListener("change", checkTerms);
  };
  const registerButtons = document.querySelectorAll(".register_form_btn");
  registerButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const form = document.querySelector(".register_form");
      form.reportValidity();
  
      if (!form.checkValidity()) {
        alert("Por Favor es necesario completar el formulario de Registro.");
      }
    });
  });
    initializeValidation();