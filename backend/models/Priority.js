const mongoose = require('mongoose');

const prioritySchema = new mongoose.Schema({
name: { type: String, required: true, unique: true },
level: { type: Number, default: 1 },
createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Priority', prioritySchema);