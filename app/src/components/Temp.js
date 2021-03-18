import React from 'react'
import firebase from '../config/fbConfig'


const Temp = () => {

  firebase.firestore().collection('oneOffs').get().then(itemSnap => {
    itemSnap.docs.forEach(itemDoc => {
      firebase.firestore().collection('users/' + itemDoc.data().userID + '/oneOffs').doc(itemDoc.id).set({
        ...itemDoc.data()
      })
    })
  })

  return ( 
    <div></div>
   );
}
 
export default Temp;