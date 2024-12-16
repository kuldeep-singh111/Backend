const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt")
const User = require("./models/user")
const Post = require("./models/post")
const picModel = require("./models/pic")
const jwt = require("jsonwebtoken");
const { connectMongoDb } = require("./connect")
const crypto = require("crypto")
// const multer = require("multer");
const upload = require("./utils/multer")





app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/images/uploads')
//     },
//     filename: function (req, file, cb) {
//         crypto.randomBytes(12, function (err, bytes) {
//             const fn = bytes.toString("hex") + path.extname(file.originalname)
//             cb(null, fn)
//         })

//     }
// })

// const upload = multer({ storage: storage })




connectMongoDb("mongodb+srv://kuldeepsingh978358:kuldeepdata11@kuldeep-first.zto1a.mongodb.net/?retryWrites=true&w=majority&appName=kuldeep-first").then(() => {
    console.log("mongodb connected")
}).catch((error) => {
    console.log("error", error)
});


// multer

app.get("/multer", (req, res) => {
    res.render("multer")
})

app.post("/upload", upload.single("image"), async (req, res) => {

    // const user = Post.findOne({ email: req.user.email });

    Post.profilepic = req.file.filename;
    await Post.save()
    res.redirect('/multer')
})








app.get('/userdata', async (req, res) => {

    const newuser = await Post.create({
        username: "kuldeep",
        email: "kuldeep@gmail.com",
        age: 19
    })

    res.send(newuser);


})


app.get("/post/create", async (req, res) => {
    const pic = await picModel.create({
        picdata: "helllo kuldeep kaise ho",
        user: "675ab4a1e6bf53137049d836",
    })

    const users = await Post.findOne({ _id: "675ab4a1e6bf53137049d836" })
    users.posts.push(pic.id)


    res.send(pic)

})




















app.get('/', (req, res) => {
    res.render('index');
})
app.get("/login", (req, res) => {
    res.render('login')
})
app.post('/create', async (req, res) => {
    const { username, email, password, age } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {

            const createdUser = await User.create({
                username,
                email,
                password: hash,
                age
            })

            const token = jwt.sign({ email }, "kuldeep");
            res.cookie("token", token);

            res.send(createdUser)

        })
    })


})
app.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.send("something went wrong");
    }


    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
            const token = jwt.sign({ email: user.email }, "kuldeep");
            res.cookie("token", token);

            res.send("you are login successfully")
        }
        else res.send("something went wrong")
    })


    // res.redirect('/')
})

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect('/')
})

app.listen(8000, () => {
    console.log("you server is started at 8000 port")
})

