import React from 'react'
import firebase from '../config/fbConfig'


const Temp = () => {


  firebase.firestore().collection('users').doc('f6tnPMjmNnPO6rnutT0EbEMjCOg2').get().then(userSnap => {
    firebase.firestore().collection('users').doc('b8QWKHIBGyODDezRBoqddnkraLH2').set({
      ...userSnap.data()
    })
  })

  return ( 
    <div></div>
   );
}
 
export default Temp;