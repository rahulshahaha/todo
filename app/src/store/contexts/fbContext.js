import React, { useState, useEffect } from "react";
import firebase from '../../config/fbConfig'


export const FbContext = React.createContext();


export const FbProvider = ({ children }) => {

  const [items, setItems] = useState(null);
  const [weights, setWeights] = useState(null)

  useEffect(() => {
   const unsubItems = firebase.firestore().collection('items').onSnapshot(itemsSnap => {
     const itemArray = []
     itemsSnap.docs.forEach(itemDoc => {
       itemArray.push({...itemDoc.data(), id: itemDoc.id})
     })
     setItems(itemArray)
   })
   return () => {
     unsubItems();
   }
  }, []);

  useEffect(() => {
    firebase.firestore().collection('users').doc('B6LZFjjgvHjlIYx5Dmov').get().then(userDoc => {
      setWeights(JSON.parse(userDoc.data().weights))
    })
  }, [])


  return (
    <FbContext.Provider value={{ items, weights }}>{children}</FbContext.Provider>
  );
};

