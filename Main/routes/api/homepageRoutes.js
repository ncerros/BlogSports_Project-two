const router = require('express').Router();
const { Post, User, Comment, ProfileRoutes } = require('../../models');
const withAuth = require('../../utils/auth');


// Home Page
router.get('/homepage', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
    });
  // const newsUrl =
  // "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=61ad2e873ff340f59248cd423ec146cd";
  
  // function requestNews(req, res) {
  //   request(newsUrl, function(err, resp, body) {
  //     if (err) throw err;
  //     let payload = JSON.parse(body);
  //     let topNews = payload.articles;
  //     // const newsObj = topNews.map(news => {
  //     //   return {
  //     //     title: news.title,
  //     //     desc: news.description,
  //     //     imgUrl: news.urlToImage,
  //     //     url: news.url
  //     //   };
  //     // });
  //     const newsArr = [];
  //     for (const i = 0; i < topNews.length; i++) {
  //       const news = topNews[i];
  //       newsArr.push({
  //         title: news.title,
  //         desc: news.description,
  //         imgUrl: news.urlToImage,
  //         url: news.url
  //       });
  //     }
  //     res.render("homepage", { newsObj: newsArr });
  //   });
  // }

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(503).json(err);
  }
});

// View Specific post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['email'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['email']
            }
          ]         
        }
      ]
    });    

    const post = postData.get({ plain: true });
    console.log(post);
    console.log(req.session.user_id);
    res.render('post', {
      //spread operator, take post out of the array, spread just takes the info out, destructuring takes specific things out
      ...post,
      logged_in: req.session.logged_in,
      logged_in_user: req.session.user_id
    });
  } catch (err) {
    res.status(502).json(err);
  }
});

// View User Profile
// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(501).json(err);
  }
});

// Login Page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// Signup Page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

// Logout Page
router.get('/logout', (req, res) => {
  console.log("Logging Out");
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect("/");
    });
  }else{ 
    res.status(204).redirect("/");
  }
});

module.exports = router;