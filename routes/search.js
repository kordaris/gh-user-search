const express  = require('express');
const paginate = require('express-paginate');
const router   = express.Router();
const { getUsers } = require('../helpers/gh-users.js');

router.use(paginate.middleware(10, 50));

/* search */
router.get('/', async function(req, res, next) {
  try {

    const { user, page, limit } = req.query && req.query;
    const users                 = await getUsers(user, page, limit);
    const items                 = users && users.items || [];
    const total_count           = users && users.total_count || 0;
    const page_count            = Math.ceil(total_count / limit);

    // get the first 3 pages
    const first_pages = paginate.getArrayPages(req)(3, page_count, page);

    /**
     * - only the first 100 results are available from the api
     * - check if page_count exists
     */
    const last_page_count = page_count > 100 ? 100 : page_count ? page_count - 1 : 0;

    /**
     * Get the last pages of pagination.
     * Although there is a bug with the express-paginate mod 
     * and the wrong page url is returned.
     */
    const last_pages = paginate.getArrayPages(req)(2, page_count, last_page_count);

    // render template and pass variables
    res.render('search-results', { 
      title: 'Search results', 
      users: items,
      total_count,
      page_count,
      first_pages,
      last_pages,
      page
    });

  } catch(e) {

    console.error('error: ', e);
    
  }
});

module.exports = router;
