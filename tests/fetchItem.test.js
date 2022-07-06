require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  });
  it('Teste se fetch foi chamada com o argumento "MLB1615760527"', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toBeCalled()
  });
  it('Teste se, ao chamar a função com o argumento "MLB1615760527", é utilizado o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchItem('MLB1615760527')
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1615760527')
  });
  it('Teste se com o argumento "MLB1615760527" o retorno da função é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    expect(await fetchItem('MLB1615760527')).toMatchObject(item);
  });
  it('Teste se ao chamar a função sem argumentos, retorna o erro esperado', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
  // fail('Teste vazio');
});
