import * as fs from 'fs/promises';
import { stringify } from 'csv-stringify';
import { parse } from 'csv-parse/sync';

const main = async () => {
  const orders_raw = await fs.readFile('orders.csv', 'binary');
  const products_raw = await fs.readFile('products.csv', 'binary');
  const customers_raw = await fs.readFile('customers.csv', 'binary');
  const orders = parse(orders_raw, { columns: true });
  const products = parse(products_raw, { columns: true });
  const customers = parse(customers_raw, { columns: true });
};

export const generateOrderPrices = (orders, products) => {
  const order_prices = [];
  orders.forEach((order) => {
    let order_price = 0.0;
    const order_products = order.products.split(' ');
    order_products.forEach((product_id) => {
      order_price += parseFloat(products[product_id].cost);
    });
    const order_price_obj = {
      id: order.id,
      customer: order.customer,
      euros: order_price,
    };
    order_prices.push(order_price_obj);
  });

  return order_prices;
};

export const generateProductCustomers = (products, orders) => {
  const product_customers = [];
  products.forEach((product) => {
    {
      const orders_for_product = orders.filter((order) => order.products.split(' ').includes(product.id));
      orders_for_product.map((order) => {
        const index_to_write = product_customers.findIndex((product_customers) => product_customers.id === product.id);
        const first_customer_purchase = index_to_write === -1;
        if (first_customer_purchase) {
          product_customers.push({ id: product.id, customer_ids: order.customer });
        } else if (!product_customers[index_to_write].customer_ids.includes(order.customer)) {
          product_customers[index_to_write].customer_ids += ` ${order.customer}`;
        }
      });
    }
  });

  return product_customers;
};

export const generateCustomerRanking = (order_prices, customers) => {
  const customer_ranking = [];
  customers.forEach((customer) => {
    const total_euros = order_prices.filter((obj) => obj.customer == customer.id)
      .reduce((a, b) => +a + +b.euros, 0);
    customer_ranking.push({
      id: customer.id,
      firstname: customer.firstname,
      lastname: customer.lastname,
      total_euros,
    });
  });

  return customer_ranking.sort((a, b) => b.total_euros - a.total_euros);
};

main();
