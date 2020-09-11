const express      = require('express');
const paginate     = require('express-paginate');
const router       = express.Router();
const { getUsers } = require('../helpers/gh-users.js');

router.use(paginate.middleware(10, 50));

/* search */
router.get('/', async function(req, res, next) {
  try {

    const { user, page, limit } = req.query;
    const users                 = await getUsers(user, page, limit);
    const items                 = users && users.items || [];
    const total_count           = users && users.total_count || 0;
    const page_count            = Math.ceil(total_count / limit);

    res.render('search', { 
      title: 'Search results', 
      users: items,
      total_count,
      page_count,
      pages: paginate.getArrayPages(req)(3, page_count, page)
    });

  } catch(e) {

    console.error('error: ', e);
    
  }
});

module.exports = router;
