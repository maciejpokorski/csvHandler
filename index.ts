import * as fs from 'fs/promises';
import { PlainObject, stringify } from 'csv-stringify';
import { parse } from 'csv-parse/sync';

interface Order {
  id: string;
  customer: string;
  products: string
}

interface Product {
  id: string,
  name: string,
  cost: number,
}

interface OrderPrice {
  id: string,
  customer: string,
  euros: number,
}

interface Customer {
  id: string,
  firstname: string,
  lastname: string,
}

type BufferEncoding = 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex';

export const generateOrderPrices = (orders : Array<Order>, products: Array<Product>) => {
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

export const generateProductCustomers = (products : Array<Product>, orders : Array<Order>) => {
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

export const generateCustomerRanking = (
  orderPrices : Array<OrderPrice>,
  customers : Array<Customer>,
) => {
  const customerRanking = [];
  customers.forEach((customer: { id: string; firstname: any; lastname: any; }) => {
    const totalEuros = orderPrices.filter((obj : OrderPrice) => obj.customer === customer.id)
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

const saveCSV = (
  arrayOfObjects : Array<object>,
  outFilename : string,
  columns : PlainObject<string> | null = null,
) => {
  stringify(arrayOfObjects, { header: true, columns }, (error, output) => {
    fs.writeFile(outFilename, output, 'utf-8' as BufferEncoding);
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

export default main;
