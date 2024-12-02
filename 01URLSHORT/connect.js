const mongoose = require('mongoose');

async function connectMongo(url) {
    return mongoose.connect(url);
}

module.exports = {
    connectMongo
}