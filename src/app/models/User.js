/**
 * This file is for creating a Mongoose Model/Schema
 */
 
const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;

const userSchema = new Schema({
    // TODO: define the necessary fields for Task, using documentation (see instructions Step 5.Models.2)
    Id: String,
    Email: String,
    UserName: String
}, { Collection: 'Users'});

// TODO: convert your `userSchema` into a model, using the documentation (Step 5.Models.2).
const newModel = mongoose.model('User', userSchema);

module.exports = newModel;