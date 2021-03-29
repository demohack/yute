-- Comments in SQL Start with dash-dash --

-- 1. Add a product to the table with the name of “chair”, price of 44.00, and can_be_returned of false.
insert into products (name, price, can_be_returned)
values ('chair', 44, false)


-- 2. Add a product to the table with the name of “stool”, price of 25.99, and can_be_returned of true.
insert into products (name, price, can_be_returned)
values ('stool', 25.99, true)

-- 3. Add a product to the table with the name of “table”, price of 124.00, and can_be_returned of false.
insert into products (name, price, can_be_returned)
values ('table', 124, false)

-- 4. Display all of the rows and columns in the table.
select * from products

-- 5. Display all of the names of the products.
select name from products

-- 6. Display all of the names and prices of the products.
select name, price from products

-- 7. Add a new product - make up whatever you would like!
insert into products (name, price, can_be_returned)
values ('standup desk', 200, false)

-- 8. Display only the products that can_be_returned.
select * from products where can_be_returned = true

-- 9. Display only the products that have a price less than 44.00.
select * from products where price < 44

-- 10. Display only the products that have a price in between 22.50 and 99.99.
select * from products where price between 22.50 and 99.99

-- 11. There’s a sale going on: Everything is $20 off! Update the database accordingly.
ALTER TABLE products ADD COLUMN sales_price DOUBLE PRECISION;
update products set sales_price = price - 20;
select * from products;

-- 12. Because of the sale, everything that costs less than $25 has sold out. Remove all products whose price meets this criteria.
ALTER TABLE products ADD COLUMN sold boolean; 
update products set sold = true
where sales_price < 25;
select * from products where sold = true;

-- 13. And now the sale is over. For the remaining products, increase their price by $20.
update products set sales_price = sales_price + 20;

-- 14. There is a new company policy: everything is returnable. Update the database accordingly.
update products set can_be_returned = true;
