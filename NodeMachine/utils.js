const path = require('path');

const resolvePath = (pathToFile) => {
  return path.resolve(__dirname, `../${pathToFile}`)
};

module.exports = {
  resolvePath
};