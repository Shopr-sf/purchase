const { Pool } = require('pg');

const pool = new Pool({
  user: 'ec2-user',
  database: 'product_db',
  port: 5432,
});


const getAll = function getProductAndRelatedProducts(productId, callback) {
  const query = {
    name: 'get-all',
    text: 'select t1.*, t2.product_name, t2.about_product, t2.list_price, t2.reviews from products t1 inner join products t2 on t1.id=$1 and t2.type=t1.type and t1.id!=t2.id limit 6',
    values: [productId],
  };
  pool.query(query, (err, result) => {
    if (err) console.error(`Error fetching product data from postgres: ${err}`);
    callback(result.rows);
  });
};

const insertNew = function (params, cb) {
  const queryString = `INSERT INTO products (id, brand, name, product_tier, product_options, list_price, msrp_price, sale_price, about_product, is_prime, stock_count, reviews, questions, seller, thumbnail, type) VALUES(${params.id}, '${params.brand}', '${params.name}', '${params.productTier}', ${params.listPrice}, ${params.msrpPrice}, ${params.salePrice}, '${JSON.stringify(params.aboutProduct)}', ${params.isPrime}, ${params.stockCount}, '${JSON.stringify(params.reviews)}', ${params.questions}, '${params.seller}', '${params.productTier}.jpg, ${params.type}');`;
  pool.query(queryString, cb);
};

const updateOne = function (params, cb) {
  const queryString = `UPDATE products SET brand = '${params.brand}', name = '${params.name}', product_tier = '${params.productTier}', product_options = '${JSON.stringify(params.productOptions)}', price = '${JSON.stringify(params.price)}', about_product = '${JSON.stringify(params.aboutProduct)}', is_prime = ${params.isPrime}, stock_count = ${params.stockCount}, reviews = '${JSON.stringify(params.reviews)}', questions = ${params.questions}, seller = '${params.seller}', thumbnail = '${params.productTier}.jpg' WHERE id=${params.id};`;
  pool.query(queryString, cb);
};

const removeOne = function (id, cb) {
  pool.query(`DELETE from products WHERE id=${id}`, cb);
};

module.exports = {
  getAll,
  insertNew,
  updateOne,
  removeOne,
};
