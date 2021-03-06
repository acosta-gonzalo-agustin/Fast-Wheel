const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const verificacion_usuario = require('../middlewares/verificacion_usuario')
const verificacion_cuenta = require('../middlewares/login_validation')
const loggued_booking = require('../middlewares/loggued_booking');

const { body } = require('express-validator');


/*----------------------------VALIDACION REGISTRO DE USUARIO--------------------------------------------*/
const validation = [
    body('name').notEmpty().withMessage('Debe completar el campo nombre'),
    body('last_name').notEmpty().withMessage('Debe completar el campo apellido'),
    body('email').notEmpty().withMessage('debe proveer un email').bail().isEmail().withMessage('el campo debe tener formato de email, por ejemplo nombre@gmail.com'),
    body('password').notEmpty().withMessage('debe elegir una clave para el usuario').bail().isLength({min:8}).withMessage('La clave debe contener al menos ocho caracteres').bail().isStrongPassword({
    minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage('La clave debe contener al menos una letra minuscula, una letra mayuscula,un numero y un caracter especial'),
    body('repeatpassword').custom(async(value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Las contrasenias no coinciden');
        }
    }),
];

/*----------------------------VALIDACION ACTUALIZACION DATOS DE USUARIO--------------------------------------------*/


const validation_update = [
    body('name').notEmpty().withMessage('Debe completar el campo nombre'),
    body('last_name').notEmpty().withMessage('Debe completar el campo apellido'),
    body('email').notEmpty().withMessage('debe proveer un email').bail().isEmail().withMessage('el campo debe tener formato de email, por ejemplo nombre@gmail.com'),
];



/*------------------------RUTAS PARA REGISTRAR UN USARIO-------------------------*/


router.get('/register',userController.register);
router.post('/register',verificacion_usuario,validation,userController.save);



/*---------------------RUTAS PARA LOGUEAR UN USUARIO---------------------------*/

router.get('/login',userController.loginForm);
router.post('/login',verificacion_cuenta,userController.login);


/*---------------------RUTAS PERFIL---------------------------*/

router.get('/profile',loggued_booking,userController.profile);

/*---------------------RUTAS PARA EDITAR PERFIL---------------------------*/

router.get('/edit',loggued_booking,userController.edit);
router.put('/edit',loggued_booking,validation_update,userController.update);

/*---------------------RUTAS PARA VER RESERVAS ---------------------------*/

router.get('/bookings',loggued_booking,userController.bookings);



/*---------------------RUTAS PARA DESLOGUEAR UN USARIO---------------------------*/

router.get('/logout',userController.logout);


/*---------------------RUTAS PARA ELIMINAR UN USARIO---------------------------*/

router.delete('/delete/:id',loggued_booking,userController.delete);


/*--------------------------------RUTAS APIS----------------------------------------*/

router.get('/:id(\\d{12})',userController.user);

router.get('/listing',userController.listing);







module.exports = router;

