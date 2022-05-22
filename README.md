# Exercise

The ACME inc. tool supply company manages its operations with 3 csv files:

1. `customers.csv` keeps customer information:
    * `id` is a numeric customer id
    * `firstname` is the customer's first name
    * `lastname` is the customer's last name
2. `products.csv` keeps product info:
    * `id` is a numeric product id
    * `name` is the human-readable name
    * `cost` is the product cost in euros
3. `orders.csv` keeps order information:
    * `id` is a numeric order id
    * `customer` is the numeric id of the customer who created the order
    * `products` is a space-separated list of product ids ordered by the customer

Manually dealing with those files is hard and error-prone, and they've asked for your help writing some code to make their lives easier.

### Task 1

Right now the `orders.csv` doesn't have total order cost information.

We need to use the data in these files to emit a `order_prices.csv` file with the following columns:
* `id` the numeric id of the order
* `euros` the total cost of the order

### Task 2

The marketing department wants to know which customers are interested in each product; they've asked for a `product_customers.csv` file that, for each product, gives the list of customers who have purchased this product:
* `id` numeric product id
* `customer_ids` a space-separated list of customer ids of the customers who have purchased this product

### Task 3

To evaluate our customers, we need a `customer_ranking.csv` containing the following columns, ranked in descending order by total_euros:
* `id` numeric id of the customer
* `firstname` customer first name
* `lastname` customer last name
* `total_euros` total euros this customer has spent on products


# How to use the project

## Prerequisites
- node & npm installed

## Steps to run
0. Open terminal
1. ```npm install``` install required dependecies
2. ```npx tsc index.tsc``` generate js file
3. ```node index``` run code in node environment

### Expecte output

Code run
![image](https://user-images.githubusercontent.com/9077410/169705304-a7820a94-a980-4c17-9443-125037ae671d.png)

New 3 csv files
![image](https://user-images.githubusercontent.com/9077410/169705343-08e2b66e-cfe6-4a10-b816-1f7e77114f51.png)
![image](https://user-images.githubusercontent.com/9077410/169705373-49492deb-f79c-4cb6-be4c-6133ea815b33.png)


# Tests
Project contains unit tests

### How to run tests?
```npm test```

![image](https://user-images.githubusercontent.com/9077410/169705467-34c58da0-9137-44df-b675-f94b38fcb546.png)
