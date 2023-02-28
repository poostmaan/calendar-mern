const { response } = require('express');
const jwt = require('jsonwebtoken');
const respondWithJson = require('../helpers/response');

const validarJwt = (req, res = response, next) => { 
    const token = req.header("x-token");

    if( !token ) {
        return respondWithJson(res, "No ha llegado ningun token")
    }

    try {
        const tokenValido = jwt.verify( token, process.env.SECRET_JWT_SEED );
        req.id = tokenValido.id;
        req.nombre = tokenValido.nombre
    } catch (err) {
        return respondWithJson(res, "Este token es invalido")
    }


    next()
}

module.exports = validarJwt