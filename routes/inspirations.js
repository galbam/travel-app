const express = require("express");
const router = express.Router();

const Places = require("google-places-web").default;
Places.apiKey = "AIzaSyBz8nWY0YYYkOlWlEIqWMeOT-rZghCG_bE";

//Get Inspirations
router.get("/:name", (req, res) => {

  let partialName = req.params.name;
  
  const radius = 2000;
  const language = "en";

  Places.autocomplete({ input: partialName, radius, language, type: ["cafe"] })
    .then(results => {
      res.json(results);
    })
    .catch(error => {
      res.json(error);
    });
  
});

module.exports = router;