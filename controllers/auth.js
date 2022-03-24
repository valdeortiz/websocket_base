const { response } = require("express");
const Usuario = require("../models/usuario");
// const { bcrypt } = require('bcryptjs');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {

    const {email, password} = req.body;
    try {
        const existEmail = await Usuario.findOne({email});
        if (existEmail) {
            return res.status(400).json({
                ok:false,
                msg: "El email ya esta registrado"
            })
        }
        const usuario = new Usuario(req.body);

        // encriptar contrasena
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt)
    
        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id);
    
        res.json({
            ok: true,
            usuario,
            token: token
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            ok: false,
            msg: "Error al buscar el email"
        })
    }
}

const login = async (req, res = response) => {

    const {email, password} = req.body;
    try {
        const usuario = await Usuario.findOne({email});
        if (!usuario) {
            res.status(400).json({
                ok:false,
                msg: "Error de logeo"
            })
        }
        
        
        // validar password
        const comparePass = bcrypt.compareSync(password, usuario.password);
        if (!comparePass) {
            return res.status(400).json({
                ok: false,
                msg: "Contrasena incorrecta"
            })
        }
        
        
        const token = await generarJWT(usuario.id);
        // Generar JWT
        res.json({
            ok: true,
            usuario,
            token: token
        })
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            ok: false,
            msg: "Error al buscar el email"
        })
    }
}

const renewToken = async (req, res = response) => {

    try {
        const {uid} = req.uid;
        const token = await generarJWT(uid);
        const usuario = await Usuario.findById(uid);
        // Generar JWT
        res.json({
            ok: true,
            usuario: usuario,
            token: token
            // msg: "otrka"
        })
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            ok: false,
            msg: "Error al buscar el email"
        })
    }
}

module.exports = {crearUsuario, login, renewToken}