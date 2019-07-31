const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");

//Get Trips
router.get("/", (req, res) => {

  Trip.find()
    .populate("activity")
    .populate("owner")
    .then(trip => {
      res.json(trip);
    })
    .catch(error => {
      res.json(error);
    });
});

//Get one Trip
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Trip.findById(id)
    .populate("activity")
    .populate("owner")
    .then(trip => {
      res.json(trip);
    })
    .catch(error => {
      res.json(error);
    });
});

//Get all draft activities from one trip
router.get("/:id/draftActivities", (req, res) => {
  //trip id
  const id = req.params.id;

  Trip.findById(id)
    .populate("draftActivity")
    .populate("owner")
    .then(trip => {
      res.json(trip.draftActivity);
    })
    .catch(error => {
      res.json(error);
    });
});

//Create Trip
router.post("/", (req, res) => {
  const {
    title,
    description,
    destination,
    startDate,
    endDate
  } = req.body;

  Trip.create({
    title,
    description,
    destination,
    startDate,
    endDate
  })
    .then(trip => {
      res.json(trip);
    })
    .catch(err => {
      res.json(err);
    });
});

//Update Trip
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const {
    title,
    description,
    startDate,
    endDate } = req.body;

  Trip.findByIdAndUpdate(id, {
    title,
    description,
    startDate,
    endDate
  })
    .then(() => {
      res.json({ message: `Trip with id ${id} was successfully updated` });
    })
    .catch(err => {
      res.json(err);
    });
});

//Delete Trip
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Trip.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: `Trip with id ${id} was successfully deleted` });
    })
    .catch(err => {
      res.json(err);
    });
});

//Patch
//Delete one draft activity from a trip (from the container)
router.patch("/:id/draftActivity/:draftId", (req, res) => {

  //trip id and draft activity id
  const id = req.params.id;
  const draftId = req.params.draftId;

  Trip.findByIdAndUpdate(id, {
    $pull: { draftActivity: draftId }
  })
    .then(() => {
      res.json({ message: `Draft Activity with id ${id} was successfully deleted from trip ${draftId}` });
    });
});

module.exports = router;
