/* eslint-disable no-undef */
import generateOrderPrices from './order_prices';
import generateProductCustomers from './product_customers';
import generateCustomerRanking from './customer_ranking';

const products = [
  { id: '0', name: 'screwdriver', cost: '2.981163654411736' },
  { id: '1', name: 'wrench', cost: '6.490396437000094' },
  { id: '2', name: 'hammer', cost: '2.9037321212561906' },
  { id: '3', name: 'sickle', cost: '8.90156976370351' },
  { id: '4', name: 'candle', cost: '9.806494914226443' },
  { id: '5', name: 'bandsaw', cost: '10.435252185512562' },
];
test('test order product join', () => {
  const orders = [{ id: '0', customer: '0', products: '1 0 1 0' }];
  const expectedResult = [{ id: '0', customer: '0', euros: 18.943120182823662 }];

  const orderPrices = generateOrderPrices(orders, products);
  expect(orderPrices).toStrictEqual(expectedResult);
});

test('test productCustomers', () => {
  const orders = [{ id: '0', customer: '0', products: '1 0 1 0' },
    { id: '1', customer: '1', products: '0 2 3' },
    { id: '2', customer: '2', products: '1 4' },
  ];
  const expectedResult = [{ id: '0', customer_ids: '0 1' },
    { id: '1', customer_ids: '0 2' },
    { id: '2', customer_ids: '1' },
    { id: '3', customer_ids: '1' },
    { id: '4', customer_ids: '2' },
  ];
  const productCustomers = generateProductCustomers(products, orders);
  expect(productCustomers).toStrictEqual(expectedResult);
});

test('test customerRanking', () => {
  const orderPrices = [{ id: '0', customer: '0', euros: 18.943120182823662 },
    { id: '1', customer: '22', euros: 61.42542135303493 },
    { id: '2', customer: '57', euros: 23.145479220995195 },
    { id: '3', customer: '22', euros: 34.399455367824324 }];

  const customers = [
    { id: '0', firstname: 'John', lastname: 'Maxwell' },
    { id: '22', firstname: 'Paul', lastname: 'Lavoisier' },
    { id: '57', firstname: 'Jane', lastname: 'Feynman' },
  ];
  const expectedResult = [
    {
      id: '22', firstname: 'Paul', lastname: 'Lavoisier', total_euros: 95.82487672085925,
    },
    {
      id: '57', firstname: 'Jane', lastname: 'Feynman', total_euros: 23.145479220995195,
    },
    {
      id: '0', firstname: 'John', lastname: 'Maxwell', total_euros: 18.943120182823662,
    },
  ];
  const customerRanking = generateCustomerRanking(orderPrices, customers);
  expect(customerRanking).toStrictEqual(expectedResult);
});
