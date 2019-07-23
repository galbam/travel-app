const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");
const Activity = require("../models/Activity");

//
router.get("/", (req, res) => {

  Activity.find()
    .then(activities => {
      res.json(activities);
    })
    .catch(error => {
      res.json(error);
    });
});

router.post("/", (req, res) => {
  const { date, title, description, tripId } = req.body;

  Activity.create({
    date,
    title,
    description
  })
    .then(activityObj => {
      return Trip.findByIdAndUpdate(tripId, {
        $push: { activity: activityObj._id }
      }).then(() => {
        res.json({
          message: `Activity with id ${
            activityObj._id
            } was successfully added to project with id ${tripId}`
        });
      });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
