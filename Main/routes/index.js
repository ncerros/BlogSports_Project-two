const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/postRoutes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);

module.exports = router;

 const router = require('express').Router();
 const userRoutes = require('./api/userRoutes');
 const postRoutes = require('./api/postRoutes');

 module.exports = router;
