const router = require("express").Router();
const authCheck = require("../middlewares/auth");
const {
  registerScore,
  viewUserScores,
  viewAllScores,
} = require("../controllers/scoreboardController");
router.post("/register", authCheck, registerScore);

router.get("/get/current", authCheck, viewUserScores);

router.get("/get/all", viewAllScores);

module.exports = router;
