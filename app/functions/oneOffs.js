

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")({origin: true});

const Firestore = require("@google-cloud/firestore");
const firestore = new Firestore({
  projectId: "todo-8303f",
  timestampsInSnapshots: true,
});


const oneOffs = express();
oneOffs.use(cors);

oneOffs.post("/new", (req, res) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  functions.logger.log("body: ", req);

  const body = req.body;
  const item = body.item;

  const now = new Date();


  firestore.collection("users/f6tnPMjmNnPO6rnutT0EbEMjCOg2/oneOffs").add({
    name: item,
    done: false,
    userID: "f6tnPMjmNnPO6rnutT0EbEMjCOg2",
    created: now,
  }).then(() => {
    res.send(item);
  });
});

exports.oneOffs = functions.https.onRequest(oneOffs);
