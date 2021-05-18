const { User } = require('../models');

const userData =
[
  {
    "name": "",
    "password": ""
    },
]

const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;