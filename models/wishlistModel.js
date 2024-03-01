
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishSchema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    houses:[ 
        {
        type: Schema.Types.ObjectId,
        ref: "House"
    }]
});

// Exporting the User model
module.exports = mongoose.model('Wishlist', WishSchema);
