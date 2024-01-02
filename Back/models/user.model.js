const bcrypt = require("bcrypt");

module.exports = (sequelize, datatypes) => {
  const User = sequelize.define("User", {
    email: {
      type: datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: datatypes.STRING,
      allowNull: false,
    },
    username: {
      type: datatypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: datatypes.BOOLEAN,
      defaultValue: false,
    },
    isOAuthUser: {
      type: datatypes.BOOLEAN,
      defaultValue: false,
    },
    googleId: {
      type: datatypes.STRING,
    },
  });

  User.beforeCreate(async (user) => {
    try {
      if (!user.isOAuthUser) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    } catch (error) {
      throw error;
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      } catch (error) {
        throw error;
      }
    }
  });

  User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
