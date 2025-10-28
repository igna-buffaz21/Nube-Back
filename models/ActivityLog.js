const mongoose = require('mongoose');

const activtyLogShema = new mongoose.Schema({
    userId: { type: Number, required: true },
    username: { type: String },
    action: { type: String, required: true },
    description: { type: String },
    ip: { type: String },
    userAgent: { type: String }, 
    date: { type: String }
})

module.exports = mongoose.model('ActivityLog', activtyLogShema);