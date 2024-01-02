const router = require("express").Router();
const { newUser } = require("../controllers/user.controller");

router.post("/register", newUser);

module.exports = router;
