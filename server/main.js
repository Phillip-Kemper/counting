import express from "express";
import bodyParser from "body-parser";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
const router = express.Router();
const port = 3000;

const uri =
  "mongodb+srv://user:<password>@cluster0.shnrj8q.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get("/health", function (req, res) {
  res.send("System up");
});

router.get("/mongo", function (req, res) {
  client.connect((err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });

  res.send("Worked");
});

router.post("/count", (req, res) => {
  res.send(parseInt(req.body.count).toString());
});

app.use("/", router);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
