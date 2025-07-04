const { addUser } = require("../controllers/userController");
const router = require("express").Router();

router.post("/signup", addUser);

module.exports = router;