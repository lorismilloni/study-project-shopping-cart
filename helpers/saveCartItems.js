const saveCartItems = (saveCart) => {
  // seu código aqui
  localStorage.setItem('cartItems', saveCart);
};

// requisito quatro, essa função salva o carrinho no localStorage, armazenando o HTML, a chave é denominada cartItems

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}