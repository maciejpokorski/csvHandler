import { promises as fs } from 'fs';
import { parse as parse } from "csv-parse/sync";

const main = async () => {
    const order_prices = []
    const product_customers = []
    let order_products = []
    const orders_raw = await fs.readFile("orders.csv", "binary");
    const products_raw = await fs.readFile("products.csv", "binary");
    const customers_raw = await fs.readFile("customers.csv", "binary");
    const orders = parse(orders_raw, { columns: true });
    const products = parse(products_raw, { columns: true });
    const customers = parse(customers_raw, { columns: true });

    order_prices = generateOrderPrices(orders, products)
}

export const generateOrderPrices = (orders, products) => {
    const order_prices = []
    orders.forEach(order => {
        let order_price = 0.0
        let order_products = order.products.split(" ")
        order_products.forEach(product_id => {
            order_price += parseFloat(products[product_id].cost)
        })
        let order_price_obj = {
            id: order.id,
            euros: order_price
        }
        order_prices.push(order_price_obj)
    })

    return order_prices
}