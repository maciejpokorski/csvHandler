import { OrderPrice, Customer } from './types';

const generateCustomerRanking = (
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

export default generateCustomerRanking;
