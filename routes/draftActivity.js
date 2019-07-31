const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");
const DraftActivity = require("../models/DraftActivity");

//Get Draft Activities
router.get("/", (req, res) => {

  DraftActivity.find()
    .then(activities => {
      res.json(activities);
    })
    .catch(error => {
      res.json(error);
    });
});

//Get one Draft Activity
router.get("/:id", (req, res) => {
  const id = req.params.id;

  DraftActivity.findById(id)
    .then(trip => {
      res.json(trip);
    })
    .catch(error => {
      res.json(error);
    });
});

//Create a Draft Activity; we need the id of a Trip
router.post("/", (req, res) => {
  const { 
    title, 
    date,
    description, 
    type,
    expenses, 
    tripId 
  } = req.body;

  DraftActivity.create({
    title,
    date,
    description,
    type,
    expenses
  })
    .then(activityObj => {
      return Trip.findByIdAndUpdate(tripId, {
        $push: { draftActivity: activityObj._id }
      }).then(() => {
        res.json(activityObj);
      });
    })
    .catch(error => {
      res.json(error);
    });
});

//Update Draft Activity
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { 
    title, 
    date,
    description, 
    type, 
    expenses
   } = req.body;

  DraftActivity.findByIdAndUpdate(id, {
    title,
    date,
    description,
    type,
    expenses
  })
    .then(() => {
      res.json({ message: `Draft Activity with id ${id} was successfully updated` });
    })
    .catch(err => {
      res.json(err);
    });
});

//Update date
router.patch("/:id", (req, res) => {

  const id = req.params.id;
  
  DraftActivity.findByIdAndUpdate(id, req.body, { new: true })
    .then(activity => {
      res.json(activity)
    })
    .catch(err => {
      res.json(err);
    });
    
});

//Delete Draft Activity
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  DraftActivity.findByIdAndDelete(id)
    .then(activityObj => {
      return Trip.findByIdAndUpdate(activityObj.trip, {
        $pull: { draftActivity: id }
      }).then(() => {
        res.json({ message: `Draft Activity with id ${id} was successfully deleted` });
      });
    })
    .catch(err => {
      res.json(err);
    });
});


module.exports = router;
