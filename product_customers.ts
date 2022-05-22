import { Product, Order } from './types';

const generateProductCustomers = (products : Array<Product>, orders : Array<Order>) => {
  const productCustomers = [];
  products.forEach((product : Product) => {
    const ordersForProduct = orders.filter((order) => order.products.split(' ').includes(product.id));
    ordersForProduct.forEach((order) => {
      const indexToWrite = productCustomers.findIndex(
        (productCustomer) => productCustomer.id === product.id,
      );
      const firstCustomerPurchase = indexToWrite === -1;
      if (firstCustomerPurchase) {
        productCustomers.push({ id: product.id, customer_ids: order.customer });
      } else if (!productCustomers[indexToWrite].customer_ids.includes(order.customer)) {
        productCustomers[indexToWrite].customer_ids += ` ${order.customer}`;
      }
    });
  });

  return productCustomers;
};

export default generateProductCustomers;
