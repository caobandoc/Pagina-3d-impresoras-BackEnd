const db = require('../models');
var bcrypt = require('bcryptjs');
var services = require('../services/token.js');

exports.login = (req, res) => {
    db.Usuario.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send('User Not Found.');
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password.trim(), user.password.trim());
        if (!passwordIsValid) {
            return res.status(401).send({
                auth: false,
                tokenReturn: null,
                reason: "Invalid Password!"
            });
        }
        const token = services.encode(user);
        res.status(200).send({
            auth: true,
            tokenReturn: token,
            user: user
        });
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
}

exports.register = async(req, res, next) => {
    try {
        //transformando la contraseña
        req.body.password = await bcrypt.hashSync(req.body.password, 10);
        //guardando en base de datos
        console.log(req.body);
        const user = await db.Usuario.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({
            message: 'Error ->' + error
        })
        next(error);
    }
};

exports.listar = async(req, res, next) => {
    try {
        db.Usuario.findAll().then(users => res.status(200).json(users));
    } catch (error) {
        res.status(500).send({
            message: 'Error ->' + error
        })
        next(error);
    }
};

exports.update = async(req, res, next) => {
    try {
        const user = await db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        })
        if (user) {
            const user = await db.Usuario.update({
                nombre: req.body.nombre,
                estado: req.body.estado,
                rol: req.body.rol,
            }, { where: { email: req.body.email } })
        };
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send({
            message: 'Error ->' + error
        })
        next(error);
    }
}

exports.activate = async(req, res, next) => {
    try {
        const user = await db.Usuario.update({
            estado: 1
        }, { where: { email: req.body.email } });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({
            message: 'Error ->' + error
        })
        next(error);
    }
}

exports.deactivate = async(req, res, next) => {
    try {
        const user = await db.Usuario.update({
            estado: 0
        }, { where: { email: req.body.email } });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({
            message: 'Error ->' + error
        })
        next(error);
    }
}