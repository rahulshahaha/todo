import React, { useReducer } from "react";
import firebase from '../config/fbConfig'
import {hydrateItem} from './hydrateItem'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { reducer } from './reducer'

export const FbContext = React.createContext();


export const FbProvider = ({ children }) => {

  // const [history, setHistory] = useState(null)
  const [FBuser] = useAuthState(firebase.auth());
  const userID = FBuser ? FBuser.uid : null
  const [status, dispatch] = useReducer(reducer, {
    showSheet: false,
    item: null
  });

  const [oneOffs] = useCollectionData(firebase.firestore().collection('users/'+ userID +'/oneOffs').where('done','==',false), {
    idField: 'id'
  });

  const [weights] = useDocumentData(firebase.firestore().collection('users').doc("/" + userID), {
    transform: function t(d){
      return {...JSON.parse(d.weights)}
    }
  })

  const [items] = useCollectionData(firebase.firestore().collection('users/' + userID + '/items').where('deleted','==',false),{
    idField: 'id',
    transform: function t(d){
      return hydrateItem({...d, score: 0}, weights)
    }
  })

  const [history] = useCollectionData(firebase.firestore().collection('users/' + userID + '/history').orderBy('date','asc'))





  return (
    <FbContext.Provider value={{ items, oneOffs, weights, FBuser, history, status, dispatch }}>{children}</FbContext.Provider>
  );
};

