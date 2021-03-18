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
  const [FBuser] = useAuthState(firebase.auth());


  useEffect(() => {
    const userID = user ? user.id : null
      const unsubUser = firebase.firestore().collection('users').doc("/" + userID).onSnapshot(userDoc => {
        if(userDoc.exists){
        setWeights(JSON.parse(userDoc.data().weights))
        }else{
          setWeights(null)
        }
      })
    return () => {
      unsubUser();
    }
  }, [user])

  useEffect(() => {
    const userID = user ? user.id : null
    const unsubOneOffs = firebase.firestore().collection('users/' + userID + '/oneOffs').where('done','==',false).onSnapshot(oneOffSnap => {
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
    const userID = user ? user.id : null
    const unsubItems = firebase.firestore().collection('users/' + userID + '/items').where('deleted','==',false).onSnapshot(itemsSnap => {
      const itemArray = []
      itemsSnap.docs.forEach(itemDoc => {
        itemArray.push(hydrateItem({...itemDoc.data(), id: itemDoc.id, score: 0}, weights))
      })
    setItems(itemArray)
    })

  return () => {
    unsubItems();
  }
  },[weights, user])

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

