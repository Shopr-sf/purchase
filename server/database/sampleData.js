const fs = require('fs');

const brand = [
  'Nike',
  'Adidas',
  'Rebok',
  'Hanes',
  'Jockey',
  'Fruit of the Loom',
  'Dell',
  'Lenovo',
  'Apple',
  'GE',
  'Samsung',
  'WirlPool',
  'HTC',
  'Oppo',
  'LG',
  'Duracell',
  'Energizer',
  'Rayovac',
];

const type = [
  'Shoe',
  'T-Shirt',
  'Laptop',
  'Refrigerator',
  'Smartphone',
  'Battery',
];

const name = [
  'Harper',
  'Rooney',
  'Squires',
  'Stuart',
  'Robson',
  'Cline',
  'Reyna',
  'Gibson',
  'Adamson',
  'Kyra',
  'Farrah',
  'Cooper',
  'Ellison',
  'Eastman',
  'Easton',
  'Nora',
  'Erwin',
  'Eaton',
  'Erickson',
  'Solano',
  'Steer',
  'Sneed',
  'Levi',
  'Norma',
  'Sissons',
  'Steadman',
  'Salt',
  'Cassy',
  'Lantern',
  'Peanut',
  'Almond',
  'Spearmint',
  'Reagan',
  'Quinn',
  'Wooly',
  'Yale',
  'Torres',
  'Thao',
  'Tuck',
  'Toth',
  'Stella',
  'Tillman',
  'Albright',
  'Arteaga',
  'Addis',
  'Ayala',
  'Milton',
  'Munson',
  'Montgomery',
  'Hazel',
  'Henley',
  'Harley',
  'Franz',
  'Fairway',
  'Phoenix',
  'Pope',
  'Carmichael',
];

const color = [
  'green',
  'white',
  'blue',
  'black',
  'silver',
  'purple',
];

const size = [
  'S',
  'M',
  'L',
  'XL',
];

