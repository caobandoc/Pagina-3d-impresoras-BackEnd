const routerx = require('express-promise-router');
const articuloRouter = require('./api/articulo.js');
const categoriaRouter = require('./api/categoria.js');
const userRouter = require('./api/users.js');

const router = routerx();

//api/usuario
router.use('/usuario', userRouter);

//api/categoria
router.use('/categoria', categoriaRouter);

//api/articulo
router.use('/articulo', articuloRouter);

module.exports = router;