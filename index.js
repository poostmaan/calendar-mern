const express = require('express');
const cors = require('cors');
const { green } = require('./console/color');
require('dotenv').config();

const { dbConnection } = require('./database/config');

// ! INFORMACION DE VARIABLES DE ENTORNO
// console.log( process.env )e

// Inicializa la app
const app = express();
dbConnection();
app.use(cors())
app.use(express.static('public'));
app.use(express.json())


// app.get('/', (req, res) => {
//   res.json({ 
//     ok: true
//   });
// })

app.use('/api/auth/', require('./routes/auth'));
app.use('/api/eventos/', require('./routes/eventos'));

// TODO: 
// auth 
// login
// create


app.listen(process.env.PORT, () => {
    console.log(`${green}SERVER IS RUNNING ON ${ process.env.PORT }`)
})

// console.log( chalk.green("hola perra"))