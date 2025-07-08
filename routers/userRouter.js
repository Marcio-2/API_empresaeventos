//Importamos las rutas de express
const router = require("express").Router();
//Importamos las funciones que vamos a usar en las rutas
const { signup, getUsers, login } = require("../controllers/userController");

//GET para obtener todos los puertos
router.get("/getUser", getUsers);

//POST para crear un usuario
router.post("/signup", signup);
//POST para crear un usuario
router.post("/login", login);

module.exports = router;