const bodyParser = require('body-parser');
const express = require('express')


const app = express();


app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())


const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ynov', {useNewUrlParser: true}).then(() =>{
    console.log("connect to database");
}).catch(err =>{
    console.log('connect impossible', err);
    process.exit();
})


const userRoutes = require('./routes/user-route')

app.use('/api/users', userRoutes)

app.use('/uploads', express.static('./uploads'));


app.listen(3000, ()=>{
    console.log('serveur lancé')
})


