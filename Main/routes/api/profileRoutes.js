const router = require('express').Router();


// // View User Profile
// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//     try {
//       // Find the logged in user based on the session ID
//       const userData = await User.findByPk(req.session.user_id, {
//         attributes: { exclude: ['password'] },
//         include: [{ model: Post }],
//       });
  
//       const user = userData.get({ plain: true });
//       res.render('Profile', {
//         ...user,
//         logged_in: true
//       });
//     } catch (err) {
//       res.status(501).json(err);
//     }
//   });

router.get('/profile', (req, res) => {
    
    if (req.session.logged_in) {
      res.render('profile')
      return;
    }
  

});

  module.exports = router;

 