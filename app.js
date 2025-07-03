//Importamos el modulo express
const { error } = require("console");
const express = require("express");
//Declaramos el puerto donde queremos levantar el servidor
const PORT  = 3000;

//Asi inicializamos express y podemos acceder a todas las funcionalidades que nos proporciona
const app = express();
//En este caso trabajamos con JSON por lo que analizamos archivos JSON
app.use(express.json());

require("dotenv").config(); //se obtiene la info de configuracion en .env
const url_mongo = process.env.DATABASE_URL_ENV;
console.log(url_mongo);

//parte de mongoose pero primero hay que arrancar mongoose
// db.on("error", (error) =>{
//     console.log(`Error al conectar`);
// });

// db.once("connected", () =>{
//     console.log(`Success connect`);
// });

// db.on("disconnected", () =>{
//     console.log(`mongoose default connection is disconnected`);
// });

//Levantamos el servidor en el puerto 3000 usando la funcion listen de express
app.listen(PORT, ()=>{
    console.log(`Server running http://localhost:${PORT}`);
})



