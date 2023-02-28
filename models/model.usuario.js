const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true,
    },
    correo: {
        type: String,
        require: true,
        unique: true,
    },
    clave: {
        type: String,
        require: true,
    },
});

module.exports = model("Usuario", UsuarioSchema);