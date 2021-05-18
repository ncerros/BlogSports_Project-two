const { User } = require('../models');

const userData =
[
  {
    "name": "",
    "email": " ",
    "password": ""
    }
]

const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;