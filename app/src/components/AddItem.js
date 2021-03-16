import React from 'react'
import firebase from '../config/fbConfig'

const AddItem = () => {

  const addItem = () => {
    const now = new Date(new Date().getFullYear() + 1,new Date().getMonth() , new Date().getDate());
    firebase.firestore().collection('items').add({
      action: '',
      actionType: 1,
      description: '',
      expectedUpdate: now,
      importance: 1,
      name: 'NewName',
      notes: ''
    })
  }

  return ( 
    <button className="ml-10 mt-5 mb-10 btn bg-gray-200 rounded-md px-5 h-8" onClick={addItem}>Add Item</button>
   );
}
 
export default AddItem;