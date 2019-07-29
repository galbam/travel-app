const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
   
     title: {
          type: String,
          required: true
     },
     description: String,
     destination: String,
     startDate: {
          type: Date,
          required: true
     },
     endDate: {
          type: Date,
          required: true
     },

     activity: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
     draftActivity: [{ type: Schema.Types.ObjectId, ref: "DraftActivity" }],
     owner: { type: Schema.Types.ObjectId, ref: "User" }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
