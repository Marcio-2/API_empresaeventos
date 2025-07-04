//Importamos el modelo en el controlador, donde vamos a hacer las peticiones a la base de datos
const userModel = require("../models/userModel");

const addUser = async (req, res) => {
  try {
    const { name, lastName, email, password, createAt } = req.body;

    const user = new User({
      name: name,
      lastName: lastName,
      email: email,
      password: password, //quizas bcrypt!
      createAt: createAt,
    });
    await user.save();

    res.status(200).json({ status: "succeded", data: user });
  } catch (error) {
    if(error.code === 1100) {
        return res.status(200).json({
            status: "Error",
            message: "El email ya existe",
        });
    }

    res.status(400).json({
        status: "Error",
        message: "No se pudo crear el usuario",
        error: error.message,
    });
  }
};


module.exports = { addUser };