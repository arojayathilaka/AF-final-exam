const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create schema
const assignmentSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String, required: true },
    deadline: { type: Date, required: true }
}, {
    timestamps: true
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;