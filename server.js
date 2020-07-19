const express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  cors = require("cors"),
  { getClient } = require("./api/DB/db");
const { ObjectID } = require("mongodb");

const app = express(),
  port = 5000;

app.use(methodOverride("X-HTTP-Method-Override"));

app.use(bodyParser.json());

app.use(cors());

app.post("/ideas", async (req, res) => {

  console.log('ideas post' )
  const client = await getClient();
  const collection = client.collection("ideas");
  const result = await collection.insertOne({
    ...req.body,
    votes: 0,
  });
  res.send(result);
});

app.get("/ideas", async (req, res) => {
  console.log('ideas get' )

  const client = await getClient();
  const collection = client.collection("ideas");
  const ideas = await collection.find({}).toArray();
  res.send(ideas);
});

app.post("/ideas/:id/votes", async (req, res) => {
  console.log('ideas votes' )

  const ideaId = req.params.id;
  const query = { _id: new ObjectID(ideaId) };
  const client = await getClient();
  const collection = client.collection("ideas");
  const idea = await collection.findOne(query);
  idea.votes = (idea.votes || 0) + 1;
  await collection.updateOne(query, {
    $set: idea,
  });
  res.send(idea);
});

app.delete("/ideas/:id/votes", async (req, res) => {
  const ideaId = req.params.id;
  const query = { _id: new ObjectID(ideaId) };
  const client = await getClient();
  const collection = client.collection("ideas");
  const idea = await collection.findOne(query);
  idea.votes = (idea.votes || 0) - 1;
  await collection.updateOne(query, {
    $set: idea,
  });
  res.send(idea);
});app.delete("/ideas/:id/delete", async (req, res) => {
  const ideaId = req.params.id;
  const query = { _id: new ObjectID(ideaId) };
  const client = await getClient();
  const collection = client.collection("ideas");
  const idea = await collection.findOneAndDelete(query);
  res.send(idea);
  
});
app.listen(port, (err) => {
  if (err) {
    console.log("listen", err);
  } else {
    console.log("connecter sur le port " + port);
  }
});
