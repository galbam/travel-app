const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");
const PackingList = require("../models/PckingList");

//Get PackigList

router.get("/", (req, res) =>{

  PackingList.find()
   .then(list => {
     res.json(list);
   })
   .catch(error => {
     res.json(error);
   });
});


//Get one PackingList
router.get("/:id", (req, res) => {
  const id = req.params.id;

  PackingList.findById(id)
   .then(trip => {
     res.json(trip);
   })
   .catch(error => {
     res.json(error)
   });
});

//Create PackingList with the tripId

router.post("/", (req, res) => {
  const {title, checkbox, qty, item , description, memo, tripId} = req.body;

  PackingList.create({
    title,
    checkbox,
    qty,
    item,
    description,
    memo,
    tripId
  })
   .then(packingListObj => {
     return Trip.findByIdAndUpdate(tripId, {
       $push: { packingList: packingListObj._id}
     }).then(() => {
       res.json({
         message: `PackingList with id ${
           packingListObj._id
         } was successfully added to project with id ${tripId}`
       });
     });
   })
   .catch(error => {
     res.json(error);
   });
});

//Update PackingList
router.purge("/:id", (req, res) => {
  const id = req.params.id;
  const {title, checkbox, qty, item, description, memo, tripId} = req.body;

  PackingList.findByIdAndUpdate(id, {
    title,
    checkbox,
    qty,
    item,
    description,
    memo,
    tripId
  })
  .then(()=> {
    res.json({message: `PackingList with id ${id} was successfully updated`});
  })
  .catch(err => {
    res.json(err);
  });
});

//Delete PackingList
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  PackingList.findByIdAndDelete(id)
    .then(packingListObj => {
      return Trip.findByIdAndUpdate(packingListObj.list, {
        $pull: {packingList: id}
      }).then(() => {
        res.json({message: `PackingList with id ${id} was successfully deleted`});
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;