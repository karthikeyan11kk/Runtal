const House = require("../models/houseModel");
const User = require("../models/userModel");
const Wishlist = require("../models/wishlistModel");
module.exports.index=async (req, res, next) => {
    const houses = await House.find({});
    res.render("houses/index", { houses });
}

module.exports.addpage=async (req, res, next) => {
    res.render("houses/new");
}

module.exports.wishlist=async (req, res, next) => {
    const userWithHouses = await User.findById(req.user._id).populate('houses');
    const houses = userWithHouses.houses;
    res.render('houses/wishlist', { houses });
}


module.exports.wishreq = async (req, res, next) => {
    const userId = req.user._id;
    const houseId = req.body.houseId; 

    try {
        const user = await User.findById(userId);
        const house = await House.findById(houseId);

        if (!user || !house) {
            return res.status(404).send('User or House not found');
        }

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, houses: [] });
        }

        // Check if the house is already in the wishlist
        if (wishlist.houses.includes(houseId)) {
            return res.status(400).send('House already in wishlist');
        }

        wishlist.houses.push(houseId);
        await wishlist.save();

        res.status(200).send('House added to wishlist');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
module.exports.myhome=async (req, res) => {
    const userWithHouses = await User.findById(req.user._id).populate('houses');
    const houses = userWithHouses.houses;
    res.render('houses/myhome', { houses });
}

module.exports.newhome=async(req, res, next) => {
    const house = new House(req.body.house);
    house.user = req.user;
    house.images=req.files.map(f=>({
        url:f.path,
        filename:f.filename
    }));
    req.user.houses.push(house._id);
    await house.save();
    await req.user.save();
    req.flash("success", "Successfully Added");
    res.redirect("/house/my");
}

module.exports.showhome=async (req, res, next) => {
    const house = await House.findById(req.params.id).populate("user");
    const user = house.user;
    res.render("houses/show", { house,user });
}

module.exports.editpage=async (req, res, next) => {
    const house = await House.findById(req.params.id);
    res.render("houses/edit", { house });
}

module.exports.deletehome=async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, { $pull: { houses: id } });
    await House.findByIdAndDelete(id);
    req.flash("success", "Successfully Deleted");
    res.redirect("/house/my");
}

module.exports.updatehome=async (req, res, next) => {
    const id = req.params.id;
    const house = await House.findByIdAndUpdate(id, req.body.house);
    req.flash("success", "Successfully Updated");
    res.redirect("/house/my");
}


