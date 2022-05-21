import * as fs from 'fs/promises';
import { stringify } from 'csv-stringify';
import { parse } from 'csv-parse/sync';

export const generateOrderPrices = (orders, products) => {
  const orderPrices = [];
  orders.forEach((order) => {
    let orderPrice = 0.0;
    const orderProducts = order.products.split(' ');
    orderProducts.forEach((productId) => {
      orderPrice += parseFloat(products[productId].cost);
    });
    const orderPriceObj = {
      id: order.id,
      customer: order.customer,
      euros: orderPrice,
    };
    orderPrices.push(orderPriceObj);
  });

  return orderPrices;
};

export const generateProductCustomers = (products, orders) => {
  const productCustomers = [];
  products.forEach((product) => {
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

export const generateCustomerRanking = (orderPrices, customers) => {
  const customerRanking = [];
  customers.forEach((customer) => {
    const totalEuros = orderPrices.filter((obj) => obj.customer === customer.id)
      .reduce((a, b) => +a + +b.euros, 0);
    customerRanking.push({
      id: customer.id,
      firstname: customer.firstname,
      lastname: customer.lastname,
      total_euros: totalEuros,
    });
  });

  return customerRanking.sort((a, b) => b.total_euros - a.total_euros);
};

const saveCSV = (arrayOfObjects, outFilename, columns = null) => {
  stringify(arrayOfObjects, { header: true, columns }, (error, output) => {
    fs.writeFile(outFilename, output, (writeError) => {
      if (writeError) throw writeError;
    });
    console.log(`${outFilename} saved`);
  });
};

const main = async () => {
  const ordersRaw = await fs.readFile('orders.csv', 'binary');
  const productsRaw = await fs.readFile('products.csv', 'binary');
  const customersRaw = await fs.readFile('customers.csv', 'binary');

  const orders = parse(ordersRaw, { columns: true });
  const products = parse(productsRaw, { columns: true });
  const customers = parse(customersRaw, { columns: true });

  const orderPrices = generateOrderPrices(orders, products);
  const productCustomers = generateProductCustomers(products, orders);
  const customerRanking = generateCustomerRanking(orderPrices, customers);

  const orderPricesColumns = {
    id: 'id',
    euros: 'euros',
  };

  saveCSV(orderPrices, 'order_prices.csv', orderPricesColumns);
  saveCSV(productCustomers, 'product_customers.csv');
  saveCSV(customerRanking, 'customer_ranking.csv');
};

main();
