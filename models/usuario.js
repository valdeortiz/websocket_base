const {Schema, model} = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        unique: true,
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    online: {
        type: Boolean,
        default: false
    },
});

usuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})
module.exports = model('Usuario', usuarioSchema);