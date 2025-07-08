//Importamos el modulo express
const express = require("express");
//Declaramos el puerto donde queremos levantar el servidor
const mongoose = require("mongoose");
const PORT  = 3000;

const userRouter = require("./routers/userRouter");
const eventRouter = require("./routers/eventRouter");
//Asi inicializamos express y podemos acceder a todas las funcionalidades que nos proporciona
const app = express();

//En este caso trabajamos con JSON por lo que analizamos archivos JSON
app.use(express.json());

//Importamos la configuracion para poder acceder al fichero .env
require("dotenv").config(); 

//Recuperamos la url de conexion de mongodb del fichero env
const url_mongodb = process.env.DATABASE_URL_DEV;

//Le indicamos a mongoose a que url se debe de conectar
mongoose.connect(url_mongodb);

//Hacemos la conexion con mongoose
const db = mongoose.connection

//Comprobamos si sale el error y que nos indique el error
db.on("error", (error) =>{
    console.log(`Error al conectar con mongo ${error}`);
});

//Comprobamos si se ha conectado correctamente
db.once("connected", () =>{
    console.log(`Success connect`);
});

//Comprobamos si se ha desconectado mongodb
db.on("disconnected", () =>{
    console.log(`mongoose is disconnected`);
});

app.use("/user", userRouter);
app.use("/events", eventRouter);

//Levantamos el servidor en el puerto 3000 usando la funcion listen de express
app.listen(PORT, ()=>{
    console.log(`Server running http://localhost:${PORT}`);
})

