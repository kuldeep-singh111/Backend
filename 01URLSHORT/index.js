const express = require('express');
const { connectMongo } = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const path = require('path');
const ejs = require('ejs');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user')
const cookieParser = require('cookie-parser');
const { checkForAuthentication, restrictTo } = require('./middlewares/auth')

const app = express();

const PORT = 8000;

connectMongo("mongodb+srv://kuldeepsingh978358:kuldeepdata11@kuldeep-first.zto1a.mongodb.net/?retryWrites=true&w=majority&appName=kuldeep-first")
    .then(() => {
        console.log('mongodb connected')
    })

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: { timestamp: Date.now() },
            },
        },
        { new: true }
    );

    if (!entry) {
        return res.status(404).send("URL not found");
    }

    res.redirect(entry.redirectURL);
});


app.listen(PORT, () => {
    console.log(`Server is Started at PORT ${PORT}`)
})


