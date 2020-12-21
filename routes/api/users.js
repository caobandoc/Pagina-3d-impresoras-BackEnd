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

// router.get('/listar', userController.listar);
// router.post('/register', userController.register);
// router.post('/login', userController.login);
// router.put('/update', userController.update);
// router.put('/activate', userController.activate);
// router.put('/deactivate', userController.deactivate);

//auth.verifyUsuario,

module.exports = router;