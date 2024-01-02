const { createUser } = require("../queries/user.queries");

exports.newUser = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await createUser(body);
    const userJson = user.toJSON();
    const { password, ...userWithoutPassword } = userJson;

    req.logIn(userJson, (error) => {
      if (error) {
        return next(error);
      }
      return res
        .status(200)
        .json({
          message: "Création utilisateur réussie",
          user: userWithoutPassword,
        });
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur : ", error);
    res
      .status(500)
      .json({ error: "Erreur interne du serveur", details: error });
  }
};
