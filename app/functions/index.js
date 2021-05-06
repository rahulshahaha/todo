'use strict';

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")({origin: true});

const Firestore = require("@google-cloud/firestore");
const firestore = new Firestore({
  projectId: "todo-8303f",
  timestampsInSnapshots: true,
});


const oneOffs = express()
oneOffs.use(cors)

oneOffs.post("/new", (req, res) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  const item = JSON.parse(req.body).item
  const now = new Date();
  res.send(item);

  firestore.collection("users/f6tnPMjmNnPO6rnutT0EbEMjCOg2/oneOffs").add({
    name: item,
    done: false,
    userID: "f6tnPMjmNnPO6rnutT0EbEMjCOg2",
    created: now
  })
});

exports.oneOffs = functions.https.onRequest(oneOffs);