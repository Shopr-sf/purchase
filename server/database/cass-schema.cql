DROP KEYSPACE IF EXISTS product_db;

CREATE KEYSPACE product_db WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor': 1};

USE product_db;

CREATE TABLE products (
  id varint PRIMARY KEY,
  name varchar,
  type varint,
  brand varchar,
  product_name varchar,
  product_tier varchar,
  list_price FLOAT,
  msrp_price FLOAT,
  sale_price FLOAT,
  about_product varchar,
  is_prime boolean,
  stock_count varint,
  reviews text,
  questions varchar,
  seller varchar,
  thumbnail text
) WITH compaction = { 'class': 'LeveledCompactionStrategy' };

COPY products (id, name, type, brand, product_name, product_tier, list_price, msrp_price, sale_price, about_product, is_prime, stock_count, reviews, questions, seller, thumbnail) from './data.csv' with DELIMITER='/';
COPY products (id, name, type, brand, product_name, product_tier, list_price, msrp_price, sale_price, about_product, is_prime, stock_count, reviews, questions, seller, thumbnail) from './data0.csv' with DELIMITER='/';
COPY products (id, name, type, brand, product_name, product_tier, list_price, msrp_price, sale_price, about_product, is_prime, stock_count, reviews, questions, seller, thumbnail) from './data1.csv' with DELIMITER='/';
COPY products (id, name, type, brand, product_name, product_tier, list_price, msrp_price, sale_price, about_product, is_prime, stock_count, reviews, questions, seller, thumbnail) from './data2.csv' with DELIMITER='/';