import React, { useContext } from "react";
import firebase from '../../config/fbConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FbContext } from "./fbContext";


export const HistoryContext = React.createContext();


export const HistoryProvider = ({ children }) => {

  const { FBuser } = useContext(FbContext)
  const userID = FBuser ? FBuser.uid : null
  const today = new Date()
  today.setHours(0, 0, 0, 0);
  today.setDate(today.getDate() - 30);


  const [history, historyLoading] = useCollectionData(firebase.firestore().collection('users/' + userID + '/history').where("date",">=",today).orderBy('date','asc'))


  return (
    <HistoryContext.Provider value={{ history, historyLoading }}>{children}</HistoryContext.Provider>
  );
};

