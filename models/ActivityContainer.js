const mongoose = require("mongoose");
const { Schema } = mongoose;

const activitySchemaContainerSchema = new Schema({
     trip: { type: Schema.Types.ObjectId, ref: "Trip" },
     activity: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
     owner: { type: Schema.Types.ObjectId, ref: "User" }
});

const ActivityContainer = mongoose.model("ActivityContainer", activitySchemaContainerSchema);

module.exports = ActivityContainer;
