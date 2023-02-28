const mongoose = require('mongoose');
// require('dotenv').config();

const dbConnection = async() => {
    try {
        
        mongoose.set('strictQuery', false);
        await mongoose.connect(`mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@calendardb.sam28vn.mongodb.net/calendar_dev`);

        console.log("Se conecto")
    } catch (error) {
        console.log(error)
        throw new Error("No se ha podido conectar a la BD")
    }
}

module.exports = {dbConnection};