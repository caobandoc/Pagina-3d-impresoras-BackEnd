const router = require('express').Router();
const userController = require('../../controllers/UserController.js');
const auth = require('../../middlewares/auth');

//api/usuario/login
//api/usuario/register
//api/usuario/listar

router.post('/login', userController.login);
router.post('/register', auth.verifyAdmin, userController.register);
router.get('/listar', auth.verifyAdmin, userController.listar);
router.put('/update', auth.verifyAdmin, userController.update);
router.put('/activate', auth.verifyAdmin, userController.activate);
router.put('/deactivate', auth.verifyAdmin, userController.deactivate);

//auth.verifyUsuario,

module.exports = router;