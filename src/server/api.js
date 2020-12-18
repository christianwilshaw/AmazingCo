const express = require('express');

module.exports = {
  createApiRouter
};

function createApiRouter (dataStore) {
  const router = express.Router();

  router.get('/events', (req, res) => {
    dataStore.fetchAllEvents()
      .then(
        (eventsListData) => {
          if (Object.keys(eventsListData).length > 0) {
            res.json(eventsListData);
          } else {
            res.status(404).json({ error: 'no_events_found' });
          }
        },
        (err) => {
          console.log(err.message);
          res.sendStatus(500).json({ error: 'server_error' });
        }
      );
  });

  router.get('/promotions', (req, res) => {
    dataStore.fetchAllPromotions()
      .then(
        (promotionsListData) => {
          if (Object.keys(promotionsListData).length > 0) {
            res.json(promotionsListData);
          } else {
            res.status(404).json({ error: 'no_promotions_found' });
          }
        },
        (err) => {
          console.log(err.message);
          res.sendStatus(500).json({ error: 'server_error' });
        }
      );
  });
  return router;
}
