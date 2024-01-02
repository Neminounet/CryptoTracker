const router = require("express").Router();
const {
  sessionCreate,
  sessionDelete,
  googleAuth,
  googleAuthCb,
} = require("../controllers/auth.controller");

router.post("/login", sessionCreate);
router.get("/logout", sessionDelete);
router.get("/google", googleAuth);
router.get("/google/cb", googleAuthCb);

// Route test :)
router.get("/", (req, res) => {
  try {
    const user = req.user.toJSON();
    console.log(user);
    const { password, ...userWOPassword } = user;
    res.json(userWOPassword);
  } catch (error) {
    console.error("Utilisateur non trouvé.");
    res.json({ message: "Utilisateur non connecté" });
  }
});

module.exports = router;
