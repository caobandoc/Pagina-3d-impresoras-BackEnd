const router = require('express').Router();
const userController = require('../../controllers/UserController.js');
const auth = require('../../middlewares/auth');

//api/usuario/listar
router.get('/listar', auth.verifyUsuario, userController.listar);

//api/usuario/register
router.post('/register', auth.verifyUsuario, userController.register);

//api/usuario/login
router.post('/login', userController.login);

module.exports = router;