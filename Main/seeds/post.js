const { Post } = require('../models');

const postData =

[
    {
        "title": "Hank Aldous",
       "content": "The Dallas Mavericks will win today!",
        "user_id": 1 
      },
      {
        "title": "Darren Watson",
        "content": "The LA Clipper are terrible and the mavericks are better HAHA!",
         "user_id": 1
      },
      {
        "title": "Norman Cerros",
        "content": "The NFL Draft was terrible, cowboys didn't get who they want...again!",
         "user_id": 1
      },    
   
  ]
  
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;