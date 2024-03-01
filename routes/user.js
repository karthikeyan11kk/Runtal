
const express = require('express');
const auth=require("../controllers/auth");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const AppError = require("../utils/AppError");
const router = express.Router({ mergeParams: true });
const { storeReturnTo } = require('../middleware');

router.route("/register")
    .get(wrapAsync(auth.registerpage))
    .post(wrapAsync(auth.registeruser));

router.route("/login")
    .get(auth.loginpage )
    .post(passport.authenticate("local",
    { 
        failureFlash: true, 
        failureRedirect: "/login" 
    }),auth.loginuser);


router.get("/logout",auth.userlogout );

module.exports = router;
