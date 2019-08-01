const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");
const PackingList = require("../models/PackingList");




//Get PackingList
router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("called")
  Trip.findOne({_id:id})
  .populate("packingList")
   .then(trip => {
     console.log("here",trip)
     res.json(trip.packingList);
   })
   .catch(error => {
     console.log(error)
     res.json(error)
   });
});

//Create PackingList with the tripId

router.post("/:id", (req, res) => {
  const {items} = req.body;
  const tripId = req.params.id

  PackingList.create({
    items
  })
   .then(packingListObj => {
     return Trip.findByIdAndUpdate(tripId, {
       packingList: packingListObj._id
     }).then(() => {
       res.json({
         message: `PackingList with id ${
           packingListObj._id
         } was successfully added to project with id ${tripId}`,
         packingListId:packingListObj._id
       });
     });
   })
   .catch(error => {
     res.json(error);
   });
});


//////////Above already checked  

//////////Down need to be checked

//Update PackingList
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const {items} = req.body;

  
  PackingList.findByIdAndUpdate(id, {
    items,
  })
  .then((packinglist)=> {
    res.json({message: `PackingList with id ${id} was successfully updated`, packinglist});
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