require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const routerUser = require('./routes/users')
const routerProducts = require('./routes/products')


// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// importamos las rutas de nuestro proyecto
app.use(routerUser)
app.use(routerProducts)

let options ={
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}


mongoose.connect(process.env.MONGODB_URI,options,(err)=>{
    if(err) throw err
    console.log("base de datos conectada",process.env.MONGODB_URI);
})


app.listen(process.env.PORT,()=>{
    console.log("server run in port",process.env.PORT);
})
