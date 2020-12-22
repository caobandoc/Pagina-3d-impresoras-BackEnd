/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const categoriaController = require('../../controllers/CategoriaController.js');
const auth = require('../../middlewares/auth');

const router = routerx();

//api/categoria/list
//api/categoria/add
//api/categoria/update
//api/categoria/activate
//api/categoria/deactivate

// router.get('/list', auth.verifyUsuario, categoriaController.list);
// router.post('/add', auth.verifyUsuario, categoriaController.add);
// router.put('/update', auth.verifyUsuario, categoriaController.update);
// router.put('/activate', auth.verifyUsuario, categoriaController.activate);
// router.put('/deactivate', auth.verifyUsuario, categoriaController.deactivate);

router.get('/list', categoriaController.list);
router.post('/add', auth.verifyAlmacenero, categoriaController.add);
router.put('/update', auth.verifyAlmacenero, categoriaController.update);
router.put('/activate', auth.verifyAlmacenero, categoriaController.activate);
router.put('/deactivate', auth.verifyAlmacenero, categoriaController.deactivate);

//auth.verifyUsuario,

module.exports = router;