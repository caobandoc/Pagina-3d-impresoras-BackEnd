const db = require('../models');

exports.list = async(req, res, next) => {
    try {
        db.Categoria.findAll().then(categoria => res.status(200).json(categoria));
    } catch (error) {
        res.status(500).send({
            message: 'Error ->' + error
        })
        next(error);
    }
};

exports.add = async(req, res, next) => {
    try {
        //busca si existe alguna categoria
        const aux = await db.Categoria.findOne({
            where: {
                nombre: req.body.nombre
            }
        })
        if (!aux) {
            req.body.estado = 1;
            //crea la nueva categoria
            const categoria = await Categoria.create(req.body);
            res.status(200).json(categoria);
        } else {
            res.status(401).send('Ya existe');
        }

    } catch (e) {
        res.status(500).send({
            message: 'Error ->' + error
        })
        next(error);
    }
}

exports.update = async(req, res, next) => {
    try {
        const categoria = await db.Categoria.findOne({
            where: {
                nombre: req.body.nombre
            }
        })
        if (categoria) {
            const categoria = await db.Categoria.update({
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
        const categoria = await db.Categoria.findOne({
            where: {
                nombre: req.body.nombre
            }
        })
        if (categoria) {
            const categoria = await db.Categoria.update({
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
        const categoria = await db.Categoria.findOne({
            where: {
                nombre: req.body.nombre
            }
        })
        if (categoria) {
            const categoria = await db.Categoria.update({
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