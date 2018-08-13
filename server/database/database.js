const { Client } = require('pg');
const client = new Client();

client.connect();

const parseData = function parseStringifiedObjectsFromDataQuery(object) {
  const keys = ['about_product', 'list_price', 'reviews', 'product_options'];
  keys.forEach((key) => {
    if (object[key]) {
      object[key] = JSON.parse(object[key]);
    }
  });
  return object;
};

const getProduct = function getProductInformation(productId, callback) {
  client.query(`select * from products where id=${productId}`, (err, results) => {
    if (err) console.error(err);
    callback(results);
  });
};

const getRelated = function getRelatedProducts(productType, callback) {
  client.query(`select id, product_tier, list_price, stock_count, thumbnail from products where type=${productType} limit 5;`, (err, results) => {
    if (err) console.error(err);
    callback(results);
  });
};

const getAll = function getProductAndRelatedProducts(productId, callback) {
  const storage = {};
  getProduct(productId, (results) => {
    console.log(results);
    storage.data = parseData(results[0]);
    const productType = results[0].type;
    getRelated(productType, productId, (relatedResults) => {
      storage.related = relatedResults.map(object => parseData(object));
      callback(storage);
    });
  });
};

module.exports = { getProduct, getRelated, getAll, client };
