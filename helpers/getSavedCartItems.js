const getSavedCartItems = () => {
  // seu código aqui
  localStorage.getItem('cartItems');
};

// requisito quatro, essa função recupera o HTML armazenado no localStorage através da chave cartItems

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
