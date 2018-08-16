const siege = require('siege');

const sieger = siege().on(3003);

const renderWeightedId = (callCount) => {
  let max = 1000000;
  if (callCount % 1000 === 0) {
    max = 100;
  } 
  return 10000000 - Math.ceil(Math.random() * max);
}

for (let i = 0; i < 100000; i++) {
  sieger.for(1).times.get(`/products/${renderWeightedId(i)}`);
}

sieger.attack();
