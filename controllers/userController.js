//Importamos el modelo en el controlador, donde vamos a hacer las peticiones a la base de datos
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/utils");

//Creamos el endPoint para añadir usuario
const signup = async (req, res) => {
  try {
    //Crea un nuevo objeto de modelo utilizando los datoa enviados en la solicitud POST
    const user = new userModel({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10), //Encripta la contraseña utilizando bcrypt con un factor de coste de 10
    });

    //guarda el objeto de modelo en la base de datos
    await user.save();

    //Devuelve una respuesta de estado 200 (exito) con los datos del usuario guardado en formato JSON
    res.status(200).json({ status: "succeded", user, error: null });
  } catch (error) {
    console.log(error);
    //Maneja diferentes tipos de errores y devuelve respuestas correspondientes

    //Si el codigo de error es 11000, indica que el correo electronico ya existe en la base de datos
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ status: "Failed", data: null, error: "El correo electrónico ya está registrado. Usa otro." });
    }

    //Para cualquier otro tipo de error, devuelve una respuesta de estado 404 (no encontrado) con el mensaje de error correspondiente
    res
      .status(404)
      .json({ status: "Failed", data: null, error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const usuarios = await userModel.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los usuarios", message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      res.status(401).json({ error: "Usuario y contraseña incorrecta" });
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      res.status(401).json({ error: "Usuario y contraseña incorrecta" });
    }

    const token = generateToken(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      false
    );

    const token_refresh = generateToken(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      true
    );

    res.status(200).json({
      status: "succeded",
      data: {
        id: user._id,
        email:user.email,
        role:user.role,
        token,
        token_refresh,
      },
      error: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al hacer login", message: error.message });
  }
};
module.exports = { signup, getUsers, login };
