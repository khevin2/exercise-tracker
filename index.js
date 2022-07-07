import express, { json, urlencoded } from "express";
///

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

////
import "./db_conn.js";
const app = express();
import cors from "cors";

import { User, Exercises } from "./models.js";

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", async (req, res) => {
  let user = new User({ username: req.body.username });
  try {
    user.save((err, result) => {
      console.log(result);
      if (!err)
        res.send({
          username: result.username,
          _id: result._id,
        });
    });
    //let lastId = User.find({}).
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  let id = req.params._id;
  let exricise = new Exercises({
    userId: id,
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date,
  });

  try {
    exricise.save((err, result) => {
      console.log(result);
      if (!err) {
        res.send({
          userId: result.userId,
          username: result.username,
          date: result.date.toUTCString(),
          duration: result.duration,
          descripription: result.description,
        });
      } else console.log(err);
    });
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

app.get("/api/users/:_id/logs?", async (req, res) => {
  let logs = await Exercises.find({
    createdAt: { $gte: Date(req.params.from), $lt: Date(req.params.to) },
  }).limit(req.params.limit);
  res.send({
    logs,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
