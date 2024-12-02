const express = require("express");
const router = express.Router();
const URL = require('../models/url');
const { restrictTo } = require("../middlewares/auth");

// router.get("/", async (req, res) => {
//     const allurls = await URL.find({});
//     return res.render("home", {
//         urls: allurls,
//     });
// })

router.get("/admin/urls", restrictTo(['ADMIN']), async (req, res) => {
    const allurls = await URL.find({});
    if (!allurls) {
        return res.status(404).send("No URLs found");
    }
    return res.render("home", { urls: allurls });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const allurls = await URL.find({ createdBy: res.user._id });
    return res.render("home", {
        urls: allurls,
    });
});



router.get('/signup', (req, res) => {
    return res.render("signup");
})

router.get('/login', (req, res) => {
    return res.render("login");
})
module.exports = router;
