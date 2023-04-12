const {sequelize} = require('./db');
const {User} = require('./');
const users = require('./seedData');
const bcrypt = require('bcrypt')

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  // await User.bulkCreate(users);
  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      return {
        ...user,
        password:hashedPassword
      };
    })
  );
  await User.bulkCreate(hashedUsers);
};


module.exports = seed;
