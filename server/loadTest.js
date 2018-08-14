const renderWeightedId = () => {
  return 10000000 - Math.ceil(Math.random() * 2000000);
};

const generateId = (context, _, done) => {
  context.vars.id = renderWeightedId();
  return done();
};

module.exports = { generateId };
