const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const  packingListSchema= new Schema({
     title: {
          type: String,
     },
     checkbox: Boolean,
     qty: Number,
     item: {
          type: String,
     },
     description: String,
     memo: String,

     trip: { type: Schema.Types.ObjectId, ref: "Trip" },

});

const PackingList = mongoose.model("PackingList", packingListSchema);

module.exports = PackingList;

