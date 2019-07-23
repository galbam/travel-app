const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const draftActivitySchema = new Schema({
     title: {
          type: String,
          required: true
     },
     description: String,
});

const DraftActivity = mongoose.model("DraftActivity", draftActivitySchema);

module.exports = DraftActivity;
