// generates an array of names
// receives the length of your desired list of names (defaults to 10M)
const renderNamesToIds = (num = 10 ** 7) => {
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
  const keys = [];
  const renderKey = (string) => {
    const index = string[string.length - 1];
    return names[index] + string;
  };
  for (let i = 0; i < num; i++) {
    keys.push(renderKey(i.toString()));
  }
  return keys;
};

module.exports = renderNamesToIds;
