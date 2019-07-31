const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");
const Activity = require("../models/Activity");

//Get Activities
router.get("/", (req, res) => {

  Activity.find()
    .then(activities => {
      res.json(activities);
    })
    .catch(error => {
      res.json(error);
    });
});

//Get one Activity
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Activity.findById(id)
    .then(trip => {
      res.json(trip);
    })
    .catch(error => {
      res.json(error);
    });
});

//Create an Activity; we need the id of a Trip
router.post("/", (req, res) => {
  const { 
    title, 
    description, 
    type,
    expenses,
    tripId } = req.body;

  Activity.create({
    title,
    description,
    type,
    expenses
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

//Update Activity
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { 
    title,
    description,
    type, 
    expenses } = req.body;

  Activity.findByIdAndUpdate(id, {
    title,
    description,
    type,
    expenses
  })
    .then(() => {
      res.json({ message: `Activity with id ${id} was successfully updated` });
    })
    .catch(err => {
      res.json(err);
    });
});

//Delete Activity
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Activity.findByIdAndDelete(id)
    .then(activityObj => {
      return Trip.findByIdAndUpdate(activityObj.trip, {
        $pull: { activity: id }
      }).then(() => {
        res.json({ message: `Activity with id ${id} was successfully deleted` });
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
