const router = require('express').Router();
const userController = require('../../controllers/UserController.js');
const auth = require('../../middlewares/auth');

//api/usuario/login
//api/usuario/register
//api/usuario/listar

router.post('/login', userController.login);
router.post('/add', auth.verifyUsuario, userController.register);
router.get('/listar', auth.verifyUsuario, userController.listar);
router.get('/list', auth.verifyUsuario, userController.listar);
router.put('/update', auth.verifyUsuario, userController.update);
router.put('/activate', auth.verifyUsuario, userController.activate);
router.put('/deactivate', auth.verifyUsuario, userController.deactivate);

//auth.verifyUsuario,

module.exports = router;