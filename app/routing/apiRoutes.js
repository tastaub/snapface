// ===============================================================================
// LOAD DATA
var friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req,res)  {
    let newFriend = {
      name: req.body.name,
      image: req.body.image,
      scores: []
    }

    let answers = [];

    for(var i = 0; i < req.body.scores.length; i++)  {
      answers.push(parseFloat(req.body.scores[i]))
    }

    newFriend.scores = answers;

    let comparison = [];
    for(var j = 0; j < friends.length; j++)  {
      let current = 0;
      for(var g = 0; g < newFriend.scores.length; g++)  {
        current += Math.abs(newFriend.scores[g] - friends[j].scores[g]);
      }
      comparison.push(current);
    }

    var closestIndex = 0;
    for(var index = 0; index < comparison.length; index++)  {
      if(comparison[index] <= comparison[closestIndex])  {
        closestIndex = index
      }
    }

    var bestMatch = friends[closestIndex];

    res.json(bestMatch);


    friends.push(newFriend);
  })

};
