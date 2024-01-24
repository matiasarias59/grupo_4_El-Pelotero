function validateForm() {
    const firstName = document.getElementById('register_firstName');
    const lastName = document.getElementById('register_lastName');
    const email = document.getElementById('register_mail');
    const password = document.getElementById('register_password');
    const confirmPassword = document.getElementById('register_confirm_password');
    const avatar = document.getElementById('register_avatar');
    const birthDate = document.getElementById('register_birthDate');

    if (!validateText(firstName.value) || !validateText(lastName.value)) {
        showErrorMessage(firstName, 'Nombre y apellido son obligatorios y no pueden contener números.');
        showErrorMessage(lastName, 'Nombre y apellido son obligatorios y no pueden contener números.');
        return false;
    }

    if (!validateBirthDate(birthDate.value)) {
        showErrorMessage(birthDate, 'Por favor, ingrese una fecha de nacimiento válida (entre 1900 y 2006).');
        return false;
    }

    if (!validateEmail(email.value)) {
        showErrorMessage(email, 'Por favor, ingrese un correo electrónico válido.');
        return false;
    }

     if (!validatePassword(password.value)) {
        showErrorMessage(password, 'La contraseña es obligatoria y debe tener al menos 8 caracteres.');
        return false;
    }

    if (password.value !== confirmPassword.value) {
        showErrorMessage(confirmPassword, 'Las contraseñas no coinciden.');
        return false;
    }

    if (!validateImage(avatar.value)) {
        showErrorMessage(avatar, 'Por favor, seleccione una imagen válida (JPG, JPEG, PNG, GIF).');
        return false;
    }

    if (!document.getElementById('register_terms_check').checked) {
        showErrorMessage(document.getElementById('register_terms_check'), 'Debe aceptar los términos y condiciones.');
        return false;
    }

    return true;
}

function validateText(text) {
    return text.trim().length >= 2 && !/\d/.test(text); 
}

function validateBirthDate(birthDate) {
    const currentDate = new Date();
    const minBirthDate = new Date('1900-01-01');
    const maxBirthDate = new Date('2006-12-31');
    birthDate = new Date(birthDate);

    return birthDate > minBirthDate && birthDate < maxBirthDate && birthDate < currentDate;
}

function showErrorMessage(element, message) {
    const errorElement = document.getElementById(element.id + '_error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrorMessage(element) {
    const errorElement = document.getElementById(element.id + '_error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}


document.getElementById('register_firstName').addEventListener('input', function () {
    clearErrorMessage(this);
});

document.getElementById('register_lastName').addEventListener('input', function () {
    clearErrorMessage(this);
});

document.getElementById('register_mail').addEventListener('input', function () {
    clearErrorMessage(this);
});

document.getElementById('register_password').addEventListener('input', function () {
    clearErrorMessage(this);
});

document.getElementById('register_confirm_password').addEventListener('input', function () {
    clearErrorMessage(this);
});

document.getElementById('register_birthDate').addEventListener('input', function () {
    clearErrorMessage(this);
});