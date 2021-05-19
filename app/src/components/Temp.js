import React from 'react'
import firebase from '../config/fbConfig'


const Temp = () => {


  firebase.firestore().collection('users').doc('f6tnPMjmNnPO6rnutT0EbEMjCOg2').get().then(userSnap => {
    firebase.firestore().collection('users').doc('A7C42qyQDOd3MeNo9UBMEw7CHAQ2').set({
      ...userSnap.data()
    })
  })

  return ( 
    <div></div>
   );
}
 
export default Temp;