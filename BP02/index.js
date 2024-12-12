const express = require("express");
const path = require("path");
const userRoute = require('./routes/user')

const app = express();
const PORT = 8000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");



mongoose.connect("mongodb+srv://kuldeepsingh978358:kuldeepdata11@kuldeep-first.zto1a.mongodb.net/?retryWrites=true&w=majority&appName=kuldeep-first").then(() => {
    console.log("mongoDb is connnected")
}).catch((error) => {
    console.log("error is coming ", error)

})


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

app.get('/', (req, res) => {
    res.render("home", {
        user: req.user,

    });
})

app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`server started at PORT: ${PORT}`)
})