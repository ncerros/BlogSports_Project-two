const { Post } = require('../models');

const postData =

[
    {
        "name": " ",
        "description": " "
    },    
   
  ]
  
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;