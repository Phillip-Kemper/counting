const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the records.

recordRoutes.route("/health").get(async function (req, res) {
  res.send("healthy and running");
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
          });
        });
    });
});

// // This section will help you create a new record.
recordRoutes.route("/count").post(function (req, res) {
  const dbConnect = dbo.getDb().collection("games");

  const count = req.body.count;

  dbConnect
    .find()
    .sort({ game: -1, count: -1 })
    .limit(1)
    .toArray(function (err, result) {
      const currentCount = result[0].count;
      console.log(currentCount);
      console.log(count);
      if (parseInt(currentCount) + 1 === parseInt(count)) {
        // count up succesfully
        dbConnect.insertOne(
          { game: result[0].game, count: count },
          function (err, result2) {
            if (err) {
              res.status(400).send("Error inserting matches!");
            } else {
              console.log(`Added a new match with id ${result.insertedId}`);
              res.status(204).send();
            }
          }
        );
      } else {
        // handle fail
        dbConnect.insertOne(
          { game: parseInt(result[0].game) + 1, count: 1 },
          function (err, result2) {
            if (err) {
              res.status(400).send("Error inserting matches!");
            } else {
              console.log(`Added a new match with id ${result.insertedId}`);
              res.status(204).send();
            }
          }
        );
      }
    });

  // dbConnect.insertOne(matchDocument, function (err, result) {
  //   if (err) {
  //     res.status(400).send("Error inserting matches!");
  //   } else {
  //     console.log(`Added a new match with id ${result.insertedId}`);
  //     res.status(204).send();
  //   }
  // });
});

// // This section will help you update a record by id.
// recordRoutes.route("/listings/updateLike").post(function (req, res) {
//   const dbConnect = dbo.getDb();
//   const listingQuery = { _id: req.body.id };
//   const updates = {
//     $inc: {
//       likes: 1,
//     },
//   };

//   dbConnect
//     .collection("listingsAndReviews")
//     .updateOne(listingQuery, updates, function (err, _result) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error updating likes on listing with id ${listingQuery.id}!`);
//       } else {
//         console.log("1 document updated");
//       }
//     });
// });

// // This section will help you delete a record.
// recordRoutes.route("/listings/delete/:id").delete((req, res) => {
//   const dbConnect = dbo.getDb();
//   const listingQuery = { listing_id: req.body.id };

//   dbConnect
//     .collection("listingsAndReviews")
//     .deleteOne(listingQuery, function (err, _result) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
//       } else {
//         console.log("1 document deleted");
//       }
//     });
// });

module.exports = recordRoutes;
