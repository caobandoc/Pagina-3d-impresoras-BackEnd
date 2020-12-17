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
                accessToken: null,
                reason: "Invalid Password!"
            });
        }
        const token = services.encode(user);
        res.status(200).send({
            auth: true,
            accessToken: token,
            // user: user
        });
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
}

exports.register = async(req, res, next) => {
    try {
        req.body.password = await bcrypt.hashSync(req.body.password, 10);
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).send({
            message: 'Error ->' + error
        })
        next(error);
    }
};

exports.listar = async(req, res, next) => {
    try {
        // const user = await User.findAll();
        // res.status(200).json(user);
        db.Usuario.findAll().then(users => res.status(200).json(users));
    } catch (e) {
        res.status(500).send({
            message: 'Error ->' + error
        })
        next(error);
    }
};