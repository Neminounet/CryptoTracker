const { User } = require("../database/db");

const createUser = async (body) => {
  return User.create({ ...body });
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur : ", error);
    throw error;
  }
};

const getUserByGoogleId = async (googleId) => {
  try {
    const user = await User.findOne({ where: { googleId: googleId } });
    return user;
  } catch (err) {
    console.error(`Erreur lors de la récupération de l'utilisateur : ${err}`);
    throw err;
  }
};

module.exports = { createUser, getUserById, getUserByEmail, getUserByGoogleId };
