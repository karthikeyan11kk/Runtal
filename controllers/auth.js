const User = require("../models/userModel");

module.exports.registerpage=async(req, res) => {
    res.render("auth/register");
}

module.exports.registeruser=async (req, res) => {
    try {
        const { username, surname, phone, password } = req.body;
        const registerUser = new User({ surname, username, phone });
        const user = await User.register(registerUser, password);
        req.flash("success", "Successfully Registered!");
        res.redirect("/register");
    } catch (e) {
        req.flash("error", e.message);
        console.log(e.message);
        res.redirect("/register");
    }
}
module.exports.loginpage=(req, res) => {
    res.render("auth/login");
}
module.exports.loginuser=(req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/house');
}
module.exports.userlogout=(req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "successfully logged out");
        res.redirect("/login");
    });
}