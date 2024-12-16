const mongoose = require("mongoose");

const connectMongoDb = async (url) => {
    return mongoose.connect(url)
}


module.exports = { connectMongoDb };