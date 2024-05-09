/*
This file is for creating a Mongoose Model/Schema
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    // TODO: define the necessary fields for Task, using documentation (see instructions Step 5.Models.2)
    UserId: String,
    Text: String,
    Done: Boolean,
    Date: String
}, { Collection: 'Tasks' /** TODO: specify the collection here (see instructions) */});

// TODO: convert your `taskSchema` into a model, using the documentation (Step 5.Models.2).
const newModel = mongoose.model('Task', taskSchema);

module.exports = newModel;