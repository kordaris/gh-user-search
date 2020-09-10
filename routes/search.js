const express      = require('express');
const router       = express.Router();
const { getUsers } = require('../helpers/gh-users.js');

/* search */
router.post('/', async function(req, res, next) {
  const query  = req.body && req.body.search;
  const result = await getUsers(query);
  res.render('search', { 
    title: 'Search results', 
    users: result
  });
});

module.exports = router;
