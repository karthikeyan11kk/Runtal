
const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const multer=require("multer");
const{storage}=require("../cloudinary");
const upload=multer({storage});
const home=require("../controllers/home");

const { isLoggedIn, validateHouse, isUserCurr } = require("../middleware");

router.route("/")
    .get(isLoggedIn, wrapAsync(home.index))
    .post(isLoggedIn,upload.array("images"),validateHouse,wrapAsync(home.newhome));

router.get('/new', isLoggedIn, wrapAsync(home.addpage));

router.get('/my', isLoggedIn, wrapAsync(home.myhome));
router.get('/wishlist', isLoggedIn, wrapAsync(home.wishlist));

router.route("/:id")
    .get(isLoggedIn, wrapAsync(home.showhome))
    .put(isLoggedIn, validateHouse, wrapAsync(home.updatehome))
    .delete(isLoggedIn, wrapAsync(home.deletehome));

router.get('/:id/edit', isLoggedIn, isUserCurr, wrapAsync(home.editpage));



module.exports = router;