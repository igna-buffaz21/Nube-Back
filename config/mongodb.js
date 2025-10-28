require('dotenv').config();
const mongoose = require('mongoose');

async function connectMongo() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'nubeCasera',
        });
        console.log('✅ Conectado a MongoDB');
    }
    catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
    }
}

module.exports = connectMongo;