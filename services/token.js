var jwt = require('jsonwebtoken');
const models = require('../models');
const { Usuario } = require('../models/usuario.js');

const checkToken = async(token) => {
    let localID = null;
    try {
        const { id } = token.decode(token);
        localID = id;
    } catch (error) {

    }
    const user = await models.Usuario.findOne({
        where: {
            id: localID,
            estado: 1
        }
    });
    if (user) {
        const token = this.encode(user)
        return {
            token,
            rol: user.rol
        }
    } else {
        return false
    }
}

module.exports = {

    //generar el token
    // encode: async(id, rol) => {
    encode: (user) => {
        const token = jwt.sign({
            nombre: user.nombre,
            id: user.id,
            rol: user.rol,
            email: user.email
        }, 'config.secret', {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    },
    //permite decodificar el token
    decode: async(token) => {
        try {
            const { id } = await jwt.verify(token, 'config.secret');
            const user = await models.Usuario.findOne({
                where: {
                    id: id,
                    estado: 1
                }
            });
            if (user) {
                return user;
            } else {
                return false;
            }
        } catch (e) {
            const newToken = await checkToken(token);
            return newToken;
        }

    }
}