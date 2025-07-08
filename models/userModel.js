//Importamos mongoose para poder utilizarlo en el fichero y crear el modelo y esquema
const mongoose = require("mongoose");

//Creamos un esquema e insetamos la estructura que queremos
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //Campo requerido
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, //Asegura que cada correo electronico sea unico en la base de datos
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now, //Asigna la fecha actual como valor por defecto
  },
});

//Creamos el modelo y le indicamos el nombre, esquema y el nombre de la coleccion
const User =mongoose.model("User", userSchema, "Users");

//Exportamos el modelo
module.exports = User;
