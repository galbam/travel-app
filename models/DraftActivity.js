const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const draftActivitySchema = new Schema({
     title: {
          type: String,
          required: true
     },
     description: String,
     type: String,
     expenses: Number
});

const DraftActivity = mongoose.model("DraftActivity", draftActivitySchema);

module.exports = DraftActivity;
