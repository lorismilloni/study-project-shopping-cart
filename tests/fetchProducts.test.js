require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Teste se fetch é chamada quando usado o argumento "computador" em fetchProducts()', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  });
  it('Teste se ao chamar a função com o argumento "computador", a função fetch utiliza o endpoint correto', () => {
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador"
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(url)
  });
  it('Teste se o retorno da função com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(await fetchProducts('computador')).toMatchObject(computadorSearch)
  });
  it('Teste se ao chamar a função sem argumento retorna um erro com a mensagem "You must provide an url"', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
