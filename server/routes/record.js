const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the records.

recordRoutes.route("/health").get(async function (req, res) {
  res.status(200).send("healthy and up");
});
recordRoutes.route("/count").get(async function (_req, res) {
  const dbConnect = dbo.getDb().collection("games");

  dbConnect
    .find()
    .sort({ game: -1 })
    .limit(1)
    .toArray(function (err, result) {
      const currentGame = result[0].game;

      dbConnect
        .find({ game: currentGame })
        .sort({ count: -1 })
        .limit(1)
        .toArray(function (err, result) {
          res.json({
            currentGame: currentGame,
            count: result[0].count,
            clientIp: result[0].clientIp,
          });
        });
    });
});

recordRoutes.route("/stats").get(async function (req, res) {
  const dbConnect = dbo.getDb().collection("games");

  dbConnect
    .find()
    .sort({ game: -1 })
    .limit(1)
    .toArray(function (err, result) {
      const gamesPlayed = result[0].game;

      dbConnect
        .find()
        .sort({ count: -1 })
        .limit(1)
        .toArray(function (err2, result2) {
          res.json({
            gamesPlayed: gamesPlayed,
            maxCount: result2[0].count,
            clientIp: result2[0].clientIp,
          });
        });
    });
});

recordRoutes.route("/count").post(function (req, res) {
  console.log(req.clientIp == true);

  const dbConnect = dbo.getDb().collection("games");

  const count = parseInt(req.body.count);

  dbConnect
    .find()
    .sort({ game: -1, count: -1 })
    .limit(1)
    .toArray(function (err, result) {
      const currentCount = result[0].count;
      if (currentCount + 1 === count) {
        // count up succesfully
        dbConnect.insertOne(
          { game: result[0].game, count: count, clientIp: req.clientIp },
          function (err, _result2) {
            if (err) {
              res.status(400).send("Error inserting matches!");
            } else {
              res.status(200).json({
                game: result[0].game,
                count: count,
                clientIp: req.clientIp,
              });
            }
          }
        );
      } else {
        dbConnect.insertOne(
          { game: result[0].game + 1, count: 1 },
          function (err, result2) {
            if (err) {
              res.status(400).send("Error inserting matches!");
            } else {
              // reset count and create new game
              res.status(200).json({
                game: result[0].game + 1,
                count: 1,
                clientIp: req.clientIp,
              });
            }
          }
        );
      }
    });
});

module.exports = recordRoutes;
