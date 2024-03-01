
// Importing mongoose module
const mongoose = require("mongoose");

// Creating a schema for the home
const Schema = mongoose.Schema;

const homeSchema = new Schema({
    // Address details
    address:String,
    location:String,
    city:String,
    state:String,
    zip:Number,

    // House details
    houseno:String,
    bedroom:String,
    parking:String,
    bathroom:String,
    landmark:String,
    overlook:String,
    extraroom:String,
    water:String,
    images:[{
        url:String,
        filename:String
    }],
    buildage:Number, 
    Securityamt:Number, 
 
    // Floor details
    floor:String,

    // Area details
    area:Number,
    facing:String,
    description:String,

    // Furnishing details
    furnished:String,

    // Price details
    price:Number,

    // User details
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

// Exporting the home model
module.exports = mongoose.model("House", homeSchema);
//
//In this code, we have created a schema for the home with various details such as address, house details, image details, floor details, area details, furnishing details, and price details. We have also added a reference to the user who created the home. This schema is then exported as a model named "House"..</s>