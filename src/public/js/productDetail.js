window.onload = () => {
  const productQty = parseInt(document.getElementById('product-qty').innerText);
  const valueToCart = document.querySelector('.value');
  const addBtn = document.querySelector('.increase');
  const removeBtn = document.querySelector('.decrease');

  valueToCart.innerText = 1;

  const handleAddBtn = () => {
    if (valueToCart.innerText < productQty) {
      valueToCart.innerText = parseInt(valueToCart.innerText) + 1;
    }
  };

  const handleRemoveBtn = () => {
    if (valueToCart.innerText > 1) {
      valueToCart.innerText = parseInt(valueToCart.innerText) - 1;
    }
  };

  addBtn.addEventListener('click', () => handleAddBtn());
  removeBtn.addEventListener('click', ()=>handleRemoveBtn())
};
