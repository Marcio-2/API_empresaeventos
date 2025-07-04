//Importamos el modelo en el controlador, donde vamos a hacer las peticiones a la base de datos
const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');

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
        .json({ status: "Failed", data: null, error: error.message });
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

module.exports = { signup, getUsers };

// const addUser = async (req, res) => {
//   try {
//     const { name, lastName, email, password, createAt } = req.body;

//     const user = new User({
//       name: name,
//       lastName: lastName,
//       email: email,
//       password: password, //quizas bcrypt!
//       createAt: createAt,
//     });
//     await user.save();

//     res.status(200).json({ status: "succeded", data: user });
//   } catch (error) {
//     if(error.code === 1100) {
//         return res.status(200).json({
//             status: "Error",
//             message: "El email ya existe",
//         });
//     }

//     res.status(400).json({
//         status: "Error",
//         message: "No se pudo crear el usuario",
//         error: error.message,
//     });
//   }
// };
