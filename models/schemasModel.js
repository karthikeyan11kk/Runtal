
const Joi = require('joi');

module.exports.houseSchema = Joi.object({
    // house object is required
    house: Joi.object({
        // address is a required string with a maximum length of 70
        address: Joi.string()
            .max(70)
            .required(),
        // location is a required string with a maximum length of 50
        location: Joi.string()
            .max(50)
            .required(),
        // city is a required string with a maximum length of 25
        city: Joi.string()
            .max(25)
            .required(),
            landmark: Joi.string()
            .required(),
    overlook: Joi.string()
    .required(),
    extraroom: Joi.string()
    .required(),
    water: Joi.string()
    .required(),
    buildage:Joi.number()
    .integer()
    .required(),

    Securityamt: Joi.number()
    .integer()
    .required(), 
    description: Joi.string()
    .required(),
        // state is a required string with a maximum length of 20
        state: Joi.string()
            .max(20)
            .required(),
        // zip is a required string with a maximum length of 10
        zip: Joi.string()
            .max(10)
            .required(),
        // houseno is a required string with a maximum length of 6
        houseno: Joi.string()
            .max(6)
            .required(),
        // bedroom is a required string
        bedroom: Joi.string()
            .required(),
        // parking is a required string
        parking: Joi.string()
            .required(),
        // bathroom is a required number that must be an integer
        bathroom: Joi.number()
            .integer()
            .required(),
        // floor is a required string
        floor: Joi.string()
            .required(),
        // area is a required number that must be an integer
        area: Joi.number()
            .integer()
            .required(),
        // facing is a required string
        facing: Joi.string()
            .required(),
        // furnished is a required string
        furnished: Joi.string()
            .required(),
        // image is a required string
        // images: Joi.string()
        //     .required(),
        // price is a required number that must be an integer
        price: Joi.number()
            .integer()
            .required(),
    }).required()
})

// houseSchema is an object that contains a house object with various properties.
// Each property has a specific validation rule defined by Joi.
// The house object is required, and all its properties are also required.
//
//This code defines a Joi schema for a house object. The schema includes validation rules for each property of the house object. The comments provide clear and concise explanations of the schema and its properties..</s>