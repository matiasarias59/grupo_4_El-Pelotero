function validateLoginForm() {
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');

    
    if (!validateEmail(email.value)) {
        showErrorMessage(email, 'Por favor, ingrese un correo electrónico válido.');
        return false;
    }

 
    if (!validatePassword(password.value)) {
        showErrorMessage(password, 'La contraseña es obligatoria.');
        return false;
    }
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length > 0;
}

function clearErrorMessage(element) {
    const errorElement = document.getElementById(element.id + '-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function showErrorMessage(element, message) {
    const errorElement = document.getElementById(element.id + '-error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}
document.getElementById('login-email').addEventListener('input', function () {
    clearErrorMessage(this);
});

document.getElementById('login-password').addEventListener('input', function () {
    clearErrorMessage(this);
});