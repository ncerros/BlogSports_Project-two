const { Comment } = require('../models');

const commentsData = [
    {
        "comment_text": " ",
        "user_id": 1,
        "post_id": 1
    },    
];

const seedComments = () => Comment.bulkCreate(commentsData);

module.exports = seedComments;
