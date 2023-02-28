const { response } = require('express'); 
const { validationResult } = require('express-validator');
const respondWithJson = require('../helpers/response');

// ! NEXT
/** ! Sera un callback que se ejecutara para dar paso al controlador */
const validarCampos = (req, res = response, next) => {
    const errors = validationResult(req); 

    if(!errors.isEmpty()) {
        return respondWithJson(res, "Error al validar", 400, errors.array())
    }

    next()
}

module.exports = {validarCampos}