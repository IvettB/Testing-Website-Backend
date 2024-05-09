/*

This file is for initializing mongoose

*/

// Importing mongoose
const mongoose = require('mongoose');

// Creating a connection to Atlas using .env 
mongoose.connect(process.env.ATLAS_CONNECTION_STRING);

// Error handling
var db = mongoose.connection;
db.on('error', error => console.error(error.message));

// Callback function
db.once('open', function() {
    // We're connected!
    console.log("MongoDB connected")
});