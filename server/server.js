require("dotenv").config({ path: "./config.env" });

const requestIp = require("request-ip");

const express = require("express");
const cors = require("cors");
// get MongoDB driver connection
const dbo = require("./db/conn");

const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(requestIp.mw());
app.use(require("./routes/record"));

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
