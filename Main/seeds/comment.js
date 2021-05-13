const { Comment } = require('../models');

const commentsData = [
    {
        "comment": " "
    },    
];

const seedComments = () => Comment.bulkCreate(commentsData);

module.exports = seedComments;
