var express = require('express');
var router = express.Router();

/* search */
router.post('/', function(req, res, next) {
  res.render('search', { title: 'Search results' });
});

module.exports = router;
