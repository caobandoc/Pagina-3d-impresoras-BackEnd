/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const articuloController = require('../../controllers/ArticuloController.js');
const auth = require('../../middlewares/auth');

const router = routerx();

//api/articulo/list
router.get('/list', articuloController.list);

//api/articulo/add
router.post('/add', auth.verifyUsuario, articuloController.add);

//api/articulo/update
router.put('/update', auth.verifyUsuario, articuloController.update);

//api/articulo/activate
router.put('/activate', auth.verifyUsuario, articuloController.activate);

//api/articulo/deactivate
router.put('/deactivate', auth.verifyUsuario, articuloController.deactivate);

module.exports = router;