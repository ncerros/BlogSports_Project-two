const { Post } = require('../models');

const postData =

[
    {
        "title": "Hank Aldous",
       "content": "The Dallas Mavericks will win today!",
      "user_id": 1 
      },    
   
  ]
  
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;