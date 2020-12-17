const db = require('../models');

exports.list = async(req, res, next) => {
    try {
        db.Articulo.findAll().then(articulo => res.status(200).json(articulo));
    } catch (error) {
        res.status(500).send({
            message: 'Error ->' + error
        })
        next(error);
    }
};

exports.add = async(req, res, next) => {
    try {
        //busca si existe alguna articulo
        const aux = await db.Articulo.findOne({
            where: {
                codigo: req.body.codigo
            }
        });
        //busca si existe una categoria 
        const aux2 = await db.Categoria.findOne({
            where: {
                id: req.body.categoriaId
            }
        });

        //FALTA MEJORAR UNION A FUTURO
        if (!aux) {
            if (aux2) {
                req.body.estado = 1;
                //crea la nueva articulo
                const articulo = await Articulo.create(req.body);
                res.status(200).json(articulo);
            } else {
                res.status(402).send('No existe categoria');
            }
        } else {
            res.status(401).send('Ya existe');
        }

    } catch (error) {
        res.status(500).send({
            message: 'Error ->' + error
        })
        next(error);
    }
}

exports.update = async(req, res, next) => {
    try {
        const articulo = await db.Articulo.findOne({
            where: {
                nombre: req.body.nombre
            }
        })
        if (articulo) {
            const articulo = await db.Articulo.update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion
            }, { where: { nombre: req.body.nombre } })
        };
    } catch (error) {
        res.status(500).send({
            message: 'Error ->' + error
        })
        next(error);
    }
}

exports.activate = async(req, res, next) => {
    try {
        const articulo = await db.Articulo.findOne({
            where: {
                nombre: req.body.nombre
            }
        })
        if (articulo) {
            const articulo = await db.Articulo.update({
                estado: 1
            }, { where: { nombre: req.body.nombre } })
        };
    } catch (error) {
        res.status(500).send({
            message: 'Error ->' + error
        })
        next(error);
    }
}

exports.deactivate = async(req, res, next) => {
    try {
        const articulo = await db.Articulo.findOne({
            where: {
                nombre: req.body.nombre
            }
        })
        if (articulo) {
            const articulo = await db.Articulo.update({
                estado: 0
            }, { where: { nombre: req.body.nombre } })
        };
    } catch (error) {
        res.status(500).send({
            message: 'Error ->' + error
        })
        next(error);
    }
}