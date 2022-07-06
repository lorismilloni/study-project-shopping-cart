// const { fetchProducts } = require('./helpers/fetchProducts');
// const { fetchItem } = require('./helpers/fetchItem');

const cartElement = document.querySelector('.cart__items');
// seleciona o elemento DOM com a classe 'cart__items'
const emptyCartButton = document.querySelector('.empty-cart');
// seleciona o botão com a classe empty-cart

// OK
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// OK
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// requisito 5, soma todos os valores dos itens que estão no carrinho, o elemento que tem como filho o preço total deve ter a classe total-price, é necessário garantir que a API retornou as informações antes de realizar o cálculo da soma
// é chamada em outras funções para atualizar o valor total dos preços
async function totalPrice() {
  const prices = document.querySelector('.total-price');
  // para a tag ser puxada, precisa ser adiciona manualmente no HTML
  const cartItems = Array.from(document.querySelectorAll('.cart__item'));
  // busca a nodeList com classe .cart__item
  // usa o método Array.from() para transformar em um array todos os itens que estão no carrinho de compras
  prices.innerText = cartItems.reduce((acc, item) => {
    const itemPrice = item.innerText.split('$')[1];
    // busca o valor de cada item, separa o innerText do item em 2 arrays através do split no $, o segundo array (índice 1) o que contém o valor do produto
    return acc + Number(itemPrice);
    // retorna a soma do acumulador (que começa em 0) e do valor do item atual, transformando-o em número
  }, 0);
}
// requisito feito com base no PR do Leonardo Vogel e

// requisito 3, função auxiliar da função auxiliar createCartItemElement(), é chamada na função create... quando ocorre o evento click em um dos elementos que foram adicionados ao carrinho, ele é removido, bem como seu preço
function cartItemClickListener(event) {
  event.target.remove();
  // aciona o evento de remover quando é clicado
  totalPrice();
  // chama a função total para atualizar o valor total do carrinho
  saveCartItems(cartElement.innerHTML);
  // salva os dados atuais do carrinho no localStorage
}
// consultado PR do Yuri Carvalho para compreender a lógica de implementação da função

// requisito 6, adiciona eventListener ao botão que limpa o carrinho, já criado no HTML
emptyCartButton.addEventListener('click', () => {
  cartElement.innerHTML = '';
  // ao executar a função, ela limpa o HTML da lista do carrinho de compras
  saveCartItems(cartElement.innerHTML);
  // salva essa lista vazia no localStorage
  totalPrice();
  // executa a função de atualizar o preço, para atualizar para 0
});
// requisito feito com base na lógica implementada no PR do Leonardo Vogel

// requisito 2: função auxiliar de fetchItem(), cria os elementos HTML referentes ao carrinho
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  // renomeia novamente os itens para identificação com a api e o carrinho
  const li = document.createElement('li');
  li.className = 'cart__item';
  // o elemento que essa função retorna deve ser filho de .cart__item
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  // adiciona o eventListener para o evento click, puxando a função cartItemClickListener
  return li;
  // retorna a li criada com os elementos e propriedades passadas aqui
}

// requisito 2, função auxiliar da função fetchItem(), essa função puxa os elementos da API com base no id passado como parâmetro, e adiciona o elemento selecionado ao carrinho
async function addToCart(id) {
  const data = await fetchItem(id);
  cartElement.appendChild(createCartItemElement(data));
  saveCartItems(cartElement.innerHTML);
  // usa a função saveCartItems para salvar os dados dos elementos que estão no carrinho no localStorage
  totalPrice();
  // atualiza os preços
}
// consultado PR da Kerli Schroeder para implementar a função

// requisito 1: função auxiliar de fetchProducts(), cria uma função que adiciona os produtos ao carrinho e ativa o eventListener, deve-se extrair o id como parâmetro na função
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  // essa função cria os elementos na páginas com as informações selecionadas
  // renomeia os itens sku, name e image para acessarmos as infos de data que estão como id, title e thumbnail
  // o elemento com a classe .item exibe a lista de produtos
  // lista os componentes puxados como filhos do elemento <section class='items'>
  const section = document.createElement('section'); // quando não tem . nem # cria a tag do HTML
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  // elemento adicionado à seção para mostrar o preço de cada produto
  // consultado o PR do Alexandre Escossio para entender como ele pegou o preço
  const addToCartButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addToCartButton.addEventListener('click', () => addToCart(sku));
  section.appendChild(addToCartButton);
  return section;
}
// linha const addToCartButton: adiciona o eventListener quando cria o botão, consultado o PR do Leonardo Vogel e da Kerli Schroeder para entender como o botão foi criado

// requisito 1, essa função usa os dados da função fetchProducts() e monta a lista de elementos exibida na página do browser, o forEach é usado para passar por cada elemento e criar um elemento filho na seção
async function showProducts() {
  const section = document.querySelector('.items');
  // cria a constante com os elementos com a classe items
  const data = await fetchProducts('computador');
  // chama a função fetch com o parâmetro 'computador'
  const products = await data.results;
  // acessa a chave results do elemento data da API que está na função fetchProducts(), o elemento retorna um array, sendo assim possível usar o forEach
  products.forEach((element) => {
    // usa o forEach como um for para passar pelo array e adicionar um item por vez à seção com classe item
    const item = createProductItemElement(element);
    section.appendChild(item);
  });
}
// requisito feito com ajuda da Kerli Schroeder via Zoom e acompanhando o PR

// requisito 4, puxa itens do localStorage
function loadLocalStorage() {
  cartElement.innerHTML = getSavedCartItems();
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((item) => item.addEventListener('click', cartItemClickListener));
}
// requisito feito com base no PR do Leonardo Vogel

// FALTA corrigir problema requisito 4

window.onload = () => {
  showProducts();
  loadLocalStorage();
  totalPrice();
};
