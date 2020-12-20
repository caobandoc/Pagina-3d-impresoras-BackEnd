/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const articuloController = require('../../controllers/ArticuloController.js');
const auth = require('../../middlewares/auth');

const router = routerx();

//api/articulo/list
//api/articulo/add
//api/articulo/update
//api/articulo/activate
//api/articulo/deactivate

router.get('/list', articuloController.list);
router.post('/add', auth.verifyVendedor, articuloController.add);
router.put('/update', auth.verifyVendedor, articuloController.update);
router.put('/activate', auth.verifyVendedor, articuloController.activate);
router.put('/deactivate', auth.verifyVendedor, articuloController.deactivate);

//auth.verifyUsuario,

module.exports = router;