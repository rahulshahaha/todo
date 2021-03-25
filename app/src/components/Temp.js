import React from 'react'
import firebase from '../config/fbConfig'


const Temp = () => {


  firebase.firestore().collection('users/f6tnPMjmNnPO6rnutT0EbEMjCOg2/items').get().then(userSnap => {
    userSnap.docs.forEach(userDoc => {
      firebase.firestore().collection('users/f6tnPMjmNnPO6rnutT0EbEMjCOg2/items').doc(userDoc.id).update({
        projectID: userDoc.data().project
      })
    })
  })

  return ( 
    <div></div>
   );
}
 
export default Temp;