  
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./api/homepageRoutes');
const profile = require('./api/profileRoutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('./api', profile);


module.exports = router;