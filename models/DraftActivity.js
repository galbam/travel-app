const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const draftActivitySchema = new Schema({
     title: {
          type: String,
          required: true
     },
     date: {
          type: Date
     },
     description: String,
     type: String,
     expenses: Number,

     trip: { type: Schema.Types.ObjectId, ref: "Trip" }
});

const DraftActivity = mongoose.model("DraftActivity", draftActivitySchema);

module.exports = DraftActivity;
