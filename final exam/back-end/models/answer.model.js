const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// creating a schema for images
const answerSchema = new Schema({
    ans: { data: Buffer, contentType: String},
    //ansId: { type: Number, required: true, unique: true }
}, {
    timestamps: true
});

// creating a model for images
const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;