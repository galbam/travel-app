const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const draftActivitySchema = new Schema({
     title: {
          type: String,
          required: true
     },
     description: String,
     type: String,
     expenses: Number,
     color: String,
     trip: { type: Schema.Types.ObjectId, ref: "Trip" },
});

const DraftActivity = mongoose.model("DraftActivity", draftActivitySchema);

module.exports = DraftActivity;
