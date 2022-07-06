const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('Teste se ao executar a função com o argumento correto o método localStorage é chamado', async () => {
    await saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
  });
  it('Teste se ao executar a função com o argumento correto o método é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo o valor passado', async () => {
  await saveCartItems('<ol><li>Item</li></ol>');
  expect(localStorage.setItem).toBeCalledWith('cartItems', '<ol><li>Item</li></ol>');
  // fail('Teste vazio');
  });
});
