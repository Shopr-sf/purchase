const siege = require('siege');

const sieger = siege().on(3003);

const renderWeightedId = () => 10000000 - Math.ceil(Math.random() * 2000000);

for (let i = 0; i < 100000; i++) {
  sieger.for(1).times.get(`/products/${renderWeightedId()}`);
}

sieger.attack();
