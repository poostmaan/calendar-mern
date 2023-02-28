/**
 *    /api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { crearUsuario, login, renovarToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/auth.validarCampos");
const validarJwt = require("../middlewares/auth.validarJwt");

router.post("/", [ 
    check("correo", "correo obligatorio").isEmail(), 
    check("clave", "clave debe tener 8-16 caracteres").isLength({ min: 8, max: 16 }),
    validarCampos
], login);

router.post("/new", [ // Los middlewares se van ejecutando uno por uno
    check("nombre", "nombre obligatorio").not().isEmpty(), 
    check("correo", "correo obligatorio").isEmail(), 
    check("clave", "clave debe tener 8-16 caracteres").isLength({ min: 8, max: 16 }),
    validarCampos // Podemos interceder con un middleware personalizado para controlar los erroes
],crearUsuario);

router.get("/renew", validarJwt, renovarToken);

router.get("/*", (req, res) => {
  res.json({
    ok: false,
    message: "No existe este endpoint",
  });
});

module.exports = router;
