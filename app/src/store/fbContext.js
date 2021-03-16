import React, { useState, useEffect } from "react";
import firebase from '../config/fbConfig'
import {hydrateItem} from './hydrateItem'

export const FbContext = React.createContext();


export const FbProvider = ({ children }) => {

  const [items, setItems] = useState(null);
  const [weights, setWeights] = useState(null)
  const [oneOffs, setOneOffs] = useState(null)

  useEffect(() => {
   const unsubItems = firebase.firestore().collection('items').onSnapshot(itemsSnap => {
     const itemArray = []
     itemsSnap.docs.forEach(itemDoc => {
       itemArray.push(hydrateItem({...itemDoc.data(), id: itemDoc.id, score: 0}, weights))
     })
     setItems(itemArray)
   })
   return () => {
     unsubItems();
   }
  }, [weights]);

  useEffect(() => {
    firebase.firestore().collection('users').doc('B6LZFjjgvHjlIYx5Dmov').get().then(userDoc => {
      setWeights(JSON.parse(userDoc.data().weights))
    })
  }, [])

  useEffect(() => {
    const unsubOneOffs = firebase.firestore().collection('oneOffs').where('done','==',false).onSnapshot(oneOffSnap => {
      const oneOffArray = []
      oneOffSnap.docs.forEach(oneOffDoc => {
        oneOffArray.push({...oneOffDoc.data(), id: oneOffDoc.id})
      })
      setOneOffs(oneOffArray)
    })

    return () => {
      unsubOneOffs();
    }
  }, [])


  return (
    <FbContext.Provider value={{ items, oneOffs, weights }}>{children}</FbContext.Provider>
  );
};

