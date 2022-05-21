import { generateOrderPrices, generateProductCustomers } from './index'

const products =
  [
    { id: '0', name: 'screwdriver', cost: '2.981163654411736' },
    { id: '1', name: 'wrench', cost: '6.490396437000094' },
    { id: '2', name: 'hammer', cost: '2.9037321212561906' },
    { id: '3', name: 'sickle', cost: '8.90156976370351' },
    { id: '4', name: 'candle', cost: '9.806494914226443' },
    { id: '5', name: 'bandsaw', cost: '10.435252185512562' }
  ]
test('test order product join', () => {
  const orders = [{ id: '0', customer: '0', products: '1 0 1 0' }]
  const expected_result = [{ id: '0', euros: 18.943120182823662 }]

  const order_prices = generateOrderPrices(orders, products)
  expect(order_prices).toStrictEqual(expected_result);
});

test('test product_customers', () => {
  const orders = [{ id: '0', customer: '0', products: '1 0 1 0' },
  { id: '1', customer: '1', products: '0 2 3' },
  { id: '2', customer: '2', products: '1 4' }
  ]
  const expected_result = [{ id: '0', customer_ids: new Set(['0', '1']) },
  { id: '1', customer_ids: new Set(['0', '2']) },
  { id: '2', customer_ids: new Set(['1']) },
  { id: '3', customer_ids: new Set(['1']) },
  { id: '4', customer_ids: new Set(['2']) },
  ]
  const product_customers = generateProductCustomers(products, orders)
  expect(product_customers).toStrictEqual(expected_result);
});

test('test customer_ranking', () => {
  const order_prices =  [{ id: '0', customer: '0', euros: 18.943120182823662 },
  { id: '1', customer: '22', euros: 61.42542135303493 },
  { id: '2', customer: '57', euros: 23.145479220995195 },
  { id: '3', customer: '22', euros: 34.399455367824324 },]

  customers = [
    { id: '0', firstname: 'John', lastname: 'Maxwell'},
    { id: '22', firstname: 'Paul', lastname: 'Lavoisier'},
    { id: '57', firstname: 'Jane', lastname: 'Feynman'},
  ]
  const expected_result = [
    {id: '22', firstname: 'Paul', lastname: 'Lavoisier', total_euros: 95.82487672085925},
    { id: '57', firstname: 'Jane', lastname: 'Feynman', total_euros: 23.145479220995195},
    { id: '0', firstname: 'John', lastname: 'Maxwell', total_euros: 18.94312018282366},
  ]
  const customer_ranking = generateCustomerRanking(order_prices, customers)
  expect(customer_ranking).toStrictEqual(expected_result);
});