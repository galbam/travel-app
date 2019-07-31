const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
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

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;

//expenses only in the lower level
//coordinates ?   in order to see where the card is
