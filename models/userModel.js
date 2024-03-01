
// Importing required modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// Defining the User Schema
const UserSchema = new Schema({
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    houses:[ 
        {
        type: Schema.Types.ObjectId,
        ref: "House"
    }]
});

// Adding passport-local-mongoose plugin to the User Schema
// This plugin provides username and password authentication
UserSchema.plugin(passportLocalMongoose);

// Exporting the User model
module.exports = mongoose.model('User', UserSchema);
//
//In this code, we define a User schema with the required fields. The `passportLocalMongoose` plugin is added to the schema to handle username and password authentication. Finally, the User model is exported for use in other parts of the application..</s>