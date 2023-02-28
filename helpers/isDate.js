const moment = require('moment');


// Las validaciones personalizadas pueden obtener el request completo
const isDate = ( value, { req, location } ) => { 
    console.log(value)
    // console.log({req, location}) 
    if( !value ) {
        return false;
    }

    const fecha = moment(value);

    if( !fecha.isValid() ) return false;

    return true;


}

module.exports = { isDate }