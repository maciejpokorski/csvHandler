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

    orders.forEach(order => {
        let order_price = 0.0
        order_products = order.products.split(" ")
        order_products.forEach(product_id => {
            order_price += parseFloat(products[product_id].cost)
            let index_to_write = product_customers.findIndex(p => p.id === product_id)
            if (index_to_write > -1) {
                product_customers[index_to_write]["customer_ids"].add(order.customer)
            } else {
                product_customers.push({ id: product_id, customer_ids: new Set([order.customer]) })
            }
        })
        let order_price_obj = {
            id: order.id,
            customer: order.customer,
            euros: order_price
        }
        order_prices.push(order_price_obj)
    })
    const customer_ranking = []
    customers.forEach(customer => {
        let total_euros = order_prices.filter(obj => obj.customer == customer.id)
            .reduce((a, b) => +a + +b.euros, 0);
        customer_ranking.push({
            id: customer.id,
            firstname: customer.firstname,
            lastname: customer.lastname,
            total_euros: total_euros
        })
    })
    order_prices.map(obj => delete obj.customer) 
    customer_ranking.sort((a, b) => b.total_euros - a.total_euros)
}

main()

