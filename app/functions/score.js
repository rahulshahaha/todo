

const hydrateData = require("./hydrateData")

const functions = require("firebase-functions");
// const express = require("express");
// const cors = require("cors")({origin: true});

const Firestore = require("@google-cloud/firestore");
const firestore = new Firestore({
  projectId: "todo-8303f",
  timestampsInSnapshots: true,
});


// const score = express();
// score.use(cors);

// exports.score = functions.firestore.document("users/{userID}/{subcol}/{subID}")
//     .onWrite((change, context) => {
//       console.log(context);
//     });


exports.scorePull = functions.https.onRequest(async (req, res) => {
  //get weights
  firestore.collection('users').doc('f6tnPMjmNnPO6rnutT0EbEMjCOg2').get().then(userSnap => {
    const userData = userSnap.data()
    const weights = {
      actionTypes: userData.actionTypes,
      dayDrop: userData.dayDrop,
      importanceTypes: userData.importanceTypes,
      oneOff: userData.oneOff,
      currentUserScore: userData.currentUserScore
    }
    //get items
    firestore.collection('users').doc('f6tnPMjmNnPO6rnutT0EbEMjCOg2').collection('items').where('deleted','==',false).get().then(itemsSnap => {
      const items = []
      itemsSnap.docs.forEach(doc => {
        items.push(doc.data())
      })
      //get projects
      firestore.collection('users').doc('f6tnPMjmNnPO6rnutT0EbEMjCOg2').collection('projects').where('deleted','==',false).get().then(projectsSnap => {
        const projects = []
        projectsSnap.docs.forEach(doc => {
          projects.push({...doc.data(), id: doc.id})
        })
        //get one offs
        firestore.collection('users').doc('f6tnPMjmNnPO6rnutT0EbEMjCOg2').collection('oneOffs').where('done','==',false).get().then(oneOffSnap => {
          const oneOffs = []
          oneOffSnap.docs.forEach(doc => {
            oneOffs.push(doc.data())
          })
          res.send("Score: " + hydrateData.hydrateData(items, weights, projects, oneOffs).totalScore);
        })
      })
    })
  })
});
