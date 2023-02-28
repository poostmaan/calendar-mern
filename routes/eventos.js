const { Router } = require("express");
const { check } = require("express-validator");

const {
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/eventos");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/auth.validarCampos");


const router = Router();

const validarJwt = require("../middlewares/auth.validarJwt");

// Declarar un middleware que se aplicara a todos las rutas despues de la declaracion
router.use(validarJwt)

router.get("/",
[

], obtenerEventos);

router.post("/",
[
    check("title", "El campo title es obligatorio" ).not().isEmpty(),
    check("start", "Fecha no valida" ).custom( isDate ), // Uso de validaciones personales
    check("end", "Fecha no valida" ).custom( isDate ), // Uso de validaciones personales
    validarCampos
], crearEvento);

router.put("/:id",
[
  check("title", "El campo title es obligatorio" ).not().isEmpty(),
  check("start", "Fecha no valida" ).custom( isDate ), // Uso de validaciones personales
  check("end", "Fecha no valida" ).custom( isDate ), // Uso de validaciones personales
  validarCampos
], actualizarEvento);

router.delete("/:id",[], eliminarEvento);

module.exports = router;
