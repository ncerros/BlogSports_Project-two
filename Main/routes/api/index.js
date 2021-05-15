const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);

module.exports = router;

// const router = require('express').Router();
// const travellerRoutes = require('./travellerRoutes');
// const locationRoutes = require('./locationRoutes');
// const tripRoutes = require('./tripRoutes');

// router.use('/travellers', travellerRoutes);
// router.use('/locations', locationRoutes);
// router.use('/trips', tripRoutes);

// module.exports = router;
