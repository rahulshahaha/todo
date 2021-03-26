import React from "react";
import firebase from '../../config/fbConfig'
import {hydrateItem} from '../hydrateItem'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { hydrateWeights } from '../hydrateWeights'

export const FbContext = React.createContext();


export const FbProvider = ({ children }) => {

  const [FBuser] = useAuthState(firebase.auth());
  const userID = FBuser ? FBuser.uid : null

  const [oneOffs] = useCollectionData(firebase.firestore().collection('users/'+ userID +'/oneOffs').where('done','==',false), {
    idField: 'id'
  });


  const [weights] = useDocumentData(firebase.firestore().collection('users').doc("/" + userID), {
    transform: function t(d){
      return hydrateWeights({
        importanceTypes: d.importanceTypes,
        actionTypes: d.actionTypes,
        dayDrop: d.dayDrop,
        oneOff: d.oneOff
      })
    }
  })

  const [projects] = useCollectionData(firebase.firestore().collection('users/' + userID + '/projects').where('deleted','==',false),{
    idField: 'id'
  })

  const [items] = useCollectionData(firebase.firestore().collection('users/' + userID + '/items').where('deleted','==',false),{
    idField: 'id',
    transform: function t(d){
      return hydrateItem({...d, score: 0}, weights, projects)
    }
  })

  const [history] = useCollectionData(firebase.firestore().collection('users/' + userID + '/history').orderBy('date','asc'))


  return (
    <FbContext.Provider value={{ items, oneOffs, weights, FBuser, history, projects }}>{children}</FbContext.Provider>
  );
};

