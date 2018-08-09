const faker = require('faker');
const names = require('./names')(10 ** 7);

const tiers = [
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

const getRandom = max => Math.floor(Math.random() * max);
const getListAndMSRP = (price, which) => (
  Math.floor(price * (100 - Math.ceil(Math.random() * (2 * which)) * (5 * which))) / 100
);
const generateReviews = () => {
  const output = [];
  for (let i = 0; i < 5; i++) {
    output.push(getRandom(1000));
  }
  return output;
};

const generateRecords = (num) => {
  for (let index = (10 ** 6) * 5; index < num; index++) {
    const price = Math.ceil(Math.random() * 400) - 0.02;
    const productTier = tiers[getRandom(25)];
    console.log(`${index}/${names[index]}/${faker.company.companyName()}/${faker.commerce.productName()}/${productTier}/${JSON.stringify({list: price,msrp: getListAndMSRP(price, 1),sale: getListAndMSRP(price, 2)})}/${JSON.stringify([faker.lorem.sentence(12),faker.lorem.sentence(8),faker.lorem.sentence(10)])}/${Math.round(Math.random())}/${Math.floor(Math.random() * 100)}/${JSON.stringify(generateReviews())}/${getRandom(50)}/${faker.internet.userName()}/${productTier}.jpg`);
  }
};

generateRecords(10 ** 7);