const tier = [
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

const p = 'Lorem ipsum dolor amet aliqua 8-bit cillum lumbersexual la croix, squid austin cliche deserunt master cleanse +1. Sustainable sed in, blue bottle edison bulb sartorial crucifix cred neutra marfa. Mixtape godard messenger bag vegan, echo park gochujang next level unicorn polaroid. Raw denim hammock shoreditch do. Fixie cred gochujang, schlitz eiusmod tumblr meggings celiac XOXO messenger bag fingerstache tbh. Four dollar toast velit anim, ex cronut quis brooklyn hot chicken. Ramps dolore cornhole aliquip next level, shaman fingerstache. Lorem copper mug shaman 3 wolf moon. Photo booth butcher ipsum, cronut aliqua health goth exercitation. Unicorn nostrud scenester jean shorts. Distillery pinterest butcher farm-to-table, iceland synth brunch la croix. Blog sartorial DIY, eu qui migas lomo poutine. Marfa selvage artisan nulla gastropub, wayfarers readymade photo booth jean shorts air plant glossier. Vegan flexitarian next level twee quis officia chillwave, small batch franzen banh mi. Adipisicing shabby chic velit authentic, asymmetrical aesthetic prism. 90s in echo park, laborum air plant succulents listicle swag vinyl esse kickstarter aliquip. Dolore trust fund +1 nulla 3 wolf moon heirloom pop-up master cleanse asymmetrical poutine. Af humblebrag whatever tilde raclette, sint vaporware veniam four dollar toast. Cloud bread keffiyeh DIY, pug intelligentsia cold-pressed adaptogen disrupt direct trade est yr tumeric eiusmod poke. Adipisicing listicle chillwave, plaid ea dolore palo santo artisan taxidermy iPhone. Pickled pug consequat, bushwick sustainable shabby chic shaman nulla umami street art four dollar toast humblebrag biodiesel. Actually banh mi intelligentsia wolf whatever knausgaard tumeric ex, umami eiusmod poutine cupidatat iPhone art party glossier. Artisan occaecat small batch pariatur nostrud. Umami coloring book enim, post-ironic aliquip taxidermy neutra adipisicing mixtape cupidatat glossier. Aesthetic meh pour-over dolore enamel pin pickled.';

const sentences = p.split('.');

// each item will have unique id
// items will have a name, brand, and type
// some of these items will need to have 1-5 tiers
// each of these will have the same stars/questions/reviews
// every item will have the same array of colors and array of sizes

const generator = () => {
  const storage = [];
  let gBrand;
  let gType;
  let gName;
  let gQuestions;
  let len;
  let random;
  let holder;
  let spot;

  const randomNum = () => Math.floor(Math.random() * 1000);

  for (let i = 0; i <= 1000; i++) {
    gBrand = brand[Math.floor(Math.random() * brand.length)];
    gType = type[Math.floor(Math.random() * type.length)];
    gName = name[Math.floor(Math.random() * name.length)];
    gQuestions = Math.floor(Math.random() * 50);

    len = tier.length;
    random = Math.ceil(Math.random() * 5);

    for (let j = 1; j <= random; j += 1) {
      spot = Math.floor(Math.random() * len);

      storage.push({
        id: i,
        productTier: tier[spot],
        brand: gBrand,
        type: gType,
        name: gName,
        productOptions: { color, size },
        price: {
          msrp: Math.ceil(Math.random() * 400) - 0.02,
        },
        reviews: [null, null, null, null, null].map(() => randomNum()),
        questions: gQuestions,
        isPrime: Math.floor(Math.random() * 2),
        stockCount: Math.floor(Math.random() * 100),
        aboutProduct: [sentences[Math.floor(Math.random() * sentences.length)],
          sentences[Math.floor(Math.random() * sentences.length)],
          sentences[Math.floor(Math.random() * sentences.length)]],
        seller: 'Amazon',
      });

      storage[i - 1].price.list = Math.floor((storage[i - 1].price.msrp)
        * (100 - Math.ceil(Math.random() * 2) * 5)) / 100;
      storage[i - 1].price.sale = Math.floor((storage[i - 1].price.msrp)
        * (100 - Math.ceil(Math.random() * 4) * 10)) / 100;

      holder = tier[len - 1];
      tier[len - 1] = tier[spot];
      tier[spot] = holder;
      len--;
    }
  }
  return storage;
};

let queryStatements = `DROP DATABASE IF EXISTS product_db;

CREATE DATABASE product_db;

USE product_db;

CREATE TABLE products (
id INTEGER PRIMARY KEY,
brand VARCHAR(100) NOT NULL,
name VARCHAR(200) NOT NULL,
product_tier VARCHAR(50) NOT NULL,
product_options JSON NOT NULL,
price JSON NOT NULL,
about_product JSON NOT NULL,
is_prime BOOLEAN NOT NULL,
stock_count INTEGER NOT NULL,
reviews JSON NOT NULL,
questions INTEGER NOT NULL,
seller VARCHAR(150) NOT NULL,
thumbnail TEXT NOT NULL
);

`;

queryStatements += generator().reduce((acc, obj) => (
  `${acc}(${obj.id}, '${obj.brand}', '${obj.name}', '${obj.productTier}', '${JSON.stringify(obj.productOptions)}', '${JSON.stringify(obj.price)}', '${JSON.stringify(obj.aboutProduct)}', ${obj.isPrime}, ${obj.stockCount}, '${JSON.stringify(obj.reviews)}', ${obj.questions}, '${obj.seller}', '${obj.productTier}.jpg'),`
), 'INSERT INTO products (id, brand, name, product_tier, product_options, price, about_product, is_prime, stock_count, reviews, questions, seller, thumbnail) VALUES');

fs.writeFile('./schema.sql', `${queryStatements};`, 'utf8', (err) => {
  if (err) throw err;
  console.log('success!');
});
