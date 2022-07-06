const fetchProducts = async (query) => {
  // seu código aqui
  // essa função cria uma listagem de produtos que puxam os dados da API informada no endpoint
  // o endpoint deve retornar os dados no formato objeto json
  // usa como auxiliar a função createProductItemElement para listar os componentes puxados no formato HTML, filhos do elemento <section class='items'>
  if (!query) {
    return new Error('You must provide an url');
    // caso não haja parâmetro retorna o erro
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data.results);
  return data;
  // retorna os dados que foram puxados pelo fetch
  // usa o template literals para o parâmetro poder ser dinâmico
};

if (typeof module !== 'undefined') {
    module.exports = {
      fetchProducts,
  };
}

// console.log(fetchProducts('computador'));
// requisito feito com ajuda do Gustavo Ferrari, Alexandre Lustosa e Kerli Schroeder