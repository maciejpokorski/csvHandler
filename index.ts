import * as fs from 'fs/promises';
import { PlainObject, stringify } from 'csv-stringify';
import { parse } from 'csv-parse/sync';
import generateOrderPrices from './order_prices';
import generateProductCustomers from './product_customers';
import generateCustomerRanking from './customer_ranking';

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
