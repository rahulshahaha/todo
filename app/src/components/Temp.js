import React from 'react'
import firebase from '../config/fbConfig'


const Temp = () => {

  firebase.firestore().collection('users').get().then(userSnap => {
    userSnap.docs.forEach(userDoc => {
      firebase.firestore().collection('users').doc(userDoc.id).update({
        dayDrop: 0.15,
        oneOff: 0.5
      })
    })
  })

  return ( 
    <div></div>
   );
}
 
export default Temp;