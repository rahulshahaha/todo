import React, { useContext } from "react";
import firebase from '../../config/fbConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FbContext } from "./fbContext";


export const HistoryContext = React.createContext();


export const HistoryProvider = ({ children }) => {

  const { FBuser } = useContext(FbContext)
  const userID = FBuser ? FBuser.uid : null


  const [history, historyLoading] = useCollectionData(firebase.firestore().collection('users/' + userID + '/history').orderBy('date','asc'))


  return (
    <HistoryContext.Provider value={{ history, historyLoading }}>{children}</HistoryContext.Provider>
  );
};

