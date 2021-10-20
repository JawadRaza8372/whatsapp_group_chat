import express from "express";
import roomSchema from "./dbrooms.mjs";
const Router = express();

Router.get("/room/sync", (req, res, next) => {
  roomSchema
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.send(e);
    });
});

Router.post("/room/new", (req, res, next) => {
  const dbmessage = req.body;
  console.log(req.body);
  roomSchema.create(dbmessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
export default Router;
