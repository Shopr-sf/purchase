DROP DATABASE IF EXISTS product_db;

CREATE DATABASE product_db;

\c product_db;

CREATE TABLE products (
id INTEGER PRIMARY KEY,
name character varying(200) NOT NULL,
type INT NOT NULL,
brand character varying(100) NOT NULL,
product_name character varying(200) NOT NULL,
product_tier character varying(50) NOT NULL,
list_price float(8) NOT NULL,
msrp_price float(8) NOT NULL,
sale_price float(8) NOT NULL,
about_product character varying(350) NOT NULL,
is_prime BOOLEAN NOT NULL,
stock_count INTEGER NOT NULL,
reviews json NOT NULL,
questions INTEGER NOT NULL,
seller character varying(50) NOT NULL,
thumbnail TEXT NOT NULL
);

\copy products FROM './data.csv' DELIMITER '/';
\copy products FROM './data0.csv' DELIMITER '/';
\copy products FROM './data1.csv' DELIMITER '/';
\copy products FROM './data2.csv' DELIMITER '/';
