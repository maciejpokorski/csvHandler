import { generateOrderPrices } from './index'

test('test order product join', () => {
  const orders = [{ id: '0', customer: '0', products: '1 0 1 0' }]
  const expected_result = [{ id: '0', euros: 18.943120182823662 }]
  const products =
    [
      { id: '0', name: 'screwdriver', cost: '2.981163654411736' },
      { id: '1', name: 'wrench', cost: '6.490396437000094' },
      { id: '2', name: 'hammer', cost: '2.9037321212561906' },
      { id: '3', name: 'sickle', cost: '8.90156976370351' },
      { id: '4', name: 'candle', cost: '9.806494914226443' },
      { id: '5', name: 'bandsaw', cost: '10.435252185512562' }
    ]
  const order_prices = generateOrderPrices(orders, products)
  expect(order_prices).toStrictEqual(expected_result);
});