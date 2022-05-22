import { Order, Product } from './types';

const generateOrderPrices = (orders : Array<Order>, products: Array<Product>) => {
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

export default generateOrderPrices;
