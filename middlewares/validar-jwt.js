const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok:false,
            msg: "No authorizado"
        })
    }
    try {
        const uid = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: "Error"
        })
    }
}

module.exports = validarJWT