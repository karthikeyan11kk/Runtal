
const AppError = require("./utils/AppError");
const House = require("./models/houseModel");
const {houseSchema} = require("./models/schemasModel");

// Middleware to check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

// Middleware to validate house data
module.exports.validateHouse = (req, res, next) => {
    const { error } = houseSchema.validate(req.body);
    if (error) {
        console.log(error);
        const msg = error.details.map(er => er.message).join(',');
        throw new AppError(msg, 404);
    } else {
        next();
    }
}

// Middleware to check if the current user is the owner of the house
module.exports.isUserCurr = async (req, res, next) => {
    const id = req.params.id;
    const house = await House.findById(id);
    if (!house.user.equals(req.user._id)) {
        req.flash("error", "You Don't Have Permission");
        return res.redirect("/house/" + house._id);
    }
    next();
}
//
//In this code, we have three middleware functions:
//
//1. `isLoggedIn`: This middleware checks if the user is authenticated. If not, it redirects the user to the login page with a flash message.
//
//2. `validateHouse`: This middleware validates the house data using the `houseSchema`. If the validation fails, it throws an `AppError` with a 404 status code and a message containing the validation errors.
//
//3. `isUserCurr`: This middleware checks if the current user is the owner of the house. If not, it redirects the user back to the house page with a flash message.
//
//These middleware functions can be used in routes to ensure proper access and data validation..</s>