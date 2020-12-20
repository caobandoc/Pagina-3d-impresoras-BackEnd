const router = require('express').Router();
const userController = require('../../controllers/UserController.js');
const auth = require('../../middlewares/auth');

//api/usuario/listar
//api/usuario/register
//api/usuario/login

router.get('/listar', auth.verifyUsuario, userController.listar);
router.post('/register', auth.verifyUsuario, userController.register);
router.post('/login', userController.login);
router.put('/update', auth.verifyUsuario, userController.update);
router.put('/activate', auth.verifyUsuario, userController.activate);
router.put('/deactivate', auth.verifyUsuario, userController.deactivate);

//auth.verifyUsuario,

module.exports = router;