const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log("DB Online")
    } catch (error) {
        console.log(error)
        throw Error("Error al conectar en el mongo")
    }
}

module.exports = {
    dbConnection
}


// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));