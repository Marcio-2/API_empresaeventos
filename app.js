//Importamos el modulo express
const express = require("express");
//Declaramos el puerto donde queremos levantar el servidor
const PORT  = 3000;

//Asi inicializamos express y podemos acceder a todas las funcionalidades que nos proporciona
const app = express();

//En este caso trabajamos con JSON por lo que analizamos archivos JSON
app.use(express.json());

//Levantamos el servidor en el puerto 3000 usando la funcion listen de express
app.listen(PORT, ()=>{
    console.log(`Server running http://localhost:${PORT}`);
})



// const mongoose = require("mongoose");
// require("dotenv").config();

