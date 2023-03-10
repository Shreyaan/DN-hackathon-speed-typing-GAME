const router = require("express").Router();
const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

module.exports = router;
