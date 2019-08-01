const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const  packingListSchema= new Schema({
     items: [String]
});

const PackingList = mongoose.model("PackingList", packingListSchema);

module.exports = PackingList;

