const { createUser } = require("../queries/user.queries");

const createAdmin = async () => {
  try {
    const adminUser = await createUser({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      username: process.env.ADMIN_USERNAME,
      isAdmin: process.env.ADMIN_BOOL,
    });
    const adminJson = adminUser.toJSON();
    const { password, ...adminWithoutPassword } = adminJson;

    console.log("Création Admin reussie.", adminWithoutPassword);
  } catch (error) {
    console.error("Erreur lors de la création de l'administrateur", error);
  }
};

module.exports = { createAdmin };
