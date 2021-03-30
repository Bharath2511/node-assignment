const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const dataSchema = new Schema ({
    uidNumber: Number,
    serialNumber: Number,
    valueType: String,
    scanType: String,
    scanValue: Number,
    actualValue: Number,
    readingValue: Number,
    abnormalityStatus: String,
    latitude: Number,
    longitude: Number,
    smallImage: String,
    bigImage: String,
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

module.exports = Data = mongoose.model("data", dataSchema);