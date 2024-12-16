const mongoose = require("mongoose");

const picSchema = new mongoose.Schema({
    postdata: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
    date: {
        type: Date,
        default: Date.now
    }
})


const picModel = mongoose.model("pic", picSchema)

module.exports = picModel;
