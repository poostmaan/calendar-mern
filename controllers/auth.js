const respondWithJson = require('../helpers/response');
const bcrypt = require('bcrypt');
const { response } = require('express');
const Usuario = require('../models/model.usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => { 
    const { nombre, clave, correo } = req.body

    try {

        const existeCorreo = await Usuario.findOne({ correo });
        if( existeCorreo ) {
            return respondWithJson(res, "Ya existe este correo");
        }

        const usuario = new Usuario( req.body );

        // Genera un salt que mientras mas grande sea mas tardara en generarse y en chequearlo
        const salt = bcrypt.genSaltSync();
        usuario.clave = bcrypt.hashSync( usuario.clave, salt )


        await usuario.save();
        const token = await generarJWT( usuario._id, usuario.nombre );
        
        respondWithJson(res, "Se registro exitosamente", 201, { 
            id: usuario._id, 
            usuario: usuario.nombre,
            token 
        });
    } catch (error) {
        console.log('error al conectarse a la bd'. error)
        respondWithJson(res, "Por favor, contacte al administrador.", 500);
    }

}

const login = async(req, res = response) => {
    const { nombre, correo, clave } = req.body

    try {

        const usuario = await Usuario.findOne({ correo });
        if( !usuario ) {
            return respondWithJson(res, "Los datos ingresados no son validos");
        }

        const claveCorrecta = bcrypt.compareSync(clave, usuario.clave);
        if(!claveCorrecta) {
            return respondWithJson(res, "La clave es incorrecta");
        }
        
        const token = await generarJWT( usuario._id, usuario.nombre );

        return respondWithJson(res, "logeado con exito", 200, {
            id: usuario._id,
            nombre: usuario.nombre,
            token
        });

    } catch (error) {
        console.log('error al conectarse a la bd' + error)
        respondWithJson(res, "Por favor, contacte al administrador.", 500);
    }

}

const renovarToken = async(req, res = response) => {

    const { id, nombre } = req;

    const nuevoToken = await generarJWT(id,nombre);

    return respondWithJson(res, "renovar token", 200,{
        id,
        nombre,
        token: nuevoToken
    });
}


module.exports = {
    crearUsuario,
    login,
    renovarToken
}