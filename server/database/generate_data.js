var faker = require('faker');

var tiers = [
  'Elite',
  'Premier',
  'Executive',
  'Pinnacle',
  'Exclusive',
  'Automatic',
  'Self-Driving',
  'Distinguished',
  'Advanced',
  'Crown',
  'Principal',
  'Self-Aware',
  'Max',
  'Apical',
  'Unibody',
  'Monolithic',
  'Autonomous',
  'Super',
  'Turbo',
  'Electric',
  'BioFueled',
  'Slim',
  'Micro',
  'Nano',
  'Jumbo',
];

var getRandom = max => Math.floor(Math.random() * max);
var getListAndMSRP = (price, which) => (
  Math.floor(price * (100 - Math.ceil(Math.random() * (2 * which)) * (5 * which))) / 100
);
var generateReviews = () => {
  var output = [];
  for (var i = 0; i < 5; i++) {
    output.push(getRandom(1000));
  }
  return output;
};

var getName = (index) => {
  index = index.toString();
  const names = [
    'product',
    'item',
    'listing',
    'page',
    'sku',
    'info',
    'number',
    'element',
    'asset',
    'which',
  ];
  return names[index[index.length - 1]] + index;

}

var generateRecords = (start, end) => {
  for (var index = start; index < end; index++) {
    var price = Math.ceil(Math.random() * 400) - 0.02;
    console.log(`${index}/${getName(index)}/${Math.floor(Math.random() * 1000)}/${faker.company.companyName()}/${faker.commerce.productName()}/${tiers[getRandom(25)]}/${price}/${getListAndMSRP(price, 1)}/${getListAndMSRP(price, 2)}/${faker.lorem.sentence(12)}|${faker.lorem.sentence(8)}|${faker.lorem.sentence(10)}/${Math.round(Math.random())}/${Math.floor(Math.random() * 100)}/${JSON.stringify(generateReviews())}/${getRandom(50)}/${faker.internet.userName()}/${tiers[getRandom(25)]}.jpg`);
  }
};

// generateRecords(0, 3000000);
// generateRecords(3000000, 6000000);
// generateRecords(6000000, 7000000);
generateRecords(7000000, 10000000);
