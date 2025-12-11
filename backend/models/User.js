const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: {
        type: String,
        enum: ["IT", "HR", "Finance", "Support"],
        default: "IT",
    },

    role: { type: String, enum: ['admin', 'agent', 'user'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('User', userSchema);