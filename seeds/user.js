const { User } = require('../models');

const userData =
[
  {
    "name": "Mr.Foo",
    "email": "foo@foo.com",
    "password": "foo123"
    },
]

const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;