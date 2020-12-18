const loader = require('../file/loadJSON');
const initalizeDb = (eventsFile, promotionsFile) => {
  return {
    async fetchAllEvents () {
      return loader.loadJSON(eventsFile);
    },
    async fetchAllPromotions () {
      return loader.loadJSON(promotionsFile);
    }
  };
};

module.exports = {
  // eslint-disable-next-line no-use-before-define
  initalizeDb

};
