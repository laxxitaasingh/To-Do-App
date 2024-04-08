const express = require("express");
const {
  signUp,
  login,
  logout
} = require("../controller/user");
//const { auth } = require("../db/redis");
const router = express.Router();


router.post("/signupUser", signUp);
router.post("/loginUser", login);
router.delete("/logout", logout);


module.exports = router;