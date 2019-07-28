// Not needed
const mongoose = require("mongoose");
const { Schema } = mongoose;

const activityContainerSchema = new Schema({
     trip: { type: Schema.Types.ObjectId, ref: "Trip" },
     draftActivity: [{ type: Schema.Types.ObjectId, ref: "DraftActivity" }],
     owner: { type: Schema.Types.ObjectId, ref: "User" }
});

const ActivityContainer = mongoose.model("ActivityContainer", activityContainerSchema);

module.exports = ActivityContainer;
