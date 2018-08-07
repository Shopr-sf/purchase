const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'product_db',
});

const parseData = function parseStringifiedObjectsFromDataQuery(object) {
  const keys = ['about_product', 'price', 'reviews', 'product_options'];
  keys.forEach((key) => {
    if (object[key]) {
      object[key] = JSON.parse(object[key]);
    }
  });
  return object;
};

const getProduct = function getProductInformation(productId, callback) {
  connection.query(`select * from products where id=${productId}`, (err, results) => {
    if (err) console.error(err);
    callback(results);
  });
};

const getRelated = function getRelatedProducts(productName, productId, callback) {
  connection.query(`select id, product_tier, price, stock_count, thumbnail from products where name='${productName}' and id <> ${productId}`, (err, results) => {
    if (err) console.error(err);
    callback(results);
  });
};

const getAll = function getProductAndRelatedProducts(productId, callback) {
  const storage = {};
  getProduct(productId, (results) => {
    storage.data = parseData(results[0]);
    const productName = results[0].name;
    getRelated(productName, productId, (relatedResults) => {
      storage.related = relatedResults.map(object => parseData(object));
      callback(storage);
    });
  });
};

const insertNew = function (params, cb) {
  const queryString = `INSERT INTO products (id, brand, name, product_tier, product_options, price, about_product, is_prime, stock_count, reviews, questions, seller, thumbnail) VALUES(${params.id}, '${params.brand}', '${params.name}', '${params.productTier}', '${JSON.stringify(params.productOptions)}', '${JSON.stringify(params.price)}', '${JSON.stringify(params.aboutProduct)}', ${params.isPrime}, ${params.stockCount}, '${JSON.stringify(params.reviews)}', ${params.questions}, '${params.seller}', '${params.productTier}.jpg');`;
  connection.query(queryString, cb);
};

const updateOne = function (params, cb) {
  const queryString = `UPDATE products SET brand = '${params.brand}', name = '${params.name}', product_tier = '${params.productTier}', product_options = '${JSON.stringify(params.productOptions)}', price = '${JSON.stringify(params.price)}', about_product = '${JSON.stringify(params.aboutProduct)}', is_prime = ${params.isPrime}, stock_count = ${params.stockCount}, reviews = '${JSON.stringify(params.reviews)}', questions = ${params.questions}, seller = '${params.seller}', thumbnail = '${params.productTier}.jpg' WHERE id=${params.id};`;
  connection.query(queryString, cb);
};

/* TODO: add DELETE functionality */
const removeOne = function (id, cb) {
  connection.query(`DELETE from products WHERE id=${id}`, cb);
};

module.exports = {
  getProduct,
  getRelated,
  getAll,
  insertNew,
  updateOne,
  removeOne,
};
