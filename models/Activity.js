const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
     title: {
          type: String,
          required: true
     },
     date: {
          type: Date,
          required: true
     },
     description: String,
     card_type: {
          type: String,
          enum: ["Transportation", "Flight", "Accommodation", "Sightseeing", "Food", "Other"]
     },
     details: {
          imageUrl: String,
          links: []
     },
     expenses: Number,

     trip: { type: Schema.Types.ObjectId, ref: "Trip" },
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;

//expenses only in the lower level
//coordinates ?   in order to see where the card is
