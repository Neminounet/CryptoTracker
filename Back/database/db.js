const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../models/user.model");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { dialect: "postgres" }
);

const authDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion établie avec la Base de données.");
  } catch (error) {
    console.log("Impossible de se connecter à la base de données : ", error);
  }
};

const User = UserModel(sequelize, DataTypes);

const initDb = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("La base de données a bien été initialisée !");
    const { createAdmin } = require("../utils/admin");
    await createAdmin();
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la base de données : ",
      error
    );
  }
};

module.exports = { authDb, initDb, sequelize, User };
