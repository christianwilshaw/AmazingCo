const fs = require('fs');
const loadJSON = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, content) => {
      if (err) {
        reject(err);
      } else {
        try {
          resolve(JSON.parse(content));
        } catch (err) {
          reject(err);
        }
      }
    });
  });
};

module.exports = {
  // eslint-disable-next-line no-use-before-define
  loadJSON

};
