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