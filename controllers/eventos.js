const respondWithJson = require("../helpers/response");
const Evento = require('../models/model.evento');

const obtenerEventos = async (req, res) => {

    // Dentro del find podemos colocar condiciones y filtros
    try {
        const eventos = await Evento.find().populate('user', 'name');
        respondWithJson(res, "Eventos", 200, {eventos});
    } catch (error) {
        respondWithJson(res, "Algo salio mal: " + error, 500)
    }


    
};

const crearEvento = async (req, res) => {

    // En el req esta el id del usuario
    const evento = new Evento( req.body );
    

    try {

        evento.user = req.id;

        const eventoGuardado = await evento.save();

        respondWithJson(res, "Registrado con exito", 200, {eventoGuardado});
    } catch (error) {
        respondWithJson(res, "Algo salio mal: " + error, 500)
    }

};

const actualizarEvento = async (req, res) => {

    console.log(req);

    // Obtiene los parametros de una url
    const eventoId = req.params.id;


    
    try {
        // !!! SI EL ID DEL EVENTO QUE LLEGA ES MAYOR A CIERTA LONGITUD (12 BYTES)    
        // !!! TIRARA UN ERROR POR EL CATCH
        // buscaremos si existe dicho evento
        const evento = await Evento.findById( eventoId );

        if( !evento ) {
            return respondWithJson(res, "No existe este evento", 404);
        }
        if( evento.user.toString() !== req.id ) {
            return respondWithJson(res, "No tiene permisos para realizar esta accion", 401);
        }

        // Extraemos toda la informacion que queremos actualizar
        const nuevoEvento = {
            ...req.body,
            user: req.id,
        }

        // ! SIN EL PARAMETRO "NEW" NOS DEVOLVERIA EL EVENTO VIEJO
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true })

        respondWithJson(res, "Actualizado con exito", 200, { eventoActualizado }); 

    } catch (error) {
        respondWithJson(res, "Algo salio mal: " + error, 500)
    }
};

const eliminarEvento = async (req, res) => {
    
    const eventId = req.params.id;

    try {
        
        const evento = await Evento.findById( eventId );

        if( !evento) {
            return respondWithJson(res, "No existe este evento", 404);
        }

        if( evento.user.toString() !== req.id ) {
            return respondWithJson(res, "No tiene permisos para realizar esta accion", 401);
        }

        await Evento.findByIdAndDelete( eventId );

        respondWithJson(res, "Eliminado con exito", 200); 


    } catch (error) {
        respondWithJson(res, "Algo salio mal: " + error, 500)
    }
};

module.exports = {
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
