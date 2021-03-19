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
  const [history, setHistory] = useState(null)
  const [FBuser] = useAuthState(firebase.auth());



  useEffect(() => {
    const userID = FBuser ? FBuser.uid : null
      firebase.firestore().collection('users').doc("/" + userID).onSnapshot(userDoc => {
        console.log('pull user doc')
        if(userDoc.exists){
        setWeights(JSON.parse(userDoc.data().weights))
        }else{
          setWeights(null)
        }
      })
  }, [FBuser])

  useEffect(() => {
    const userID = user ? user.id : null
    firebase.firestore().collection('users/' + userID + '/oneOffs').where('done','==',false).onSnapshot(oneOffSnap => {
      console.log('pull one offs')
      const oneOffArray = []
      oneOffSnap.docs.forEach(oneOffDoc => {
        oneOffArray.push({...oneOffDoc.data(), id: oneOffDoc.id})
      })
      setOneOffs(oneOffArray)
    })
  }, [user])

  useEffect(() => {
    const userID = FBuser ? FBuser.uid : null
    firebase.firestore().collection('users/' + userID + '/items').where('deleted','==',false).onSnapshot(itemsSnap => {
      console.log('pull items')
      const itemArray = []
      itemsSnap.docs.forEach(itemDoc => {
        itemArray.push(hydrateItem({...itemDoc.data(), id: itemDoc.id, score: 0}, weights))
      })
    setItems(itemArray)
    })
  },[weights, FBuser])

  useEffect(() => {
    if(FBuser){
      setUser({
        id: FBuser.uid
      })
    }else{
      setUser(null)
    }

  }, [FBuser])

  useEffect(() => {
    const userID = FBuser ? FBuser.uid : null
    firebase.firestore().collection('users/' + userID + '/history').orderBy('date','asc').onSnapshot(historySnap => {
      console.log('pull history')
      var newHist = []
      historySnap.docs.forEach(historyDoc => {
        newHist.push({...historyDoc.data()})
      })
      if(newHist.length > 0){
        setHistory(newHist)
      }else{
        setHistory(null)
      }
    })
  },[FBuser])


  return (
    <FbContext.Provider value={{ items, oneOffs, weights, FBuser, user, history }}>{children}</FbContext.Provider>
  );
};

