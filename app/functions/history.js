

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")
const chartHelper = require("./chartHelper")


const Firestore = require("@google-cloud/firestore");
const firestore = new Firestore({
  projectId: "todo-8303f",
  timestampsInSnapshots: true,
});


const history = express();
history.use(cors({ origin: true }));

history.post("/all", (req, res) => {

  const body = JSON.parse(req.body);
  const id = body.id;
  const lookBack = body.days ? parseInt(body.days) : 30

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  now.setDate(now.getDate() - lookBack);

  const hist = []

  firestore.collection("users/" + id + "/history").where("date",">=",now).orderBy('date','asc').get().then(histSnap => {
    histSnap.docs.forEach(doc => {
      hist.push(doc.data())
    })
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json');
    res.send(chartHelper.cleanHistory(hist));
  })
});

exports.history = functions.https.onRequest(history);
