import React, { useState, useEffect } from "react";
import firebase from '../config/fbConfig'
import {hydrateItem} from './hydrateItem'
import { useAuthState } from 'react-firebase-hooks/auth';

export const FbContext = React.createContext();


export const FbProvider = ({ children }) => {

  const [items, setItems] = useState(null);
  const [weights, setWeights] = useState(null)
  const [oneOffs, setOneOffs] = useState(null)
  const [user, setUser] = useState(null)
  const [FBuser, userLoading] = useAuthState(firebase.auth());

  useEffect(() => {
    const userID = user ? user.id : null
    const unsubItems = firebase.firestore().collection('items').where('userID','==',userID).onSnapshot(itemsSnap => {
    const itemArray = []
      itemsSnap.docs.forEach(itemDoc => {
        itemArray.push(hydrateItem({...itemDoc.data(), id: itemDoc.id, score: 0}, weights))
     })
    setItems(itemArray)
   })
   return () => {
     unsubItems();
   }
  }, [weights, user]);

  useEffect(() => {
    if(user){
      firebase.firestore().collection('users').doc(user.id).get().then(userDoc => {
        setWeights(JSON.parse(userDoc.data().weights))
      })
    }else{
      setWeights(null)
    }
  }, [user])

  useEffect(() => {
    const userID = user ? user.id : null
    const unsubOneOffs = firebase.firestore().collection('oneOffs').where('done','==',false).where('userID','==',userID).onSnapshot(oneOffSnap => {
      const oneOffArray = []
      oneOffSnap.docs.forEach(oneOffDoc => {
        oneOffArray.push({...oneOffDoc.data(), id: oneOffDoc.id})
      })
      setOneOffs(oneOffArray)
    })

    return () => {
      unsubOneOffs();
    }
  }, [user])

  useEffect(() => {
    if(FBuser){
      setUser({
        id: FBuser.uid
      })
    }else{
      setUser(null)
    }

  }, [FBuser])


  return (
    <FbContext.Provider value={{ items, oneOffs, weights, FBuser, user }}>{children}</FbContext.Provider>
  );
};

